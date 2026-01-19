CREATE TABLE "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"email" varchar(120) NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
