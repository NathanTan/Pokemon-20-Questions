-- MySQL dump 10.16  Distrib 10.1.37-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: pokemon_20
-- ------------------------------------------------------
-- Server version   10.1.37-MariaDB

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
-- Table structure for table `pokemon`
--

DROP TABLE IF EXISTS `pokemon`;

CREATE TABLE `pokemon` (
      `id` int(11) NOT NULL DEFAULT '0',
      `name` varchar(255) DEFAULT NULL,
      `evolution` int(11) DEFAULT NULL,
      `description` varchar(255) DEFAULT NULL,
      PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pokemon`
--

LOCK TABLES `pokemon` WRITE;
/*!40000 ALTER TABLE `pokemon` DISABLE KEYS */;
INSERT INTO `pokemon` VALUES
(1,'Bulbasaur', 2, 'The bulb pokemon'),
(2, 'Ivysaur', 3, 'A strange seed was planted on its back at birth. The plant sprouts and grows with this Pokémon'),
(3, 'Venasaur', NULL, 'Final stage ofo Bulbasaur'),
(4,'Squirtle', 5, 'Squirtle squad');
/*!40000 ALTER TABLE `pokemon` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `move`
--

DROP TABLE IF EXISTS `move`;

CREATE TABLE `move` (
      `id` int(11) NOT NULL DEFAULT '0',
      `name` varchar(255) NOT NULL,
      `power` int(11) DEFAULT NULL,
      `accuracy` int(11) DEFAULT NULL,
      PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `moves`
--

LOCK TABLES `move` WRITE;
/*!40000 ALTER TABLE `move` ENABLE KEYS */;
INSERT INTO `move` VALUES
(1, 'Pound', 40, 100),
(12, 'Guillotine', NULL, NULL),
(33, 'Tackle', 40, 100),
(63, 'Hyper Beam', 150, 90),
(742, 'Double Iron Bash', 60, 100);
UNLOCK TABLES;

--
-- Table structure for table `type`
--

DROP TABLE IF EXISTS `type`;

CREATE TABLE `type` (
      `id` int(11) NOT NULL AUTO_INCREMENT,
      `name` varchar(255) NOT NULL,
      PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=159 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `type`
--

LOCK TABLES `type` WRITE;
/*!40000 ALTER TABLE `bsg_people` DISABLE KEYS */;
INSERT INTO `type` VALUES 
(0, 'Normal'),
(1, 'Fire'),
(2, 'Fighting'),
(3, 'Water'),
(4, 'Flying'),
(5, 'Grass'),
(6, 'Poison'),
(7, 'Electric'),
(8, 'Ground'),
(9, 'Psychic'),
(10, 'Rock'),
(11, 'Ice'),
(12, 'Bug'),
(13, 'Dragon'),
(14, 'Ghost'),
(15, 'Dark'),
(16, 'Steel'),
(17, 'Fairy'),
(18, '???')
/*!40000 ALTER TABLE `type` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Table structure for table `trainer`
--

DROP TABLE IF EXISTS `trainer`;

CREATE TABLE `trainer` (
      `id` int(11) NOT NULL AUTO_INCREMENT,
      `name` varchar(255) NOT NULL,
      PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=159 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trainer`
--

LOCK TABLES `trainer` WRITE;
/*!40000 ALTER TABLE `trainer` DISABLE KEYS */;
INSERT INTO `trainer` VALUES 
(0, 'Red'),
(1, 'Blue'),
(2, 'Ash'),
(3, 'Gary'),
(4, 'Brock'),
(5, 'Misty')
/*!40000 ALTER TABLE `trainer` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Table structure for table `effect`
--

DROP TABLE IF EXISTS `effect`;

CREATE TABLE `effect` (
      `id` int(11) NOT NULL AUTO_INCREMENT,
      `name` varchar(255) NOT NULL,
      PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=159 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

# --
# -- Dumping data for table `effect`
# --
#
# LOCK TABLES `bsg_people` WRITE;
# /*!40000 ALTER TABLE `bsg_people` DISABLE KEYS */;
# INSERT INTO `bsg_people` VALUES (6,'Saul','Tigh',NULL,71,'Human'),(9,'Callandra','Henderson',NULL,NULL,'Human'),(121,'harry','goober',18,23,'Human'),(156,'','',1,0,'Human'),(157,'','',3,0,'Human'),(158,'The','Man',16,22,'Human');
# /*!40000 ALTER TABLE `bsg_people` ENABLE KEYS */;
# UNLOCK TABLES;


--
-- Table structure for table `bsg_people`
--

DROP TABLE IF EXISTS `pokemon_move`;

CREATE TABLE `pokemon_move` (
      `pokemon_id` int(11) NOT NULL,
      `move_id` int(11) NOT NULL,
      PRIMARY KEY (`pokemon_id`, 'move_id'),
      CONSTRAINT `pm_fk_1` FOREIGN KEY (`pokemon_id`) REFERENCES `pokemon` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
      CONSTRAINT `pm_fk_2` FOREIGN KEY (`move_id`) REFERENCES `move` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=159 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Dumping data for table `pokemon_move`
--

LOCK TABLES `pokemon_move` WRITE;
/*!40000 ALTER TABLE `pokemon_move` DISABLE KEYS */;
INSERT INTO `pokemon_move` VALUES 
(1, 33),
(2, 33),
(3, 33),
(4, 33)
/*!40000 ALTER TABLE `pokemon_move` ENABLE KEYS */;
UNLOCK TABLES;


DROP TABLE IF EXISTS `pokemon_type`;

CREATE TABLE `pokemon_type` (
      `pokemon_id` int(11) NOT NULL,
      `type_id` int(11) NOT NULL,
      PRIMARY KEY (`pokemon_id`, 'type_id'),
      CONSTRAINT `pt_fk_1` FOREIGN KEY (`pokemon_id`) REFERENCES `pokemon` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
      CONSTRAINT `pt_fk_2` FOREIGN KEY (`type_id`) REFERENCES `type` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=159 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Dumping data for table `pokemon_type`
--

LOCK TABLES `pokemon_type` WRITE;
/*!40000 ALTER TABLE `pokemon_type` DISABLE KEYS */;
INSERT INTO `pokemon_type` VALUES 
(1, 5),
(1, 6),
(2, 5),
(2, 6),
(3, 5),
(3, 6),
(4, 3)
/*!40000 ALTER TABLE `pokemon_type` ENABLE KEYS */;
# UNLOCK TABLES;


DROP TABLE IF EXISTS `pokemon_trainer`;

CREATE TABLE `pokemon_trainer` (
      `pokemon_id` int(11) NOT NULL,
      `trainer_id` int(11) NOT NULL,
      PRIMARY KEY (`pokemon_id`, 'trainer_id'),
      CONSTRAINT `ptr_fk_1` FOREIGN KEY (`pokemon_id`) REFERENCES `pokemon` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
      CONSTRAINT `ptr_fk_2` FOREIGN KEY (`trainer_id`) REFERENCES `trainer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=159 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;


# --
# -- Dumping data for table `pokemon_trainer`
# --
#
# LOCK TABLES `bsg_people` WRITE;
# /*!40000 ALTER TABLE `bsg_people` DISABLE KEYS */;
# INSERT INTO `bsg_people` VALUES (6,'Saul','Tigh',NULL,71,'Human'),(9,'Callandra','Henderson',NULL,NULL,'Human'),(121,'harry','goober',18,23,'Human'),(156,'','',1,0,'Human'),(157,'','',3,0,'Human'),(158,'The','Man',16,22,'Human');
# /*!40000 ALTER TABLE `bsg_people` ENABLE KEYS */;
# UNLOCK TABLES;


DROP TABLE IF EXISTS `trainer_type`;

CREATE TABLE `trainer_type` (
      `trainer_id` int(11) NOT NULL,
      `type_id` int(11) NOT NULL,
      PRIMARY KEY (`trainer_id`, 'type_id'),
      CONSTRAINT `tt_fk_1` FOREIGN KEY (`trainer_id`) REFERENCES `trainer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
      CONSTRAINT `tt_fk_2` FOREIGN KEY (`type_id`) REFERENCES `type` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=159 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;


# --
# -- Dumping data for table `trainer_type`
# --
#
# LOCK TABLES `bsg_people` WRITE;
# /*!40000 ALTER TABLE `bsg_people` DISABLE KEYS */;
# INSERT INTO `bsg_people` VALUES (6,'Saul','Tigh',NULL,71,'Human'),(9,'Callandra','Henderson',NULL,NULL,'Human'),(121,'harry','goober',18,23,'Human'),(156,'','',1,0,'Human'),(157,'','',3,0,'Human'),(158,'The','Man',16,22,'Human');
# /*!40000 ALTER TABLE `bsg_people` ENABLE KEYS */;
# UNLOCK TABLES;




--
-- Table structure for table `type_effect`
--

DROP TABLE IF EXISTS `type_effect`;

CREATE TABLE `type_effect` (
      `type_id1` int(11) NOT NULL,
      `type_id2` int(11) NOT NULL,
      `effect_id` int(11) NOT NULL,
      PRIMARY KEY (`type_id1`, `type_id2`, 'effect_id'),
      CONSTRAINT `pm_fk_1` FOREIGN KEY (`type_id1`) REFERENCES `type` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
      CONSTRAINT `pm_fk_2` FOREIGN KEY (`type_id2`) REFERENCES `type` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
      CONSTRAINT `pm_fk_3` FOREIGN KEY (`effect_id`) REFERENCES `effect` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=159 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;


# --
# -- Dumping data for table `type_effect`
# --
#
# LOCK TABLES `bsg_people` WRITE;
# /*!40000 ALTER TABLE `bsg_people` DISABLE KEYS */;
# INSERT INTO `bsg_people` VALUES (6,'Saul','Tigh',NULL,71,'Human'),(9,'Callandra','Henderson',NULL,NULL,'Human'),(121,'harry','goober',18,23,'Human'),(156,'','',1,0,'Human'),(157,'','',3,0,'Human'),(158,'The','Man',16,22,'Human');
# /*!40000 ALTER TABLE `bsg_people` ENABLE KEYS */;
# UNLOCK TABLES;



