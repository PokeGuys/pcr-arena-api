import { applyDecorators } from '@nestjs/common';
import { ApiNotFoundResponse } from '@nestjs/swagger';
import { EntityNotFoundException } from '@common/exceptions';
import { ENTITY_NOT_FOUND_ERROR_DESCRIPTION } from '@common/constants/swagger.constants';

export const ApiEntityNotFound = () => {
  return applyDecorators(
    ApiNotFoundResponse({
      description: ENTITY_NOT_FOUND_ERROR_DESCRIPTION,
      type: EntityNotFoundException,
    }),
  );
};
