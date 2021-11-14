import { Injectable } from '@nestjs/common';
import * as Joi from 'joi';

const baseIdSchema = Joi.number().integer();
const baseEntitySchema = Joi.object({
  id: baseIdSchema.required(),
  by: Joi.string().required(),
  time: Joi.date().timestamp('javascript').required(),
  kids: Joi.array().items(Joi.number().integer()),
  deleted: Joi.boolean(),
});

const storySchema = baseEntitySchema
  .append({
    title: Joi.string().required(),
    score: Joi.number().integer(),
    url: Joi.string().uri(),
    text: Joi.string(),
  })
  .xor('url', 'text');

const commentSchema = baseEntitySchema.append({
  text: Joi.string().required(),
  parent: baseIdSchema,
});

enum ValidationEntities {
  Story = 'Story',
  Comment = 'Comment',
}

const schemas = {
  [ValidationEntities.Story]: storySchema,
  [ValidationEntities.Comment]: commentSchema,
};

@Injectable()
export class ValidationService {
  validateEntity(entity, name = ValidationEntities.Story) {
    if (!Boolean(entity)) return false;

    return schemas[name].validate(entity);
  }
}
