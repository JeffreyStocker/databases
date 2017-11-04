-- CREATE DATABASE chat;

USE chat;

-- CREATE TABLE messages (
--    Describe your table here.
-- );

/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/
-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'Messages'
-- hi
-- ---

DROP TABLE IF EXISTS `Messages`;
    
CREATE TABLE `Messages` (
  `objectId` INTEGER AUTO_INCREMENT,
  `room` INTEGER (100),
  `username` INTEGER (50),
  `text` TEXT(1000),
  `createdAt` TEXT(30),
  PRIMARY KEY (`objectId`)
);

-- CREATE TABLE `Messages` (
--   `MessageId` INTEGER AUTO_INCREMENT,
--   `room` INTEGER (100),
--   `username` INTEGER (50),
--   `message` TEXT(1000),
--   PRIMARY KEY (`MessageId`)
-- );

-- ---
-- Table 'Rooms'
-- hi
-- ---

DROP TABLE IF EXISTS `Rooms`;
    
CREATE TABLE `Rooms` (
  `roomId` INTEGER AUTO_INCREMENT,
  `roomname` TEXT(50),
  PRIMARY KEY (`roomId`)
);

-- ---
-- Table 'Users'
-- 
-- ---

DROP TABLE IF EXISTS `Users`;
    
CREATE TABLE `Users` (
  `userId` INTEGER AUTO_INCREMENT,
  `username` VARCHAR(50) NULL DEFAULT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE KEY (`username`)
);


-- ---
-- Foreign Keys 
-- ---

ALTER TABLE `Messages` ADD FOREIGN KEY (room) REFERENCES `Rooms` (`roomId`);
ALTER TABLE `Messages` ADD FOREIGN KEY (username) REFERENCES `Users` (`userId`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `Messages` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Rooms` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `Messages` (`id`,`room`,`username`,`message`) VALUES
-- ('','','','');
-- INSERT INTO `Rooms` (`id`,`roomName`) VALUES
-- ('','');
-- INSERT INTO `Users` (`id`,`username`) VALUES
-- ('','');