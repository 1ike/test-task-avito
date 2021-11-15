import { Injectable } from '@nestjs/common';
import { ValidationEntities, schemas } from './schemas';

@Injectable()
export class ValidationService {
  validateEntity(entity, name = ValidationEntities.Story) {
    if (!Boolean(entity)) return false;

    return !Boolean(schemas[name].validate(entity).error);
  }
}
