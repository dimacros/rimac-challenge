import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema';
import type { DrizzleConfig } from 'drizzle-orm';
import type { PoolConfig } from 'pg';

export type DbClient = ReturnType<typeof createDbClient>;

export function createDbClient(config: DrizzleConfig<typeof schema> & {
  connection: string | PoolConfig
}) {
  return drizzle(config);
}