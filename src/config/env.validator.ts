import { plainToClass } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPort,
  IsString,
  validateSync,
} from 'class-validator';
import { AppEnvironment } from '@common/enums';

class EnvironmentVariables {
  @IsNumber()
  @IsOptional()
  public readonly PORT?: number;

  @IsBoolean()
  @IsOptional()
  public readonly DEBUG?: boolean;

  @IsEnum(AppEnvironment)
  @IsNotEmpty()
  public readonly APP_ENV!: AppEnvironment;

  @IsString()
  @IsNotEmpty()
  public readonly API_KEY!: string;

  @IsString()
  @IsNotEmpty()
  public readonly APP_NAME!: string;

  @IsString()
  @IsNotEmpty()
  public readonly APP_HOST!: string;

  @IsString()
  @IsOptional()
  public readonly APP_PREFIX?: string;

  @IsString()
  @IsNotEmpty()
  public readonly DB_HOST!: string;

  @IsPort()
  @IsOptional()
  public readonly DB_PORT?: string;

  @IsString()
  @IsNotEmpty()
  public readonly DB_USERNAME!: string;

  @IsString()
  @IsNotEmpty()
  public readonly DB_PASSWORD!: string;

  @IsString()
  @IsNotEmpty()
  public readonly DB_DATABASE!: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, { skipMissingProperties: false });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
