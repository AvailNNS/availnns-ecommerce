import { ZodType} from "zod";
import { Request, Response, NextFunction } from "express";

const validate =
  (schema: ZodType) =>
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });

      next();
    } catch (error: any) {
      res.status(400).json({
        success: false,
        errors: error.errors,
      });
    }
  };

export default validate;