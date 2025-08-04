const fs = require('fs');
const path = require('path');
const { runQuery, getQuery, allQuery } = require('../../database');

class TestDatabase {
    constructor() {
        this.dbPath = process.env.DB_PATH || path.join(__dirname, '../../test-database.sqlite');
    }

    // Inicializar base de datos de test
    async init() {
        // Crear tabla de usuarios si no existe
        await runQuery(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    }

    // Limpiar base de datos
    async clean() {
        await runQuery('DELETE FROM users');
    }

    // Crear usuario de prueba
    async createTestUser(email, password) {
        const bcrypt = require('bcryptjs');
        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await runQuery(
            'INSERT INTO users (email, password) VALUES (?, ?)',
            [email, hashedPassword]
        );

        return result.id;
    }

    // Obtener usuario por email
    async getUserByEmail(email) {
        return await getQuery('SELECT * FROM users WHERE email = ?', [email]);
    }

    // Verificar si existe un usuario
    async userExists(email) {
        const user = await this.getUserByEmail(email);
        return !!user;
    }

    // Obtener todos los usuarios
    async getAllUsers() {
        return await allQuery('SELECT id, email, created_at FROM users');
    }

    // Eliminar base de datos de test
    async destroy() {
        try {
            if (fs.existsSync(this.dbPath)) {
                fs.unlinkSync(this.dbPath);
            }
        } catch (error) {
            console.error('Error eliminando base de datos de test:', error);
        }
    }
}

module.exports = TestDatabase;