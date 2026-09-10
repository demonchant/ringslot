import 'dotenv/config';
import { readFile } from 'node:fs/promises';
import pool from '../src/config/database.js';

try {
  const schemaUrl = new URL('../schema.sql', import.meta.url);
  const schema = await readFile(schemaUrl, 'utf8');
  await pool.query(schema);
  console.log('Database schema applied successfully.');
} catch (error) {
  console.error('Database migration failed:', error.message);
  process.exitCode = 1;
} finally {
  await pool.end();
}
