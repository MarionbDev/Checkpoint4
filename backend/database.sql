-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: drawing_and_co
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `comment` text NOT NULL,
  `drawing_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `dateTime` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `FK_comment_drawing` (`drawing_id`),
  KEY `FK_comment_user` (`user_id`),
  CONSTRAINT `FK_comment_drawing` FOREIGN KEY (`drawing_id`) REFERENCES `drawing` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_comment_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (5,'lorem ipsum',53,2, '2023-08-02 12:00:00'),(31,'Bravoooo !!!!',28,2, '2023-08-02 12:00:00'),(32,'Magnifique !!!',28,4, '2023-08-02 12:00:00'),(36,'coucou!',39,2, '2023-08-02 12:00:00'),(84,'ok',24,2, '2023-08-02 12:00:00');
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `drawing`
--

DROP TABLE IF EXISTS `drawing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `drawing` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(150) NOT NULL,
  `description` text,
  `image` varchar(255) NOT NULL,
  `user_id` int DEFAULT NULL,
  `count_likes` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `FK_drawing_user` (`user_id`),
  CONSTRAINT `FK_drawing_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `drawing`
--

LOCK TABLES `drawing` WRITE;
/*!40000 ALTER TABLE `drawing` DISABLE KEYS */;
INSERT INTO `drawing` VALUES (24,'La Reine des Neiges','','1689870237874-drawing-2017-08-30 22.47.35.jpg',NULL,0),(25,'Papi et son petit-fils','','1689870293302-drawing-2018-04-28 22.18.06.jpg',NULL,0),(26,'Sam','','1689870955221-drawing-2017-11-26 19.33.20.jpg',NULL,0),(28,'\" Les joyeux lutins\"','','1689871556347-drawing-2018-07-05 20.12.51.jpg',NULL,0),(29,'\" Créatif \"','','1689871843058-drawing-20170907_211432-1.jpg',NULL,0),(31,'Giraffe','','1689872645852-drawing-20170915_195259-1.jpg',NULL,0),(32,'Singe','','1689872901241-drawing-Singe.jpg',NULL,0),(33,'\"La famille dans la peau\"','','1689874075315-drawing-20170903_225505-1-1.jpg',NULL,0),(34,'Family','','1689883976708-drawing-20170907_211432-1.jpg',NULL,0),(35,'Bambin','','1689884034928-drawing-20190610_162847.jpg',NULL,0),(37,'Cheval','','1689884556586-drawing-20171228_233149.jpg',NULL,0),(38,'Fratrie','','1689884596720-drawing-20181213_104316-1.jpg',NULL,0),(39,'Baby','','1689884653819-drawing-2017-08-30 22.46.08.jpg',NULL,0),(40,'Père-Fille','','1689884781984-drawing-20171218_201755.jpg',NULL,0),(41,'Princesse','','1689884855079-drawing-Princesse.jpg',NULL,0),(42,'Motard','','1689885044501-drawing-received_10213249048815039-1.jpg',NULL,0),(44,'\"Johnny\"','','1689885233048-drawing-Johnny.jpg',NULL,0),(45,'\"Heureux\"','','1689885311179-drawing-2018-10-09 20.04.34.jpg',NULL,0),(46,'\"Les Mariés\"','','1689885349384-drawing-20221226_133527.jpg',NULL,0),(48,'Papi et sa petite-fille','','1689895648986-drawing-20211210_185749.jpg',NULL,0),(49,'Les cousins','','1689895950622-drawing-Les cousins.jpg',NULL,0);
/*!40000 ALTER TABLE `drawing` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(80) NOT NULL,
  `lastname` varchar(80) NOT NULL,
  `mail` varchar(255) NOT NULL,
  `hashedPassword` varchar(255) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `about` text,
  `role` enum('user','admin') NOT NULL DEFAULT 'user',
  `pseudo` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Gaston','Gribouille','gaston@gmail.com','$argon2id$v=19$m=65536,t=5,p=1$tAE4S2qk+nzVWIcL6X/f0Q$3F489sofqdnsxS83ubeN8q1vBvv3GLrx6WHLtbHSxzU','https://blog.foto24.com/wp-content/uploads/2019/02/4-684x1024.jpg ',NULL,'user','GastBou'),(2,'Marion','Baston','marionbaston84@gmail.com','$argon2id$v=19$m=65536,t=5,p=1$NR3/aShujiE+X2s8Qb7GSA$MbGSmc/BJ7wIsMLONbhE8Y2fY3u6k8DLBpUbIIsD55Y', NULL,'Une passionnée de dessin !!! ','admin','marion'),(4,'Jane','Smith','janesmith@gmail.com','$argon2id$v=19$m=65536,t=5,p=1$/jt5pBWY+8I3v5mNQABJDA$s+leXc6gX3TaXElSMRM3XWs9HWXiPS2gpSG/0GgjAY0', NULL,'Lorem Ipsum','user','Jane\'SSSS'),(63,'Tom','Jerry','tom@free.com','$argon2id$v=19$m=65536,t=5,p=1$l1ZrlsC3g1vvp0A6QUt+8Q$lV78e5CYW/vdxtP8lDjrp7vOhDIRk3rJhK9QCV0Wk7U',NULL,'Ou est Jerry ???!!!','user','Tommy');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-27 12:29:07
