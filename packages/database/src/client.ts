import "dotenv/config";
import { drizzle } from "drizzle-orm/mysql2";
import { relations } from "./relations";
import mysql from "mysql2/promise";

const pool = mysql.createPool({
	uri: process.env.DATABASE_URL!,
});

export const db = drizzle({
	connection: { pool },
	relations: {
		...relations,
	},
});

export type Transaction = Parameters<Parameters<typeof db.transaction>[0]>[0];
export type DBLike = typeof db | Transaction;
