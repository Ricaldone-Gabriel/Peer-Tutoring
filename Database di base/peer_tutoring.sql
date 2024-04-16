-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Apr 16, 2024 alle 08:22
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

-- --------------------------------------------------------

--
-- Struttura della tabella `composto`
--

CREATE TABLE `composto` (
  `ID_Fatto` int(11) NOT NULL,
  `ID_AnnoScolastico` int(11) NOT NULL,
  `ID_Materia` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `materia`
--

CREATE TABLE `materia` (
  `ID_Materia` int(11) NOT NULL,
  `Tipo` text NOT NULL,
  `Nome` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

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
  ADD PRIMARY KEY (`ID_Fatto`),
  ADD KEY `Anno scolastico` (`ID_AnnoScolastico`),
  ADD KEY `Materia` (`ID_Materia`);

--
-- Indici per le tabelle `materia`
--
ALTER TABLE `materia`
  ADD PRIMARY KEY (`ID_Materia`);

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
  MODIFY `ID_AnnoScolastico` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `composto`
--
ALTER TABLE `composto`
  MODIFY `ID_Fatto` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `materia`
--
ALTER TABLE `materia`
  MODIFY `ID_Materia` int(11) NOT NULL AUTO_INCREMENT;

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
-- Limiti per la tabella `utente`
--
ALTER TABLE `utente`
  ADD CONSTRAINT `ID Anno scolastico` FOREIGN KEY (`ID_AnnoScolastico`) REFERENCES `anno scolastico` (`ID_AnnoScolastico`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
