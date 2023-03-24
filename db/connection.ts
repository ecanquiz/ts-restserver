import { Sequelize } from 'sequelize';

const db = new Sequelize(
    'ts_restserver_db',
    'postgres',
    '12345678',
    {
        host: process.env.DB_HOST1, //'192.168.176.1', //192.168.160.1
        dialect: 'postgres',
        // logging: false,
    }
);

export default db;
