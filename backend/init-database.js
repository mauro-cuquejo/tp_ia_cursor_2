const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Crear conexión a la base de datos
const dbPath = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

console.log('🗄️  Inicializando base de datos SQLite...');

// Crear tabla de usuarios
const createUsersTable = `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`;

db.run(createUsersTable, (err) => {
    if (err) {
        console.error('❌ Error creando tabla users:', err.message);
    } else {
        console.log('✅ Tabla users creada exitosamente');

        // Crear índice para email
        db.run('CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)', (err) => {
            if (err) {
                console.error('❌ Error creando índice:', err.message);
            } else {
                console.log('✅ Índice en email creado exitosamente');
            }

            // Verificar que la tabla se creó correctamente
            db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='users'", (err, row) => {
                if (err) {
                    console.error('❌ Error verificando tabla:', err.message);
                } else if (row) {
                    console.log('✅ Base de datos inicializada correctamente');
                    console.log('📁 Ubicación:', dbPath);
                } else {
                    console.error('❌ La tabla users no se creó correctamente');
                }

                // Cerrar conexión
                db.close((err) => {
                    if (err) {
                        console.error('❌ Error cerrando base de datos:', err.message);
                    } else {
                        console.log('🔒 Conexión a base de datos cerrada');
                    }
                });
            });
        });
    }
});