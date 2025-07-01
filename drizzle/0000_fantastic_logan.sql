CREATE TABLE "shortener" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "shortener_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"short_token" varchar(255) NOT NULL,
	"original_url" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
