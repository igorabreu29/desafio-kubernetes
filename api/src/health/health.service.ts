import { Inject, Injectable, Logger } from '@nestjs/common';
import { HealthCheckService } from '@nestjs/terminus';
import { sql } from 'drizzle-orm';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { DrizzleAsyncProvider } from 'src/db/drizzle.service';
import { schema } from 'src/db/schema';

@Injectable()
export class HealthService {
	private readonly logger = new Logger(HealthService.name);

	constructor(
		@Inject(DrizzleAsyncProvider)
		private db: PostgresJsDatabase<typeof schema>,
		private healthCheck: HealthCheckService
	) {}

	checkHealth(): string {
		this.logger.log('App is up!');
		return 'OK';
	}

	async checkRead(): Promise<string> {
		this.logger.log('checking if ready...');

		const checkResult = await this.healthCheck.check([
			async () => {
				await this.db.execute(sql`SELECT 1`);
				return {};
			},
		]);

		if (
			checkResult.status === 'error' ||
			checkResult.status === 'shutting_down'
		) {
			throw new Error('Error to the check ready');
		}

		return 'OK';
	}
}
