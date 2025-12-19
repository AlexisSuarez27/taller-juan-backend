# Taller Juan - Backend

## Instalación
1. npm install
2. Crea archivo .env con:
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=tu_password
   DB_NAME=proyect_reparaciones
   JWT_SECRET=un_secreto_muy_largo
   PORT= tu port
3. Importa el dump SQL a MySQL
4. npm run dev


BDD EN PHPMYADMIN:

-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3307
-- Tiempo de generación: 19-12-2025 a las 06:55:16
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `proyect_reparaciones`
--
DROP DATABASE IF EXISTS `proyect_reparaciones`;
CREATE DATABASE IF NOT EXISTS `proyect_reparaciones` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `proyect_reparaciones`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

DROP TABLE IF EXISTS `clientes`;
CREATE TABLE `clientes` (
  `id_cliente` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `cedula` varchar(15) NOT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `correo` varchar(100) NOT NULL,
  PRIMARY KEY (`id_cliente`),
  UNIQUE KEY `cedula` (`cedula`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`id_cliente`, `nombre`, `cedula`, `telefono`, `correo`) VALUES
(1, 'Jorge Suarez', '0955239363', '0982927580', 'suarez@hotmail.es'),
(2, 'Solange Sandoval', '0987654321', '0987654322', 'Solange@hotmail.com'),
(3, 'Alex Montoya', '0918273645', '0999999999', 'montoya@outlook.com'),
(4, 'María López', '0923456781', '0991234567', 'maria.lopez@gmail.com'),
(5, 'Carlos Ramírez', '0934567892', '0987654321', 'carlos.r@hotmail.com'),
(6, 'Ana Torres', '0945678903', '0976543210', 'ana.torres@yahoo.com'),
(7, 'Luis Mendoza', '0956789014', '0965432109', 'luis.men@gmail.com'),
(8, 'Sofía Herrera', '0967890125', '0954321098', 'sofia.h@gmail.com'),
(9, 'Pablo Escobar', '0986347634', '0998647566', 'escobar@gmail.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `usuario` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `rol` enum('admin','tecnico') NOT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `usuario` (`usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `usuario`, `password`, `rol`) VALUES
(1, 'admin', '$2b$12$qGIpPJarmoQQJRN5YsKkX.vJ0E2gIHVsrnxmgOrjuziaSkuuVxdbq', 'admin'),
(2, 'tecnico2', '$2b$12$DVv9gFP0wanHMugqCucxc.bCQId1/6O8N.4FpDPSrll5ehHVft9jG', 'tecnico');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reparaciones`
--

DROP TABLE IF EXISTS `reparaciones`;
CREATE TABLE `reparaciones` (
  `id_reparacion` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `precio_mano_obra` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id_reparacion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `reparaciones`
--

INSERT INTO `reparaciones` (`id_reparacion`, `nombre`, `precio_mano_obra`) VALUES
(1, 'Cambio de pantalla', 40.00),
(2, 'Cambio de batería', 25.00),
(3, 'Reparación de puerto de carga', 30.00),
(4, 'Cambio de botón de encendido', 20.00),
(5, 'Reparación de cámara', 35.00),
(6, 'Limpieza interna y cambio de pasta térmica', 15.00),
(7, 'Cambio de mica protectora', 10.00),
(8, 'Reparación de placa (soldadura)', 60.00),
(9, 'Cambio de altavoz o auricular', 25.00),
(10, 'Diagnóstico avanzado + software', 20.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `repuestos`
--

DROP TABLE IF EXISTS `repuestos`;
CREATE TABLE `repuestos` (
  `id_repuesto` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `stock` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id_repuesto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `repuestos`
--

INSERT INTO `repuestos` (`id_repuesto`, `nombre`, `precio`, `stock`) VALUES
(1, 'Pantalla completa Samsung A-series', 80.00, 15),
(2, 'Pantalla completa iPhone', 120.00, 10),
(3, 'Batería original Samsung', 35.00, 20),
(4, 'Batería original iPhone', 45.00, 12),
(5, 'Puerto de carga USB-C', 15.00, 30),
(6, 'Mica templada 9H', 8.00, 50),
(7, 'Botón de encendido flexible', 12.00, 25),
(8, 'Cámara trasera Samsung', 40.00, 8),
(9, 'Altavoz buzzer', 18.00, 18),
(10, 'Pasta térmica', 5.00, 40);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ordenes`
--

DROP TABLE IF EXISTS `ordenes`;
CREATE TABLE `ordenes` (
  `id_orden` int(11) NOT NULL AUTO_INCREMENT,
  `id_cliente` int(11) NOT NULL,
  `id_tecnico` int(11) DEFAULT NULL,
  `nombre_equipo` varchar(100) NOT NULL,
  `marca` varchar(50) DEFAULT NULL,
  `modelo` varchar(50) DEFAULT NULL,
  `estado` enum('Recibido','En reparación','Finalizada') DEFAULT 'Recibido',
  `comentario_tecnico` text DEFAULT NULL,
  `fecha` date NOT NULL,
  PRIMARY KEY (`id_orden`),
  KEY `id_cliente` (`id_cliente`),
  KEY `id_tecnico` (`id_tecnico`),
  CONSTRAINT `fk_orden_cliente` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id_cliente`),
  CONSTRAINT `fk_orden_tecnico` FOREIGN KEY (`id_tecnico`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ordenes`
--

INSERT INTO `ordenes` (`id_orden`, `id_cliente`, `id_tecnico`, `nombre_equipo`, `marca`, `modelo`, `estado`, `comentario_tecnico`, `fecha`) VALUES
(2, 1, 2, 'Galaxy J7', 'Samsung', 'J', 'Finalizada', 'Su dispositivo está listo para ser retirado.', '2025-12-13'),
(3, 2, 2, 'iPhone 17', 'Apple', 'Pro Max', 'En reparación', '', '2025-12-18'),
(8, 1, NULL, 'iPhone 12', 'Apple', 'iPhone 12', 'Finalizada', 'Pantalla cambiada, cliente satisfecho', '2025-10-05'),
(9, 2, NULL, 'Galaxy A52', 'Samsung', 'A52', 'Finalizada', 'Batería nueva instalada', '2025-10-08'),
(10, 3, NULL, 'Redmi Note 10', 'Xiaomi', 'Note 10', 'Finalizada', 'Puerto de carga reparado', '2025-10-12'),
(11, 1, NULL, 'iPhone 11', 'Apple', 'iPhone 11', 'Finalizada', 'Cambio de mica y limpieza', '2025-10-15'),
(12, 4, NULL, 'Galaxy S21', 'Samsung', 'S21', 'Finalizada', 'Reparación de cámara trasera', '2025-11-02'),
(13, 5, NULL, 'P40 Pro', 'Huawei', 'P40 Pro', 'Finalizada', 'Cambio de batería y puerto', '2025-11-07'),
(14, 2, NULL, 'Moto G9', 'Motorola', 'G9', 'Finalizada', 'Botón de encendido reparado', '2025-11-10'),
(15, 3, NULL, 'iPhone 13', 'Apple', 'iPhone 13', 'Finalizada', 'Pantalla completa cambiada', '2025-11-14'),
(16, 6, NULL, 'Galaxy A72', 'Samsung', 'A72', 'Finalizada', 'Limpieza interna y pasta térmica', '2025-11-18'),
(17, 1, NULL, 'OnePlus 9', 'OnePlus', '9', 'Finalizada', 'Reparación de altavoz', '2025-11-22'),
(18, 4, NULL, 'iPhone 14', 'Apple', 'iPhone 14', 'Finalizada', 'Cambio de pantalla original', '2025-12-01'),
(19, 5, NULL, 'Galaxy S22', 'Samsung', 'S22', 'Finalizada', 'Reparación de placa menor', '2025-12-03'),
(20, 2, NULL, 'Pixel 7', 'Google', 'Pixel 7', 'Finalizada', 'Cambio de batería', '2025-12-05'),
(21, 3, NULL, 'Redmi Note 12', 'Xiaomi', 'Note 12', 'Finalizada', 'Cambio de mica protectora', '2025-12-07'),
(22, 6, NULL, 'iPhone XR', 'Apple', 'XR', 'Finalizada', 'Diagnóstico + cambio de puerto', '2025-12-09'),
(23, 1, NULL, 'Galaxy Z Fold', 'Samsung', 'Z Fold 3', 'Finalizada', 'Reparación de pantalla externa', '2025-12-11'),
(24, 4, NULL, 'Moto Edge 30', 'Motorola', 'Edge 30', 'Finalizada', 'Cambio de cámara', '2025-12-13'),
(25, 5, NULL, 'iPhone SE 2022', 'Apple', 'SE', 'Finalizada', 'Batería y limpieza', '2025-12-15'),
(26, 2, NULL, 'Galaxy A34', 'Samsung', 'A34', 'Finalizada', 'Reparación de botón lateral', '2025-12-16'),
(27, 3, NULL, 'OnePlus Nord', 'OnePlus', 'Nord 2', 'Finalizada', 'Cambio completo de pantalla', '2025-12-17'),
(28, 9, 2, 'iPhone', '11', 'Pro', 'Recibido', NULL, '2025-12-18');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orden_reparaciones`
--

DROP TABLE IF EXISTS `orden_reparaciones`;
CREATE TABLE `orden_reparaciones` (
  `id_orden` int(11) NOT NULL,
  `id_reparacion` int(11) NOT NULL,
  PRIMARY KEY (`id_orden`,`id_reparacion`),
  KEY `id_reparacion` (`id_reparacion`),
  CONSTRAINT `orden_reparaciones_ibfk_1` FOREIGN KEY (`id_orden`) REFERENCES `ordenes` (`id_orden`) ON DELETE CASCADE,
  CONSTRAINT `orden_reparaciones_ibfk_2` FOREIGN KEY (`id_reparacion`) REFERENCES `reparaciones` (`id_reparacion`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `orden_reparaciones`
--

INSERT INTO `orden_reparaciones` (`id_orden`, `id_reparacion`) VALUES
(2, 1),
(3, 9),
(8, 1),
(8, 7),
(9, 2),
(10, 3),
(11, 7),
(12, 5),
(13, 2),
(13, 3),
(14, 4),
(15, 1),
(16, 6),
(17, 9),
(18, 1),
(19, 8),
(20, 2),
(21, 7),
(22, 3),
(22, 10),
(23, 1),
(24, 5),
(25, 2),
(26, 4),
(27, 1),
(28, 2),
(28, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orden_repuestos`
--

DROP TABLE IF EXISTS `orden_repuestos`;
CREATE TABLE `orden_repuestos` (
  `id_orden` int(11) NOT NULL,
  `id_repuesto` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id_orden`,`id_repuesto`),
  KEY `id_repuesto` (`id_repuesto`),
  CONSTRAINT `orden_repuestos_ibfk_1` FOREIGN KEY (`id_orden`) REFERENCES `ordenes` (`id_orden`) ON DELETE CASCADE,
  CONSTRAINT `orden_repuestos_ibfk_2` FOREIGN KEY (`id_repuesto`) REFERENCES `repuestos` (`id_repuesto`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `orden_repuestos`
--

INSERT INTO `orden_repuestos` (`id_orden`, `id_repuesto`, `cantidad`) VALUES
(3, 6, 1),
(8, 2, 1),
(9, 3, 1),
(12, 8, 1),
(15, 1, 1),
(18, 2, 1),
(23, 1, 1),
(25, 4, 1),
(27, 1, 1);

--
-- Restricciones para tablas volcadas
--

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
