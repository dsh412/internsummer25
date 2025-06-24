import { Pool } from 'pg';

const pool = new Pool({
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    dbname: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
});

export default pool;