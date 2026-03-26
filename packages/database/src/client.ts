import "dotenv/config";
import { drizzle } from "drizzle-orm/mysql2";
import { relations } from "./relations";
import mysql from "mysql2/promise";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
	throw new Error("DATABASE_URL is not set");
}

const parsedDatabaseUrl = new URL(databaseUrl); // Extract the database connection parameters from the parsed URL
const databaseName = parsedDatabaseUrl.pathname.replace(/^\//, ""); // Remove leading slash from pathname to get the database name
const databaseUser = decodeURIComponent(parsedDatabaseUrl.username || ""); // Decode the username in case it contains special characters
const databasePassword = decodeURIComponent(parsedDatabaseUrl.password || ""); // Decode the password in case it contains special characters
const databasePort = Number(parsedDatabaseUrl.port || "3306"); // Default to 3306 if not specified

// Create a connection pool using the extracted parameters
const pool = mysql.createPool({
	host: parsedDatabaseUrl.hostname,
	port: databasePort,
	user: databaseUser,
	password: databasePassword || undefined,
	database: databaseName,
});

export const db = drizzle({
	client: pool,
	mode: "planetscale",
	relations: relations,
});

export type Transaction = Parameters<Parameters<typeof db.transaction>[0]>[0];
export type DBLike = typeof db | Transaction;
