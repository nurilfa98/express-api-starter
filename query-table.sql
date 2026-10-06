CREATE TABLE users (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    email VARCHAR(150) NOT NULL UNIQUE,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('superadmin', 'user') DEFAULT 'user',
    isActive BOOLEAN DEFAULT TRUE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    INDEX idxEmail (email),
    INDEX idxUsername (username)
);

CREATE TABLE user_sessions (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()), -- UUID v4
    userId CHAR(36) NOT NULL, -- Disesuaikan dengan tipe data users.id
    deviceId VARCHAR(255) NOT NULL,
    deviceName VARCHAR(100) NULL, -- Contoh: "iPhone 13", "Chrome / Windows"
    refreshToken TEXT NOT NULL,
    ipAddress VARCHAR(45) NULL,
    isActive BOOLEAN DEFAULT TRUE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idxUserDevice (userId, deviceId),
    INDEX idxActiveSession (userId, isActive)
);