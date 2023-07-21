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
  `date_time` datetime NOT NULL,
  `drawing_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_comment_drawing` (`drawing_id`),
  KEY `FK_comment_user` (`user_id`),
  CONSTRAINT `FK_comment_drawing` FOREIGN KEY (`drawing_id`) REFERENCES `drawing` (`id`),
  CONSTRAINT `FK_comment_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
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
  PRIMARY KEY (`id`),
  KEY `FK_drawing_user` (`user_id`),
  CONSTRAINT `FK_drawing_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `drawing`
--

LOCK TABLES `drawing` WRITE;
/*!40000 ALTER TABLE `drawing` DISABLE KEYS */;
INSERT INTO `drawing` VALUES (23,'Paris','','1689870088722-drawing-20151114_231058-1.jpg',NULL),(24,'La Reine des Neiges','','1689870237874-drawing-2017-08-30 22.47.35.jpg',NULL),(25,'Papi et son petit-fils','','1689870293302-drawing-2018-04-28 22.18.06.jpg',NULL),(26,'Sam','','1689870955221-drawing-2017-11-26 19.33.20.jpg',NULL),(28,'\" Les joyeux lutins\"','','1689871556347-drawing-2018-07-05 20.12.51.jpg',NULL),(29,'\" Créatif \"','','1689871843058-drawing-20170907_211432-1.jpg',NULL),(31,'Giraffe','','1689872645852-drawing-20170915_195259-1.jpg',NULL),(32,'Singe','','1689872901241-drawing-Singe.jpg',NULL),(33,'\"La famille dans la peau\"','','1689874075315-drawing-20170903_225505-1-1.jpg',NULL);
/*!40000 ALTER TABLE `drawing` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favorite_drawing`
--

DROP TABLE IF EXISTS `favorite_drawing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favorite_drawing` (
  `drawing_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  KEY `FK_favorite_drawing` (`drawing_id`),
  KEY `FK_favorite_user` (`user_id`),
  CONSTRAINT `FK_favorite_drawing` FOREIGN KEY (`drawing_id`) REFERENCES `drawing` (`id`),
  CONSTRAINT `FK_favorite_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorite_drawing`
--

LOCK TABLES `favorite_drawing` WRITE;
/*!40000 ALTER TABLE `favorite_drawing` DISABLE KEYS */;
/*!40000 ALTER TABLE `favorite_drawing` ENABLE KEYS */;
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
  PRIMARY KEY (`id`),
  UNIQUE KEY `mail` (`mail`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Gaston','Gribouille','gaston@gmail.com','$argon2id$v=19$m=65536,t=5,p=1$tAE4S2qk+nzVWIcL6X/f0Q$3F489sofqdnsxS83ubeN8q1vBvv3GLrx6WHLtbHSxzU','https://blog.foto24.com/wp-content/uploads/2019/02/4-684x1024.jpg ',NULL,'user','GastBou'),(2,'Marion','Baston','marionbaston84@gmail.com','$argon2id$v=19$m=65536,t=5,p=1$NR3/aShujiE+X2s8Qb7GSA$MbGSmc/BJ7wIsMLONbhE8Y2fY3u6k8DLBpUbIIsD55Y','https://img-19.commentcamarche.net/WNCe54PoGxObY8PCXUxMGQ0Gwss=/480x270/smart/d8c10e7fd21a485c909a5b4c5d99e611/ccmcms-commentcamarche/20456790.jpg ','Une passionnée de dessin !!! ','admin','Bah MOI voyons!!!'),(3,'John','Doe','johndoe@gmail.com','$argon2id$v=19$m=65536,t=5,p=1$ycMdTaHOlu/zS7L+1PXM9A$j49s0aiUgWQq8o9vjFrmjO+z9+ZYk7DkC99OUJHRclY','https://blog.foto24.com/wp-content/uploads/2019/02/4-684x1024.jpg ',NULL,'user','Jo'),(4,'Jane','Smith','janesmith@gmail.com','$argon2id$v=19$m=65536,t=5,p=1$/jt5pBWY+8I3v5mNQABJDA$s+leXc6gX3TaXElSMRM3XWs9HWXiPS2gpSG/0GgjAY0','https://blog.foto24.com/wp-content/uploads/2019/02/4-684x1024.jpg ','Lorem Ipsum','user','Jane\'S'),(38,'Tic','Tac','Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam quasi ea reiciendis, molestias nam numquam minima assumenda repellendus consequatur autem neque debitis accusamus est ab! Minima, ad itaque. Sint, dolores!\n','ttic@gmail.com','$argon2id$v=19$m=65536,t=5,p=1$T0lnAbGgawroe9aZwSH39Q$JF8ZvdwLjkL46biFM3t4ZX06S6MhiKB/lpHIvxDn/p0',NULL,'user','user'),(39,'Tom','Jerry','Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis dolorum adipisci eum, quos facilis atque odio! Maxime cum animi fugit odit architecto doloribus ipsum dolorem. Natus, esse. Tempora, natus quasi!','tom@wanadoo.fr','$argon2id$v=19$m=65536,t=5,p=1$cKKf6HlS0UuO4oANejs/pQ$wJl4djemeRuhpcUujwzbjC4bMDmq2TUBFgakL5jyAfs',NULL,'user','user'),(40,'essai','essai','essai','essai@example.com','$argon2id$v=19$m=65536,t=5,p=1$I2E2IeD4XgaTqJSua8+25g$2wRpIcyBfVwrqhC+7+LQskds4LJbmK2o2wqC8UlOj+0',NULL,'user','user'),(41,'MINI','mini','ess','mini@gmail.com','mini',NULL,'user','user');
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

-- Dump completed on 2023-07-20 21:19:28
