import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

pool.connect()
    .then(client => {
        console.log('Conexión a PostgreSQL exitosa');
        client.release();
    })
    .catch(err => {
        console.error('Error al conectar a PostgreSQL', err);
    });

export default pool;
