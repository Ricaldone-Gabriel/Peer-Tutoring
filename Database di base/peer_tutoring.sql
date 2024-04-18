-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Apr 18, 2024 alle 08:14
-- Versione del server: 10.4.32-MariaDB
-- Versione PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `peer tutoring`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `anno scolastico`
--

CREATE TABLE `anno scolastico` (
  `ID_AnnoScolastico` int(11) NOT NULL,
  `Anno` int(11) NOT NULL,
  `Scuola` int(11) NOT NULL COMMENT '0-Scuola secondaria di primo grado\r\n1-Scuola secondaria di secondo grado\r\n2-Università',
  `Tipo` text NOT NULL COMMENT 'Tipologia di liceo, inclusa università.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `anno scolastico`
--

INSERT INTO `anno scolastico` (`ID_AnnoScolastico`, `Anno`, `Scuola`, `Tipo`) VALUES
(1, 3, 0, 'Media'),
(2, 1, 1, 'Informatica'),
(3, 2, 1, 'Informatica'),
(4, 3, 1, 'Informatica'),
(5, 4, 1, 'Informatica'),
(6, 5, 1, 'Informatica'),
(7, 1, 1, 'Telecomunicazioni'),
(8, 2, 1, 'Telecomunicazioni'),
(9, 3, 1, 'Telecomunicazioni'),
(10, 4, 1, 'Telecomunicazioni'),
(11, 5, 1, 'Telecomunicazioni'),
(12, 1, 1, 'Energia'),
(13, 2, 1, 'Energia'),
(14, 3, 1, 'Energia'),
(15, 4, 1, 'Energia'),
(16, 5, 1, 'Energia'),
(17, 1, 1, 'Scienze Applicate'),
(18, 2, 1, 'Scienze Applicate'),
(19, 3, 1, 'Scienze Applicate'),
(20, 4, 1, 'Scienze Applicate'),
(21, 5, 1, 'Scienze Applicate'),
(22, 1, 1, 'Biotecnologie'),
(23, 2, 1, 'Biotecnologie'),
(24, 3, 1, 'Biotecnologie'),
(25, 4, 1, 'Biotecnologie'),
(26, 5, 1, 'Biotecnologie'),
(27, 1, 1, 'Economico Sociale'),
(28, 2, 1, 'Economico Sociale'),
(29, 3, 1, 'Economico Sociale'),
(30, 4, 1, 'Economico Sociale'),
(31, 5, 1, 'Economico Sociale');

-- --------------------------------------------------------

--
-- Struttura della tabella `composto`
--

CREATE TABLE `composto` (
  `ID_Composto` int(11) NOT NULL,
  `ID_AnnoScolastico` int(11) NOT NULL,
  `ID_Materia` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `composto`
--

INSERT INTO `composto` (`ID_Composto`, `ID_AnnoScolastico`, `ID_Materia`) VALUES
(2, 1, 1),
(4, 2, 1),
(6, 3, 1),
(8, 4, 1),
(10, 5, 1),
(12, 6, 1),
(14, 7, 1),
(16, 8, 1),
(18, 9, 1),
(20, 10, 1),
(22, 11, 1),
(24, 12, 1),
(26, 13, 1),
(28, 14, 1),
(30, 15, 1),
(32, 16, 1),
(34, 17, 1),
(36, 18, 1),
(38, 19, 1),
(40, 20, 1),
(42, 21, 1),
(44, 22, 1),
(46, 23, 1),
(48, 24, 1),
(50, 25, 1),
(101, 1, 2),
(102, 2, 2),
(103, 3, 2),
(104, 4, 2),
(105, 5, 2),
(106, 6, 2),
(107, 7, 2),
(108, 8, 2),
(109, 9, 2),
(110, 10, 2),
(111, 11, 2),
(112, 12, 2),
(113, 13, 2),
(114, 14, 2),
(115, 15, 2),
(116, 16, 2),
(117, 17, 2),
(118, 18, 2),
(119, 19, 2),
(120, 20, 2),
(121, 21, 2),
(122, 22, 2),
(123, 23, 2),
(124, 24, 2),
(125, 25, 2);

-- --------------------------------------------------------

--
-- Struttura della tabella `materia`
--

CREATE TABLE `materia` (
  `ID_Materia` int(11) NOT NULL,
  `Tipo` text NOT NULL,
  `Nome` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dump dei dati per la tabella `materia`
--

INSERT INTO `materia` (`ID_Materia`, `Tipo`, `Nome`) VALUES
(1, 'Generale', 'Matematica'),
(2, 'Generale', 'Italiano');

-- --------------------------------------------------------

--
-- Struttura della tabella `post`
--

CREATE TABLE `post` (
  `ID_Post` int(11) NOT NULL,
  `ID_Autore` int(11) NOT NULL,
  `Testo` text NOT NULL,
  `DataPost` date NOT NULL DEFAULT current_timestamp(),
  `ID_Materia` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `utente`
--

CREATE TABLE `utente` (
  `ID_Utente` int(11) NOT NULL,
  `Username` varchar(50) NOT NULL,
  `Password` text NOT NULL,
  `Email` text NOT NULL,
  `ID_AnnoScolastico` int(11) NOT NULL,
  `Esperienza` int(11) NOT NULL DEFAULT 0 COMMENT 'Automatico',
  `Livello` int(11) NOT NULL DEFAULT 0 COMMENT 'Automatico',
  `Data_Creazione` datetime NOT NULL DEFAULT current_timestamp() COMMENT 'Automatico'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `anno scolastico`
--
ALTER TABLE `anno scolastico`
  ADD PRIMARY KEY (`ID_AnnoScolastico`);

--
-- Indici per le tabelle `composto`
--
ALTER TABLE `composto`
  ADD PRIMARY KEY (`ID_Composto`),
  ADD KEY `Anno scolastico` (`ID_AnnoScolastico`),
  ADD KEY `Materia` (`ID_Materia`);

--
-- Indici per le tabelle `materia`
--
ALTER TABLE `materia`
  ADD PRIMARY KEY (`ID_Materia`);

--
-- Indici per le tabelle `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`ID_Post`),
  ADD KEY `ID_Autore` (`ID_Autore`),
  ADD KEY `ID_Materia` (`ID_Materia`);

--
-- Indici per le tabelle `utente`
--
ALTER TABLE `utente`
  ADD PRIMARY KEY (`ID_Utente`),
  ADD KEY `ID Anno scolastico` (`ID_AnnoScolastico`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `anno scolastico`
--
ALTER TABLE `anno scolastico`
  MODIFY `ID_AnnoScolastico` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT per la tabella `composto`
--
ALTER TABLE `composto`
  MODIFY `ID_Composto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=126;

--
-- AUTO_INCREMENT per la tabella `materia`
--
ALTER TABLE `materia`
  MODIFY `ID_Materia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT per la tabella `post`
--
ALTER TABLE `post`
  MODIFY `ID_Post` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `utente`
--
ALTER TABLE `utente`
  MODIFY `ID_Utente` int(11) NOT NULL AUTO_INCREMENT;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `composto`
--
ALTER TABLE `composto`
  ADD CONSTRAINT `Anno scolastico` FOREIGN KEY (`ID_AnnoScolastico`) REFERENCES `anno scolastico` (`ID_AnnoScolastico`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `Materia` FOREIGN KEY (`ID_Materia`) REFERENCES `materia` (`ID_Materia`);

--
-- Limiti per la tabella `post`
--
ALTER TABLE `post`
  ADD CONSTRAINT `ID_Autore` FOREIGN KEY (`ID_Autore`) REFERENCES `utente` (`ID_Utente`),
  ADD CONSTRAINT `ID_Materia` FOREIGN KEY (`ID_Materia`) REFERENCES `materia` (`ID_Materia`);

--
-- Limiti per la tabella `utente`
--
ALTER TABLE `utente`
  ADD CONSTRAINT `ID Anno scolastico` FOREIGN KEY (`ID_AnnoScolastico`) REFERENCES `anno scolastico` (`ID_AnnoScolastico`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
