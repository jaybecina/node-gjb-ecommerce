import { User } from "@prisma/client";
import { IncomingHttpHeaders } from "http";
import { Request } from 'express'

export interface AuthenticatedRequest extends Request {
    user: User | null; 
}

export interface CustomHeaders extends IncomingHttpHeaders  {
    authorization?: string;
}