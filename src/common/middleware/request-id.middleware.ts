import { IncomingMessage, ServerResponse } from 'http';
import { v4 as uuidv4 } from 'uuid';
import { Injectable, NestMiddleware } from '@nestjs/common';
import {
  CLOUDFLARE_HEADER_NAME,
  CLOUDFRONT_HEADER_NAME,
  REQUEST_ID_HEADER_NAME,
} from '@common/constants/logger.constants';

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  public use(req: IncomingMessage, res: ServerResponse, next: () => void): void {
    // Extract request id from header.
    const requestId =
      req.headers[REQUEST_ID_HEADER_NAME.toLowerCase()] ||
      req.headers[CLOUDFRONT_HEADER_NAME.toLowerCase()] ||
      req.headers[CLOUDFLARE_HEADER_NAME.toLowerCase()] ||
      uuidv4();

    // Set the request id.
    req.headers[REQUEST_ID_HEADER_NAME.toLowerCase()] = requestId;
    res.setHeader(REQUEST_ID_HEADER_NAME, requestId);

    next();
  }
}
