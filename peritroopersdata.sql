-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 22-07-2021 a las 00:47:05
-- Versión del servidor: 10.4.14-MariaDB
-- Versión de PHP: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `peritroopers`
--

--
-- Volcado de datos para la tabla `brands`
--

INSERT INTO `brands` (`id`, `name`) VALUES
(7, 'Blue'),
(3, 'Corsair'),
(4, 'HyperX'),
(1, 'Logitech'),
(5, 'Razer'),
(2, 'Redragon'),
(6, 'Shure');

--
-- Volcado de datos para la tabla `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(3, 'Aurículares'),
(1, 'Micrófonos'),
(4, 'Mouses'),
(2, 'Teclados');

--
-- Volcado de datos para la tabla `colors`
--

INSERT INTO `colors` (`id`, `name`) VALUES
(5, 'Azul'),
(2, 'Blanco'),
(6, 'Celeste'),
(3, 'Negro'),
(1, 'Rojo'),
(7, 'Rosa'),
(4, 'Verde'),
(8, 'Violeta');

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `price`, `image`, `categoryId`, `colorId`, `stock`, `brandId`) VALUES
(1, 'Teclado Redragon ergonómico retroiluminado RGB', 'Teclado fachero', '4571.51', 'tecladoRedDragonNovedades.jpg', 2, 3, 5748, 2),
(6, 'Teclado gamer HyperX Alloy Origins QWERTY Red español latinoamérica color negro con luz RGB', 'Está diseñado para que sea un teclado, bonito y con luces. Bla bla blablablabla', '12998.99', '1626906138636_img.jpg', 3, 1, 45, 4),
(7, 'Mouse inalámbrico Logitech Pebble M350', 'Los mouses Logitech se adaptan a la forma de tu mano para proporcionarte horas de comodidad. ', '2399.44', '1626906044618_img.jpg', 4, 1, 10, 1),
(8, 'Micrófono HyperX QuadCast condensador multipatrón negro', 'Al ser condensador, posibilitará un resultado claro y fino. Es ideal para percusiones, guitarras, pianos, entre otros. Por su respuesta tan definida ante la voz, es el más elegido ', '16939.88', '1626905997463_img.jpg', 1, 1, 23, 4);

--
-- Volcado de datos para la tabla `status`
--

INSERT INTO `status` (`id`, `name`) VALUES
(1, 'En proceso'),
(2, 'Completado'),
(3, 'Entregado'),
(4, 'Cancelado');

--
-- Volcado de datos para la tabla `usercategories`
--

INSERT INTO `usercategories` (`id`, `name`) VALUES
(2, 'Cliente'),
(3, 'Invitado'),
(1, 'root');

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `lastname`, `birthdate`, `address`, `email`, `password`, `userCategoryId`, `avatar`) VALUES
(1, 'Admin', 'Istrador', '2000-01-01', 'Localhost 3030', 'admin@peritroopers.com', '$2a$10$v4swd0QoGfagd99JQd139uNskvXUbDbsREMHdGcAPjeGrafUivwiW', 1, '1626906326999_img.png'),
(2, 'Fernanda', 'Rios', '1989-05-27', 'Micasa 123', 'papaspei@peritroopers.com', '$2a$10$EhYU4H3KWET4.GpboLi.3uaWmdUs0Vtmnd9lCQljvQ7arJmTw8dLS', 2, '1626906657724_img.jpeg'),
(3, 'Clara', 'Mayorga', '1992-06-19', 'Tucasa 321', 'clarita@peritroopers.com', '$2a$10$phJajSiZnofUF75C0jM5AOOh8kBVt.iZ050Sc2tgcVfBI3z4FJeS6', 2, '1626906858701_img.jpeg'),
(4, 'Yisus', 'Benavide', '2000-07-08', 'Sucasa 213', 'yisus@peritroopers.com', '$2a$10$OFn8J0KPslSuSTxpqFDrxOxoBTLc8jEpELAcR6Ltb5m6k4boF3Gf6', 2, '1626906978061_img.jpeg'),
(10, 'Naruto', 'Uzumaki', '1992-07-22', 'Konoha 456', 'naruto@konoha.com', '$2a$10$DMupr.aqYcY9HAR0F1pVde8wg.S8YCBoUdR6.9kF2W5tDXK0DFaZa', 2, '1626907259206_img.png');

--
-- Volcado de datos para la tabla `vouchertype`
--

INSERT INTO `vouchertype` (`id`, `name`) VALUES
(1, 'Factura A'),
(2, 'Factura B'),
(3, 'Factura C');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
