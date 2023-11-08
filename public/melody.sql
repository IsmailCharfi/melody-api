-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mer. 08 nov. 2023 à 05:59
-- Version du serveur : 10.4.24-MariaDB
-- Version de PHP : 7.4.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `melody`
--

-- --------------------------------------------------------

--
-- Structure de la table `event`
--

CREATE TABLE `event` (
  `id` int(11) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `name` varchar(100) NOT NULL,
  `capacity` int(11) NOT NULL,
  `place` varchar(255) NOT NULL,
  `artist` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `artistImage` varchar(255) NOT NULL,
  `date` datetime NOT NULL,
  `category` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `event`
--

INSERT INTO `event` (`id`, `createdAt`, `updatedAt`, `name`, `capacity`, `place`, `artist`, `image`, `artistImage`, `date`, `category`, `description`) VALUES
(2, '2023-11-07 19:57:06.000000', '2023-11-08 05:33:55.000000', 'Event1', 7, 'Lorem Ipsum', 'Artist 1', '/public/images/events/1.jpg', '/public/images/artists/1.jpg', '2023-11-15 19:55:24', 'Pop', 'vestibulum sed arcu non odio euismod lacinia at quis risus sed vulputate odio ut enim blandit volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque in dictum non consectetur a'),
(3, '2023-11-07 19:57:06.000000', '2023-11-07 20:21:02.636321', 'Event2', 10, 'Lorem Ipsum', 'Artist 2', '/public/images/events/2.jpg', '/public/images/artists/2.jpg', '2023-11-29 19:55:24', 'Pop', 'vestibulum sed arcu non odio euismod lacinia at quis risus sed vulputate odio ut enim blandit volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque in dictum non consectetur a'),
(4, '2023-11-07 19:57:06.000000', '2023-11-07 23:17:01.000000', 'Event3', 9, 'Lorem Ipsum', 'Artist 3', '/public/images/events/3.jpg', '/public/images/artists/3.jpg', '2023-12-20 19:55:24', 'Jazz', 'vestibulum sed arcu non odio euismod lacinia at quis risus sed vulputate odio ut enim blandit volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque in dictum non consectetur a'),
(5, '2023-11-07 19:57:06.000000', '2023-11-07 20:21:05.362615', 'Event4', 1, 'Lorem Ipsum', 'Artist 4', '/public/images/events/4.jpg', '/public/images/artists/4.jpg', '2023-12-20 19:55:24', 'Metal', 'vestibulum sed arcu non odio euismod lacinia at quis risus sed vulputate odio ut enim blandit volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque in dictum non consectetur a'),
(6, '2023-11-07 19:57:06.000000', '2023-11-08 01:22:09.000000', 'Event5', 0, 'Lorem Ipsum', 'Artist 5', '/public/images/events/5.jpg', '/public/images/artists/5.jpg', '2024-01-23 19:55:24', 'Hip Hop', 'vestibulum sed arcu non odio euismod lacinia at quis risus sed vulputate odio ut enim blandit volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque in dictum non consectetur a'),
(7, '2023-11-07 19:57:06.000000', '2023-11-07 20:21:07.358425', 'Event6', 1, 'Lorem Ipsum', 'Artist 6', '/public/images/events/6.jpg', '/public/images/artists/6.jpg', '2024-01-23 19:55:24', 'Pop', 'vestibulum sed arcu non odio euismod lacinia at quis risus sed vulputate odio ut enim blandit volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque in dictum non consectetur a'),
(8, '2023-11-07 19:57:06.000000', '2023-11-07 20:21:09.026695', 'Event7', 5, 'Lorem Ipsum', 'Artist 7', '/public/images/events/7.jpg', '/public/images/artists/7.jpg', '2024-01-23 19:55:24', 'Pop', 'vestibulum sed arcu non odio euismod lacinia at quis risus sed vulputate odio ut enim blandit volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque in dictum non consectetur a'),
(9, '2023-11-07 19:57:06.000000', '2023-11-07 20:21:10.034208', 'Event8', 5, 'Lorem Ipsum', 'Artist 8', '/public/images/events/8.jpg', '/public/images/artists/8.jpg', '2024-01-23 19:55:24', 'Jazz', 'vestibulum sed arcu non odio euismod lacinia at quis risus sed vulputate odio ut enim blandit volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque in dictum non consectetur a'),
(10, '2023-11-07 19:57:06.000000', '2023-11-07 20:21:11.050002', 'Event9', 5, 'Lorem Ipsum', 'Artist 9', '/public/images/events/9.jpg', '/public/images/artists/9.jpg', '2024-04-17 19:55:24', 'Opera', 'vestibulum sed arcu non odio euismod lacinia at quis risus sed vulputate odio ut enim blandit volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque in dictum non consectetur a'),
(11, '2023-11-07 19:57:06.000000', '2023-11-08 05:34:01.000000', 'Event10', 4, 'Lorem Ipsum', 'Artist 10', '/public/images/events/10.jpg', '/public/images/artists/10.jpg', '2024-04-17 19:55:24', 'House', 'vestibulum sed arcu non odio euismod lacinia at quis risus sed vulputate odio ut enim blandit volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque in dictum non consectetur a');

-- --------------------------------------------------------

--
-- Structure de la table `ticket`
--

CREATE TABLE `ticket` (
  `id` int(11) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `seat` varchar(255) NOT NULL,
  `gate` varchar(255) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `eventId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `salt` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `createdAt`, `updatedAt`, `email`, `password`, `salt`, `firstname`, `lastname`) VALUES
(3, '2023-11-07 20:31:21.146623', '2023-11-07 20:31:21.146623', 'ismail@charfi.me', '$2b$10$gQBQgsaJ9jdvna.897/np.6VIDSSpdAvbjKKbXqm87SpSOHqGZik.', '$2b$10$gQBQgsaJ9jdvna.897/np.', 'Ismail', 'Charfi');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_b535fbe8ec6d832dde22065ebd` (`name`);

--
-- Index pour la table `ticket`
--
ALTER TABLE `ticket`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_cb22a51617991265571be41b74f` (`eventId`),
  ADD KEY `FK_0e01a7c92f008418bad6bad5919` (`userId`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `event`
--
ALTER TABLE `event`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT pour la table `ticket`
--
ALTER TABLE `ticket`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `ticket`
--
ALTER TABLE `ticket`
  ADD CONSTRAINT `FK_0e01a7c92f008418bad6bad5919` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_cb22a51617991265571be41b74f` FOREIGN KEY (`eventId`) REFERENCES `event` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
