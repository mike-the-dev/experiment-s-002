/**
 * @description Local error handler for the deposits feature.
 * 
 * NOTE: A global error handler exists at @/services/api.ts (handleRequest function).
 * 
 * Decision pattern for error handling:
 * - Use global handleRequest (@/services/api.ts) for simple, generic error handling
 * - Use local error handlers (like this module) for typed error codes when needed
 * 
 * For deposits, we use the global handleRequest from @/services/api.ts
 */

