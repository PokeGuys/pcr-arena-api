import { Inject } from '@nestjs/common';
import { PRICONNE_MODULE_OPTIONS } from './priconne.constants';

export const InjectPriconneConfig = () => Inject(PRICONNE_MODULE_OPTIONS);
