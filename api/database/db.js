require('dotenv').config();
const { Sequelize } = require('sequelize');

//conexion con la base de datos
const {
    DB_USER, DB_PASSWORD, DB_HOST, DB_NAME
} = process.env;
const sequelize = new Sequelize({
    database: DB_NAME,
    username: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
    port: 5432,
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false // <<<<<<< YOU NEED THIS
        }
    },
});

//creando modelo de empleados
const Empleados = sequelize.define('empleados', {
    primer_apellido: {
        type: Sequelize.STRING(20),
        allowNull: false,
    },
    segundo_apellido: {
        type: Sequelize.STRING(20),
        allowNull: false,
    },
    primer_nombre: {
        type: Sequelize.STRING(20),
        allowNull: false,
    },
    otros_nombres: {
        type: Sequelize.STRING(50),
        allowNull: true,
    },
    pais: {
        type: Sequelize.ENUM,
        values: ['Colombia', 'Estados Unidos'],
        allowNull: false,
    },
    tipo_dni: {
        type: Sequelize.ENUM,
        values: ['Cedula de Ciudadania', 'Cedula de Extranjeria', 'Pasaporte', 'Permiso Especial'],
        allowNull: false,
    },
    dni: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true,
    },
    email: {
        type: Sequelize.STRING(300),
        allowNull: false,
        unique: true,
    },
    fecha_ingreso: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    area: {
        type: Sequelize.ENUM,
        values: ['Administracion', 'Financiera', 'Compras', 'Infraestructura', 'Operacion', 'Talento Humano', 'Servicios Varios'],
        allowNull: false,
    },
});

module.exports = {
    Empleados,
    conn: sequelize,
};