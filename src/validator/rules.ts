export type RulesType =
  | "REQUIRED_STRING"
  | "REQUIRED_NUMBER"
  | "REQUIRED_BOOLEAN"
  | "REQUIRED_DATE"
  | "EMAIL_VALUE"
  | "PHONE_VALUE"
  | "PASSWORD_VALUE"
  | "MAX_LENGTH"
  | "MIN_LENGTH"
  | "PAST_DATE"
  | "MIN_VALUE"
  | "MAX_VALUE";
export type RuleObjectType = (val?: any) => {
  type: RulesType;
  validatorValue?: any;
};

export const requiredString: RulesType = "REQUIRED_STRING";
export const requiredNumber: RulesType = "REQUIRED_NUMBER";
export const requiredBoolean: RulesType = "REQUIRED_BOOLEAN";
export const requiredDate: RulesType = "REQUIRED_DATE";
export const minValue: RulesType = "MIN_VALUE";
export const maxValue: RulesType = "MAX_VALUE";
export const emailValue: RulesType = "EMAIL_VALUE";
export const phoneValue: RulesType = "PHONE_VALUE";
export const passwordValue: RulesType = "PASSWORD_VALUE";
export const maxLength: RulesType = "MAX_LENGTH";
export const minLength: RulesType = "MIN_LENGTH";
export const pastDate: RulesType = "PAST_DATE";

export const requiredStringValidator: RuleObjectType = () => ({
  type: requiredString,
});
export const requiredNumberValidator: RuleObjectType = () => ({
  type: requiredNumber,
});
export const requiredBooleanValidator: RuleObjectType = () => ({
  type: requiredBoolean,
});
export const requiredDateValidator: RuleObjectType = () => ({
  type: requiredDate,
});
export const minValidator: RuleObjectType = (min: number) => ({
  type: minValue,
  validatorValue: min,
});
export const maxValidator: RuleObjectType = (max: number) => ({
  type: maxValue,
  validatorValue: max,
});
export const emailValidator: RuleObjectType = () => ({ type: emailValue });
export const phoneValidator: RuleObjectType = () => ({ type: phoneValue });
export const passwordValidator: RuleObjectType = () => ({
  type: passwordValue,
});
export const maxLengthValidator: RuleObjectType = (max: number) => ({
  type: maxLength,
  validatorValue: max,
});
export const minLengthValidator: RuleObjectType = (min: number) => ({
  type: minLength,
  validatorValue: min,
});
export const pastDateValidator: RuleObjectType = () => ({ type: pastDate });
