const Joi = require("joi");

// 包含註冊跟登入
const authValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(50).required().email(),
    password: Joi.string().min(6).max(100).required(),
  });

  return schema.validate(data);
};

const jobPostValidation = (data) => {
  const schema = Joi.object({
    companyId: Joi.string().required(),
    jobname: Joi.string().min(1).max(50).required(),
    level: Joi.string().min(1).max(50).required(),
    seniority: Joi.number().min(0).max(20).required(),
    curseniority: Joi.number().min(0).max(20).required(),
    monthwage: Joi.number().min(2.6).max(100).required(),
    yearwage: Joi.number().min(30).max(2000).required(),
    workhour: Joi.number().min(4).max(24).required(),
    addworkhour: Joi.number().min(0).max(20).required(),
    easy: Joi.number().min(1).max(5).required(),
    loading: Joi.number().min(1).max(5).required(),
    environ: Joi.number().min(1).max(5).required(),
    satisfaction: Joi.number().min(1).max(5).required(),
    experience: Joi.string().min(1).max(10000).required(),
    oneword: Joi.string().min(1).max(50).required(),
  });

  return schema.validate(data);
};

const meetPostValidation = (data) => {
  const schema = Joi.object({
    companyId: Joi.string().required(),
    jobname: Joi.string().min(1).max(50).required(),
    seniority: Joi.number().min(0).max(20).required(),
    yearwage: Joi.number().min(30).max(2000).allow(null),
    satisfaction: Joi.number().min(1).max(5).required(),
    experience: Joi.string().min(1).max(10000).required(),
    oneword: Joi.string().min(1).max(50).required(),
  });

  return schema.validate(data);
};

const companyPostValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(1).max(100).required(),
    url: Joi.string()
      .min(1)
      .max(200)
      .pattern(/^https:\/\/www\.104\.com\.tw\/company\//)
      .required(),
  });

  return schema.validate(data);
};

module.exports.authValidation = authValidation;
module.exports.jobPostValidation = jobPostValidation;
module.exports.meetPostValidation = meetPostValidation;
module.exports.companyPostValidation = companyPostValidation;
