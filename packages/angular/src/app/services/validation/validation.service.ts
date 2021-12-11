import { Injectable } from '@angular/core';
import { validateSync } from 'class-validator';

import {
  schemas,
  ValidationEntities,
} from './schemas';


new schemas.Story();
new schemas.Comment();

console.log('validateSync(markedEntity) = ', validateSync(
  Object.assign(  {
    'by': 'mfiguiere',
    'descendants': 0,
    'id': 28723527,
    'score': 2,
    'time': 1633123400000,
    'title': 'Who Gains and Who Loses from Credit Card Payments?',
    'type': 'story',
    'url': 'https://www.bostonfed.org/publications/public-policy-discussion-paper/2010/who-gains-and-who-loses-from-credit-card-payments-theory-and-calibrations.aspx',
  }, { constructor: schemas.Story })));

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  validateEntity<T>(entity: T, name: ValidationEntities) {
    if (!Boolean(entity)) return false;

    const markedEntity = Object.assign(entity, { constructor: schemas[name] });

    return !Boolean(validateSync(markedEntity).length);
  }
}
