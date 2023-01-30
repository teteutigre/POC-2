import dotenv from "dotenv";
import pg from "pg";
import pkg from "@prisma/client";

dotenv.config();

// Postgres Client
const { Pool } = pg;

export const connection = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export function connectDb(): void {
  prisma;
}

// Prisma Client
const { PrismaClient } = pkg;

export const prisma = new PrismaClient();

export default prisma;
