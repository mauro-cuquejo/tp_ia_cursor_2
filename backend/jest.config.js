module.exports = {
    // Entorno de pruebas
    testEnvironment: 'node',

    // Directorios donde buscar tests
    testMatch: [
        '**/__tests__/**/*.js',
        '**/?(*.)+(spec|test).js'
    ],

    // Directorios a ignorar
    testPathIgnorePatterns: [
        '/node_modules/',
        '/coverage/'
    ],

    // Configuración de cobertura
    collectCoverageFrom: [
        'routes/**/*.js',
        'config/**/*.js',
        'database.js',
        '!**/node_modules/**',
        '!**/coverage/**'
    ],

    // Configuración de coverage
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'lcov', 'html'],

    // Setup y teardown
    setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],

    // Timeout para tests
    testTimeout: 10000,

    // Configuración de verbose
    verbose: true,

    // Configuración de forceExit para cerrar el proceso después de los tests
    forceExit: true,

    // Configuración de clearMocks
    clearMocks: true,

    // Configuración de restoreMocks
    restoreMocks: true
};