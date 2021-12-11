import { Injectable } from '@angular/core';
import { validateSync } from 'class-validator';

import {
  schemas,
  EntityNames,
} from './schemas';


new schemas.Story();
new schemas.Comment();


@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  validateEntity<T>(entity: T, name: EntityNames ) {
    if (!Boolean(entity)) return false;

    const markedEntity = Object.assign(entity, { constructor: schemas[name] });

    return !Boolean(validateSync(markedEntity).length);
  }
}
