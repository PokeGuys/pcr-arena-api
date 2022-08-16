from urllib.parse import unquote
from base64 import b64decode
import xml.etree.ElementTree as ElementTree
import struct

_PLAYER_PREF_KEY = b'e806f6'


def _xor_encode(data: bytes, key: bytes) -> bytes:
    return bytes([data[i] ^ key[i % len(key)] for i in range(len(data))])


def _decode_key(key: str) -> str:
    return _xor_encode(b64decode(unquote(key)), _PLAYER_PREF_KEY).decode()


def _decode_value(key: str, raw_val: str) -> bytes:
    val = b64decode(unquote(raw_val))
    val = val[0:len(val) - (11 if val[-5] != 0 else 7)]
    val = _xor_encode(val, key.encode() + _PLAYER_PREF_KEY)
    if key == 'UDID':
        return ''.join([chr(val[4 * i + 6] - 10) for i in range(36)])
    if len(val) == 4:
        return str(struct.unpack('i', val)[0])
    return val.decode()


def decode_xml(xml_str: str) -> dict:
    """
    Parse XML string into a dictionary.
    """
    res = dict()
    root = ElementTree.fromstring(xml_str)
    for elem in root.iter():
        # Get element name and value
        if 'name' not in elem.attrib:
            continue
        try:
            key = _decode_key(elem.attrib['name'])
        except:
            continue
        res[key] = _decode_value(key, elem.text)

    return res
