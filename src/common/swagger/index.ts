import {
  SWAGGER_API_CURRENT_VERSION,
  SWAGGER_API_DESCRIPTION,
  SWAGGER_API_NAME,
  SWAGGER_API_ROOT,
} from '@common/constants/swagger.constants';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const createSwaggerDocument = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle(SWAGGER_API_NAME)
    .setDescription(SWAGGER_API_DESCRIPTION)
    .setVersion(SWAGGER_API_CURRENT_VERSION)
    .addBearerAuth()
    .build();
  return SwaggerModule.createDocument(app, config);
};

export const setupSwagger = (app: INestApplication) => {
  SwaggerModule.setup(SWAGGER_API_ROOT, app, createSwaggerDocument(app));
};
