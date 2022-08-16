import { ValidationError, ValidationError as ValidationErrorType } from 'class-validator';
import { Type } from '@nestjs/common';

export const isBasicType = (metaType: Type<unknown>): boolean => {
  const types: Type<unknown>[] = [String, Boolean, Number, Array, Object];
  return !types.includes(metaType);
};

const normalizeError = (error: ValidationError): Array<string> =>
  error.constraints
    ? Object.values(error.constraints)
    : (error.children ?? []).flatMap(normalizeError);

export const extractValidateMessage = (errors: ValidationErrorType[]): string[] =>
  Array.from(new Set(errors.flatMap(normalizeError)));
