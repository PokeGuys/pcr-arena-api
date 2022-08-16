import { registerDecorator, ValidationOptions } from 'class-validator';

export const isValidPlayerId = (id: number): boolean => {
  return id >= 100000000 && id <= 999999999;
};

export function IsValidPlayerId(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return (object: Object, propertyName: string) => {
    registerDecorator({
      name: 'isValidPlayerId',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: number) {
          return isValidPlayerId(value);
        },
        defaultMessage() {
          return 'The value must be a valid player id';
        },
      },
    });
  };
}
