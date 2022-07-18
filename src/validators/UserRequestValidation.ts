import { validationResult } from "express-validator";
import { Response, Request, NextFunction } from "express";


const UserRequestValidation = (req: Request, res: Response, next: NextFunction) => {
  console.log(req)

  const errors =  validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

export default UserRequestValidation