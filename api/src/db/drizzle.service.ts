import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { schema } from './schema';

export const DrizzleAsyncProvider = 'DrizzleAsyncProvider';

export const drizzleProvider = [
	{
		provide: DrizzleAsyncProvider,
		useFactory: async () => {
			const connectionString = process.env.DATABASE_URL;
			if (!connectionString) return;

			return drizzle(connectionString, { schema }) as PostgresJsDatabase<
				typeof schema
			>;
		},
	},
];
