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
    } catch (error:any) {

  console.log("VALIDATION FULL ERROR:");
  console.log(error);

  res.status(400).json({
    success:false,
    errors:error.issues || error.message,
  });

}
  };

export default validate;