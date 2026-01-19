import { randomUUID } from 'node:crypto'
import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
	id: uuid()
		.primaryKey()
		.$defaultFn(() => randomUUID()),
	name: varchar({ length: 100 }).notNull(),
	email: varchar({ length: 120 }).notNull().unique(),
})
