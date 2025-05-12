import { pgTable, varchar } from "drizzle-orm/pg-core";

export const likesTable = pgTable("users", {
    userid: varchar({ length: 255 }).notNull().unique(),
});