-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2023. Nov 11. 22:52
-- Kiszolgáló verziója: 10.4.28-MariaDB
-- PHP verzió: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `ekke-webshop`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `cart`
--

CREATE TABLE `cart` (
  `id` int(64) NOT NULL,
  `user_id` int(64) NOT NULL,
  `active` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `cart`
--

INSERT INTO `cart` (`id`, `user_id`, `active`) VALUES
(2, 50, 1),
(3, 51, 0),
(4, 52, 1),
(6, 51, 0),
(7, 51, 0),
(8, 51, 0),
(9, 51, 0),
(10, 51, 0),
(11, 51, 0),
(12, 51, 0),
(13, 51, 0),
(14, 51, 0),
(15, 51, 0),
(16, 51, 0),
(17, 51, 0),
(18, 51, 0),
(19, 51, 0),
(20, 51, 0),
(21, 51, 0),
(22, 51, 0),
(23, 51, 0),
(24, 51, 0),
(25, 51, 0),
(26, 51, 0),
(27, 51, 0),
(28, 51, 0),
(29, 51, 0),
(30, 51, 0),
(31, 51, 0),
(32, 51, 1),
(33, 54, 0),
(34, 54, 1),
(35, 55, 1),
(41, 61, 0),
(43, 63, 1),
(44, 61, 0),
(45, 61, 0),
(46, 61, 0),
(47, 61, 0),
(48, 61, 0),
(49, 61, 0),
(50, 61, 0),
(51, 61, 0),
(52, 61, 0),
(53, 61, 0),
(54, 61, 0),
(55, 61, 0),
(56, 61, 0),
(57, 64, 0),
(58, 64, 0),
(59, 64, 1),
(60, 61, 0),
(61, 61, 0),
(62, 61, 0),
(63, 61, 0),
(64, 61, 0),
(65, 61, 0),
(66, 61, 0),
(67, 61, 0),
(68, 61, 0),
(69, 61, 0),
(70, 61, 0),
(71, 61, 0),
(72, 65, 0),
(73, 65, 1),
(74, 66, 0),
(75, 66, 1),
(76, 67, 0),
(77, 67, 0),
(78, 67, 1),
(79, 68, 0),
(80, 68, 1),
(81, 69, 1),
(82, 70, 1),
(83, 71, 1),
(84, 72, 1),
(85, 61, 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `cart_item`
--

CREATE TABLE `cart_item` (
  `id` int(64) NOT NULL,
  `user_id` int(64) NOT NULL,
  `cart_id` int(64) NOT NULL,
  `product_id` int(64) NOT NULL,
  `date` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `cart_item`
--

INSERT INTO `cart_item` (`id`, `user_id`, `cart_id`, `product_id`, `date`) VALUES
(28, 50, 2, 1, 'Fri Oct 20 2023 13:23:58 GMT+0200 (közép-európai nyári idő)'),
(36, 51, 3, 7, 'Sun Oct 29 2023 14:58:07 GMT+0100 (Central European Standard Tim'),
(38, 52, 4, 12, 'Sun Oct 29 2023 16:27:49 GMT+0100 (Central European Standard Tim'),
(43, 51, 3, 12, 'Wed Nov 01 2023 12:05:37 GMT+0100 (Central European Standard Tim'),
(44, 51, 3, 12, 'Wed Nov 01 2023 12:05:37 GMT+0100 (Central European Standard Tim'),
(45, 51, 3, 7, 'Wed Nov 01 2023 13:15:42 GMT+0100 (Central European Standard Tim'),
(46, 51, 3, 1, 'Wed Nov 01 2023 13:20:31 GMT+0100 (Central European Standard Tim'),
(47, 51, 3, 1, 'Wed Nov 01 2023 13:20:33 GMT+0100 (Central European Standard Tim'),
(48, 51, 3, 6, 'Wed Nov 01 2023 13:22:00 GMT+0100 (Central European Standard Tim'),
(49, 51, 3, 1, 'Wed Nov 01 2023 13:24:06 GMT+0100 (Central European Standard Tim'),
(50, 51, 3, 6, 'Wed Nov 01 2023 13:27:24 GMT+0100 (Central European Standard Tim'),
(51, 51, 3, 1, 'Wed Nov 01 2023 13:30:38 GMT+0100 (Central European Standard Tim'),
(52, 51, 3, 14, 'Wed Nov 01 2023 13:33:08 GMT+0100 (Central European Standard Tim'),
(53, 51, 3, 7, 'Wed Nov 01 2023 13:38:04 GMT+0100 (Central European Standard Tim'),
(54, 51, 3, 1, 'Wed Nov 01 2023 13:39:36 GMT+0100 (Central European Standard Tim'),
(55, 51, 3, 6, 'Wed Nov 01 2023 13:43:35 GMT+0100 (Central European Standard Tim'),
(56, 51, 3, 7, 'Wed Nov 01 2023 13:47:01 GMT+0100 (Central European Standard Tim'),
(57, 51, 3, 7, 'Wed Nov 01 2023 13:49:30 GMT+0100 (Central European Standard Tim'),
(58, 51, 3, 7, 'Wed Nov 01 2023 13:50:53 GMT+0100 (Central European Standard Tim'),
(59, 51, 3, 7, 'Wed Nov 01 2023 13:52:59 GMT+0100 (Central European Standard Tim'),
(60, 51, 3, 7, 'Wed Nov 01 2023 13:53:00 GMT+0100 (Central European Standard Tim'),
(61, 51, 3, 7, 'Wed Nov 01 2023 14:03:03 GMT+0100 (Central European Standard Tim'),
(62, 51, 3, 7, 'Wed Nov 01 2023 14:04:32 GMT+0100 (Central European Standard Tim'),
(63, 51, 3, 7, 'Wed Nov 01 2023 14:08:41 GMT+0100 (Central European Standard Tim'),
(64, 51, 3, 7, 'Wed Nov 01 2023 14:12:33 GMT+0100 (Central European Standard Tim'),
(65, 51, 3, 6, 'Wed Nov 01 2023 14:13:08 GMT+0100 (Central European Standard Tim'),
(66, 51, 29, 6, 'Wed Nov 01 2023 14:14:24 GMT+0100 (Central European Standard Tim'),
(67, 51, 30, 7, 'Wed Nov 01 2023 14:53:31 GMT+0100 (Central European Standard Tim'),
(68, 51, 31, 3, 'Wed Nov 01 2023 15:00:37 GMT+0100 (Central European Standard Tim'),
(69, 54, 33, 7, 'Wed Nov 01 2023 15:51:05 GMT+0100 (Central European Standard Tim'),
(70, 61, 41, 7, 'Sun Nov 05 2023 10:15:25 GMT+0100 (Central European Standard Tim'),
(71, 61, 44, 7, 'Sun Nov 05 2023 12:03:43 GMT+0100 (Central European Standard Time)'),
(72, 61, 44, 7, 'Sun Nov 05 2023 12:03:43 GMT+0100 (Central European Standard Time)'),
(73, 61, 44, 6, 'Sun Nov 05 2023 12:03:47 GMT+0100 (Central European Standard Time)'),
(74, 61, 44, 6, 'Sun Nov 05 2023 12:03:47 GMT+0100 (Central European Standard Time)'),
(75, 61, 45, 2, 'Sun Nov 05 2023 12:39:14 GMT+0100 (Central European Standard Time)'),
(76, 61, 45, 3, 'Sun Nov 05 2023 12:39:24 GMT+0100 (Central European Standard Time)'),
(77, 61, 46, 7, 'Sun Nov 05 2023 13:00:47 GMT+0100 (Central European Standard Time)'),
(78, 61, 47, 3, 'Sun Nov 05 2023 13:05:18 GMT+0100 (Central European Standard Time)'),
(79, 61, 48, 7, 'Sun Nov 05 2023 14:10:22 GMT+0100 (Central European Standard Time)'),
(80, 61, 48, 7, 'Sun Nov 05 2023 14:10:22 GMT+0100 (Central European Standard Time)'),
(81, 61, 48, 3, 'Sun Nov 05 2023 14:46:58 GMT+0100 (Central European Standard Time)'),
(82, 61, 48, 3, 'Sun Nov 05 2023 14:46:58 GMT+0100 (Central European Standard Time)'),
(83, 61, 48, 3, 'Sun Nov 05 2023 14:47:01 GMT+0100 (Central European Standard Time)'),
(84, 61, 49, 3, 'Sun Nov 05 2023 15:03:04 GMT+0100 (Central European Standard Time)'),
(85, 61, 49, 3, 'Sun Nov 05 2023 15:03:04 GMT+0100 (Central European Standard Time)'),
(86, 61, 49, 3, 'Sun Nov 05 2023 15:03:04 GMT+0100 (Central European Standard Time)'),
(87, 61, 49, 3, 'Sun Nov 05 2023 15:03:04 GMT+0100 (Central European Standard Time)'),
(88, 61, 49, 3, 'Sun Nov 05 2023 15:03:05 GMT+0100 (Central European Standard Time)'),
(89, 61, 49, 3, 'Sun Nov 05 2023 15:03:05 GMT+0100 (Central European Standard Time)'),
(90, 61, 49, 3, 'Sun Nov 05 2023 15:03:05 GMT+0100 (Central European Standard Time)'),
(91, 61, 49, 3, 'Sun Nov 05 2023 15:03:05 GMT+0100 (Central European Standard Time)'),
(92, 61, 49, 3, 'Sun Nov 05 2023 15:03:05 GMT+0100 (Central European Standard Time)'),
(93, 61, 49, 3, 'Sun Nov 05 2023 15:03:05 GMT+0100 (Central European Standard Time)'),
(94, 61, 49, 3, 'Sun Nov 05 2023 15:03:06 GMT+0100 (Central European Standard Time)'),
(95, 61, 49, 3, 'Sun Nov 05 2023 15:03:06 GMT+0100 (Central European Standard Time)'),
(96, 61, 49, 3, 'Sun Nov 05 2023 15:03:06 GMT+0100 (Central European Standard Time)'),
(97, 61, 49, 3, 'Sun Nov 05 2023 15:03:06 GMT+0100 (Central European Standard Time)'),
(98, 61, 49, 3, 'Sun Nov 05 2023 15:03:06 GMT+0100 (Central European Standard Time)'),
(99, 61, 49, 3, 'Sun Nov 05 2023 15:03:06 GMT+0100 (Central European Standard Time)'),
(100, 61, 49, 3, 'Sun Nov 05 2023 15:03:07 GMT+0100 (Central European Standard Time)'),
(103, 61, 50, 3, 'Sun Nov 05 2023 15:58:10 GMT+0100 (Central European Standard Time)'),
(104, 61, 50, 3, 'Sun Nov 05 2023 15:58:10 GMT+0100 (Central European Standard Time)'),
(105, 61, 50, 3, 'Sun Nov 05 2023 15:58:11 GMT+0100 (Central European Standard Time)'),
(107, 61, 51, 3, 'Sun Nov 05 2023 16:00:14 GMT+0100 (Central European Standard Time)'),
(108, 61, 51, 3, 'Sun Nov 05 2023 16:00:14 GMT+0100 (Central European Standard Time)'),
(109, 61, 51, 3, 'Sun Nov 05 2023 16:00:14 GMT+0100 (Central European Standard Time)'),
(110, 61, 51, 3, 'Sun Nov 05 2023 16:00:15 GMT+0100 (Central European Standard Time)'),
(111, 61, 51, 3, 'Sun Nov 05 2023 16:00:15 GMT+0100 (Central European Standard Time)'),
(112, 61, 52, 3, 'Sun Nov 05 2023 16:01:01 GMT+0100 (Central European Standard Time)'),
(113, 61, 52, 3, 'Sun Nov 05 2023 16:01:01 GMT+0100 (Central European Standard Time)'),
(114, 61, 52, 3, 'Sun Nov 05 2023 16:01:02 GMT+0100 (Central European Standard Time)'),
(115, 61, 52, 3, 'Sun Nov 05 2023 16:01:02 GMT+0100 (Central European Standard Time)'),
(116, 61, 52, 3, 'Sun Nov 05 2023 16:01:02 GMT+0100 (Central European Standard Time)'),
(117, 61, 52, 3, 'Sun Nov 05 2023 16:01:02 GMT+0100 (Central European Standard Time)'),
(118, 61, 52, 3, 'Sun Nov 05 2023 16:01:02 GMT+0100 (Central European Standard Time)'),
(119, 61, 52, 3, 'Sun Nov 05 2023 16:01:02 GMT+0100 (Central European Standard Time)'),
(120, 61, 52, 3, 'Sun Nov 05 2023 16:01:03 GMT+0100 (Central European Standard Time)'),
(121, 61, 52, 3, 'Sun Nov 05 2023 16:01:03 GMT+0100 (Central European Standard Time)'),
(122, 61, 52, 3, 'Sun Nov 05 2023 16:01:03 GMT+0100 (Central European Standard Time)'),
(123, 61, 52, 3, 'Sun Nov 05 2023 16:01:03 GMT+0100 (Central European Standard Time)'),
(124, 61, 52, 3, 'Sun Nov 05 2023 16:01:03 GMT+0100 (Central European Standard Time)'),
(125, 61, 52, 3, 'Sun Nov 05 2023 16:01:03 GMT+0100 (Central European Standard Time)'),
(128, 61, 53, 3, 'Sun Nov 05 2023 16:07:57 GMT+0100 (Central European Standard Time)'),
(129, 61, 53, 3, 'Sun Nov 05 2023 16:07:57 GMT+0100 (Central European Standard Time)'),
(130, 61, 53, 3, 'Sun Nov 05 2023 16:07:58 GMT+0100 (Central European Standard Time)'),
(131, 61, 53, 3, 'Sun Nov 05 2023 16:07:58 GMT+0100 (Central European Standard Time)'),
(132, 61, 53, 3, 'Sun Nov 05 2023 16:07:58 GMT+0100 (Central European Standard Time)'),
(133, 61, 53, 1, 'Sun Nov 05 2023 16:08:22 GMT+0100 (Central European Standard Time)'),
(134, 61, 53, 1, 'Sun Nov 05 2023 16:08:22 GMT+0100 (Central European Standard Time)'),
(135, 61, 53, 1, 'Sun Nov 05 2023 16:08:23 GMT+0100 (Central European Standard Time)'),
(136, 61, 53, 2, 'Sun Nov 05 2023 16:08:26 GMT+0100 (Central European Standard Time)'),
(137, 61, 53, 2, 'Sun Nov 05 2023 16:08:26 GMT+0100 (Central European Standard Time)'),
(138, 61, 53, 2, 'Sun Nov 05 2023 16:08:27 GMT+0100 (Central European Standard Time)'),
(139, 61, 53, 2, 'Sun Nov 05 2023 16:08:27 GMT+0100 (Central European Standard Time)'),
(140, 61, 54, 3, 'Sun Nov 05 2023 16:12:05 GMT+0100 (Central European Standard Time)'),
(141, 61, 54, 3, 'Sun Nov 05 2023 16:12:05 GMT+0100 (Central European Standard Time)'),
(142, 61, 54, 3, 'Sun Nov 05 2023 16:12:05 GMT+0100 (Central European Standard Time)'),
(143, 61, 54, 3, 'Sun Nov 05 2023 16:12:06 GMT+0100 (Central European Standard Time)'),
(144, 61, 54, 3, 'Sun Nov 05 2023 16:12:06 GMT+0100 (Central European Standard Time)'),
(145, 61, 54, 3, 'Sun Nov 05 2023 16:12:06 GMT+0100 (Central European Standard Time)'),
(146, 61, 54, 3, 'Sun Nov 05 2023 16:12:11 GMT+0100 (Central European Standard Time)'),
(147, 61, 54, 3, 'Sun Nov 05 2023 16:12:11 GMT+0100 (Central European Standard Time)'),
(148, 61, 54, 3, 'Sun Nov 05 2023 16:12:11 GMT+0100 (Central European Standard Time)'),
(149, 61, 54, 3, 'Sun Nov 05 2023 16:12:11 GMT+0100 (Central European Standard Time)'),
(150, 61, 54, 3, 'Sun Nov 05 2023 16:12:11 GMT+0100 (Central European Standard Time)'),
(151, 61, 54, 3, 'Sun Nov 05 2023 16:12:11 GMT+0100 (Central European Standard Time)'),
(152, 61, 54, 3, 'Sun Nov 05 2023 16:12:12 GMT+0100 (Central European Standard Time)'),
(153, 61, 54, 3, 'Sun Nov 05 2023 16:12:12 GMT+0100 (Central European Standard Time)'),
(154, 61, 54, 3, 'Sun Nov 05 2023 16:12:12 GMT+0100 (Central European Standard Time)'),
(160, 61, 54, 7, 'Sun Nov 05 2023 16:12:29 GMT+0100 (Central European Standard Time)'),
(161, 61, 54, 7, 'Sun Nov 05 2023 16:12:29 GMT+0100 (Central European Standard Time)'),
(162, 61, 54, 7, 'Sun Nov 05 2023 16:12:30 GMT+0100 (Central European Standard Time)'),
(163, 61, 54, 7, 'Sun Nov 05 2023 16:12:30 GMT+0100 (Central European Standard Time)'),
(165, 61, 55, 7, 'Sun Nov 05 2023 16:42:55 GMT+0100 (Central European Standard Time)'),
(169, 61, 56, 1, 'Sun Nov 05 2023 17:58:39 GMT+0100 (Central European Standard Time)'),
(171, 64, 57, 7, 'Sun Nov 05 2023 18:22:07 GMT+0100 (Central European Standard Time)'),
(172, 64, 58, 7, 'Sun Nov 05 2023 18:42:49 GMT+0100 (Central European Standard Time)'),
(177, 61, 60, 7, 'Tue Nov 07 2023 18:27:17 GMT+0100 (Central European Standard Time)'),
(178, 61, 60, 6, 'Tue Nov 07 2023 18:27:17 GMT+0100 (Central European Standard Time)'),
(181, 61, 61, 7, 'Tue Nov 07 2023 19:27:59 GMT+0100 (Central European Standard Time)'),
(182, 61, 62, 1, 'Tue Nov 07 2023 20:00:36 GMT+0100 (Central European Standard Time)'),
(183, 61, 63, 1, 'Tue Nov 07 2023 20:01:33 GMT+0100 (Central European Standard Time)'),
(184, 61, 64, 1, 'Tue Nov 07 2023 20:02:40 GMT+0100 (Central European Standard Time)'),
(185, 61, 65, 14, 'Tue Nov 07 2023 20:23:33 GMT+0100 (Central European Standard Time)'),
(186, 61, 66, 3, 'Tue Nov 07 2023 20:28:04 GMT+0100 (Central European Standard Time)'),
(187, 61, 67, 7, 'Tue Nov 07 2023 20:34:13 GMT+0100 (Central European Standard Time)'),
(188, 61, 68, 3, 'Tue Nov 07 2023 20:35:33 GMT+0100 (Central European Standard Time)'),
(189, 61, 69, 7, 'Tue Nov 07 2023 20:39:06 GMT+0100 (Central European Standard Time)'),
(190, 61, 69, 6, 'Tue Nov 07 2023 20:47:22 GMT+0100 (Central European Standard Time)'),
(191, 61, 70, 7, 'Thu Nov 09 2023 20:48:42 GMT+0100 (Central European Standard Time)'),
(195, 65, 72, 10, 'Thu Nov 09 2023 22:07:40 GMT+0100 (Central European Standard Time)'),
(197, 66, 74, 4, 'Thu Nov 09 2023 22:48:47 GMT+0100 (Central European Standard Time)'),
(199, 67, 76, 4, 'Fri Nov 10 2023 00:03:37 GMT+0100 (Central European Standard Time)'),
(201, 67, 77, 1, 'Fri Nov 10 2023 00:06:25 GMT+0100 (Central European Standard Time)'),
(202, 67, 77, 2, 'Fri Nov 10 2023 00:06:32 GMT+0100 (Central European Standard Time)'),
(203, 68, 79, 3, 'Sat Nov 11 2023 11:17:21 GMT+0100 (Central European Standard Time)'),
(204, 68, 79, 3, 'Sat Nov 11 2023 11:17:22 GMT+0100 (Central European Standard Time)'),
(205, 68, 79, 12, 'Sat Nov 11 2023 11:17:25 GMT+0100 (Central European Standard Time)'),
(206, 61, 71, 2, 'Sat Nov 11 2023 15:12:24 GMT+0100 (Central European Standard Time)'),
(207, 69, 81, 7, 'Sat Nov 11 2023 22:31:01 GMT+0100 (Central European Standard Time)'),
(208, 69, 81, 7, 'Sat Nov 11 2023 22:31:01 GMT+0100 (Central European Standard Time)'),
(209, 61, 71, 17, 'Sat Nov 11 2023 22:48:05 GMT+0100 (Central European Standard Time)'),
(210, 61, 71, 18, 'Sat Nov 11 2023 22:48:10 GMT+0100 (Central European Standard Time)');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `order_address`
--

CREATE TABLE `order_address` (
  `id` int(64) NOT NULL,
  `country` varchar(64) NOT NULL,
  `zip_code` varchar(64) NOT NULL,
  `city` varchar(64) NOT NULL,
  `street_name` varchar(64) NOT NULL,
  `street_type` varchar(64) NOT NULL,
  `house_number` varchar(64) NOT NULL,
  `apartment` varchar(64) NOT NULL,
  `floor` varchar(64) NOT NULL,
  `door` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `order_address`
--

INSERT INTO `order_address` (`id`, `country`, `zip_code`, `city`, `street_name`, `street_type`, `house_number`, `apartment`, `floor`, `door`) VALUES
(1, 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', '', '', ''),
(2, 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', '', '', ''),
(3, 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', '', '', ''),
(4, 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', '', '', ''),
(5, 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', '', '', ''),
(6, 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', '', '', ''),
(7, 'qwe1', 'qwe2', 'qwe3', 'qwe4', 'qwe5', 'qwe6', 'qwe7', 'qwe8', 'qwe9'),
(8, 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', '', '', ''),
(9, 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', '', '', ''),
(10, 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', '', '', ''),
(11, 'asd', 'asd', 'asd', 'asd', 'asd', 'd', '', '', ''),
(12, 'asd', 'asd', 'asd', 'asd', 'asd', 'd', '', '', ''),
(13, 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', '', '', ''),
(14, 'asdf', 'asdf', 'asdf', 'asdf', 'asdf', 'asdf', 'asdf', 'asdf', 'asdf'),
(15, 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', '', '', ''),
(16, '', '', '', '', '', '', '', '', ''),
(17, 'fefe', 'fefe', 'fefe', 'fefe', 'efe', 'fefe', '', '', ''),
(18, '', '', '', '', '', '', '', '', ''),
(19, 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', '', '', ''),
(20, '', '', '', '', '', '', '', '', ''),
(21, 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', '', '', ''),
(22, 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', '', '', ''),
(23, 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', '', '', ''),
(24, '', '', '', '', '', '', '', '', ''),
(25, 'asd', 'asd', 'asd', 'aasd', 'asd', 'asd', '', '', ''),
(26, '', '', '', '', '', '', '', '', ''),
(27, 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', '', '', ''),
(28, '', '', '', '', '', '', '', '', ''),
(29, 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', '', '', ''),
(30, '', '', '', '', '', '', '', '', ''),
(31, 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', '', '', ''),
(32, '', '', '', '', '', '', '', '', ''),
(33, 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', '', '', ''),
(34, '', '', '', '', '', '', '', '', ''),
(35, '', '', '', '', '', '', '', '', ''),
(36, 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', '', '', ''),
(37, '', '', '', '', '', '', '', '', ''),
(38, 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', '', '', ''),
(39, '', '', '', '', '', '', '', '', ''),
(40, 'asd', 'asd', 'asd', 'a', 'a', 'a', '', '', ''),
(41, '', '', '', '', '', '', '', '', ''),
(42, 'a', 'a', 'a', 'a', 'a', 'a', '', '', ''),
(43, '', '', '', '', '', '', '', '', ''),
(44, 'a', 'a', 'a', 'a', 'a', 'a', '', '', ''),
(45, 'a', 'a', 'a', 'a', 'a', 'a', '', '', ''),
(46, 'a', 'a', 'a', 'a', 'a', 'a', '', '', ''),
(47, 'a', 'a', 'a', 'a', 'a', 'a', '', '', ''),
(48, 'a', 'a', 'a', 'a', 'a', 'a', '', '', ''),
(49, 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', '', '', ''),
(50, 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', '', '', ''),
(51, 'asd', 'f', 'w', 'e', 'r', 't', '', '', ''),
(52, 'asd', 'asd', 'asdd', 'ddd', 'ddd', 'ddd', '', '', ''),
(53, 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', '', '', ''),
(54, 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', '', ''),
(55, 'Magyarország', '1234', 'Budapest', 'Nagy', 'utca', '12', 'A', '4', '7'),
(56, 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', '', 'asd'),
(57, 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', '', 'asd'),
(58, 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', '', 'asd'),
(59, 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', '', 'asd'),
(60, 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', '', 'asd'),
(61, 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', '', 'asd'),
(62, 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', '', 'asd'),
(63, 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', '', 'asd'),
(64, 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', '', 'asd'),
(65, 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', '', 'asd'),
(66, 'asd', '1234', 'asd', 'asd', 'asd', '12', '1', '1', '1'),
(67, 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', '', '', ''),
(68, 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', '', 'asd'),
(69, 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', '', 'asd'),
(70, 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', '', 'asd'),
(71, 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', '', 'asd'),
(72, 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', '', 'asd'),
(73, 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', '', 'asd'),
(74, 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', '', 'asd'),
(75, 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', '', 'asd'),
(76, 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', '', 'asd'),
(77, 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', '', 'asd'),
(78, 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', '', 'asd'),
(79, 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', '', 'asd'),
(80, 'teszt1', 'teszt1', 'teszt1', 'teszt1', 'teszt1', 'teszt1', '', '', ''),
(81, 'teszt2', 'teszt2', 'teszt2', 'teszt2', 'teszt2', 'teszt2', '', 'teszt2', ''),
(82, 'teszt3', 'teszt3', 'teszt3', 'teszt3', 'teszt3', 'teszt3', '', '', ''),
(83, 'teszt3', 'teszt3', 'teszt3', 'teszt3', 'teszt3', 'teszt3', '', '', 'teszt3'),
(84, 'teszt4', 'teszt4', 'teszt4', 'teszt4', 'teszt4', 'teszt4', '', '', ''),
(85, 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', '', 'asd');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `product`
--

CREATE TABLE `product` (
  `id` int(64) NOT NULL,
  `variant_id` varchar(64) NOT NULL,
  `name` varchar(64) NOT NULL,
  `type` varchar(64) NOT NULL,
  `color` varchar(64) NOT NULL,
  `size` text NOT NULL,
  `price` int(64) NOT NULL,
  `quantity` int(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `product`
--

INSERT INTO `product` (`id`, `variant_id`, `name`, `type`, `color`, `size`, `price`, `quantity`) VALUES
(1, 'MSHIRT01', 'Egyetem mintás póló', 'men', 'blue', 'L', 200, 12),
(2, 'MSHIRT01', 'Egyetem mintás póló', 'men', 'gray', 'XL', 200, 19),
(3, 'WSHIRT01', 'Egyetem mintás póló', 'women', 'blue', 'L', 200, 16),
(4, 'WSHIRT01', 'Egyetem mintás póló', 'women', 'white', 'M', 200, 18),
(5, 'MSHIRT01', 'Egyetem mintás póló', 'men', 'black', 'XL', 200, 20),
(6, 'WSHIRT02', 'Egyetem mintás póló hosszított', 'women', 'black', 'M', 200, 18),
(7, 'MSHIRT02', 'Egyetem feliratos póló', 'men', 'blue', 'L', 200, 6),
(8, 'MSHIRT02', 'Egyetem feliratos póló', 'men', 'gray', 'XL', 200, 20),
(9, 'WSHIRT02', 'Egyetem mintás póló hosszított', 'women', 'white', 'L', 200, 20),
(10, 'WSHIRT02', 'Egyetem mintás póló hosszított', 'women', 'pink', 'L', 200, 19),
(11, 'WSHIRT02', 'Egyetem mintás póló hosszított', 'women', 'blue', 'XL', 200, 20),
(12, 'MSHIRT03', 'Egyetem feliratos póló 2', 'men', 'blue', 'L', 200, 19),
(13, 'MSHIRT03', 'Egyetem feliratos póló 2', 'men', 'black', 'XL', 200, 20),
(14, 'MSHIRT03', 'Egyetem feliratos póló 2', 'men', 'gray', 'M', 200, 19),
(15, 'MSHIRT02', 'Egyetem feliratos póló', 'men', 'black', 'L', 200, 20),
(16, 'MSHIRT01', 'Egyetem mintás póló', 'men', 'blue', 'XL', 200, 20),
(17, 'ABOOK01', 'Egyetem mintás notesz', 'accessary', 'blue', 'A4', 150, 19),
(18, 'AHAT01', 'Egyetem mintás baseball sapka', 'accessary', 'blue', 'L', 150, 19);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user`
--

CREATE TABLE `user` (
  `id` int(64) NOT NULL,
  `name` varchar(64) NOT NULL,
  `neptun` varchar(6) NOT NULL,
  `email` varchar(64) NOT NULL,
  `password` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `permission` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `user`
--

INSERT INTO `user` (`id`, `name`, `neptun`, `email`, `password`, `permission`) VALUES
(50, 'qwrqwr', '125151', 'fefefasd@asd.asd', '04c8bbef66b26c0020c9d3a5402786afd3b63f66', 0),
(51, 'aaa', 'aaa123', 'aaa@aaa.aaa', '04c8bbef66b26c0020c9d3a5402786afd3b63f66', 0),
(52, 'bbb', 'bbb123', 'bbb@bbb.bbb', '04c8bbef66b26c0020c9d3a5402786afd3b63f66', 0),
(54, 'asd', 'NEP123', 'email@mail.com', '04c8bbef66b26c0020c9d3a5402786afd3b63f66', 0),
(55, 'sajt', 'sajt12', 'sajt@sajt.sajt', 'e56f342ee9c26877cc3d5dd72456109178d0eea0', 0),
(61, 'asd', 'asd123', 'asd@asd.asd', '04c8bbef66b26c0020c9d3a5402786afd3b63f66', 0),
(63, 'vvv', 'vvv123', 'vvv@vvv.vvv', '04c8bbef66b26c0020c9d3a5402786afd3b63f66', 0),
(64, 'Nev', '123456', 'nev@gmail.com', '6ecc00c47cd2a3bc689df2a32bce1a0a97e30bc2', 0),
(65, 'teszt1', 'teszt1', 'teszt1@teszt.teszt', '04c8bbef66b26c0020c9d3a5402786afd3b63f66', 0),
(66, 'teszt2', 'teszt2', 'teszt2@teszt.teszt', '04c8bbef66b26c0020c9d3a5402786afd3b63f66', 0),
(67, 'teszt33', 'teszt3', 'teszt3@teszt.teszt', '04c8bbef66b26c0020c9d3a5402786afd3b63f66', 0),
(68, 'teszt4', 'teszt4', 'teszt4@teszt.teszt', '04c8bbef66b26c0020c9d3a5402786afd3b63f66', 0),
(69, 'admin', 'admin1', 'admin1@admin.com', '04c8bbef66b26c0020c9d3a5402786afd3b63f66', 1),
(70, 'teszt5', 'teszt5', 'teszt5@teszt.teszt', '04c8bbef66b26c0020c9d3a5402786afd3b63f66', 0),
(71, 'teszt6', 'teszt6', 'teszt6@teszt.teszt', '04c8bbef66b26c0020c9d3a5402786afd3b63f66', 0),
(72, 'teszt6', 'teszt8', 'teszt7@teszt.teszt', '04c8bbef66b26c0020c9d3a5402786afd3b63f66', 0);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user_address`
--

CREATE TABLE `user_address` (
  `id` int(64) NOT NULL,
  `user_id` int(64) NOT NULL,
  `country` varchar(64) NOT NULL,
  `zip_code` varchar(64) NOT NULL,
  `city` varchar(64) NOT NULL,
  `street_name` varchar(64) NOT NULL,
  `street_type` varchar(64) NOT NULL,
  `house_number` varchar(64) NOT NULL,
  `apartment` varchar(64) NOT NULL,
  `floor` varchar(64) NOT NULL,
  `door` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `user_address`
--

INSERT INTO `user_address` (`id`, `user_id`, `country`, `zip_code`, `city`, `street_name`, `street_type`, `house_number`, `apartment`, `floor`, `door`) VALUES
(2, 61, 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', '', 'asd'),
(4, 63, 'vvv', 'vvv', 'vvv', 'vvv', 'vvv', 'vvv', 'vvv', 'vvv', 'vvv'),
(5, 66, 'teszt2', 'teszt2', 'teszt2', 'teszt2', 'teszt2', 'teszt2', 'teszt2', '', ''),
(6, 67, 'teszt3', 'teszt3', 'teszt3', 'teszt3', 'teszt3', 'teszt3', '', '', 'teszt3'),
(7, 68, 'teszt4', 'teszt4', 'teszt4', 'teszt4', 'teszt4', 'teszt4', '', '', '');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user_order`
--

CREATE TABLE `user_order` (
  `id` int(64) NOT NULL,
  `status` varchar(64) NOT NULL,
  `user_id` int(64) NOT NULL,
  `address_id` int(64) NOT NULL,
  `cart_id` int(64) NOT NULL,
  `price` int(64) NOT NULL,
  `delivery_mode` varchar(64) NOT NULL,
  `date` varchar(100) NOT NULL,
  `txhash` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `user_order`
--

INSERT INTO `user_order` (`id`, `status`, `user_id`, `address_id`, `cart_id`, `price`, `delivery_mode`, `date`, `txhash`) VALUES
(33, 'paid', 51, 47, 27, 500, 'delivery', 'Wed Nov 01 2023 13:53:26 GMT+0100 (Central European Standard Tim', ''),
(34, 'paid', 51, 48, 28, 300, 'personal', 'Wed Nov 01 2023 14:03:40 GMT+0100 (Central European Standard Tim', ''),
(35, 'paid', 51, 49, 29, 200, 'personal', 'Wed Nov 01 2023 14:44:02 GMT+0100 (Central European Standard Tim', ''),
(36, 'paid', 51, 50, 30, 200, 'personal', 'Wed Nov 01 2023 14:54:41 GMT+0100 (Central European Standard Tim', ''),
(37, 'paid', 51, 51, 31, 200, 'personal', 'Wed Nov 01 2023 15:01:12 GMT+0100 (Central European Standard Tim', ''),
(38, 'paid', 54, 52, 33, 300, 'delivery', 'Wed Nov 01 2023 15:51:29 GMT+0100 (Central European Standard Tim', ''),
(39, 'paid', 61, 53, 41, 200, 'personal', 'Sun Nov 05 2023 10:16:04 GMT+0100 (Central European Standard Tim', ''),
(40, 'paid', 61, 54, 44, 900, 'delivery', 'Sun Nov 05 2023 12:04:37 GMT+0100 (Central European Standard Time)', ''),
(41, 'paid', 61, 55, 45, 500, 'delivery', 'Sun Nov 05 2023 12:40:41 GMT+0100 (Central European Standard Time)', ''),
(42, 'paid', 61, 56, 46, 200, 'personal', 'Sun Nov 05 2023 13:03:34 GMT+0100 (Central European Standard Time)', ''),
(43, 'paid', 61, 57, 47, 200, 'personal', 'Sun Nov 05 2023 13:05:38 GMT+0100 (Central European Standard Time)', ''),
(44, 'paid', 61, 58, 48, 1000, 'personal', 'Sun Nov 05 2023 15:02:26 GMT+0100 (Central European Standard Time)', ''),
(45, 'paid', 61, 59, 49, 3400, 'personal', 'Sun Nov 05 2023 15:55:39 GMT+0100 (Central European Standard Time)', ''),
(46, 'paid', 61, 60, 50, 600, 'personal', 'Sun Nov 05 2023 15:59:03 GMT+0100 (Central European Standard Time)', ''),
(47, 'paid', 61, 61, 51, 1000, 'personal', 'Sun Nov 05 2023 16:00:48 GMT+0100 (Central European Standard Time)', ''),
(48, 'paid', 61, 62, 52, 2900, 'delivery', 'Sun Nov 05 2023 16:02:12 GMT+0100 (Central European Standard Time)', ''),
(49, 'paid', 61, 63, 53, 2400, 'personal', 'Sun Nov 05 2023 16:11:40 GMT+0100 (Central European Standard Time)', ''),
(50, 'paid', 61, 64, 54, 3800, 'personal', 'Sun Nov 05 2023 16:14:15 GMT+0100 (Central European Standard Time)', ''),
(51, 'paid', 61, 65, 55, 200, 'personal', 'Sun Nov 05 2023 16:56:52 GMT+0100 (Central European Standard Time)', ''),
(52, 'paid', 64, 66, 57, 200, 'personal', 'Sun Nov 05 2023 18:23:51 GMT+0100 (Central European Standard Time)', ''),
(53, 'paid', 64, 67, 58, 200, 'personal', 'Sun Nov 05 2023 18:43:14 GMT+0100 (Central European Standard Time)', ''),
(54, 'paid', 61, 68, 56, 200, 'personal', 'Sun Nov 05 2023 19:44:24 GMT+0100 (Central European Standard Time)', ''),
(55, 'paid', 61, 69, 60, 400, 'personal', 'Tue Nov 07 2023 18:27:48 GMT+0100 (Central European Standard Time)', ''),
(56, 'paid', 61, 70, 61, 200, 'personal', 'Tue Nov 07 2023 19:55:36 GMT+0100 (Central European Standard Time)', ''),
(57, 'paid', 61, 71, 62, 200, 'personal', 'Tue Nov 07 2023 20:00:49 GMT+0100 (Central European Standard Time)', ''),
(58, 'paid', 61, 72, 63, 200, 'personal', 'Tue Nov 07 2023 20:02:00 GMT+0100 (Central European Standard Time)', ''),
(59, 'paid', 61, 73, 64, 200, 'personal', 'Tue Nov 07 2023 20:03:15 GMT+0100 (Central European Standard Time)', ''),
(63, 'paid', 61, 77, 68, 200, 'personal', 'Tue Nov 07 2023 20:38:57 GMT+0100 (Central European Standard Time)', '0xe952f33013c791ba0b56a6837c98c12636723d49bf39f52554ca4264efcbaf6f'),
(64, 'paid', 61, 78, 69, 500, 'delivery', 'Tue Nov 07 2023 20:51:51 GMT+0100 (Central European Standard Time)', '0x9d6ca860980deb4f8454ca98943ae90c8e98d2be4b1e0ed16b4431128ac90d7b'),
(65, 'paid', 61, 79, 70, 200, 'personal', 'Thu Nov 09 2023 20:49:16 GMT+0100 (Central European Standard Time)', '0x9e0167059068e23c3742c8a2052e6207a924f6e151ae4765cf9e847b893fa4ea'),
(66, 'paid', 65, 80, 72, 200, 'personal', 'Thu Nov 09 2023 22:08:17 GMT+0100 (Central European Standard Time)', '0xf23237d3b78236ba903c96bac837b892239ba87a05eadae833d1ad250457897a'),
(67, 'paid', 66, 81, 74, 200, 'personal', 'Thu Nov 09 2023 22:49:25 GMT+0100 (Central European Standard Time)', '0x0c595ee2ef85b7eedcfa5962cc177cb5249742e53b2b9aed8fe03bb4c73475a5'),
(68, 'paid', 67, 82, 76, 200, 'personal', 'Fri Nov 10 2023 00:04:03 GMT+0100 (Central European Standard Time)', '0x086c01141f9ae2a10fc1953cb6acad2f3808fdd178fdc6fcf1f98293966adacf'),
(69, 'paid', 67, 83, 77, 400, 'personal', 'Fri Nov 10 2023 00:07:04 GMT+0100 (Central European Standard Time)', '0x4d0a087d33ecbbc5f69c52d314d068672373fe4d8b5d09d14c5aff36f458adc2'),
(70, 'paid', 68, 84, 79, 600, 'personal', 'Sat Nov 11 2023 11:19:11 GMT+0100 (Central European Standard Time)', '0xdb0d9e41764499c57ded707a52ede0841d3021b6db1c88acd3b89ead772056b6'),
(71, 'under preparation', 61, 85, 71, 600, 'delivery', 'Sat Nov 11 2023 22:49:42 GMT+0100 (Central European Standard Time)', '0x30437242f7a50ef23fce58bcef1d27ee3b79b7485507c9f37b0e1e11c98ebc9f');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- A tábla indexei `cart_item`
--
ALTER TABLE `cart_item`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `cart_id` (`cart_id`);

--
-- A tábla indexei `order_address`
--
ALTER TABLE `order_address`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `user_address`
--
ALTER TABLE `user_address`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- A tábla indexei `user_order`
--
ALTER TABLE `user_order`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `address_id` (`address_id`),
  ADD KEY `cart_id` (`cart_id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(64) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=86;

--
-- AUTO_INCREMENT a táblához `cart_item`
--
ALTER TABLE `cart_item`
  MODIFY `id` int(64) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=211;

--
-- AUTO_INCREMENT a táblához `order_address`
--
ALTER TABLE `order_address`
  MODIFY `id` int(64) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=86;

--
-- AUTO_INCREMENT a táblához `product`
--
ALTER TABLE `product`
  MODIFY `id` int(64) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT a táblához `user`
--
ALTER TABLE `user`
  MODIFY `id` int(64) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT a táblához `user_address`
--
ALTER TABLE `user_address`
  MODIFY `id` int(64) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT a táblához `user_order`
--
ALTER TABLE `user_order`
  MODIFY `id` int(64) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Megkötések a táblához `cart_item`
--
ALTER TABLE `cart_item`
  ADD CONSTRAINT `cart_item_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  ADD CONSTRAINT `cart_item_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `cart_item_ibfk_3` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`id`);

--
-- Megkötések a táblához `user_address`
--
ALTER TABLE `user_address`
  ADD CONSTRAINT `user_address_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Megkötések a táblához `user_order`
--
ALTER TABLE `user_order`
  ADD CONSTRAINT `user_order_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `user_order_ibfk_2` FOREIGN KEY (`address_id`) REFERENCES `order_address` (`id`),
  ADD CONSTRAINT `user_order_ibfk_3` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
