-- CREATE DATABASE chatterbox;

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
  `id` INTEGER (10) AUTO_INCREMENT,
  `room` TEXT (10),
  `username` TEXT (10),
  `message` TEXT(254),
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Rooms'
-- hi
-- ---

DROP TABLE IF EXISTS `Rooms`;
    
CREATE TABLE `Rooms` (
  `id` INTEGER AUTO_INCREMENT,
  `roomName` TEXT(50),
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Users'
-- 
-- ---

DROP TABLE IF EXISTS `Users`;
    
CREATE TABLE `Users` (
  `id` INTEGER AUTO_INCREMENT,
  `username` TEXT(50),
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys 
-- ---

ALTER TABLE `Messages` ADD FOREIGN KEY (room) REFERENCES `Rooms` (`id`);
ALTER TABLE `Messages` ADD FOREIGN KEY (username) REFERENCES `Users` (`id`);

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