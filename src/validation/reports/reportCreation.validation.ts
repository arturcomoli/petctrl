import { Request, Response, NextFunction } from "express";
import * as yup from "yup";
import { SchemaOf } from "yup";
import AppError from "../../errors/AppError";
import { CreateReportValidation } from "../../interfaces";

export const createOwnerSchema: SchemaOf<CreateReportValidation> = yup
  .object()
  .shape({
    pet_id: yup.string().required(),
    report: yup.string().required(),
  });

export const validateOwnerCreation = (
  schema: SchemaOf<CreateReportValidation>
) => {
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;

      try {
        const validatedData = await schema.validate(data, {
          abortEarly: false,
          stripUnknown: true,
        });

        req.validReport = validatedData;
        next();
      } catch (err: any) {
        throw new AppError(err.errors?.join(", "));
      }
    } catch (err) {
      next(err);
    }
  };
};
