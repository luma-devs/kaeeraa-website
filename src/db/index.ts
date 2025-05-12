import { drizzle } from 'drizzle-orm/neon-http';

const database = drizzle(process.env.NEON_DATABASE_URL!);

export default database;