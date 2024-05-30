import Sequelize from 'sequelize';

const sequelize = new Sequelize('exe201', 'postgres', 'Hieu15402', {
    host: 'hieu.postgres.database.azure.com',
    port: 5432,
    dialect: 'postgres',
    dialectOptions: {
        ssl: true
    }
});

export default sequelize;
