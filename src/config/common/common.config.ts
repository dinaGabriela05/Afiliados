// Common server configurations
import { Express } from "express";
import bodyParser from "body-parser";
import dotenvFlow from "dotenv-flow";
import { connectDB } from "../db/mongoose";
import { initCustomValidators } from "../validators/validators.config";
import rules from "../../app/rules/index.rules";


export const applyConfig = (app: Express) => {
  // Activate dotenv .env files herarchy
  dotenvFlow.config();

   

  // Connect to the DB
  connectDB();
  // Disable the express header
  app.disable("x-powered-by");
  app.use(bodyParser.urlencoded({limit: '200mb', extended: true }));
  app.use(bodyParser.json({limit: '200mb'}));
  // Init custom validators to be available
  initCustomValidators(rules);
};
