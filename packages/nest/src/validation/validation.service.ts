import { Injectable } from '@nestjs/common';

import { schemas, ValidationEntities } from './schemas';

@Injectable()
export class ValidationService {
  validateEntity<T>(entity: T, name: ValidationEntities) {
    if (!Boolean(entity)) return false;

    return !Boolean(schemas[name].validate(entity).error);
  }
}
