import { Rule } from "./../../app/rules/rules.types";
import Validator from "validatorjs";

// Iterate over rules to register them to the validator
export const initCustomValidators = (customRules: Rule[]) => {
  for (const customRule of customRules) {
    const { name, rule, asyncRule, message } = customRule;
    // For Sync rules
    if (rule) {
      Validator.register(name, rule, message);
    }
    // For Async rules
    if (asyncRule) {
      Validator.registerAsync(name, asyncRule, message);
    }
  }
};
