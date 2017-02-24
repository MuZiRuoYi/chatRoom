-- MySQL dump 10.13  Distrib 5.1.70, for Win32 (ia32)
--
-- Host: localhost    Database: chatroomsystem
-- ------------------------------------------------------
-- Server version	5.1.70-community

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `chat_room`
--

DROP TABLE IF EXISTS `chat_room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chat_room` (
  `r_id` int(11) NOT NULL AUTO_INCREMENT,
  `r_name` char(30) NOT NULL,
  `r_creat_user` char(10) NOT NULL,
  `r_creat_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`r_id`),
  KEY `r_creat_user` (`r_creat_user`),
  CONSTRAINT `chat_room_ibfk_1` FOREIGN KEY (`r_creat_user`) REFERENCES `user` (`u_account`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_room`
--

LOCK TABLES `chat_room` WRITE;
/*!40000 ALTER TABLE `chat_room` DISABLE KEYS */;
INSERT INTO `chat_room` VALUES (1,'呵呵','1234568','2015-09-17 01:25:49'),(2,'哈哈','1234567','2015-09-17 01:26:47');
/*!40000 ALTER TABLE `chat_room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chat_user`
--

DROP TABLE IF EXISTS `chat_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chat_user` (
  `c_id` int(11) NOT NULL AUTO_INCREMENT,
  `r_id` int(11) NOT NULL,
  `u_account` char(10) NOT NULL,
  PRIMARY KEY (`c_id`),
  KEY `u_account` (`u_account`),
  KEY `r_id` (`r_id`),
  CONSTRAINT `chat_user_ibfk_1` FOREIGN KEY (`u_account`) REFERENCES `user` (`u_account`),
  CONSTRAINT `chat_user_ibfk_2` FOREIGN KEY (`r_id`) REFERENCES `chat_room` (`r_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_user`
--

LOCK TABLES `chat_user` WRITE;
/*!40000 ALTER TABLE `chat_user` DISABLE KEYS */;
INSERT INTO `chat_user` VALUES (1,1,'1234568'),(2,1,'1234567'),(3,2,'1234567'),(4,2,'1234568');
/*!40000 ALTER TABLE `chat_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `message`
--

DROP TABLE IF EXISTS `message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `message` (
  `m_id` int(11) NOT NULL AUTO_INCREMENT,
  `m_content` varchar(200) DEFAULT NULL,
  `m_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `r_id` int(11) NOT NULL,
  `u_account` char(10) NOT NULL,
  PRIMARY KEY (`m_id`),
  KEY `r_id` (`r_id`),
  KEY `u_account` (`u_account`),
  CONSTRAINT `message_ibfk_1` FOREIGN KEY (`r_id`) REFERENCES `chat_room` (`r_id`),
  CONSTRAINT `message_ibfk_2` FOREIGN KEY (`u_account`) REFERENCES `user` (`u_account`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message`
--

LOCK TABLES `message` WRITE;
/*!40000 ALTER TABLE `message` DISABLE KEYS */;
INSERT INTO `message` VALUES (1,'呼呼','2015-09-17 01:26:02',1,'1234568'),(2,'呵呵','2015-09-17 01:27:06',2,'1234568');
/*!40000 ALTER TABLE `message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `unread_message`
--

DROP TABLE IF EXISTS `unread_message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `unread_message` (
  `s_id` int(11) NOT NULL AUTO_INCREMENT,
  `m_id` int(11) DEFAULT NULL,
  `u_account` char(10) DEFAULT NULL,
  `r_id` int(11) NOT NULL,
  PRIMARY KEY (`s_id`),
  KEY `m_id` (`m_id`),
  KEY `u_account` (`u_account`),
  KEY `r_id` (`r_id`),
  CONSTRAINT `unread_message_ibfk_1` FOREIGN KEY (`m_id`) REFERENCES `message` (`m_id`),
  CONSTRAINT `unread_message_ibfk_2` FOREIGN KEY (`u_account`) REFERENCES `user` (`u_account`),
  CONSTRAINT `unread_message_ibfk_3` FOREIGN KEY (`r_id`) REFERENCES `chat_room` (`r_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `unread_message`
--

LOCK TABLES `unread_message` WRITE;
/*!40000 ALTER TABLE `unread_message` DISABLE KEYS */;
/*!40000 ALTER TABLE `unread_message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `u_account` char(10) NOT NULL,
  `u_name` char(20) DEFAULT NULL,
  `u_sex` char(4) NOT NULL,
  `u_age` smallint(6) DEFAULT NULL,
  `u_pass` char(16) DEFAULT NULL,
  `u_nick` char(20) DEFAULT NULL,
  `u_regist_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`u_account`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('1234567','李华','男',20,'1234567','Nick','2015-07-06 05:52:23'),('1234568','Html','女',18,'1234568','Alice','2015-07-06 13:16:57'),('1234569','兔兔','女',16,'1234569','TUTu','2015-07-07 15:18:18');
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

-- Dump completed on 2016-04-24 10:36:23
