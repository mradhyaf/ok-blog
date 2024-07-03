import { Router } from "express";
import { checkSchema } from "express-validator";
import { authStatus, authUser } from "../handlers/auth.js";
import { authUserValidationSchema } from "../middleware/validationSchemas.js";

const router = Router();

router.get("/status", authStatus);

router.post("/", checkSchema(authUserValidationSchema), authUser);

export default router;
