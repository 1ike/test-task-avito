import * as Joi from 'joi';

const baseIdSchema = Joi.number().integer();

const baseEntitySchema = Joi.object({
  id: baseIdSchema.required(),
  by: Joi.string().required(),
  time: Joi.date().timestamp('unix').required(),
  kids: Joi.array().items(Joi.number().integer()),
  deleted: Joi.boolean(),
}).unknown();

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

export enum ValidationEntities {
  Story = 'Story',
  Comment = 'Comment',
}

export const schemas = {
  [ValidationEntities.Story]: storySchema,
  [ValidationEntities.Comment]: commentSchema,
};
