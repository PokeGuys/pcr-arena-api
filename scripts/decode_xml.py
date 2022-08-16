import argparse
from decoder import player_pref


def main(args):
    with open(args.input, 'r') as f:
        xml = f.read()
        pref = player_pref.decode_xml(xml)
        print(f'UDID: {pref["UDID"]}')
        print(f'Short UDID: {pref["SHORT_UDID"]}')
        print(f'Viewer ID: {pref["VIEWER_ID"]}')
        print(f'Server ID: {pref["TW_SERVER_ID"]}')


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Decode Player preferences XML file')
    parser.add_argument('-i', '--input', help='Input XML file', required=True)
    args = parser.parse_args()
    main(args)
