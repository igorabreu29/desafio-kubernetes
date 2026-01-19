import { Inject, Injectable, Logger } from '@nestjs/common';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { DrizzleAsyncProvider } from './db/drizzle.service';
import { schema } from './db/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class AppService {
  private logger = new Logger(AppService.name)

	constructor(
		@Inject(DrizzleAsyncProvider)
		private db: PostgresJsDatabase<typeof schema>
	) {}

	getHello(): string {
		return 'Hello World!';
	}

	async getUsers() {
		const users = this.db.select().from(schema.users);
		return users;
  }

  async insert() {
    const data = [
      {
        email: "john@doe.com",
        name: "Jonas"
      },
      {
        email: "jonas@dev.com",
        name: "Dev"
      }
    ]

    for await (const user of data) {
      const userWithSameEmail = await this.db.select().from(schema.users).where(eq(schema.users.email, user.email))
      if (userWithSameEmail) {
        this.logger.error('User already exists')
        continue
      }

      await this.db.insert(schema.users).values(user)
    }

    this.logger.log('Users inserted with success!')
	}
}
