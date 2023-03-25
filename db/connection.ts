import { Sequelize } from 'sequelize';

const db = new Sequelize(
    'ts_restserver_db',
    'postgres',
    '12345678',
    {
        host: process.env.DB_HOST,
        dialect: 'postgres',
        // logging: false,
    }
);

export default db;
