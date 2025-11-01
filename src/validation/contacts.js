import Joi from "joi";

const namePattern = Joi.string().min(3).max(20);
const phonePattern = Joi.string().min(3).max(20);

export const contactAddSchema = Joi.object({
  name: namePattern.required(),
  phoneNumber: phonePattern.required(),
  email: Joi.string().email(),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'home', 'personal').required(),
});

export const contactPatchSchema = Joi.object({
  name: namePattern,
  phoneNumber: phonePattern,
  email: Joi.string().email(),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'home', 'personal'),
}).min(1);