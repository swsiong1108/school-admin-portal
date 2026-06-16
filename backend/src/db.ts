import { config } from 'dotenv';
config();

import mysql, { PoolConnection } from "mysql2/promise";


const pool = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "school",
    waitForConnections: true,
    connectionLimit: 10,
})

console.log("DB_PASSWORD at pool creation:", process.env.DB_PASSWORD ? "SET" : "EMPTY/UNDEFINED");

export async function query<T>(sql: string, params?: (string | number | null)[]): Promise<T> {
    const [rows] = await pool.execute(sql, params);

    return rows as T;
}

export async function withTransaction<T>(
  fn: (conn: PoolConnection) => Promise<T>
): Promise<T> {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const result = await fn(conn);
    await conn.commit();
    return result;
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}

export default pool;
