CREATE DATABASE IF NOT EXISTS healthtrack_db;
USE healthtrack_db;

-- Users table
CREATE TABLE IF NOT EXISTS user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(80) UNIQUE NOT NULL,
    password_hash VARCHAR(128)
);

-- Clients table
CREATE TABLE IF NOT EXISTS client (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
);

-- Programs table
CREATE TABLE IF NOT EXISTS program (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Association table for clients and programs
CREATE TABLE IF NOT EXISTS client_program (
    client_id INT,
    program_id INT,
    FOREIGN KEY (client_id) REFERENCES client(id),
    FOREIGN KEY (program_id) REFERENCES program(id),
    PRIMARY KEY (client_id, program_id)
);