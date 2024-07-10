import { NextFunction, Request, Response } from "express";

export default async (request:Request, response: Response, next: NextFunction) => {
    console.log(`Origin: ${request.headers.origin}`)

    next()
}
