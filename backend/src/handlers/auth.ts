import { Request, Response } from "express";
import { matchedData, validationResult } from "express-validator";
import { selectUserByEmail } from "../db/queries/users.js";

export async function authStatus(request: Request, response: Response) {
  const { user } = request.session;

  if (!user) {
    return response
      .status(401)
      .send({ success: false, msg: "Bad credentials: unauthorized" });
  }

  return response.status(200).send({ success: true, user });
}

export async function authUser(request: Request, response: Response) {
  const validationErrors = validationResult(request);

  if (!validationErrors.isEmpty()) {
    return response.status(400).send({ success: false, msg: "Bad request" });
  }

  const { email, password } = matchedData(request);
  const res = await selectUserByEmail(email);

  if (!res) {
    return response
      .status(401)
      .send({ success: false, msg: "Bad credentials: user not found" });
  }

  if (!res || res.password != password) {
    return response
      .status(401)
      .send({ success: false, msg: "Bad credentials: wrong password" });
  }

  request.session.user = { email: res.email };
  return response
    .status(201)
    .send({ success: true, user: request.session.user });
}
