CREATE DATABASE WebGameDB;

USE WebGameDB;

CREATE TABLE Users (
    user_id INT PRIMARY KEY IDENTITY(1,1),
    user_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    avatar VARCHAR(255),
    date_of_birth TIMESTAMP,
    is_admin BIT DEFAULT 0,
    country VARCHAR(255),
    bio TEXT
);
CREATE TABLE Game (
    game_id INT PRIMARY KEY IDENTITY(1,1),
    game_name VARCHAR(255) NOT NULL,
    developer VARCHAR(255),
    title VARCHAR(255),
    description TEXT,
    url VARCHAR(255),
    release_date DATE,
    play_count INT DEFAULT 0,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE(),
    languages VARCHAR(255),
    players VARCHAR(255),
    mobile_compatible VARCHAR(50)
);

CREATE TABLE Review (
    review_id INT PRIMARY KEY IDENTITY(1,1),
    user_id INT FOREIGN KEY REFERENCES Users(user_id),
    game_id INT FOREIGN KEY REFERENCES Game(game_id),
    rating FLOAT,
    comment TEXT,
    created_at DATETIME DEFAULT GETDATE()
);
CREATE TABLE user_game (
    user_game_id INT PRIMARY KEY IDENTITY(1,1),
    game_id INT FOREIGN KEY REFERENCES Game(game_id),
    user_id INT FOREIGN KEY REFERENCES Users(user_id),
    last_log DATE
);
CREATE TABLE Genres (
    genres_id INT PRIMARY KEY IDENTITY(1,1),
    game_id INT FOREIGN KEY REFERENCES Game(game_id),
    type VARCHAR(255)
);
CREATE TABLE tag (
    tag_id INT PRIMARY KEY IDENTITY(1,1),
    game_id INT FOREIGN KEY REFERENCES Game(game_id),
    type VARCHAR(255)
);
