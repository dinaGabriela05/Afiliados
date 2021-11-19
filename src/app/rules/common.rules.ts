import { validateDocument } from "./../../utils/common/common.utils";
import moment from "moment";
import { Rule } from "./rules.types";
// import advanceTimersByTime = jest.advanceTimersByTime;
// import advanceTimersToNextTimer = jest.advanceTimersToNextTimer;
// import GlobalRepository from "../repositories/Global.repository";

export const commonRules: Rule[] = [
  {
    name: "minAge",
    rule: (value: any, requirement: any, attribute: any) => {
      const birthdate = moment(value, "YYYY-MM-DD");
      const today = moment();
      const validMinAge = today.subtract(requirement, "years");

      return birthdate <= validMinAge;
    },
    message: "La edad máxima permitida es :maxAge años de edad"
  },
  {
    name: "maxAge",
    rule: (value: any, requirement: any, attribute: any) => {
      const birthdate = moment(value, "YYYY-MM-DD");
      const today = moment();
      const validMaxAge = today.subtract(requirement, "years");

      return birthdate >= validMaxAge;
    },
    message: "La edad máxima permitida es :maxAge años de edad"
  },
  {
    name: "document",
    rule: (value: any, requirement: any, attribute: any) => {
      return validateDocument(value, requirement);
    },
    message: "El campo :attribute debe ser un documento válido"
  },
  {
    name: "validJson",
    rule: (value: any, requirement: any, attribute: any) => {
      return typeof value === "object";
    },
    message: "El campo :attribute debe tener un formato JSON válido"
  },
  {
    name: "unique",
    asyncRule: async (
      value: any,
      requirements: any,
      attribute: any,
      passes
    ) => {
      // const requirementsArray = requirements.split(",");
      // const globalRepository = getCustomRepository(GlobalRepository);
      // const attributeSplit = attribute.split(".");
      // const dbAttribute = attributeSplit[attributeSplit.length - 1];
      // const exists = await globalRepository.exists(
      //   requirementsArray[0],
      //   dbAttribute,
      //   value,
      //   requirementsArray[1] || null,
      //   requirementsArray[2] || null
      // );
      // if (!exists) {
      //   passes();
      // } else {
      //   passes(false);
      // }
    },
    message: "El :attribute ingresado ya existe"
  }
];
