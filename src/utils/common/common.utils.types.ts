// Types for common utils
import { Express } from "express";

// Wrapper function that executes a middleware
export type MiddlewareWrapper = (router: Express) => void | Promise<void>;
