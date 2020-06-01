CREATE DATABASE  IF NOT EXISTS `cfos_capstone` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `cfos_capstone`;
-- MySQL dump 10.13  Distrib 8.0.17, for Win64 (x86_64)
--
-- Host: localhost    Database: cfos_capstone
-- ------------------------------------------------------
-- Server version	8.0.17

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `block`
--

DROP TABLE IF EXISTS `block`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `block` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `block_start` time DEFAULT NULL,
  `deque` varchar(800) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=144 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `block`
--

LOCK TABLES `block` WRITE;
/*!40000 ALTER TABLE `block` DISABLE KEYS */;
INSERT INTO `block` VALUES (1,'00:10:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(2,'00:20:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(3,'00:30:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(4,'00:40:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(5,'00:50:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(6,'01:00:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(7,'01:10:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(8,'01:20:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(9,'01:30:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(10,'01:40:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(11,'01:50:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(12,'02:00:00','1/1-2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(13,'02:10:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(14,'02:20:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(15,'02:30:00','1/2-2/ -3/3-4/ -5/ -6/ -7/ -8/ '),(16,'02:40:00','1/4-2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(17,'02:50:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(18,'03:00:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(19,'03:10:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(20,'03:20:00','1/5,6,7-2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(21,'03:30:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(22,'03:40:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(23,'03:50:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(24,'04:00:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(25,'04:10:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(26,'04:20:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(27,'04:30:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(28,'04:40:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(29,'04:50:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(30,'05:00:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(31,'05:10:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(32,'05:20:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(33,'05:30:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(34,'05:40:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(35,'05:50:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(36,'06:00:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(37,'06:10:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(38,'06:20:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(39,'06:30:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(40,'06:40:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(41,'06:50:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(42,'07:00:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(43,'07:10:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(44,'07:20:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(45,'07:30:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(46,'07:40:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(47,'07:50:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(48,'08:00:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(49,'08:10:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(50,'08:20:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(51,'08:30:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(52,'08:40:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(53,'08:50:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(54,'09:00:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(55,'09:10:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(56,'09:20:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(57,'09:30:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(58,'09:40:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(59,'09:50:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(60,'10:00:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(61,'10:10:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(62,'10:20:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(63,'10:30:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(64,'10:40:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(65,'10:50:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(66,'11:00:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(67,'11:10:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(68,'11:20:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(69,'11:30:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(70,'11:40:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(71,'11:50:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(72,'12:00:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(73,'12:10:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(74,'12:20:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(75,'12:30:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(76,'12:40:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(77,'12:50:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(78,'13:00:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(79,'13:10:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(80,'13:20:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(81,'13:30:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(82,'13:40:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(83,'13:50:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(84,'14:00:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(85,'14:10:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(86,'14:20:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(87,'14:30:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(88,'14:40:00','1/ -2/ -3/ -4/ -5/-6/ -7/ -8/ '),(89,'14:50:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(90,'15:00:00','1/-2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(91,'15:10:00','1/ -2/ -3/ -4/ -5/-6/ -7/ -8/ '),(92,'15:20:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(93,'15:30:00','1/16,17,18,19,20-2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(94,'15:40:00','1/-2/ -3/35-4/ -5/ -6/ -7/ -8/ '),(95,'15:50:00','1/-2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(96,'16:00:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(97,'16:10:00','1/ -2/ -3/-4/ -5/ -6/ -7/ -8/ '),(98,'16:20:00','1/-2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(99,'16:30:00','1/49-2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(100,'16:40:00','1/50,51,52-2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(101,'16:50:00','1/53,54,55-2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(102,'17:00:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(103,'17:10:00','1/57-2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(104,'17:20:00','1/58,60,61,62,63-2/ -3/ -4/59-5/ -6/ -7/ -8/ '),(105,'17:30:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(106,'17:40:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(107,'17:50:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(108,'18:00:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(109,'18:10:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(110,'18:20:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(111,'18:30:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(112,'18:40:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(113,'18:50:00','1/65-2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(114,'19:00:00','1/ -2/ -3/64-4/ -5/ -6/ -7/ -8/ '),(115,'19:10:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(116,'19:20:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(117,'19:30:00','1/66-2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(118,'19:40:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(119,'19:50:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(120,'20:00:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(121,'20:10:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(122,'20:20:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(123,'20:30:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(124,'20:40:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(125,'20:50:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(126,'21:00:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(127,'21:10:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(128,'21:20:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(129,'21:30:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(130,'21:40:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(131,'21:50:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(132,'22:00:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(133,'22:10:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(134,'22:20:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(135,'22:30:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(136,'22:40:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(137,'22:50:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(138,'23:00:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(139,'23:10:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(140,'23:20:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(141,'23:30:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(142,'23:40:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ '),(143,'23:50:00','1/ -2/ -3/ -4/ -5/ -6/ -7/ -8/ ');
/*!40000 ALTER TABLE `block` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `active` bit(1) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `parent_id` bigint(20) DEFAULT NULL,
  `fc_id` bigint(20) DEFAULT NULL,
  `store_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK2y94svpmqttx80mshyny85wqr` (`parent_id`),
  KEY `FKk6thj1dsh8tc15rip0fmaewo4` (`fc_id`),
  KEY `FKqdaotwkf5g9vmdox82ttt50i5` (`store_id`),
  CONSTRAINT `FK2y94svpmqttx80mshyny85wqr` FOREIGN KEY (`parent_id`) REFERENCES `category` (`id`),
  CONSTRAINT `FKk6thj1dsh8tc15rip0fmaewo4` FOREIGN KEY (`fc_id`) REFERENCES `food_court` (`id`),
  CONSTRAINT `FKqdaotwkf5g9vmdox82ttt50i5` FOREIGN KEY (`store_id`) REFERENCES `store` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,_binary '','Đồ ăn',NULL,NULL,1,NULL),(2,_binary '','Đồ uống',NULL,NULL,1,NULL),(3,_binary '','Com bo',NULL,NULL,1,NULL),(4,_binary '','Cơm','https://firebasestorage.googleapis.com/v0/b/cfos-captone.appspot.com/o/images%2FContent.png?alt=media&token=fc16e9e9-d9f5-4ae4-b231-04f0642ff8e5',1,NULL,NULL),(5,_binary '','Món nước','https://firebasestorage.googleapis.com/v0/b/cfos-captone.appspot.com/o/images%2Ft%E1%BA%A3i%20xu%E1%BB%91ng.png?alt=media&token=41883caf-a790-4dc8-8351-f45586eb54c0',1,NULL,NULL),(6,_binary '','Trà sữa','https://firebasestorage.googleapis.com/v0/b/cfos-captone.appspot.com/o/images%2FIcon.png?alt=media&token=9a931812-7a43-4c89-93a2-c8e356034de2',2,NULL,NULL),(7,_binary '','Cơm',NULL,NULL,NULL,1),(8,_binary '','Lẩu','https://firebasestorage.googleapis.com/v0/b/cfos-captone.appspot.com/o/images%2Fkisspng-hot-pot-shabu-shabu-chinese-cuisine-sukiyaki-asian-pot-5ad1658bcec301.0724141615236724598469.jpg?alt=media&token=2b521275-b93b-4d90-b01b-10415739089d',1,NULL,NULL),(9,_binary '','Thức ăn nhanh','https://firebasestorage.googleapis.com/v0/b/cfos-captone.appspot.com/o/images%2FChicken%20cat%20icon.svg?alt=media&token=703e4825-1827-4e6b-abe3-aa61cd81de6a',1,NULL,NULL),(10,_binary '','Phở','https://firebasestorage.googleapis.com/v0/b/cfos-captone.appspot.com/o/images%2FNoodle%20cat%20icon.png?alt=media&token=4f860ddc-5c7d-456f-bb25-f3f78c984fc5',1,NULL,NULL),(11,_binary '','Cơm',NULL,NULL,NULL,3),(12,_binary '','Cơm',NULL,NULL,NULL,4),(13,_binary '','Thức ăn nhanh',NULL,NULL,NULL,1),(16,_binary '','Phở',NULL,NULL,NULL,1),(17,_binary '','Trà sữa',NULL,NULL,NULL,5),(18,_binary '','Giải khát','https://firebasestorage.googleapis.com/v0/b/cfos-captone.appspot.com/o/images%2Fwater-glass-1-486112.png?alt=media&token=4d28dbba-e060-4ef1-9100-a3c459913aa1',2,NULL,NULL),(19,_binary '','Giải khát',NULL,NULL,NULL,1),(20,_binary '','Trà sữa',NULL,NULL,NULL,2),(21,_binary '','Combo đơn',NULL,NULL,NULL,1),(22,_binary '','Combo đơn','https://firebasestorage.googleapis.com/v0/b/cfos-captone.appspot.com/o/images%2FCombo1%20cat%20icon.svg?alt=media&token=4154c486-4e5e-45c7-8231-842caa87a576',3,NULL,NULL),(23,_binary '','Combo 2 người','https://firebasestorage.googleapis.com/v0/b/cfos-captone.appspot.com/o/images%2FPeople2%20cat%20icon.svg?alt=media&token=1c0bad0e-4762-4c16-bd53-4820bcfdc0a2',3,NULL,NULL),(24,_binary '','Combo 2 người',NULL,NULL,NULL,1),(25,_binary '','Combo đơn',NULL,NULL,NULL,3),(26,_binary '','Combo 2 người',NULL,NULL,NULL,3),(27,_binary '','Đồ ăn',NULL,NULL,2,NULL),(28,_binary '','Đồ uống',NULL,NULL,2,NULL),(29,_binary '','Com bo',NULL,NULL,2,NULL),(30,_binary '','Hambuger','https://firebasestorage.googleapis.com/v0/b/cfos-captone.appspot.com/o/images%2Fhamburger.png?alt=media&token=0021132f-7e6e-4dc6-8596-4911cdc00d9e',27,NULL,NULL),(31,_binary '','Hambuger',NULL,NULL,NULL,6),(32,_binary '\0','Hambuger',NULL,NULL,NULL,4),(34,_binary '','Cơm',NULL,NULL,NULL,8);
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `customer_id` varchar(255) NOT NULL,
  `active` bit(1) DEFAULT NULL,
  `card_id` varchar(255) DEFAULT NULL,
  `count_order` int(11) DEFAULT NULL,
  `device_token` varchar(255) DEFAULT NULL,
  `time_last_order` datetime(6) DEFAULT NULL,
  `point` double DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`customer_id`),
  KEY `FKj8dlm21j202cadsbfkoem0s58` (`user_id`),
  CONSTRAINT `FKj8dlm21j202cadsbfkoem0s58` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES ('CUS_1',_binary '','2511240674',11,'ExponentPushToken[q_63D0AwUoKFQbWMIlNlgF]','2019-08-12 16:58:12.041000',0,1),('CUS_10',_binary '','2068537474',0,NULL,NULL,0,10),('CUS_11',_binary '',NULL,0,NULL,NULL,0,11),('CUS_12',_binary '',NULL,0,NULL,NULL,0,12),('CUS_13',_binary '',NULL,0,NULL,NULL,0,13),('CUS_14',_binary '',NULL,0,NULL,NULL,0,14),('CUS_15',_binary '',NULL,0,NULL,NULL,0,15),('CUS_2',_binary '',NULL,0,NULL,NULL,0,2),('CUS_3',_binary '',NULL,0,NULL,NULL,0,3),('CUS_4',_binary '',NULL,0,NULL,NULL,0,4),('CUS_5',_binary '',NULL,0,NULL,NULL,0,5),('CUS_6',_binary '',NULL,0,NULL,NULL,0,6),('CUS_7',_binary '',NULL,0,NULL,NULL,0,7),('CUS_8',_binary '',NULL,0,NULL,NULL,0,8),('CUS_9',_binary '','2067865746',22,NULL,'2019-08-12 16:46:05.326000',0,9);
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `emp_id` varchar(255) NOT NULL,
  `active` bit(1) DEFAULT NULL,
  `start_date` datetime(6) DEFAULT NULL,
  `fc_id` bigint(20) DEFAULT NULL,
  `role_id` bigint(20) DEFAULT NULL,
  `store_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`emp_id`),
  KEY `FKdx6fx4eowgj3tfx2dcvjd655h` (`fc_id`),
  KEY `FK3046kvjyysq288vy3lsbtc9nw` (`role_id`),
  KEY `FKeg6451w5jta9oobtdgfe5c3n5` (`store_id`),
  KEY `FK6lk0xml9r7okjdq0onka4ytju` (`user_id`),
  CONSTRAINT `FK3046kvjyysq288vy3lsbtc9nw` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`),
  CONSTRAINT `FK6lk0xml9r7okjdq0onka4ytju` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FKdx6fx4eowgj3tfx2dcvjd655h` FOREIGN KEY (`fc_id`) REFERENCES `food_court` (`id`),
  CONSTRAINT `FKeg6451w5jta9oobtdgfe5c3n5` FOREIGN KEY (`store_id`) REFERENCES `store` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES ('EMP_1',_binary '',NULL,NULL,1,NULL,1),('EMP_11',_binary '',NULL,2,2,NULL,11),('EMP_12',_binary '',NULL,2,4,6,12),('EMP_13',_binary '',NULL,1,4,8,13),('EMP_14',_binary '',NULL,1,5,1,14),('EMP_15',_binary '',NULL,1,5,5,15),('EMP_2',_binary '',NULL,1,2,NULL,2),('EMP_3',_binary '',NULL,1,4,1,3),('EMP_4',_binary '',NULL,1,4,2,4),('EMP_5',_binary '',NULL,1,4,3,5),('EMP_6',_binary '',NULL,1,4,4,6),('EMP_7',_binary '',NULL,1,4,5,7),('EMP_8',_binary '',NULL,1,3,NULL,8);
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedback`
--

DROP TABLE IF EXISTS `feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedback` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `content` varchar(255) DEFAULT NULL,
  `date` datetime(6) DEFAULT NULL,
  `rate` double DEFAULT NULL,
  `cus_id` varchar(255) DEFAULT NULL,
  `food_id` bigint(20) DEFAULT NULL,
  `store_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKipgdt2fay4d890aaun00hgjyo` (`cus_id`),
  KEY `FK2bg8b9ol4ve53tdo0wn6gfvdl` (`food_id`),
  KEY `FK66w8enntou8ve9a8yutyoidly` (`store_id`),
  CONSTRAINT `FK2bg8b9ol4ve53tdo0wn6gfvdl` FOREIGN KEY (`food_id`) REFERENCES `food` (`id`),
  CONSTRAINT `FK66w8enntou8ve9a8yutyoidly` FOREIGN KEY (`store_id`) REFERENCES `store` (`id`),
  CONSTRAINT `FKipgdt2fay4d890aaun00hgjyo` FOREIGN KEY (`cus_id`) REFERENCES `customer` (`customer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedback`
--

LOCK TABLES `feedback` WRITE;
/*!40000 ALTER TABLE `feedback` DISABLE KEYS */;
INSERT INTO `feedback` VALUES (1,'Món ăn ngon, trình bày đẹp, sách sẽ.','2019-08-12 01:18:33.649000',5,'CUS_9',1,1),(2,'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magni.','2019-08-12 18:18:33.649000',3,'CUS_9',1,1),(3,'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magni.','2019-08-12 11:18:33.649000',4,'CUS_9',1,1),(4,'','2019-08-12 16:18:33.649000',5,'CUS_1',1,1),(5,'','2019-08-12 16:30:52.377000',5,'CUS_1',20,5);
/*!40000 ALTER TABLE `feedback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `food`
--

DROP TABLE IF EXISTS `food`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `food` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `active` bit(1) DEFAULT NULL,
  `count` int(11) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `unit` varchar(255) DEFAULT NULL,
  `price` double DEFAULT NULL,
  `promotion` double DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `rate` double DEFAULT NULL,
  `fc_category_id` bigint(20) DEFAULT NULL,
  `store_category_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK3tubp9pe7ftir4nk9yjku7rmx` (`fc_category_id`),
  KEY `FKqgpq76bcrix78b9fydamdbfr4` (`store_category_id`),
  CONSTRAINT `FK3tubp9pe7ftir4nk9yjku7rmx` FOREIGN KEY (`fc_category_id`) REFERENCES `category` (`id`),
  CONSTRAINT `FKqgpq76bcrix78b9fydamdbfr4` FOREIGN KEY (`store_category_id`) REFERENCES `category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `food`
--

LOCK TABLES `food` WRITE;
/*!40000 ALTER TABLE `food` DISABLE KEYS */;
INSERT INTO `food` VALUES (1,_binary '',9,'Cơm chiên thơm hải sản với hạt cơm chín tơi quyện cùng nguyên liệu tôm giòn ngọt, thơm chua chua, đậu Hà Lan bùi bùi, cả cà rốt và bắp hột nữa. Đặc biệt trứng chiên thơm béo rất ngon cơm nha!','Cơm chiên hải hải xào','Dĩa',50000,10,74,4.3,4,7),(2,_binary '',1,'Một suất cơm rang đầy đặn, cơm rang săn tơi, vàng ruộm, thơm nức mũi, thịt xá xíu mềm mềm, thái nhỏ, đẫm sốt. Lớp nước sốt “thần thánh” sền sệt, đậm ngọt mà thơm dịu, rưới cùng cơm rang giòn, ngon hết sảy. ','Cơm chiên xá xíu','Dĩa',50000,5,85,0,4,11),(3,_binary '',3,'Chua, cay, nồng là \"Gu\" ẩm thực của người Thái. Do đó, không lạ gì khi khẩu vị của những món ăn Thái đều mang nét đặc trưng này. Tuy nhiên, nguyên liệu của món ăn Thái thì không hề đơn giản như cách ă','Cơm chiên thái lan','Dĩa',30000,15,74,0,4,7),(4,_binary '',1,'Cơm chiên dương châu là món ăn ngon có xuất xứ từ thời nhà thanh của Trung Quốc và nhanh chóng nổi tiếng trên khắp thế giới. Món cơm chiên dương châu này vừa thơm ngon lại vừa có rất nhiều màu sắc bắt nữa, đậm đà và giàu chất dinh dưỡng,','Cơm chiên dương châu','Dĩa',40000,15,11,0,4,11),(5,_binary '',0,'Đây là món ăn giàu dinh dưỡng từ quả dứa giàu vitamin C, hạt điều giàu Vitamin E kết hợp với vị ngọt của tôm, thịt gà. Màu sắc hấp dẫn hẳn sẽ làm các bạn hài lòng!','Cơm Rang Rứa','Dĩa',50000,15,211,0,4,12),(6,_binary '',0,'Món gà rán này có nguồn gốc từ bang Alabama, thuộc miền Nam nước Mỹ. Công thức chế biến đã có từ hàng trăm năm, được lưu truyền từ đời này sang đời khác.','Gà rán truyền thống','Miếng',3000,10,20,0,9,13),(7,_binary '',0,'Gà giòn cay là món ăn ngon rất được giới trẻ yêu thích. Món gà giòn cay này có thể dùng như một món ăn chơi chấm với sốt mayonnaise','Gà giòn cay','Miếng',25000,10,94,0,9,13),(8,_binary '',0,'Cơm chiên trứng là món ăn không cầu kỳ nhưng vô cùng chắc dạ, có thể làm ăn sáng hoặc trưa đều thích hợp.','Cơm chiên trứng','Dĩa',50000,14,41,0,4,11),(9,_binary '',0,'Thỉnh thoảng bạn có thể chế biến món cơm rang thập cẩm thơm ngon, dễ làm vào bữa sáng cho cả nhà.','Cơm chiên thập cẩm','Dĩa',50000,13,123,0,4,11),(10,_binary '',0,'Chỉ mất một chút thời gian là bạn đã có ngay món cơm rang thịt bò vừa ngon lại đủ chất cho cả nhà thưởng thức.','Cơm chiên bò xào','Dĩa',45000,13,30,0,4,12),(11,_binary '',0,'Cánh gà chiên nước mắm là món ăn khá quen thuộc đối với bữa cơm gia đình. Cánh gà nhiều thịt, ít xương, vị mặn béo, dai ngon mà không ngấy thích hợp làm món ăn hút cơm cho cả nhà.','Cơm chiên gà chiên nước mắm','Dĩa',66000,13,50,0,4,12),(12,_binary '',3,'Vào những ngày se lạnh, thưởng thức món cơm gà chiên giòn nóng hổi, thơm nức mũi này thì còn gì bằng nhỉ.','Cơm chiên gà chiên giòn','Dĩa',77000,14,119,0,4,7),(13,_binary '',2,'Món cơm chiên rau xanh chế biến dơn giản, không mất nhiều thời gian nhưng rất ngon và bổ dưỡng sẽ giúp bạn giảm bớt thời gian nấu nướng mà vẫn đảm bảo bữa ăn đủ chất cho cả nhà.  Có thể bạ','Cơm chiên rau cải','Dĩa',30000,15,27,0,4,7),(14,_binary '',0,'Phở bò tái có sợi phở dai ngon, thịt bò chín mềm, nước lèo đậm đà, làm món ăn sáng thơm ...','Phở tái','Tô',55000,16,48,0,10,16),(15,_binary '',0,'phở từ xào đến nước dành cho hội mê bắp bò ở Hà Nội ... bắp bò đưa đẩy trong miệng hoà quyện cùng vị nước dùng của phở có','Phở bắp hoa','Tô',58000,13,50,0,10,16),(16,_binary '',0,'Miếng thịt mỡ gầu trong các tiệm phở luôn được xắt rất mỏng để bảo đảm thực khách ăn sẽ thấy rất giòn. Khi nhai miếng mỡ gàu hoàn toàn ','Phở gầu','Tô',68000,14,60,0,10,16),(17,_binary '',3,'hở bò tái chín thơm ngon chuẩn không cần chỉnh như ngoài hàng: Chẳng cần lóc cóc ra ngoài hàng, các nàng vẫn','Phở chín','Tô',45000,10,37,0,10,16),(18,_binary '',1,' - Ai thường xuyên ăn phở thì sẽ quá quen thịt nạm bò rồi, các bà các cô ... Trong Nam ít thấy phở vè hơn ngoài Bắc, nhưng mà phở vè ngon, vừa .','Phở vè','Tô',70000,15,28,0,10,16),(19,_binary '',0,'Phở bò viên là một món ăn chế biến cực nhanh. Với món ăn này bạn chỉ mất khoảng 15 phút buổi sáng để chế biến thôi là đã có một tô phở bò tuyệt ngo','Phở bò viên','Tô',45000,15,40,0,10,16),(20,_binary '',2,'Trà sữa Hạt dẻ vs trà sữa Vani Với hương vị thơm ngon chỉ cần ngửi thôi là đã làm cho các bạn cảm thấy muốn uống rồi . Càng ngon hơn khi có trân châu...','Trà sữa hạt dẻ','Ly',45000,0,96,5,6,17),(21,_binary '',0,' Một ly trà kem cheese bao gồm 2 phần: trà/trà sữa chiếm 2/3 cốc và lớp kem đặc quánh phủ lên trên.: Sharetea, Bobapop, Regiustea, Heekcaa ..','Trà sữa kem cheese','Ly',55000,14,103,0,6,17),(22,_binary '',0,'Và trà sữa vị bạc hà càng được yêu thích hơn cả vì sự x2 mát lạnh đó. Và đặc biệt bạn còn có thể tự tay làm món đồ uống này tại nhà với cách pha chế trà sữa ...','Trà sữa bạc hà','Ly',45000,11,130,0,6,17),(23,_binary '',0,'Cách làm đồ uống này cực dễ, tại sao không tự làm sữa tươi trân châu đường nâu (đường đen) tại nhà vừa tiết kiệm lại đảm bảo vệ sinh?','Sữa tươi đường nâu trân châu','Ly',55000,15,130,0,6,17),(24,_binary '',0,'Đựơc chế biến lần đầu tiên vào năm 1870 tại Amsterdam, thương hiệu Heineken được chính thức chào đời vào năm 1873, khi Gerard Adrian Heineken thành lập nên Heineken & Co. sau khi đã tiếp quản cơ sở sả','Heniken','Lon',25000,3,999,0,18,19),(25,_binary '',0,'PepsiCo là nhà sản xuất nước giải khát và thực phẩm hàng đầu thế giới có doanh thu thuần hơn 65 tỷ Đô la Mỹ và một dãy các sản phẩm bao gồm 22 nhãn ...','Pepsi','Lon',15000,4,991,0,18,19),(26,_binary '',1,'Công ty Coca-Cola đã giới thiệu nhiều loại sản phẩm dưới thương hiệu Coke. Một trong những sản phẩm nổi tiếng trong số này là Diet Coke','Coca-cola','Lon',15000,3,996,0,18,19),(27,_binary '',0,' xị Chương Dương có hương vị đặc biệt ấn tượng với công thức pha chế độc quyền của Công ty CP NGK Chương Dương từ lâu đời. Thành phần thảo dược ...','Xá xị Trương Dương','Lon',12000,2,1000,0,18,19),(28,_binary '',0,' GIỚI THIỆU TIGER, caccongtyvietnam.vn quảng bá danh bạ doanh nghiệp, website việt nam, quảng cáo sản phẩm, thương hiệu, cầu nối ...','Tiger','Lon',15000,5,1000,0,18,19),(29,_binary '',0,'Trà sữa ngon','Trà Đen Sữa Tươi Sương Sáo','Ly',50000,10,114,0,6,20),(30,_binary '',0,'Trà sữa ngọt','Gong Cha Chocolatea','Ly',40000,0,121,0,6,20),(31,_binary '',2,'Combo tố trong tầm giá','Combo mì ý, bánh nướng, Salad','Phần',80000,0,118,0,22,21),(34,_binary '',0,'Combo fast food','Combo hot dog, nước ngọt, khoai tây chiên','Phần',120000,0,122,0,22,21),(35,_binary '',0,'Combo tốt cho cặp đôi','Combo mực nướng, thịt bò, trứng','Phần',150000,25,53,0,23,24),(36,_binary '',0,'Combo dầu béo','Combo cơm chiên, gà xé, trứng rán','Phần',200000,23,22,0,23,24),(37,_binary '',0,'Combo','Combo Burger, khoai tây chiên','Phần',250000,0,54,0,22,25),(38,_binary '',0,'Combo Mexico','Combo Tacos, cơm trắng, salad','Phần',300000,1,42,0,22,25),(39,_binary '',0,'Combo','Combo hot dog, khoai tây chiên, gà chiên','Phần',100000,5,32,0,23,26),(40,_binary '',0,'Combo','Combo 4 miếng Sandwich','Phần',40000,5,32,0,23,26),(41,_binary '',0,'Rẻ,  bổ, ngon','Combo 2 Sandwich lớn','Phần',45000,5,42,0,23,26),(42,_binary '',0,'Combo cơm chiên, chả dò, sốt bò','Combo cơm chiên, chả dò, sốt bò','Phần',400000,0,32,0,22,21),(43,_binary '',0,'1','Hamburger Hàn Quốc','Cái',40000,5,321,0,4,31),(44,_binary '',0,'das','Cơm trắng','Chén',5000,4,200,0,4,11),(45,_binary '',0,'a','Cơm gà xối mỡ','Dĩa',12000,15,15,0,4,34);
/*!40000 ALTER TABLE `food` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `food_court`
--

DROP TABLE IF EXISTS `food_court`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `food_court` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `location` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `food_court`
--

LOCK TABLES `food_court` WRITE;
/*!40000 ALTER TABLE `food_court` DISABLE KEYS */;
INSERT INTO `food_court` VALUES (1,'Bình Thạnh','Pearl Plaza'),(2,'Quận 5','Parkson Hung Vương');
/*!40000 ALTER TABLE `food_court` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `food_option`
--

DROP TABLE IF EXISTS `food_option`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `food_option` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `option_price` double DEFAULT NULL,
  `store_id` bigint(20) DEFAULT NULL,
  `type` bigint(20) DEFAULT NULL,
  `is_count` bit(1) DEFAULT NULL,
  `is_select_more` bit(1) DEFAULT NULL,
  `is_default` bit(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKg1pckkoivayg09yqehgjerekh` (`type`),
  KEY `FKtqag9vmx3qousgtutovi3h0a4` (`store_id`),
  CONSTRAINT `FKg1pckkoivayg09yqehgjerekh` FOREIGN KEY (`type`) REFERENCES `food_option` (`id`),
  CONSTRAINT `FKtqag9vmx3qousgtutovi3h0a4` FOREIGN KEY (`store_id`) REFERENCES `store` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `food_option`
--

LOCK TABLES `food_option` WRITE;
/*!40000 ALTER TABLE `food_option` DISABLE KEYS */;
INSERT INTO `food_option` VALUES (1,'Món thêm',0,1,NULL,_binary '',_binary '\0',_binary '\0'),(2,'Thêm cơm ',10000,NULL,1,_binary '',_binary '\0',_binary '\0'),(3,'Thêm tôm',15000,NULL,1,_binary '',_binary '\0',_binary '\0'),(4,'Thêm bò',10000,NULL,1,_binary '',_binary '\0',_binary '\0'),(5,'Kích cỡ',0,1,NULL,_binary '\0',_binary '\0',_binary '\0'),(6,'Nhỏ',5000,1,5,_binary '\0',_binary '\0',_binary '\0'),(7,'Vừa',10000,1,5,_binary '\0',_binary '\0',_binary ''),(8,'Lớn',15000,1,5,_binary '\0',_binary '\0',_binary '\0'),(9,'Topping',0,1,NULL,_binary '',_binary '\0',_binary '\0'),(10,'Trân châu đen',3000,1,9,_binary '',_binary '\0',_binary '\0'),(11,'Trân châu trắng',5000,1,9,_binary '',_binary '\0',_binary '\0'),(12,'Lượng đá',0,1,NULL,_binary '\0',_binary '\0',_binary '\0'),(13,'10%',0,1,12,_binary '\0',_binary '\0',_binary '\0'),(14,'25%',0,1,12,_binary '\0',_binary '\0',_binary '\0'),(15,'50%',0,1,12,_binary '\0',_binary '\0',_binary '\0'),(16,'60%',0,1,12,_binary '\0',_binary '\0',_binary '\0'),(17,'70%',0,1,12,_binary '\0',_binary '\0',_binary '\0'),(18,'80%',0,1,12,_binary '\0',_binary '\0',_binary '\0'),(20,'Lượng đường',0,1,NULL,_binary '\0',_binary '\0',_binary '\0'),(21,'10%',0,1,20,_binary '\0',_binary '\0',_binary '\0'),(22,'25%',0,1,20,_binary '\0',_binary '\0',_binary '\0'),(23,'50%',0,1,20,_binary '\0',_binary '\0',_binary '\0'),(24,'60%',0,1,20,_binary '\0',_binary '\0',_binary '\0'),(25,'70%',0,1,20,_binary '\0',_binary '\0',_binary '\0'),(26,'80%',0,1,20,_binary '\0',_binary '\0',_binary '\0'),(27,'Tùy chọn khác',0,3,NULL,_binary '\0',_binary '\0',_binary '\0'),(28,'Tùy chọn khác',0,4,NULL,_binary '\0',_binary '\0',_binary '\0'),(29,'Không hành',0,4,28,_binary '\0',_binary '\0',_binary '\0'),(30,'Lượng Đá',0,5,NULL,_binary '\0',_binary '\0',_binary '\0'),(31,'10%',0,5,30,_binary '\0',_binary '\0',_binary '\0'),(32,'25%',0,5,30,_binary '\0',_binary '\0',_binary '\0'),(34,'50%',0,5,30,_binary '\0',_binary '\0',_binary '\0'),(35,'60%',0,5,30,_binary '\0',_binary '\0',_binary '\0'),(36,'75%',0,5,30,_binary '\0',_binary '\0',_binary '\0'),(37,'100%',0,5,30,_binary '\0',_binary '\0',_binary '\0'),(38,'Lượng đường',0,5,NULL,_binary '\0',_binary '\0',_binary '\0'),(40,'10%',0,5,38,_binary '\0',_binary '\0',_binary '\0'),(41,'25%',0,5,38,_binary '\0',_binary '\0',_binary '\0'),(42,'50%',0,5,38,_binary '\0',_binary '\0',_binary '\0'),(43,'60%',0,5,38,_binary '\0',_binary '\0',_binary '\0'),(44,'75%',0,5,38,_binary '\0',_binary '\0',_binary '\0'),(45,'100%',0,5,38,_binary '\0',_binary '\0',_binary '\0'),(47,'Kích cỡ',0,5,NULL,_binary '\0',_binary '\0',_binary '\0'),(48,'Nhỏ',-5000,5,47,_binary '\0',_binary '\0',_binary '\0'),(49,'Vừa',0,5,47,_binary '\0',_binary '\0',_binary ''),(50,'Lớn',5000,5,47,_binary '\0',_binary '\0',_binary '\0'),(51,'Lượng đá',0,2,NULL,_binary '\0',_binary '\0',_binary '\0'),(52,'10%',0,2,51,_binary '\0',_binary '\0',_binary '\0'),(53,'25%',0,2,51,_binary '\0',_binary '\0',_binary '\0'),(54,'50%',0,2,51,_binary '\0',_binary '\0',_binary '\0'),(55,'60%',0,2,51,_binary '\0',_binary '\0',_binary '\0'),(56,'75%',0,2,51,_binary '\0',_binary '\0',_binary '\0'),(57,'100%',0,2,51,_binary '\0',_binary '\0',_binary '\0'),(58,'Lượng đường',0,2,NULL,_binary '\0',_binary '\0',_binary '\0'),(59,'10%',0,2,58,_binary '\0',_binary '\0',_binary '\0'),(60,'25%',0,2,58,_binary '\0',_binary '\0',_binary '\0'),(61,'50%',0,2,58,_binary '\0',_binary '\0',_binary '\0'),(62,'60%',0,2,58,_binary '\0',_binary '\0',_binary '\0'),(63,'75%',0,2,58,_binary '\0',_binary '\0',_binary '\0'),(64,'100%',0,2,58,_binary '\0',_binary '\0',_binary '\0'),(65,'Không tương',0,3,27,_binary '\0',_binary '\0',_binary '\0'),(66,'Tùy chọn khác',0,1,NULL,_binary '\0',_binary '\0',_binary '\0'),(67,'Cay',0,1,66,_binary '\0',_binary '\0',_binary '\0'),(68,'Tùy chọn khác',0,6,NULL,_binary '\0',_binary '\0',_binary '\0'),(69,'Không hành',0,6,68,_binary '\0',_binary '\0',_binary '\0'),(70,'Món thêm',0,5,NULL,_binary '',_binary '\0',_binary '\0'),(71,'Trân châu trắng',3000,5,70,_binary '\0',_binary '',_binary '\0'),(72,'Trân châu đen',3000,5,70,_binary '\0',_binary '',_binary '\0');
/*!40000 ALTER TABLE `food_option` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `food_option_food`
--

DROP TABLE IF EXISTS `food_option_food`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `food_option_food` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `food_id` bigint(20) DEFAULT NULL,
  `food_option_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKq6y75nx0occx2c21j1v8uoivl` (`food_id`),
  KEY `FK2xtmwyo2vi6icpftt147abrfr` (`food_option_id`),
  CONSTRAINT `FK2xtmwyo2vi6icpftt147abrfr` FOREIGN KEY (`food_option_id`) REFERENCES `food_option` (`id`),
  CONSTRAINT `FKq6y75nx0occx2c21j1v8uoivl` FOREIGN KEY (`food_id`) REFERENCES `food` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=227 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `food_option_food`
--

LOCK TABLES `food_option_food` WRITE;
/*!40000 ALTER TABLE `food_option_food` DISABLE KEYS */;
INSERT INTO `food_option_food` VALUES (1,1,2),(2,1,3),(3,2,2),(4,2,3),(8,4,27),(9,5,29),(10,6,2),(11,6,3),(12,6,4),(13,7,2),(14,7,3),(15,7,4),(16,8,2),(17,8,3),(18,8,4),(19,9,2),(20,9,3),(21,9,4),(25,3,2),(26,3,3),(27,3,4),(28,10,2),(29,10,3),(30,10,4),(31,11,2),(32,11,3),(33,11,4),(34,12,2),(35,12,3),(36,12,4),(37,13,2),(38,13,3),(39,13,4),(42,14,3),(43,14,4),(44,15,3),(45,15,4),(46,16,3),(47,16,4),(48,17,3),(49,17,4),(50,18,4),(51,19,3),(52,19,4),(59,21,31),(60,21,32),(61,21,34),(62,21,35),(63,21,36),(64,21,37),(65,22,31),(66,22,32),(67,22,34),(68,22,35),(69,22,36),(70,22,37),(71,23,31),(72,23,32),(73,23,34),(74,23,35),(75,23,36),(76,23,37),(77,24,13),(78,24,14),(79,24,15),(80,24,16),(81,24,17),(82,24,18),(83,25,6),(84,25,7),(85,25,8),(86,25,13),(87,25,14),(88,25,15),(89,25,16),(90,25,17),(91,25,18),(92,26,6),(93,26,7),(94,26,8),(95,26,21),(96,26,22),(97,26,23),(98,26,24),(99,26,25),(100,26,26),(101,27,13),(102,27,14),(103,27,15),(104,27,16),(105,27,17),(106,27,18),(107,27,21),(108,27,22),(109,27,23),(110,27,24),(111,27,25),(112,27,26),(113,28,13),(114,28,14),(115,28,15),(116,28,16),(117,28,17),(118,28,18),(119,28,21),(120,28,22),(121,28,23),(122,28,24),(123,28,25),(124,28,26),(170,29,52),(171,29,53),(172,29,54),(173,29,55),(174,29,56),(175,29,57),(176,29,59),(177,29,60),(178,29,61),(179,29,62),(180,29,63),(181,29,64),(182,30,52),(183,30,53),(184,30,54),(185,30,55),(186,30,56),(187,30,57),(188,30,59),(189,30,60),(190,30,61),(191,30,62),(192,30,63),(193,30,64),(194,31,4),(197,34,2),(198,35,4),(199,36,2),(200,36,3),(201,36,4),(202,37,65),(203,38,65),(204,39,65),(205,40,65),(206,41,65),(208,42,67),(209,43,69),(210,20,31),(211,20,32),(212,20,34),(213,20,35),(214,20,36),(215,20,37),(216,20,40),(217,20,41),(218,20,42),(219,20,43),(220,20,44),(221,20,45),(222,20,48),(223,20,49),(224,20,50),(225,20,71),(226,20,72);
/*!40000 ALTER TABLE `food_option_food` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `image`
--

DROP TABLE IF EXISTS `image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `image` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `image` varchar(255) DEFAULT NULL,
  `food_id` bigint(20) DEFAULT NULL,
  `fc_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK9w3l8mvb24k174dmofiqbv7e9` (`food_id`),
  KEY `FKg9vuab5a5a8o368ishqo4yl8g` (`fc_id`),
  CONSTRAINT `FK9w3l8mvb24k174dmofiqbv7e9` FOREIGN KEY (`food_id`) REFERENCES `food` (`id`),
  CONSTRAINT `FKg9vuab5a5a8o368ishqo4yl8g` FOREIGN KEY (`fc_id`) REFERENCES `food_court` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `image`
--

LOCK TABLES `image` WRITE;
/*!40000 ALTER TABLE `image` DISABLE KEYS */;
INSERT INTO `image` VALUES (1,'https://firebasestorage.googleapis.com/v0/b/cfos-captone.appspot.com/o/images%2Fistockphoto-1070394984-612x612.jpg?alt=media&token=476e9eeb-07a0-47d6-9af3-74a488a3ecf6',1,NULL),(2,'https://firebasestorage.googleapis.com/v0/b/cfos-captone.appspot.com/o/images%2Fcach-lam-com-chien-duong-chau-600x481.jpg?alt=media&token=21082ce8-c636-4576-9aa3-49e5f89beba0',1,NULL),(3,'https://firebasestorage.googleapis.com/v0/b/cfos-captone.appspot.com/o/images%2FIMG_9401.jpg?alt=media&token=5bd793a2-f7e9-4e79-bcd8-211e05308b69',1,NULL),(4,'https://firebasestorage.googleapis.com/v0/b/cfos-captone.appspot.com/o/images%2Fistockphoto-517799858-612x612.jpg?alt=media&token=02064e7d-8dbc-475e-b89a-e6299d6c9da8',2,NULL),(6,'https://firebasestorage.googleapis.com/v0/b/cfos-captone.appspot.com/o/images%2Fcom-chien-duong-chau.jpg?alt=media&token=aba77123-5c27-416f-941e-43dd7bb322e2',4,NULL),(7,'https://firebasestorage.googleapis.com/v0/b/cfos-captone.appspot.com/o/images%2Frecipe9353-635720548273781203.jpg?alt=media&token=1bde0b16-71e6-4aab-bc17-07b3bce873c2',5,NULL),(8,'https://firebasestorage.googleapis.com/v0/b/cfos-captone.appspot.com/o/images%2Fistockphoto-491996547-612x612.jpg?alt=media&token=98c36bd1-b652-45ac-bccd-7503ea3f5b1a',6,NULL),(9,'https://firebasestorage.googleapis.com/v0/b/cfos-captone.appspot.com/o/images%2Fistockphoto-824660060-612x612.jpg?alt=media&token=6c6a46d6-9a24-4994-838c-3843906d92be',7,NULL),(10,'https://firebasestorage.googleapis.com/v0/b/cfos-captone.appspot.com/o/images%2Fc%C3%A1ch-l%C3%A0m-c%C6%A1m-chi%C3%AAn-tr%E1%BB%A9ng-Omurice-banner.jpg?alt=media&token=1f515c7f-8fd7-414d-81e5-bfca2bb1569a',8,NULL),(11,'https://firebasestorage.googleapis.com/v0/b/cfos-captone.appspot.com/o/images%2Fistockphoto-1126656348-612x612.jpg?alt=media&token=1acc751e-ac41-4fef-8a60-92507c751cfb',9,NULL),(13,'https://firebasestorage.googleapis.com/v0/b/cfos-captone.appspot.com/o/images%2FDish%20image.png?alt=media&token=1cc2f584-df1d-47c5-b46d-cf1406084205',3,NULL),(14,'https://firebasestorage.googleapis.com/v0/b/cfos-captone.appspot.com/o/images%2FBeef-Fried-Rice-Recipe.jpg?alt=media&token=b4a69bbd-1b43-4519-86da-569026aae2e5',10,NULL),(15,'https://firebasestorage.googleapis.com/v0/b/cfos-captone.appspot.com/o/images%2Fistockphoto-529139494-612x612.jpg?alt=media&token=fbeeae32-1745-438e-beec-79adc6dd4d69',11,NULL),(16,'https://firebasestorage.googleapis.com/v0/b/cfos-captone.appspot.com/o/images%2Fistockphoto-476541008-612x612.jpg?alt=media&token=1275e3f4-fc29-4eb3-95c8-4eb3f34e441f',12,NULL),(17,'https://firebasestorage.googleapis.com/v0/b/cfos-captone.appspot.com/o/images%2Fistockphoto-1091798162-612x612.jpg?alt=media&token=96a6d301-d6cf-42d1-b37e-b0a0421005df',13,NULL),(18,'https://firebasestorage.googleapis.com/v0/b/cfos-captone.appspot.com/o/images%2Fistockphoto-1058029370-612x612.jpg?alt=media&token=f4e991d9-dd88-4ef6-b095-88bd83975c06',14,NULL),(19,'https://firebasestorage.googleapis.com/v0/b/cfos-captone.appspot.com/o/images%2Fistockphoto-953027148-612x612.jpg?alt=media&token=5abdc7c0-8bfb-4d7a-af28-a80f1c2dab84',15,NULL),(20,'https://firebasestorage.googleapis.com/v0/b/cfos-captone.appspot.com/o/images%2Fistockphoto-139900835-612x612.jpg?alt=media&token=b717fcbd-b573-4b4a-8b6d-120d0dc9ca82',16,NULL),(21,'https://firebasestorage.googleapis.com/v0/b/cfos-captone.appspot.com/o/images%2Fistockphoto-503129686-612x612.jpg?alt=media&token=48f65cd4-02a8-46ef-8e9d-85f58467e747',17,NULL),(22,'https://firebasestorage.googleapis.com/v0/b/cfos-captone.appspot.com/o/images%2Fistockphoto-527799355-612x612.jpg?alt=media&token=dd33523c-8cc9-4156-99c1-e13dd9426602',18,NULL),(23,'https://firebasestorage.googleapis.com/v0/b/cfos-captone.appspot.com/o/images%2Fistockphoto-690411730-612x612.jpg?alt=media&token=82979b05-f4e5-489e-92fa-6d1e7691d1e7',19,NULL),(25,'https://firebasestorage.googleapis.com/v0/b/cfos-captone.appspot.com/o/images%2Ftop-7-quan-tra-sua-milk-foam-beo-ngay-khien-teens-sai-gon-phat-cuong-d5267629636023760110505377.jpg?alt=media&token=cc55267d-73a1-4394-a749-3f94d87c8115',21,NULL),(26,'https://firebasestorage.googleapis.com/v0/b/cfos-captone.appspot.com/o/images%2Fbobapop.jpg?alt=media&token=8686b1b8-d7d1-43e7-97f5-ed2f912e9b53',22,NULL),(27,'https://firebasestorage.googleapis.com/v0/b/cfos-captone.appspot.com/o/images%2F4-3.png?alt=media&token=32893158-f655-452a-a1a5-a2c0144ea776',23,NULL),(28,'https://firebasestorage.googleapis.com/v0/b/cfos-captone.appspot.com/o/images%2F81peP%2BaGtTL._SY445_.jpg?alt=media&token=22388ba7-8de4-4082-9e14-98c2727a32ae',24,NULL),(29,'https://firebasestorage.googleapis.com/v0/b/cfos-captone.appspot.com/o/images%2Fistockphoto-537609644-612x612.jpg?alt=media&token=801f59c2-cd5a-481a-9a12-35aa99499721',25,NULL),(30,'https://firebasestorage.googleapis.com/v0/b/cfos-captone.appspot.com/o/images%2Fistockphoto-458464735-612x612.jpg?alt=media&token=4a0856df-6c95-483b-a7b3-2ea9d4e2248d',26,NULL),(31,'https://firebasestorage.googleapis.com/v0/b/cfos-captone.appspot.com/o/images%2Fnuoc-ngot-sa-xi-chuong-duong-lon-330ml-thung-24-3-org.jpg?alt=media&token=54fc9d30-db5e-49ad-af2a-657aac1d4ca8',27,NULL),(32,'https://firebasestorage.googleapis.com/v0/b/cfos-captone.appspot.com/o/images%2Fci-tiger-beer-87724a608d9633d4.jpeg?alt=media&token=ff6cfc13-5a4a-4cd6-a1d8-6b79eaa5843a',28,NULL),(36,'https://firebasestorage.googleapis.com/v0/b/cfos-captone.appspot.com/o/images%2F7af5defc-f881-4ae8-fb47-b5426c8eb48c.jpg?alt=media&token=fa991b1a-c2ac-4391-b80d-17d5b86cf5a6',29,NULL),(37,'https://firebasestorage.googleapis.com/v0/b/cfos-captone.appspot.com/o/images%2F698ddef6-d4e6-4d10-366b-eade43e97d31.jpg?alt=media&token=fd11bd24-34e8-4475-b850-1d91887c592c',30,NULL),(38,'https://firebasestorage.googleapis.com/v0/b/cfos-captone.appspot.com/o/images%2Fistockphoto-1160120384-612x612.jpg?alt=media&token=3d607b45-4800-4a50-9a90-923d2678e32f',31,NULL),(41,'https://firebasestorage.googleapis.com/v0/b/cfos-captone.appspot.com/o/images%2Fistockphoto-1149381471-612x612.jpg?alt=media&token=fa6c59ff-7d9b-419c-8141-291efe61ff97',34,NULL),(42,'https://firebasestorage.googleapis.com/v0/b/cfos-captone.appspot.com/o/images%2Fistockphoto-184340985-612x612.jpg?alt=media&token=bcc00f6f-8149-4858-8e53-ec2a49ecf8f0',35,NULL),(43,'https://firebasestorage.googleapis.com/v0/b/cfos-captone.appspot.com/o/images%2Fistockphoto-519282291-612x612.jpg?alt=media&token=75ec01bb-04ae-4b93-99a9-8b443fd768d0',36,NULL),(44,'https://firebasestorage.googleapis.com/v0/b/cfos-captone.appspot.com/o/images%2Fistockphoto-950855878-612x612.jpg?alt=media&token=e11635d7-2c91-4dff-883d-a64f4738a5f1',37,NULL),(45,'https://firebasestorage.googleapis.com/v0/b/cfos-captone.appspot.com/o/images%2Fistockphoto-183797216-612x612.jpg?alt=media&token=34eb84a0-528b-4302-b4ff-938bb73780d3',38,NULL),(46,'https://firebasestorage.googleapis.com/v0/b/cfos-captone.appspot.com/o/images%2Fistockphoto-182429926-612x612.jpg?alt=media&token=0ce27c7d-0330-4e3f-8824-30c6c3de7951',39,NULL),(47,'https://firebasestorage.googleapis.com/v0/b/cfos-captone.appspot.com/o/images%2Fistockphoto-183877299-612x612.jpg?alt=media&token=0c63f44a-0541-43e7-aad5-89f23cd01954',40,NULL),(48,'https://firebasestorage.googleapis.com/v0/b/cfos-captone.appspot.com/o/images%2Fistockphoto-185330686-612x612.jpg?alt=media&token=6ebddfc1-517a-4595-92db-c410d791e143',41,NULL),(49,'https://firebasestorage.googleapis.com/v0/b/cfos-captone.appspot.com/o/images%2Fistockphoto-174331976-612x612.jpg?alt=media&token=92062134-49f5-469f-a59f-7521fce78f6c',42,NULL),(50,'https://firebasestorage.googleapis.com/v0/b/cfos-captone.appspot.com/o/images%2Fhamburger-han-quoc-thanh-pham-ngon-600x400.jpg?alt=media&token=66e35f95-3fc2-4206-aa03-4937684e6641',43,NULL),(51,'https://firebasestorage.googleapis.com/v0/b/cfos-captone.appspot.com/o/images%2Fdepviet-19.jpg?alt=media&token=cd91206f-06e3-4547-b44f-9e272b73a119',44,NULL),(52,'https://firebasestorage.googleapis.com/v0/b/cfos-captone.appspot.com/o/images%2Fanh-2.jpg?alt=media&token=d7ccd30b-47f2-4182-bd41-f6db1f572b78',45,NULL),(54,'https://firebasestorage.googleapis.com/v0/b/cfos-captone.appspot.com/o/images%2Ftra-sua-bobapop-5.jpg?alt=media&token=98f47993-5ebc-460d-895c-0d1d2040d15f',20,NULL),(58,'https://firebasestorage.googleapis.com/v0/b/cfos-captone.appspot.com/o/images%2FKiosk%20banner%201.jpg?alt=media&token=8cc1ce48-7f30-4a82-9462-19a416a55d66',NULL,1),(59,'https://firebasestorage.googleapis.com/v0/b/cfos-captone.appspot.com/o/images%2Fmgm-grand-restaurants-food-court-architecture-exterior-01.jpg?alt=media&token=9b6237df-ab63-4bff-b484-b4096af02ccf',NULL,1),(60,'https://firebasestorage.googleapis.com/v0/b/cfos-captone.appspot.com/o/images%2Fweb_banner_1381x622px_KV-thang-8.jpg?alt=media&token=6259ae74-1483-4fb4-b795-004766d8c020',NULL,1);
/*!40000 ALTER TABLE `image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_detail`
--

DROP TABLE IF EXISTS `order_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_detail` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `status` varchar(255) DEFAULT NULL,
  `order_detail_number` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `total_price` double DEFAULT NULL,
  `block_id` bigint(20) DEFAULT NULL,
  `food_id` bigint(20) DEFAULT NULL,
  `order_id` bigint(20) DEFAULT NULL,
  `store_id` bigint(20) DEFAULT NULL,
  `order_detail_date` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKdm1i0kpycmpdu5o9gbi7tch84` (`block_id`),
  KEY `FKiyi4bmnb8vf4hdbbcduu43kin` (`food_id`),
  KEY `FKfsp5ble8x7djvw47r3jpfm4m2` (`order_id`),
  KEY `FKcanml0il0ojp5d77w4w5raaax` (`store_id`),
  CONSTRAINT `FKcanml0il0ojp5d77w4w5raaax` FOREIGN KEY (`store_id`) REFERENCES `store` (`id`),
  CONSTRAINT `FKdm1i0kpycmpdu5o9gbi7tch84` FOREIGN KEY (`block_id`) REFERENCES `block` (`id`),
  CONSTRAINT `FKfsp5ble8x7djvw47r3jpfm4m2` FOREIGN KEY (`order_id`) REFERENCES `order_food` (`id`),
  CONSTRAINT `FKiyi4bmnb8vf4hdbbcduu43kin` FOREIGN KEY (`food_id`) REFERENCES `food` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=209 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_detail`
--

LOCK TABLES `order_detail` WRITE;
/*!40000 ALTER TABLE `order_detail` DISABLE KEYS */;
INSERT INTO `order_detail` VALUES (6,'NOT_PAID',1,1,500000,111,1,6,1,NULL),(7,'NOT_PAID',2,1,250000,111,2,6,1,NULL),(8,'NOT_PAID',3,1,250000,111,2,7,1,NULL),(9,'PLACED',4,1,250000,111,2,8,1,NULL),(10,'PLACED',5,1,250000,111,2,9,1,NULL),(11,'PLACED',6,2,500000,112,2,10,1,NULL),(12,'NOT_PAID',7,1,250000,112,2,11,1,NULL),(13,'NOT_PAID',8,1,250000,112,7,11,1,NULL),(14,'NOT_PAID',9,1,250000,112,7,12,1,NULL),(15,'NOT_PAID',10,1,600000,112,4,13,3,NULL),(16,'NOT_PAID',11,1,250000,112,7,14,1,NULL),(17,'NOT_PAID',12,1,750000,112,5,15,4,NULL),(18,'NOT_PAID',13,1,250000,112,7,16,1,NULL),(19,'NOT_PAID',14,1,250000,112,7,17,1,NULL),(20,'NOT_PAID',15,1,250000,112,2,18,1,NULL),(21,'NOT_PAID',16,1,250000,125,2,19,1,NULL),(22,'NOT_PAID',17,1,250000,125,2,20,1,NULL),(23,'NOT_PAID',18,1,250000,125,2,21,1,NULL),(25,'PLACED',1,1,600000,10,4,24,3,NULL),(27,'PLACED',2,1,500000,10,1,25,1,NULL),(28,'PLACED',3,1,600000,21,4,26,3,NULL),(29,'PLACED',4,1,250000,22,2,27,1,NULL),(30,'PLACED',5,1,770000,74,21,28,5,NULL),(31,'PLACED',6,1,770000,74,21,29,5,NULL),(32,'PLACED',7,1,450000,75,3,30,1,NULL),(33,'PLACED',8,1,450000,75,3,31,1,NULL),(34,'PLACED',9,1,450000,75,3,32,1,NULL),(35,'PLACED',10,1,450000,75,3,33,1,NULL),(36,'PLACED',11,1,770000,75,21,34,5,NULL),(37,'PLACED',12,1,450000,75,3,34,1,NULL),(38,'PLACED',13,1,450000,75,3,35,1,NULL),(39,'PLACED',14,1,450000,75,3,36,1,NULL),(40,'PLACED',15,1,770000,75,21,37,5,NULL),(41,'NOT_PAID',16,1,770000,75,21,38,5,NULL),(42,'NOT_PAID',17,1,250000,75,7,38,1,NULL),(43,'NOT_PAID',18,1,450000,75,3,39,1,NULL),(44,'PLACED',19,1,770000,75,21,40,5,NULL),(45,'PLACED',20,1,770000,76,21,41,5,NULL),(46,'PLACED',21,1,770000,82,21,42,5,NULL),(47,'PLACED',22,1,770000,82,21,43,5,NULL),(48,'PLACED',23,1,0,82,30,43,2,NULL),(49,'PLACED',24,1,500000,85,1,44,1,NULL),(50,'PLACED',25,1,770000,85,21,44,5,NULL),(51,'PLACED',26,1,0,85,20,45,5,NULL),(52,'PLACED',27,1,450000,86,3,46,1,NULL),(53,'PLACED',28,1,500000,86,29,47,2,NULL),(54,'PLACED',29,1,450000,86,3,48,1,NULL),(55,'PLACED',30,1,770000,86,21,49,5,NULL),(56,'NOT_PAID',31,1,450000,113,3,50,1,NULL),(57,'NOT_PAID',32,1,450000,113,3,51,1,NULL),(58,'NOT_PAID',33,1,450000,114,3,52,1,NULL),(59,'NOT_PAID',34,1,770000,114,21,52,5,NULL),(60,'NOT_PAID',35,1,500000,114,29,52,2,NULL),(61,'NOT_PAID',36,1,500000,115,29,53,2,NULL),(62,'NOT_PAID',37,1,0,115,30,54,2,NULL),(63,'NOT_PAID',38,1,500000,115,29,55,2,NULL),(64,'NOT_PAID',39,1,770000,115,21,56,5,NULL),(65,'NOT_PAID',40,1,500000,115,29,57,2,NULL),(66,'NOT_PAID',41,1,450000,115,3,58,1,NULL),(67,'NOT_PAID',42,1,770000,117,21,59,5,NULL),(68,'NOT_PAID',43,1,770000,117,21,60,5,NULL),(69,'NOT_PAID',44,1,450000,117,3,61,1,NULL),(70,'NOT_PAID',45,1,450000,117,3,62,1,NULL),(71,'NOT_PAID',46,1,500000,118,29,63,2,NULL),(72,'NOT_PAID',47,1,500000,118,29,64,2,NULL),(73,'NOT_PAID',48,1,500000,118,29,65,2,NULL),(74,'NOT_PAID',49,1,500000,120,1,66,1,NULL),(75,'NOT_PAID',50,1,450000,134,3,67,1,NULL),(76,'NOT_PAID',51,1,500000,134,29,68,2,NULL),(77,'NOT_PAID',52,1,770000,135,21,69,5,NULL),(78,'PLACED',53,1,450000,135,3,70,1,NULL),(80,'NOT_PAID',1,1,450000,17,3,72,1,NULL),(81,'NOT_PAID',2,1,770000,17,21,72,5,NULL),(82,'NOT_PAID',3,1,500000,17,1,72,1,NULL),(83,'NOT_PAID',4,1,0,17,34,72,1,NULL),(84,'PLACED',5,1,450000,120,3,73,1,NULL),(86,'CANCELLED',1,1,500000,104,1,75,1,NULL),(87,NULL,0,0,0,NULL,NULL,NULL,NULL,NULL),(88,'NOT_PAID',1,1,500000,12,1,77,1,NULL),(89,'PLACED',2,1,500000,15,1,78,1,NULL),(90,'PLACED',3,1,250000,15,2,78,3,NULL),(91,'PLACED',4,1,70000,16,1,79,1,NULL),(92,'PLACED',5,2,90000,20,1,80,1,NULL),(93,'PLACED',6,3,19400,20,25,81,1,NULL),(94,'NOT_PAID',7,4,77600,20,25,82,1,NULL),(95,'GUEST_CANCEL_PAID',8,1,70000,88,1,83,1,NULL),(96,'READY',9,1,56000,88,20,83,5,'2019-08-12 14:52:22.062000'),(97,'READY',10,1,70000,90,1,84,1,'2019-08-12 15:03:24.413000'),(98,'GUEST_CANCEL_PAID',11,1,24250,90,24,84,1,NULL),(99,'GUEST_CANCEL_PAID',12,1,19400,90,25,84,1,NULL),(100,'GUEST_CANCEL_PAID',13,1,14550,90,26,84,1,NULL),(101,'READY',14,1,70000,91,1,85,1,'2019-08-12 15:25:17.966000'),(102,'READY',15,1,56000,91,20,85,5,'2019-08-12 15:25:17.989000'),(103,'NOT_PAID',16,1,60500,93,3,86,1,NULL),(104,'NOT_PAID',17,2,180000,93,31,86,1,NULL),(105,'NOT_PAID',18,1,50500,93,13,86,1,NULL),(106,'NOT_PAID',19,1,14550,93,26,86,1,NULL),(107,'NOT_PAID',20,1,9400,93,25,86,1,NULL),(108,'READY',21,1,25500,93,3,87,1,'2019-08-12 16:45:58.742000'),(109,'READY',22,1,40500,93,17,87,1,'2019-08-12 16:45:58.795000'),(110,'READY',23,1,80000,93,31,87,1,'2019-08-12 16:45:58.839000'),(111,'READY',24,1,66220,93,12,87,1,'2019-08-12 16:45:58.879000'),(112,'READY',25,1,69500,93,18,87,1,'2019-08-12 16:45:58.915000'),(113,'READY',26,2,121000,93,13,87,1,'2019-08-12 16:45:58.952000'),(114,'GUEST_CANCEL',27,1,45000,93,1,88,1,NULL),(120,'GUEST_CANCEL',28,1,45000,93,1,94,1,NULL),(132,'GUEST_CANCEL',29,1,45000,93,1,106,1,NULL),(172,'READY',30,1,500000,94,1,146,1,'2019-08-12 16:23:44.444000'),(173,'READY',31,1,500000,94,1,147,1,'2019-08-12 16:23:46.882000'),(174,'READY',32,1,450000,94,17,147,1,'2019-08-12 16:23:46.904000'),(175,'READY',33,1,1078000,94,12,147,1,'2019-08-12 16:23:46.927000'),(176,'READY',34,1,45000,94,26,147,1,'2019-08-12 16:23:46.950000'),(177,'PLACED',35,1,250000,94,2,148,3,NULL),(178,'READY',36,1,500000,95,1,149,1,'2019-08-12 16:16:57.594000'),(179,'READY',37,1,450000,95,3,150,1,'2019-08-12 16:16:59.843000'),(180,'READY',38,1,450000,95,17,150,1,'2019-08-12 16:16:59.891000'),(181,'READY',39,1,0,95,31,150,1,'2019-08-12 16:16:59.926000'),(182,'READY',40,1,45000,97,1,151,1,'2019-08-12 16:17:06.236000'),(183,'READY',41,1,45000,97,1,152,1,'2019-08-12 16:19:02.946000'),(184,'READY',42,1,500000,97,1,153,1,'2019-08-12 16:19:06.851000'),(185,'READY',43,1,250000,97,2,153,3,'2019-08-12 16:19:06.889000'),(186,'READY',44,1,450000,97,3,153,1,'2019-08-12 16:19:06.930000'),(187,'READY',45,1,600000,97,4,153,3,'2019-08-12 16:19:06.963000'),(188,'CANCELLED',46,1,0,98,31,154,1,'2019-08-12 16:45:51.959000'),(189,'CANCELLED',47,1,45000,98,20,155,5,'2019-08-12 16:34:44.601000'),(190,'READY',48,1,500000,98,1,156,1,'2019-08-12 16:46:05.315000'),(191,'PLACED',49,1,45000,99,1,157,1,NULL),(192,'PLACED',50,1,112500,100,35,158,1,NULL),(193,'PLACED',51,1,154000,100,36,159,1,NULL),(194,'PLACED',52,1,25500,100,13,160,1,NULL),(195,'PLACED',53,1,46200,101,14,161,1,NULL),(196,'PLACED',54,1,25500,101,13,162,1,NULL),(197,'PLACED',55,1,25500,101,13,163,1,NULL),(198,'READY',56,1,66220,101,12,164,1,'2019-08-12 16:58:10.721000'),(199,'PLACED',57,1,46200,103,14,165,1,NULL),(200,'PLACED',58,1,59500,104,18,166,1,NULL),(201,'PLACED',59,1,42500,104,5,167,4,NULL),(202,'PLACED',60,1,45000,104,1,168,1,NULL),(203,'PLACED',61,1,25500,104,3,168,1,NULL),(204,'PLACED',62,1,66220,104,12,168,1,NULL),(205,'PLACED',63,1,14550,104,26,169,1,NULL),(206,'PLACED',64,1,43000,114,8,170,3,NULL),(207,'PLACED',65,1,50500,113,3,171,1,NULL),(208,'PLACED',66,2,91000,117,13,172,1,NULL);
/*!40000 ALTER TABLE `order_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_detail_food_option`
--

DROP TABLE IF EXISTS `order_detail_food_option`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_detail_food_option` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `quantity` int(11) DEFAULT NULL,
  `food_option_id` bigint(20) DEFAULT NULL,
  `order_detail_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKe1x4mdt0rwt7p65eq2xbfpec8` (`food_option_id`),
  KEY `FKp0gyyraiv6srkt8bf1okrbkfb` (`order_detail_id`),
  CONSTRAINT `FKe1x4mdt0rwt7p65eq2xbfpec8` FOREIGN KEY (`food_option_id`) REFERENCES `food_option` (`id`),
  CONSTRAINT `FKp0gyyraiv6srkt8bf1okrbkfb` FOREIGN KEY (`order_detail_id`) REFERENCES `order_detail` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_detail_food_option`
--

LOCK TABLES `order_detail_food_option` WRITE;
/*!40000 ALTER TABLE `order_detail_food_option` DISABLE KEYS */;
INSERT INTO `order_detail_food_option` VALUES (1,1,2,88),(2,1,3,88),(3,1,2,90),(4,1,3,90),(5,1,2,91),(6,1,3,91),(7,0,8,93),(8,0,8,94),(9,1,2,95),(10,1,3,95),(11,0,50,96),(12,0,32,96),(13,0,42,96),(14,1,71,96),(15,1,72,96),(16,1,2,97),(17,1,3,97),(18,0,14,98),(19,0,8,99),(20,0,21,100),(21,1,2,101),(22,1,3,101),(23,0,50,102),(24,0,31,102),(25,0,41,102),(26,1,71,102),(27,1,72,102),(28,1,2,103),(29,1,3,103),(30,1,4,103),(31,1,4,104),(32,1,3,105),(33,1,4,105),(34,0,22,106),(35,0,7,107),(36,0,17,107),(37,1,4,112),(38,1,2,113),(39,1,3,113),(40,1,4,113),(41,1,2,173),(42,1,3,173),(43,1,3,174),(44,1,4,174),(45,1,2,175),(46,1,3,175),(47,1,4,175),(48,0,8,176),(49,0,23,176),(50,1,2,178),(51,1,3,178),(52,1,3,180),(53,1,4,180),(54,1,4,181),(55,1,2,207),(56,1,3,207),(57,2,4,208);
/*!40000 ALTER TABLE `order_detail_food_option` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_food`
--

DROP TABLE IF EXISTS `order_food`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_food` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `order_date` datetime(6) DEFAULT NULL,
  `order_number` int(11) DEFAULT NULL,
  `original_price` double DEFAULT NULL,
  `schedule_time` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `total_order` double DEFAULT NULL,
  `cus_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK2rxyvskco6311d6luhqqfic1j` (`cus_id`),
  CONSTRAINT `FK2rxyvskco6311d6luhqqfic1j` FOREIGN KEY (`cus_id`) REFERENCES `customer` (`customer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=173 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_food`
--

LOCK TABLES `order_food` WRITE;
/*!40000 ALTER TABLE `order_food` DISABLE KEYS */;
INSERT INTO `order_food` VALUES (6,'2019-08-05 18:32:06.134000',1,100000,NULL,'ORDER_GUEST',92500,NULL),(7,'2019-08-05 18:34:22.695000',2,50000,NULL,'ORDER_GUEST',47500,NULL),(8,'2019-08-05 18:35:56.101000',3,50000,NULL,'ORDER_GUEST_PAID',47500,NULL),(9,'2019-08-05 18:37:19.577000',4,50000,NULL,'ORDER_GUEST_PAID',47500,NULL),(10,'2019-08-05 18:41:21.088000',5,100000,NULL,'ORDER_GUEST_PAID',95000,NULL),(11,'2019-08-05 18:42:15.896000',6,75000,NULL,'ORDER_GUEST',70000,NULL),(12,'2019-08-05 18:43:20.408000',7,25000,NULL,'ORDER_GUEST',22500,NULL),(13,'2019-08-05 18:43:47.194000',8,40000,NULL,'ORDER_GUEST',34000,NULL),(14,'2019-08-05 18:44:21.552000',9,25000,NULL,'ORDER_GUEST',22500,NULL),(15,'2019-08-05 18:44:56.080000',10,50000,NULL,'ORDER_GUEST',42500,NULL),(16,'2019-08-05 18:45:39.257000',11,25000,NULL,'ORDER_GUEST',22500,NULL),(17,'2019-08-05 18:46:11.560000',12,25000,NULL,'ORDER_GUEST',22500,NULL),(18,'2019-08-05 18:48:47.283000',13,50000,NULL,'ORDER_GUEST',47500,NULL),(19,'2019-08-05 20:57:20.231000',14,50000,NULL,'ORDER_GUEST',47500,NULL),(20,'2019-08-05 20:57:49.961000',15,50000,NULL,'ORDER_GUEST',47500,NULL),(21,'2019-08-05 20:58:13.204000',16,50000,NULL,'ORDER_GUEST',47500,NULL),(24,'2019-08-06 01:43:57.285000',1,40000,NULL,'ORDER_CUSTOMER',34000,'CUS_9'),(25,'2019-08-06 01:44:35.510000',2,50000,NULL,'ORDER_GUEST_PAID',45000,NULL),(26,'2019-08-06 03:37:12.662000',3,40000,NULL,'ORDER_GUEST_PAID',34000,NULL),(27,'2019-08-06 03:42:20.168000',4,50000,NULL,'ORDER_GUEST_PAID',47500,NULL),(28,'2019-08-06 12:28:31.273000',5,55000,NULL,'ORDER_CUSTOMER',47300,'CUS_10'),(29,'2019-08-06 12:29:18.131000',6,55000,NULL,'ORDER_CUSTOMER',47300,'CUS_10'),(30,'2019-08-06 12:30:16.294000',7,30000,NULL,'ORDER_CUSTOMER',25500,'CUS_10'),(31,'2019-08-06 12:30:18.004000',8,30000,NULL,'ORDER_CUSTOMER',25500,'CUS_10'),(32,'2019-08-06 12:30:39.508000',9,30000,NULL,'ORDER_CUSTOMER',25500,'CUS_10'),(33,'2019-08-06 12:31:10.384000',10,30000,NULL,'ORDER_CUSTOMER',25500,'CUS_10'),(34,'2019-08-06 12:33:35.315000',11,85000,NULL,'ORDER_CUSTOMER',72800,'CUS_9'),(35,'2019-08-06 12:34:00.517000',12,30000,NULL,'ORDER_CUSTOMER',25500,'CUS_9'),(36,'2019-08-06 12:35:11.747000',13,30000,NULL,'ORDER_CUSTOMER',25500,'CUS_9'),(37,'2019-08-06 12:36:12.923000',14,55000,NULL,'ORDER_CUSTOMER',47300,'CUS_9'),(38,'2019-08-06 12:36:50.499000',15,80000,NULL,'ORDER_GUEST',69800,NULL),(39,'2019-08-06 12:39:20.700000',16,30000,NULL,'ORDER_GUEST',25500,NULL),(40,'2019-08-06 12:39:42.651000',17,55000,NULL,'ORDER_CUSTOMER',47300,'CUS_9'),(41,'2019-08-06 12:40:42.155000',18,55000,NULL,'ORDER_CUSTOMER',47300,'CUS_9'),(42,'2019-08-06 13:45:53.853000',19,55000,NULL,'ORDER_CUSTOMER',47300,'CUS_9'),(43,'2019-08-06 13:48:13.349000',20,95000,NULL,'ORDER_CUSTOMER',87300,'CUS_9'),(44,'2019-08-06 14:10:35.028000',21,105000,NULL,'ORDER_CUSTOMER',92300,'CUS_9'),(45,'2019-08-06 14:13:21.154000',22,45000,NULL,'ORDER_CUSTOMER',45000,'CUS_9'),(46,'2019-08-06 14:26:08.651000',23,30000,NULL,'ORDER_CUSTOMER',25500,'CUS_9'),(47,'2019-08-06 14:26:46.979000',24,50000,NULL,'ORDER_CUSTOMER',45000,'CUS_9'),(48,'2019-08-06 14:27:27.572000',25,30000,NULL,'ORDER_CUSTOMER',25500,'CUS_9'),(49,'2019-08-06 14:28:27.528000',26,55000,NULL,'ORDER_CUSTOMER',47300,'CUS_9'),(50,'2019-08-07 18:56:27.384000',27,30000,NULL,'ORDER_GUEST',25500,NULL),(51,'2019-08-07 18:56:52.512000',28,30000,NULL,'ORDER_GUEST',25500,NULL),(52,'2019-08-07 19:09:28.152000',29,135000,NULL,'ORDER_GUEST',117800,NULL),(53,'2019-08-07 19:10:02.590000',30,50000,NULL,'ORDER_GUEST',45000,NULL),(54,'2019-08-07 19:11:15.659000',31,40000,NULL,'ORDER_GUEST',40000,NULL),(55,'2019-08-07 19:13:22.375000',32,50000,NULL,'ORDER_GUEST',45000,NULL),(56,'2019-08-07 19:13:58.748000',33,55000,NULL,'ORDER_GUEST',47300,NULL),(57,'2019-08-07 19:15:17.055000',34,50000,NULL,'ORDER_GUEST',45000,NULL),(58,'2019-08-07 19:17:07.278000',35,30000,NULL,'ORDER_GUEST',25500,NULL),(59,'2019-08-07 19:31:56.172000',36,55000,NULL,'ORDER_GUEST',47300,NULL),(60,'2019-08-07 19:33:10.913000',37,55000,NULL,'ORDER_GUEST',47300,NULL),(61,'2019-08-07 19:35:40.867000',38,30000,NULL,'ORDER_GUEST',25500,NULL),(62,'2019-08-07 19:36:40.240000',39,30000,NULL,'ORDER_GUEST',25500,NULL),(63,'2019-08-07 19:45:29.451000',40,50000,NULL,'ORDER_GUEST',45000,NULL),(64,'2019-08-07 19:46:32.229000',41,50000,NULL,'ORDER_GUEST',45000,NULL),(65,'2019-08-07 19:47:42.220000',42,50000,NULL,'ORDER_GUEST',45000,NULL),(66,'2019-08-07 20:07:28.921000',43,50000,NULL,'ORDER_GUEST',45000,NULL),(67,'2019-08-07 22:28:53.501000',44,30000,NULL,'ORDER_GUEST',25500,NULL),(68,'2019-08-07 22:29:21.670000',45,50000,NULL,'ORDER_GUEST',45000,NULL),(69,'2019-08-07 22:30:39.319000',46,55000,NULL,'ORDER_GUEST',47300,NULL),(70,'2019-08-07 22:35:15.427000',47,30000,NULL,'ORDER_GUEST_PAID',25500,NULL),(72,'2019-08-08 02:53:42.616000',1,255000,NULL,'ORDER_GUEST',237800,NULL),(73,'2019-08-08 20:02:50.675000',2,30000,NULL,'ORDER_GUEST_PAID',25500,NULL),(75,'2019-08-10 17:22:28.888000',1,50000,NULL,'ORDER_GUEST_PAID',45000,NULL),(76,NULL,0,0,NULL,NULL,0,NULL),(77,'2019-08-11 02:09:35.985000',1,75000,NULL,'ORDER_GUEST',70000,NULL),(78,'2019-08-11 02:33:32.114000',2,125000,NULL,'ORDER_GUEST_PAID',117500,NULL),(79,'2019-08-11 02:42:40.460000',3,75000,NULL,'ORDER_GUEST_PAID',70000,NULL),(80,'2019-08-11 03:24:27.232000',4,100000,NULL,'ORDER_GUEST_PAID',90000,NULL),(81,'2019-08-11 03:25:13.032000',5,60000,NULL,'ORDER_GUEST_PAID',58200,NULL),(82,'2019-08-11 03:27:46.621000',6,80000,NULL,'ORDER_GUEST',77600,NULL),(83,'2019-08-12 14:45:33.898000',7,131000,NULL,'ORDER_GUEST_PAID',126000,NULL),(84,'2019-08-12 15:00:53.901000',8,135000,NULL,'ORDER_GUEST_PAID',128200,NULL),(85,'2019-08-12 15:19:24.235000',9,131000,NULL,'ORDER_GUEST_PAID',126000,NULL),(86,'2019-08-12 15:33:42.930000',10,325000,NULL,'ORDER_GUEST',314950,NULL),(87,'2019-08-12 15:34:22.230000',11,442000,NULL,'ORDER_GUEST_PAID',402720,NULL),(88,'2019-08-12 15:35:55.798000',12,50000,NULL,'ORDER_GUEST_PAID',45000,NULL),(94,'2019-08-12 15:35:55.916000',13,50000,NULL,'ORDER_GUEST_PAID',45000,NULL),(100,'2019-08-12 15:35:56.039000',13,50000,NULL,'ORDER_GUEST_PAID',45000,NULL),(106,'2019-08-12 15:35:56.128000',14,50000,NULL,'ORDER_GUEST_PAID',45000,NULL),(146,'2019-08-12 15:40:11.167000',15,50000,NULL,'ORDER_GUEST_PAID',45000,NULL),(147,'2019-08-12 15:40:55.439000',16,277000,NULL,'ORDER_GUEST_PAID',256270,NULL),(148,'2019-08-12 15:49:39.260000',17,50000,NULL,'ORDER_GUEST_PAID',47500,NULL),(149,'2019-08-12 15:57:32.883000',18,75000,NULL,'ORDER_CUSTOMER',70000,'CUS_9'),(150,'2019-08-12 15:58:10.053000',19,190000,NULL,'ORDER_CUSTOMER',181000,'CUS_9'),(151,'2019-08-12 16:13:03.199000',20,50000,NULL,'ORDER_CUSTOMER',45000,'CUS_1'),(152,'2019-08-12 16:17:37.033000',21,50000,NULL,'ORDER_CUSTOMER',45000,'CUS_1'),(153,'2019-08-12 16:18:02.337000',22,170000,NULL,'ORDER_CUSTOMER',152000,'CUS_9'),(154,'2019-08-12 16:26:32.521000',23,80000,NULL,'ORDER_CUSTOMER',80000,'CUS_9'),(155,'2019-08-12 16:28:15.495000',24,45000,NULL,'ORDER_CUSTOMER',45000,'CUS_1'),(156,'2019-08-12 16:29:35.584000',25,50000,NULL,'ORDER_CUSTOMER',45000,'CUS_9'),(157,'2019-08-12 16:31:21.766000',26,50000,NULL,'ORDER_CUSTOMER',45000,'CUS_9'),(158,'2019-08-12 16:40:09.537000',27,150000,NULL,'ORDER_CUSTOMER',112500,'CUS_1'),(159,'2019-08-12 16:46:00.681000',28,200000,NULL,'ORDER_CUSTOMER',154000,'CUS_1'),(160,'2019-08-12 16:49:29.611000',29,30000,NULL,'ORDER_CUSTOMER',25500,'CUS_1'),(161,'2019-08-12 16:50:31.113000',30,55000,NULL,'ORDER_CUSTOMER',46200,'CUS_1'),(162,'2019-08-12 16:54:03.623000',31,30000,NULL,'ORDER_CUSTOMER',25500,'CUS_1'),(163,'2019-08-12 16:56:46.567000',32,30000,NULL,'ORDER_CUSTOMER',25500,'CUS_1'),(164,'2019-08-12 16:57:42.115000',33,77000,NULL,'ORDER_CUSTOMER',66220,'CUS_1'),(165,'2019-08-12 17:17:47.625000',34,55000,NULL,'ORDER_CUSTOMER',46200,'CUS_1'),(166,'2019-08-12 17:20:39.225000',35,70000,NULL,'ORDER_CUSTOMER',59500,'CUS_1'),(167,'2019-08-12 17:21:28.001000',36,50000,NULL,'ORDER_CUSTOMER',42500,'CUS_1'),(168,'2019-08-12 17:24:44.806000',37,157000,NULL,'ORDER_CUSTOMER',136720,'CUS_1'),(169,'2019-08-12 17:26:04.364000',38,15000,NULL,'ORDER_CUSTOMER',14550,'CUS_1'),(170,'2019-08-12 17:41:58.450000',39,50000,'19:00','ORDER_CUSTOMER',43000,'CUS_1'),(171,'2019-08-12 17:44:43.238000',40,55000,'18:50','ORDER_CUSTOMER',50500,'CUS_1'),(172,'2019-08-12 17:46:34.398000',41,100000,'19:30','ORDER_CUSTOMER',91000,'CUS_1');
/*!40000 ALTER TABLE `order_food` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_token`
--

DROP TABLE IF EXISTS `password_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_token` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `expiry_date` datetime(6) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `user_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKm1ug9u624tahdket1qqn0s9cg` (`user_id`),
  CONSTRAINT `FKm1ug9u624tahdket1qqn0s9cg` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_token`
--

LOCK TABLES `password_token` WRITE;
/*!40000 ALTER TABLE `password_token` DISABLE KEYS */;
INSERT INTO `password_token` VALUES (1,'2019-08-05 16:25:06.149000','62bb22be-3551-4b82-a09f-55c226680400',2),(2,'2019-08-05 16:29:21.525000','8649597a-e5bd-4fe7-90e2-22af358e9449',3),(3,'2019-08-05 17:03:00.117000','49d0bf1d-7c55-47fb-b9d7-18eb298fc975',4),(4,'2019-08-05 17:03:56.496000','2c736ef6-1331-4da6-856c-7d6a53c2326a',5),(5,'2019-08-05 17:10:44.349000','f00c2a4c-00ce-4567-aed4-5f1bf4cac9a5',6),(6,'2019-08-05 22:59:42.053000','4442715a-ed51-41f4-9355-bf06d3535307',7),(7,'2019-08-05 23:17:36.453000','a775a5b1-4100-442b-8c9c-337fda65520a',8),(8,'2019-08-05 23:25:16.810000','a7fc382e-1af0-45fd-801e-e9cb5cd68b66',9),(9,'2019-08-06 02:04:35.254000','5ba3006f-93f8-4d45-8e35-714a86266376',10),(10,'2019-08-10 04:17:31.288000','bd29e2c8-f989-420f-a3de-7ec28b7885bc',11),(11,'2019-08-10 04:25:41.099000','8576744a-5f15-455a-b412-b4697b149b83',12),(12,'2019-08-10 16:52:04.537000','ec1c049e-cb69-4f6f-a213-654a20e95b92',13),(13,'2019-08-10 17:55:04.008000','15827428-6797-4b34-b8cc-eb2d09d0bb11',14),(14,'2019-08-12 15:21:38.476000','1aa2ba0c-eae8-4daa-ab34-bbf2ce283830',15);
/*!40000 ALTER TABLE `password_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'SYSTEM_ADMIN'),(2,'FOOD_COURT_MANAGER'),(3,'CASHIER'),(4,'STORE_MANAGER'),(5,'CHEF');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `statistic`
--

DROP TABLE IF EXISTS `statistic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `statistic` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `day` datetime(6) DEFAULT NULL,
  `total_items` int(11) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `total` double DEFAULT NULL,
  `store_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKo5074us1sb5r46baw61i3kr9f` (`store_id`),
  CONSTRAINT `FKo5074us1sb5r46baw61i3kr9f` FOREIGN KEY (`store_id`) REFERENCES `store` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `statistic`
--

LOCK TABLES `statistic` WRITE;
/*!40000 ALTER TABLE `statistic` DISABLE KEYS */;
INSERT INTO `statistic` VALUES (1,'2019-08-05 23:59:00.000000',0,'DAY',0,1),(2,'2019-08-05 23:59:00.000000',0,'DAY',0,2),(3,'2019-08-05 23:59:00.000000',0,'DAY',0,3),(4,'2019-08-05 23:59:00.000000',0,'DAY',0,4),(5,'2019-08-05 23:59:00.000000',0,'DAY',0,5),(6,'2019-08-07 23:59:00.000000',0,'DAY',0,1),(7,'2019-08-07 23:59:00.000000',0,'DAY',0,2),(8,'2019-08-07 23:59:00.000000',0,'DAY',0,3),(9,'2019-08-07 23:59:00.000000',0,'DAY',0,4),(10,'2019-08-07 23:59:00.000000',0,'DAY',0,5),(11,'2019-08-08 23:59:00.000000',0,'DAY',0,1),(12,'2019-08-08 23:59:00.000000',0,'DAY',0,2),(13,'2019-08-08 23:59:00.000000',0,'DAY',0,3),(14,'2019-08-08 23:59:00.000000',0,'DAY',0,4),(15,'2019-08-08 23:59:00.000000',0,'DAY',0,5),(16,'2019-08-09 23:59:00.000000',0,'DAY',0,1),(17,'2019-08-09 23:59:00.000000',0,'DAY',0,2),(18,'2019-08-09 23:59:00.000000',0,'DAY',0,3),(19,'2019-08-09 23:59:00.000000',0,'DAY',0,4),(20,'2019-08-09 23:59:00.000000',0,'DAY',0,5),(21,'2019-08-10 23:59:00.000000',0,'DAY',0,1),(22,'2019-08-10 23:59:00.000000',0,'DAY',0,2),(23,'2019-08-10 23:59:00.000000',0,'DAY',0,3),(24,'2019-08-10 23:59:00.000000',0,'DAY',0,4),(25,'2019-08-10 23:59:00.000000',0,'DAY',0,5),(26,'2019-08-10 23:59:00.000000',0,'DAY',0,6),(27,'2019-08-10 23:59:00.000000',0,'DAY',0,7),(28,'2019-08-10 23:59:00.000000',0,'DAY',0,8);
/*!40000 ALTER TABLE `statistic` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `store`
--

DROP TABLE IF EXISTS `store`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `store` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `active` bit(1) DEFAULT NULL,
  `food_per_block` int(11) DEFAULT NULL,
  `revenue` double DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `fc_id` bigint(20) DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `number` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKfv9q5xsy4sv9hs2dtdysc6jc6` (`fc_id`),
  CONSTRAINT `FKfv9q5xsy4sv9hs2dtdysc6jc6` FOREIGN KEY (`fc_id`) REFERENCES `food_court` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `store`
--

LOCK TABLES `store` WRITE;
/*!40000 ALTER TABLE `store` DISABLE KEYS */;
INSERT INTO `store` VALUES (1,_binary '',30,0,'1','https://firebasestorage.googleapis.com/v0/b/cfos-captone.appspot.com/o/images%2F1415853278_logo_-%C3%A6a%C2%A6%C3%A2_chi%C2%A6%C3%ABnh-022.png?alt=media&token=4cc17cd5-e2d7-4e23-8621-593e306c8fe5','Nàng gánh',1,'https://firebasestorage.googleapis.com/v0/b/cfos-captone.appspot.com/o/images%2F1415853278_logo_-%C3%A6a%C2%A6%C3%A2_chi%C2%A6%C3%ABnh-022.png?alt=media&token=122bf4d4-3fb8-4196-8495-122f76fe0eae',1),(2,_binary '',50,0,'12','https://firebasestorage.googleapis.com/v0/b/cfos-captone.appspot.com/o/images%2F26055953_2054749324758874_1229307957753469253_n.png?alt=media&token=bff92536-62e4-45d6-b859-393f7c6537fe','Gong cha',1,'https://firebasestorage.googleapis.com/v0/b/cfos-captone.appspot.com/o/images%2F26055953_2054749324758874_1229307957753469253_n.png?alt=media&token=fbf7162a-ef80-4bed-a53c-f314aebac139',2),(3,_binary '',10,0,'dsa','https://firebasestorage.googleapis.com/v0/b/cfos-captone.appspot.com/o/images%2FBistro-Logo.png?alt=media&token=72c6bce2-f8de-4e0f-b1e8-321f143d4d12','Bistro',1,'https://firebasestorage.googleapis.com/v0/b/cfos-captone.appspot.com/o/images%2FBistro-Logo.png?alt=media&token=57d39f06-fc9b-4fd5-8b27-b85c87bda0ef',3),(4,_binary '',15,0,'1','https://firebasestorage.googleapis.com/v0/b/cfos-captone.appspot.com/o/images%2Fthiet-ke-logo-nha-hang-06.jpg?alt=media&token=f0733fcc-9e6b-44d3-91eb-25d16bfa1456','Món Việt',1,'https://firebasestorage.googleapis.com/v0/b/cfos-captone.appspot.com/o/images%2Fthiet-ke-logo-nha-hang-06.jpg?alt=media&token=e1fd037d-2ba1-4f94-ab14-167a1080736f',4),(5,_binary '',40,0,'1','https://firebasestorage.googleapis.com/v0/b/cfos-captone.appspot.com/o/images%2F1(24).jpg?alt=media&token=7cc7318f-7ce6-4218-ab2e-46b52e1fe110','Bobapop',1,'https://firebasestorage.googleapis.com/v0/b/cfos-captone.appspot.com/o/images%2F1(24).jpg?alt=media&token=bb0eb4b9-d551-44a2-849d-9a64b5ef10be',5),(6,_binary '',20,0,'1','https://firebasestorage.googleapis.com/v0/b/cfos-captone.appspot.com/o/images%2F1369816717Logo%20Qua%20Ngon%2028-05-2012.jpg?alt=media&token=41869ef7-b833-4ed3-8b4a-99fcfa9af8bf','Quá ngon',2,'https://firebasestorage.googleapis.com/v0/b/cfos-captone.appspot.com/o/images%2F1369816717Logo%20Qua%20Ngon%2028-05-2012.jpg?alt=media&token=36980aca-ad59-4963-a4c3-14ff32692551',1),(7,_binary '',12,0,'1','https://firebasestorage.googleapis.com/v0/b/cfos-captone.appspot.com/o/images%2F1(24).jpg?alt=media&token=e3798d0b-070a-4f5a-b7b7-0640029c4da4','Bobapop',2,'https://firebasestorage.googleapis.com/v0/b/cfos-captone.appspot.com/o/images%2F1(24).jpg?alt=media&token=dae4523a-e4e5-4f1b-a104-e02b5f6cd730',1),(8,_binary '',12,0,'1','https://firebasestorage.googleapis.com/v0/b/cfos-captone.appspot.com/o/images%2Flogo-nha-hang15.jpg?alt=media&token=938c54e6-cb56-4c30-a8a0-a65ca2a9c8e6','Hoàng Yến',1,'https://firebasestorage.googleapis.com/v0/b/cfos-captone.appspot.com/o/images%2Flogo-nha-hang15.jpg?alt=media&token=79b516b5-6d8f-49c0-ad72-84b06b8799b7',6);
/*!40000 ALTER TABLE `store` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction`
--

DROP TABLE IF EXISTS `transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaction` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `status` varchar(255) DEFAULT NULL,
  `date` datetime(6) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `total` double DEFAULT NULL,
  `cus_id` varchar(255) DEFAULT NULL,
  `emp_id` varchar(255) DEFAULT NULL,
  `order_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKd1eqjhyskud9xsqx1caesf2gf` (`cus_id`),
  KEY `FKahux8sltpbjc4cg9x5d56r3ob` (`emp_id`),
  KEY `FKplkl7iq5qub6iry4ik05h83mo` (`order_id`),
  CONSTRAINT `FKahux8sltpbjc4cg9x5d56r3ob` FOREIGN KEY (`emp_id`) REFERENCES `employee` (`emp_id`),
  CONSTRAINT `FKd1eqjhyskud9xsqx1caesf2gf` FOREIGN KEY (`cus_id`) REFERENCES `customer` (`customer_id`),
  CONSTRAINT `FKplkl7iq5qub6iry4ik05h83mo` FOREIGN KEY (`order_id`) REFERENCES `order_food` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction`
--

LOCK TABLES `transaction` WRITE;
/*!40000 ALTER TABLE `transaction` DISABLE KEYS */;
INSERT INTO `transaction` VALUES (1,'DEPOSIT','2019-08-05 23:19:49.295000','UNREAD',20000000,'CUS_9','EMP_8',NULL),(3,'ORDERD','2019-08-06 01:43:57.312000','UNREAD',34000,'CUS_9',NULL,NULL),(4,'ORDERD','2019-08-06 12:28:31.298000','UNREAD',47300,'CUS_10',NULL,28),(5,'ORDERD','2019-08-06 12:29:18.133000','UNREAD',47300,'CUS_10',NULL,29),(6,'ORDERD','2019-08-06 12:30:16.297000','UNREAD',25500,'CUS_10',NULL,30),(7,'ORDERD','2019-08-06 12:30:18.005000','UNREAD',25500,'CUS_10',NULL,31),(8,'ORDERD','2019-08-06 12:30:39.509000','UNREAD',25500,'CUS_10',NULL,32),(9,'ORDERD','2019-08-06 12:31:10.386000','UNREAD',25500,'CUS_10',NULL,33),(10,'ORDERD','2019-08-06 12:33:35.317000','UNREAD',72800,'CUS_9',NULL,34),(11,'ORDERD','2019-08-06 12:34:00.518000','UNREAD',25500,'CUS_9',NULL,35),(12,'ORDERD','2019-08-06 12:35:11.748000','UNREAD',25500,'CUS_9',NULL,36),(13,'ORDERD','2019-08-06 12:36:12.925000','UNREAD',47300,'CUS_9',NULL,37),(14,'ORDERD','2019-08-06 12:39:42.653000','UNREAD',47300,'CUS_9',NULL,40),(15,'ORDERD','2019-08-06 12:40:42.157000','UNREAD',47300,'CUS_9',NULL,41),(16,'ORDERD','2019-08-06 13:45:53.911000','UNREAD',47300,'CUS_9',NULL,42),(17,'ORDERD','2019-08-06 13:48:13.371000','UNREAD',87300,'CUS_9',NULL,43),(18,'ORDERD','2019-08-06 14:10:35.031000','UNREAD',92300,'CUS_9',NULL,44),(19,'ORDERD','2019-08-06 14:13:21.155000','UNREAD',45000,'CUS_9',NULL,45),(20,'ORDERD','2019-08-06 14:26:08.666000','UNREAD',25500,'CUS_9',NULL,46),(21,'ORDERD','2019-08-06 14:26:46.981000','UNREAD',45000,'CUS_9',NULL,47),(22,'ORDERD','2019-08-06 14:27:27.573000','UNREAD',25500,'CUS_9',NULL,48),(23,'ORDERD','2019-08-06 14:28:27.529000','UNREAD',47300,'CUS_9',NULL,49),(24,'GUEST','2019-08-10 17:23:05.323000','UNREAD',45000,NULL,'EMP_8',75),(25,'GUEST','2019-08-12 14:47:16.359000','UNREAD',25500,NULL,'EMP_8',70),(26,'GUEST','2019-08-12 14:47:22.197000','UNREAD',45000,NULL,'EMP_8',25),(27,'GUEST','2019-08-12 14:47:26.918000','UNREAD',25500,NULL,'EMP_8',73),(28,'GUEST','2019-08-12 14:47:30.613000','UNREAD',117500,NULL,'EMP_8',78),(29,'GUEST','2019-08-12 14:49:26.228000','UNREAD',126000,NULL,'EMP_8',83),(30,'GUEST','2019-08-12 15:00:19.064000','UNREAD',34000,NULL,'EMP_8',26),(31,'GUEST','2019-08-12 15:00:23.411000','UNREAD',47500,NULL,'EMP_8',8),(32,'GUEST','2019-08-12 15:00:27.273000','UNREAD',70000,NULL,'EMP_8',79),(33,'GUEST','2019-08-12 15:00:31.411000','UNREAD',47500,NULL,'EMP_8',27),(34,'GUEST','2019-08-12 15:00:36.101000','UNREAD',47500,NULL,'EMP_8',9),(35,'GUEST','2019-08-12 15:00:58.486000','UNREAD',90000,NULL,'EMP_8',80),(36,'GUEST','2019-08-12 15:01:02.235000','UNREAD',95000,NULL,'EMP_8',10),(37,'GUEST','2019-08-12 15:01:06.037000','UNREAD',58200,NULL,'EMP_8',81),(38,'GUEST','2019-08-12 15:02:25.391000','UNREAD',128200,NULL,'EMP_8',84),(39,'GUEST','2019-08-12 15:20:49.474000','UNREAD',126000,NULL,'EMP_8',85),(40,'DEPOSIT','2019-08-12 15:35:48.488000','READ',10000000,'CUS_1','EMP_8',NULL),(41,'ORDERD','2019-08-12 15:57:32.914000','UNREAD',70000,'CUS_9',NULL,149),(42,'ORDERD','2019-08-12 15:58:10.055000','UNREAD',181000,'CUS_9',NULL,150),(43,'GUEST_ROLLBACK','2019-08-12 16:12:53.114000','UNREAD',-14550,NULL,'EMP_8',100),(44,'GUEST_ROLLBACK','2019-08-12 16:12:57.443000','UNREAD',-19400,NULL,'EMP_8',NULL),(45,'GUEST_ROLLBACK','2019-08-12 16:13:01.437000','UNREAD',-24250,NULL,'EMP_8',NULL),(46,'ORDERD','2019-08-12 16:13:03.205000','READ',45000,'CUS_1',NULL,151),(47,'GUEST_ROLLBACK','2019-08-12 16:13:05.288000','UNREAD',-70000,NULL,'EMP_8',NULL),(48,'ORDERD','2019-08-12 16:17:37.034000','READ',45000,'CUS_1',NULL,152),(49,'ORDERD','2019-08-12 16:18:02.339000','UNREAD',152000,'CUS_9',NULL,153),(50,'GUEST','2019-08-12 16:19:57.372000','UNREAD',47500,NULL,'EMP_8',148),(51,'GUEST','2019-08-12 16:20:01.150000','UNREAD',45000,NULL,'EMP_8',100),(52,'GUEST','2019-08-12 16:20:05.008000','UNREAD',45000,NULL,'EMP_8',106),(53,'GUEST','2019-08-12 16:20:08.486000','UNREAD',45000,NULL,'EMP_8',146),(54,'GUEST','2019-08-12 16:20:12.721000','UNREAD',256270,NULL,'EMP_8',147),(55,'GUEST','2019-08-12 16:20:16.398000','UNREAD',45000,NULL,'EMP_8',94),(56,'GUEST','2019-08-12 16:20:20.338000','UNREAD',45000,NULL,'EMP_8',88),(57,'GUEST','2019-08-12 16:20:24.244000','UNREAD',402720,NULL,'EMP_8',87),(58,'ORDERD','2019-08-12 16:26:32.568000','UNREAD',80000,'CUS_9',NULL,154),(59,'ORDERD','2019-08-12 16:28:15.516000','READ',45000,'CUS_1',NULL,155),(60,'ORDERD','2019-08-12 16:29:35.586000','UNREAD',45000,'CUS_9',NULL,156),(61,'ORDERD','2019-08-12 16:31:21.768000','UNREAD',45000,'CUS_9',NULL,157),(62,'ROLLBACK','2019-08-12 16:34:44.601000','READ',-45000,'CUS_1',NULL,155),(63,'ORDERD','2019-08-12 16:40:09.557000','READ',112500,'CUS_1',NULL,158),(64,'ROLLBACK','2019-08-12 16:45:51.959000','UNREAD',0,'CUS_9',NULL,154),(65,'ORDERD','2019-08-12 16:46:00.702000','READ',154000,'CUS_1',NULL,159),(66,'ORDERD','2019-08-12 16:49:29.614000','READ',25500,'CUS_1',NULL,160),(67,'ORDERD','2019-08-12 16:50:31.115000','READ',46200,'CUS_1',NULL,161),(68,'ORDERD','2019-08-12 16:54:03.626000','READ',25500,'CUS_1',NULL,162),(69,'ORDERD','2019-08-12 16:56:46.570000','READ',25500,'CUS_1',NULL,163),(70,'ORDERD','2019-08-12 16:57:42.118000','READ',66220,'CUS_1',NULL,164),(71,'ORDERD','2019-08-12 17:17:47.644000','READ',46200,'CUS_1',NULL,165),(72,'ORDERD','2019-08-12 17:20:39.228000','READ',59500,'CUS_1',NULL,166),(73,'ORDERD','2019-08-12 17:21:28.004000','READ',42500,'CUS_1',NULL,167),(74,'DEPOSIT','2019-08-12 17:24:05.541000','READ',1000000,'CUS_1','EMP_8',NULL),(75,'ORDERD','2019-08-12 17:24:44.808000','READ',136720,'CUS_1',NULL,168),(76,'ORDERD','2019-08-12 17:26:04.366000','READ',14550,'CUS_1',NULL,169),(77,'ORDERD','2019-08-12 17:41:58.452000','READ',43000,'CUS_1',NULL,170),(78,'ORDERD','2019-08-12 17:44:43.240000','UNREAD',50500,'CUS_1',NULL,171),(79,'ORDERD','2019-08-12 17:46:34.400000','UNREAD',91000,'CUS_1',NULL,172);
/*!40000 ALTER TABLE `transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `address` varchar(255) DEFAULT NULL,
  `birthday` datetime(6) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `fullname` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `login_count` int(11) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'',NULL,'foodcourt.cfos@gmail.com','admin',NULL,0,'$2a$10$9otjS6AOLIetFkpXX5k1reXARLEmlNcyiLL3ed84LQEwkzzMbjUyi','0999999999','','admin'),(2,NULL,NULL,'soundlound@gmail.com','Nguyen Huy',NULL,0,'$2a$10$3b0UrmDy77rA5aSwQDsCZe4fssPlLxp9/fZ1A1PPvqXvl6hsMnuLG','932082096','','fcmanager'),(3,NULL,NULL,'soundlound@gmail.com','Nguyen Huy',NULL,0,'$2a$10$TQxY6aWMOtqgwVHWkHVajeWJVlmM.tg.reCtAzEIV7wbgWBkEnOTu','932082096','','nangganh'),(4,NULL,NULL,'soundlound@gmail.com','Nguyen Huy',NULL,0,'$2a$10$vNIbGRUbMWtOJLJE7ZJrh.o0DIywHXMM0lSMnRhWPZFXCX.yQ4A3e','932082096','','gongcha'),(5,NULL,NULL,'soundlound@gmail.com','Nguyen Huy',NULL,0,'$2a$10$xFGLCauxmTY/NNheJEAdXOxqB9Ba0uA1Bsb.wJ7nnD0WjmhiMK82a','932082096','','bistro'),(6,NULL,NULL,'soundlound@gmail.com','Nguyen Huy',NULL,0,'$2a$10$q.JuQVg9rhmzbkxY.BSwveS4XUCdvr5hmFB.w9DHbpBD7nJbSiNPK','932082096','','monviet'),(7,NULL,NULL,'soundlound@gmail.com','Nguyen Huy',NULL,0,'$2a$10$aP5hbCi8ZcXuaPCZ8Wleref8YQAHijLIUZvZ8PiLMafaFEXzTLtuS','932082096','','bobapop'),(8,NULL,NULL,'soundlound@gmail.com','Nguyen Huy',NULL,0,'$2a$10$cS2vZi.HRyiDU2J6rH89feD9heX5Gg.2o4Esmet1SUzZZ3xHPxjLi','932082096','','cashier'),(9,NULL,NULL,'huyndse62266@fpt.edu.vn','Nguyễn Đức Huy',NULL,0,'$2a$10$BNj4AROy7Zwe2Ht29KxbluK0M.zW1lDPKoy2LmLo2MzjXQHixEa9u','0932082096','','huynd'),(10,NULL,NULL,'hdas@gmail.com','Ngô Nhật Đô',NULL,0,'$2a$10$ZpBIKm9AiHXGXI51BJC8WOQ5ov4jMUvK5AcLVKmHqBuMszLF0J4xe','03213123','','donn'),(11,NULL,NULL,'soundlound@gmail.com','Nguyen Huy',NULL,0,'$2a$10$9iMf9fdWVIJImAOK4VjRM.iPw6RCTPaElUncURvyk/wua0ayeWEsq','932082096','','fcmanager1'),(12,NULL,NULL,'soundlound@gmail.com','Nguyen Huy',NULL,0,'$2a$10$IzRpqXCmvT5tO6nwj0uiTOonOPirltXyfEMogvt2tGob8foSJdczS','932082096','','quangon'),(13,NULL,NULL,'soundlound@gmail.com','Nguyen Huy',NULL,0,'$2a$10$VkTJa178xOvVoYxraMYcOufG9wCyWgWG531U3nFAen8s85TOKSWh.','0932082096','','hoangyen'),(14,NULL,NULL,'soundlound@gmail.com','Nguyen Huy',NULL,0,'$2a$10$uHoBBfCqb86md2oHQJlLa.CgA/VKZUyNzcbaJYvPl0krT7Q0fukdG','0932082096','','nangganh_chef'),(15,NULL,NULL,'soundcound@gmail.com','Nguyen Huy',NULL,0,'$2a$10$egADU9JBRdVLLZhx3DPiieJ4sgSgtcwuM9blLz6xBbAjKv2FXeWgq','0932082096','','bobapop_chef');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wallet`
--

DROP TABLE IF EXISTS `wallet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wallet` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `amount` double NOT NULL,
  `cus_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_h1wctvo4k1tsknmabj0svlrsp` (`cus_id`),
  CONSTRAINT `FKsdrv03en4tbt50njkfpxnkbe4` FOREIGN KEY (`cus_id`) REFERENCES `customer` (`customer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wallet`
--

LOCK TABLES `wallet` WRITE;
/*!40000 ALTER TABLE `wallet` DISABLE KEYS */;
INSERT INTO `wallet` VALUES (1,9970610,'CUS_1'),(2,0,'CUS_2'),(3,0,'CUS_3'),(4,0,'CUS_4'),(5,0,'CUS_5'),(6,0,'CUS_6'),(7,0,'CUS_7'),(8,0,'CUS_8'),(9,712100,'CUS_9'),(10,3400,'CUS_10'),(11,0,'CUS_11'),(12,0,'CUS_12'),(13,0,'CUS_13'),(14,0,'CUS_14'),(15,0,'CUS_15');
/*!40000 ALTER TABLE `wallet` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-08-13  0:23:28
