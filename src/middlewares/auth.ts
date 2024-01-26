import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../exceptions/unauthorized";
import { ErrorCode } from "../exceptions/root";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { prismaClient } from "..";
import { User } from "@prisma/client";
import { AuthenticatedRequest, CustomHeaders } from "../types/auth";

const authMiddleware = async (req: AuthenticatedRequest , res: Response, next: NextFunction) => {
  const headers = req.headers as CustomHeaders; // Use type assertion here

  const token = headers.authorization;

  if (!token) {
    next(new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED));
  }

  try {
    const payload = jwt.verify(token as any, JWT_SECRET) as any;

    const user = await prismaClient.user.findFirst({ where: { id: payload.userId } });

    if (!user) {
      next(new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED));
    }

    req.user = user;
    next();
  } catch (error) {
    next(new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED));
  }
};

export default authMiddleware;
