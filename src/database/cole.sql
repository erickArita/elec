-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 04-06-2020 a las 01:26:07
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.4.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `cole`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumno`
--

CREATE TABLE `alumno` (
  `ide_alumno` int(11) NOT NULL,
  `id_alumno` varchar(13) NOT NULL,
  `nombre_alumno` varchar(30) NOT NULL,
  `apellido_alumno` varchar(30) NOT NULL,
  `sexo_alumno` varchar(30) NOT NULL,
  `nacimiento_alumno` year(4) NOT NULL,
  `grado_alumno` int(13) NOT NULL,
  `modalidad_alumno` int(1) DEFAULT NULL,
  `padre_alumno` varchar(30) NOT NULL,
  `domicilio_alumno` varchar(30) NOT NULL,
  `alumno_telefono` int(11) NOT NULL,
  `ano` int(11) DEFAULT 2000
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `alumno`
--

INSERT INTO `alumno` (`ide_alumno`, `id_alumno`, `nombre_alumno`, `apellido_alumno`, `sexo_alumno`, `nacimiento_alumno`, `grado_alumno`, `modalidad_alumno`, `padre_alumno`, `domicilio_alumno`, `alumno_telefono`, `ano`) VALUES
(41, '0421200200900', 'lkkk', 'ojoj', 'M', 2021, 7, 1, 'mm', 'mm', 0, 2000),
(43, '8765765', 'lhljh', 'kjhkjh', 'F', 2020, 10, 2, 'mm', 'mm', 0, 2000),
(44, '876576588', 'lhljh', 'kjhkjh', 'F', 2020, 10, 2, 'mm', 'mm', 0, 2000),
(45, '876576588000', 'lhljh', 'kjhkjh', 'F', 2020, 10, 2, 'mm', 'mm', 0, 2000),
(46, '0909987654353', 'Alvaro', 'Ceballos', 'M', 2020, 7, 1, 'mm', 'mm', 0, 2000),
(47, '7878787788787', 'lkjlk', 'jlkj', 'M', 2020, 7, 1, 'km', 'mkm', 0, 2000),
(48, '0000000098888', 'jkj', 'hkjh', 'F', 2020, 7, 1, 'kmk', 'mm', 0, 2000),
(49, '0909090909909', 'lklj', 'lkjlkj', 'F', 2020, 7, 1, 'kjk', 'jj', 0, 2000),
(50, '9876543456789', 'ihh', 'iuhyiuyiu', 'F', 2021, 7, 1, 'klkbn', 'kjkkjhhj', 0, 2000),
(51, '8765634425432', 'kjh', 'kjhkjh', 'F', 2021, 7, 1, 'kn', 'mkm', 0, 2000),
(52, '0987654345678', 'hj', 'hjgjhg', 'F', 2020, 7, 1, 'kmk', 'lll llllklk', 98761239, 2000),
(53, '9878787878787', 'lkjklj', 'lkjkj', 'F', 1988, 10, 2, 'kmkmkmkmkm', 'niji', 0, 2000),
(54, '87876876', 'jhkjh', 'kjhkjh', 'M', 2018, 11, 7, 'ghvhgv', 'knkn', 8989898, 2000),
(55, '8787878787871', 'jkhkjh', 'kjhkjh', 'F', 2005, 11, 7, 'jygyjg', 'knkn', 878785, 2000),
(56, '6565456435433', 'prueba', 'uno', 'F', 2005, 11, 7, 'jjkh', 'jjh', 989898, 2000),
(57, '4435433243254', 'prueba ', 'dos', 'F', 2009, 11, 7, 'hjh', 'jhbjh', 87878787, 2000),
(58, '4435433243254', 'prueba ', 'dos', 'F', 2009, 9, 7, 'hjh', 'jhbjh', 87878787, 2000),
(60, '76765675', 'kjjhk', 'hkjhk', 'M', 2016, 7, 1, 'hggh', 'njmkjmk', 8787, 2000),
(61, '8767665746435', 'kjhkjh', 'kjh', 'M', 2020, 10, 2, 'mnk', 'nkmkm', 87788, 2000),
(62, '65765765', 'kljkljl', 'uhkjh', 'F', 2020, 10, 2, 'jhggh', 'jkhkjh', 9898988, 2000),
(63, '87878', 'kuhkjh', 'kh', 'M', 2019, 10, 2, 'jhj', 'knk', 87876, 2000),
(64, '56654543', 'jnkjn', 'kjlkj', 'M', 2020, 10, 2, 'uhu', 'mm', 87, 2000),
(65, '7656565656556', 'lijij', 'ijoij', 'F', 2007, 10, 2, 'uhu', 'knkmn', 7676, 2000),
(66, '7656546545435', 'kjkjh', 'jkhkjh', 'F', 2020, 10, 2, 'kjjkjh', 'kjhkjh', 97887, 2000),
(67, '7675654535326', 'lkjlk', 'jlkjlkj', 'F', 2020, 10, 2, 'jhhj', 'kjknkjn', 897987, 2000),
(68, '76576', 'kjhkh', 'kjhj', 'F', 2020, 10, 2, 'khghjg', 'kjjkjh', 88676556, 2000),
(69, '8767657656865', 'kjhkjh', 'kjhkjh', 'M', 1988, 10, 2, 'kjj', 'kjhkj', 878787, 2000),
(70, '87767654543', 'kljhkjlh', 'kjhlkh', 'F', 2020, 11, 7, 'jhg', 'kjhgkjh', 978897, 2000),
(71, '6756634323414', 'kjhkjh', 'kjhkjh', 'F', 2020, 11, 7, 'jhgjhg', 'kjhjh', 7656445, 2000),
(72, '8987968678768', 'lkkjlk', 'jlkjlk', 'F', 2010, 7, 1, 'kmkmk', 'mkmk', 878787, 2000),
(73, '7656765765', 'kjhjkh', 'kjhkjh', 'F', 2009, 7, 1, 'jj', 'knkn', 7676, 2000),
(74, '8787878778787', 'kjjhjkh', 'kjhkjh', 'F', 2020, 7, 1, 'knjn', 'jnjn', 99999, 2000),
(75, '8786876786876', 'llkjlk', 'jlkjlkj', 'F', 2020, 10, 2, 'hjhg', 'knjknk', 998, 2000),
(76, '8665765765675', 'uhkh', 'kljhkjh', 'M', 2016, 7, 1, 'jhghg', 'kjk', 6786765, 2000),
(77, '8767654543543', 'hjgjhg', 'jhgjhg', 'F', 2018, 11, 5, 'ugg', 'lmkm', 98787, 2000),
(78, '86565453', 'kkkkkkkkk', 'jhkjh', 'F', 2020, 10, 2, 'hf', ',mnkj', 8767, 2000),
(79, '8656545376876', 'jjjjjjjjjjjjjj', 'jhkjh', 'F', 2020, 11, 3, 'hf', ',mnkj', 8767, 2000),
(89, '876876', 'lklh', 'hjk', 'F', 2019, 11, 6, 'knb', 'kjk', 8989, 2000),
(90, '786765765', 'jgjh', 'ghjgjh', 'M', 2021, 7, 1, 'lj', 'kn', 878, 2000),
(91, '7675454354354', 'stuart', 'okoko', 'M', 2002, 7, 1, 'kkbh', 'kjnkjn', 99898, 2000),
(92, '7866876786876', 'hfhf', 'uytuyt', 'M', 1994, 12, 7, 'j ', 'mo', 89798787, 2000),
(93, '6757657657657', 'kjh', 'kjhkjh', 'M', 2005, 11, 4, 'vb', 'jknkjn', 76786786, 2000),
(94, '0987654345678', 'uyuh', 'kjhkjh', 'M', 2011, 11, 4, 'jhg', 'mknk', 98989, 2000),
(95, '765765765765', 'uih', 'kuhkh', 'M', 2011, 11, 5, 'njn', 'kmkm', 8787878, 2000),
(96, '7856765', 'jg', 'hjhg', 'M', 2016, 11, 5, 'mjbn', 'km', 8787, 2000),
(97, '8768768768768', 'iuhuh', 'ihkih', 'M', 2014, 12, 5, 'jhg', 'kjkj', 6876, 2000),
(98, '7687687687687', 'kuhgkjh', 'kjhkjh', 'M', 2011, 12, 6, 'jhbjnv', 'kjnkjn', 876876, 2000),
(99, '7867876876876', 'kjughjhghjg', 'jghjg', 'M', 2011, 12, 7, 'mb', 'mnbmnb', 65765, 2000),
(101, '876876', 'hjkjh', 'khkjh', 'F', 2013, 11, 3, 'knn', ' m', 98, 2000),
(118, '8786876876876', 'kuuhkjhk', 'jhhhkj', 'M', 2004, 10, 2, 'kjknn', 'kkm', 7687687, 2020),
(145, '87987987', 'lkjhh', 'oiuoiu', 'M', 2008, 10, 2, 'uih', 'kmkm', 9898, 2020);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `anofundamento`
--

CREATE TABLE `anofundamento` (
  `alumno` int(11) DEFAULT NULL,
  `matematicasi` float DEFAULT 0,
  `biologiai` float DEFAULT 0,
  `psicologia` float DEFAULT 0,
  `informatica` float DEFAULT 0,
  `quimicai` float DEFAULT 0,
  `espanol` float DEFAULT 0,
  `sociologia` float DEFAULT 0,
  `fisicai` float DEFAULT 0,
  `inglesi` float DEFAULT 0,
  `filosofia` float DEFAULT 0,
  `matematicasii` float DEFAULT 0,
  `historia_honduras` float DEFAULT 0,
  `biologiaii` float DEFAULT 0,
  `quimicaii` float DEFAULT 0,
  `espanolii` float DEFAULT 0,
  `inglesii` float DEFAULT 0,
  `orientacion_vo` float DEFAULT 0,
  `fisicaii` float DEFAULT 0,
  `lenguaje_art` float DEFAULT 0,
  `educacion_fisica` float DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `anofundamento`
--

INSERT INTO `anofundamento` (`alumno`, `matematicasi`, `biologiai`, `psicologia`, `informatica`, `quimicai`, `espanol`, `sociologia`, `fisicai`, `inglesi`, `filosofia`, `matematicasii`, `historia_honduras`, `biologiaii`, `quimicaii`, `espanolii`, `inglesii`, `orientacion_vo`, `fisicaii`, `lenguaje_art`, `educacion_fisica`) VALUES
(67, 90, 90, 90, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(75, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(78, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(51, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(118, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(145, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bch`
--

CREATE TABLE `bch` (
  `id_bch` int(11) DEFAULT NULL,
  `matematicas_iii` float DEFAULT 0,
  `quimica_iii` float DEFAULT 0,
  `lengua_literatu` float DEFAULT 0,
  `edu_fisica` float DEFAULT 0,
  `ingles_iii` float DEFAULT 0,
  `fun_inves_social` float DEFAULT 0,
  `fisica_iii` float DEFAULT 0,
  `logica_simbol` float DEFAULT 0,
  `orientac_edu_superior` float DEFAULT 0,
  `apreciacion_art` float DEFAULT 0,
  `tic` float DEFAULT 0,
  `matematicas_iv` float DEFAULT 0,
  `biologia_humana` float DEFAULT 0,
  `leng_pensamien_critico` float DEFAULT 0,
  `fisica_iv` float DEFAULT 0,
  `ingles_iv` float DEFAULT 0,
  `historia_contep` float DEFAULT 0,
  `antropologia` float DEFAULT 0,
  `fundament_etica_profecinal` float DEFAULT 0,
  `dibujo_tecnico` float DEFAULT 0,
  `edu_ambiental` float DEFAULT 0,
  `diseno_proyectos_ci` float DEFAULT 0,
  `intro_programacion` float DEFAULT 0,
  `intro_economia` float DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `bch`
--

INSERT INTO `bch` (`id_bch`, `matematicas_iii`, `quimica_iii`, `lengua_literatu`, `edu_fisica`, `ingles_iii`, `fun_inves_social`, `fisica_iii`, `logica_simbol`, `orientac_edu_superior`, `apreciacion_art`, `tic`, `matematicas_iv`, `biologia_humana`, `leng_pensamien_critico`, `fisica_iv`, `ingles_iv`, `historia_contep`, `antropologia`, `fundament_etica_profecinal`, `dibujo_tecnico`, `edu_ambiental`, `diseno_proyectos_ci`, `intro_programacion`, `intro_economia`) VALUES
(79, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90),
(101, 100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bchac`
--

CREATE TABLE `bchac` (
  `id_bchac` int(11) NOT NULL,
  `matematicas_i` float DEFAULT 0,
  `espanol_i` float DEFAULT 0,
  `ingles_i` float DEFAULT 0,
  `quimica_i` float DEFAULT 0,
  `informatica` float DEFAULT 0,
  `fisica_i` float DEFAULT 0,
  `biologia_i` float DEFAULT 0,
  `filosofia` float DEFAULT 0,
  `psicologia` float DEFAULT 0,
  `sociologia` float DEFAULT 0,
  `matematicas_ii` float DEFAULT 0,
  `espanol_ii` float DEFAULT 0,
  `ingles_ii` float DEFAULT 0,
  `quimica_ii` float DEFAULT 0,
  `fisica_ii` float DEFAULT 0,
  `biologia_ii` float DEFAULT 0,
  `lenguaje_art` float DEFAULT 0,
  `orientacion_voca` float DEFAULT 0,
  `historia_honduras` float DEFAULT 0,
  `educacion_fisica` float DEFAULT 0,
  `matematicas_iii` float DEFAULT 0,
  `lengua_literatura` float DEFAULT 0,
  `intro_economia` float DEFAULT 0,
  `fundameto_invest` float DEFAULT 0,
  `quimica_iii` float DEFAULT 0,
  `matematicas_iv` float DEFAULT 0,
  `ingles_iii` float DEFAULT 0,
  `logica_simbolica` float DEFAULT 0,
  `orient_edu_superior` float DEFAULT 0,
  `tic` float DEFAULT 0,
  `apreciacion_art` float DEFAULT 0,
  `fisica_iii` float DEFAULT 0,
  `lenguaje_pensamieto_critico` float DEFAULT 0,
  `antropologia` float DEFAULT 0,
  `histo_contemporanea` float DEFAULT 0,
  `edu_fisica_deporte_ii` float DEFAULT 0,
  `edu_ambiental` float DEFAULT 0,
  `diseno_proyect_cient` float DEFAULT 0,
  `fisica_iv` float DEFAULT 0,
  `biologia_human` float DEFAULT 0,
  `programacion` float DEFAULT 0,
  `ingles_iv` float DEFAULT 0,
  `dibujo_tecnico` float DEFAULT 0,
  `funda_etica_pro` float DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `bchac`
--

INSERT INTO `bchac` (`id_bchac`, `matematicas_i`, `espanol_i`, `ingles_i`, `quimica_i`, `informatica`, `fisica_i`, `biologia_i`, `filosofia`, `psicologia`, `sociologia`, `matematicas_ii`, `espanol_ii`, `ingles_ii`, `quimica_ii`, `fisica_ii`, `biologia_ii`, `lenguaje_art`, `orientacion_voca`, `historia_honduras`, `educacion_fisica`, `matematicas_iii`, `lengua_literatura`, `intro_economia`, `fundameto_invest`, `quimica_iii`, `matematicas_iv`, `ingles_iii`, `logica_simbolica`, `orient_edu_superior`, `tic`, `apreciacion_art`, `fisica_iii`, `lenguaje_pensamieto_critico`, `antropologia`, `histo_contemporanea`, `edu_fisica_deporte_ii`, `edu_ambiental`, `diseno_proyect_cient`, `fisica_iv`, `biologia_human`, `programacion`, `ingles_iv`, `dibujo_tecnico`, `funda_etica_pro`) VALUES
(94, 90, 90, 90, 90, 90, 90, 90, 90, 90, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `btpae`
--

CREATE TABLE `btpae` (
  `id_btpae` int(11) DEFAULT NULL,
  `matematicasiii` float DEFAULT 0,
  `lengua_literatura` float DEFAULT 0,
  `ingles_tiii` float DEFAULT 0,
  `orientacion_prof` float DEFAULT 0,
  `contabilidad_bai` float DEFAULT 0,
  `compotamiento_orga` float DEFAULT 0,
  `desarrolo_socioeco` float DEFAULT 0,
  `adminis_ge` float DEFAULT 0,
  `estadistica_admin_i` float DEFAULT 0,
  `desarrolo_cultura` float DEFAULT 0,
  `gestion_proyectos` float DEFAULT 0,
  `legislacion` float DEFAULT 0,
  `mercadotecnia` float DEFAULT 0,
  `organizacion_trabajo` float DEFAULT 0,
  `contabilidad_basic_ii` float DEFAULT 0,
  `contabilidad_sociedades` float DEFAULT 0,
  `metodologia_investiga` float DEFAULT 0,
  `proyectos_presu` float DEFAULT 0,
  `legislacion_mercanti` float DEFAULT 0,
  `contabilidad_costos` float DEFAULT 0,
  `investiga_mercados` float DEFAULT 0,
  `estadistica_admin_ii` float DEFAULT 0,
  `informmatica_adminis` float DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `btpae`
--

INSERT INTO `btpae` (`id_btpae`, `matematicasiii`, `lengua_literatura`, `ingles_tiii`, `orientacion_prof`, `contabilidad_bai`, `compotamiento_orga`, `desarrolo_socioeco`, `adminis_ge`, `estadistica_admin_i`, `desarrolo_cultura`, `gestion_proyectos`, `legislacion`, `mercadotecnia`, `organizacion_trabajo`, `contabilidad_basic_ii`, `contabilidad_sociedades`, `metodologia_investiga`, `proyectos_presu`, `legislacion_mercanti`, `contabilidad_costos`, `investiga_mercados`, `estadistica_admin_ii`, `informmatica_adminis`) VALUES
(77, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(96, 90, 90, 90, 90, 90, 90, 90, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(107, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `btpae_ii`
--

CREATE TABLE `btpae_ii` (
  `alumnoae_ii` int(11) DEFAULT 0,
  `gestion_talent_humano_i` float DEFAULT 0,
  `higiene_segurudad_indus` float DEFAULT 0,
  `administracion_produc` float DEFAULT 0,
  `planeacion_estrategica` float DEFAULT 0,
  `mercadotecnia_apli_servicios` float DEFAULT 0,
  `matematica_finan` float DEFAULT 0,
  `gestion_presupuestaria` float DEFAULT 0,
  `mercadotecnia_internacional` float DEFAULT 0,
  `administracion_recursos_finan` float DEFAULT 0,
  `gestion_talent_humano_ii` float DEFAULT 0,
  `gestio_instituciones` float DEFAULT 0,
  `administracion_ventas` float DEFAULT 0,
  `auditoria` float DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `btpae_ii`
--

INSERT INTO `btpae_ii` (`alumnoae_ii`, `gestion_talent_humano_i`, `higiene_segurudad_indus`, `administracion_produc`, `planeacion_estrategica`, `mercadotecnia_apli_servicios`, `matematica_finan`, `gestion_presupuestaria`, `mercadotecnia_internacional`, `administracion_recursos_finan`, `gestion_talent_humano_ii`, `gestio_instituciones`, `administracion_ventas`, `auditoria`) VALUES
(97, 0, 10, 0, 50, 0, 0, 0, 0, 0, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `btpcf`
--

CREATE TABLE `btpcf` (
  `id_alumnocf` int(11) NOT NULL,
  `matematica_aplicada` float DEFAULT 0,
  `ingles_tec` float DEFAULT 0,
  `lengua_literatura` float DEFAULT 0,
  `administra_general` float DEFAULT 0,
  `etica_orientacion` float DEFAULT 0,
  `contabilidad_i` float DEFAULT 0,
  `mercadotecnia` float DEFAULT 0,
  `legislacion_bancaria` float DEFAULT 0,
  `proyectos_presupuest` float DEFAULT 0,
  `organizacion_trabajo` float DEFAULT 0,
  `matematica_financiera` float DEFAULT 0,
  `contabilidad_ii` float DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `btpcf`
--

INSERT INTO `btpcf` (`id_alumnocf`, `matematica_aplicada`, `ingles_tec`, `lengua_literatura`, `administra_general`, `etica_orientacion`, `contabilidad_i`, `mercadotecnia`, `legislacion_bancaria`, `proyectos_presupuest`, `organizacion_trabajo`, `matematica_financiera`, `contabilidad_ii`) VALUES
(89, 90, 90, 90, 90, 90, 90, 90, 100, 90, 90, 90, 90);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `btpcf_ii`
--

CREATE TABLE `btpcf_ii` (
  `alumnocf_ii` int(11) DEFAULT 0,
  `economiai` float DEFAULT 0,
  `legislacion` float DEFAULT 0,
  `operaciones_tributa` float DEFAULT 0,
  `contabilidad_bancaria` float DEFAULT 0,
  `administracion_finan_i` float DEFAULT 0,
  `informatica_contable` float DEFAULT 0,
  `administracion_finan_ii` float DEFAULT 0,
  `servicio_cliente` float DEFAULT 0,
  `contabilidad_costos` float DEFAULT 0,
  `auditoria` float DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `btpcf_ii`
--

INSERT INTO `btpcf_ii` (`alumnocf_ii`, `economiai`, `legislacion`, `operaciones_tributa`, `contabilidad_bancaria`, `administracion_finan_i`, `informatica_contable`, `administracion_finan_ii`, `servicio_cliente`, `contabilidad_costos`, `auditoria`) VALUES
(98, 100, 0, 90, 0, 0, 0, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `btpi`
--

CREATE TABLE `btpi` (
  `alumnoi` int(11) NOT NULL,
  `matematica_iii` float DEFAULT 0,
  `lengua_literatura` float DEFAULT 0,
  `informatica_i` float DEFAULT 0,
  `fisica_aplicada` float DEFAULT 0,
  `ingles_tecnico_iii` float DEFAULT 0,
  `analisis_diseno_i` float DEFAULT 0,
  `etica_orientacion` float DEFAULT 0,
  `lab_info` float DEFAULT 0,
  `frogramacion_i` float DEFAULT 0,
  `mercadotecnia` float DEFAULT 0,
  `organizacion_trabajo` float DEFAULT 0,
  `proyectos_presupuesto` float DEFAULT 0,
  `legislacion` float DEFAULT 0,
  `lab_info_ii` float DEFAULT 0,
  `informatica_ii` float DEFAULT 0,
  `programacion_ii` float DEFAULT 0,
  `analisis_diseno_ii` float DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `btpi`
--

INSERT INTO `btpi` (`alumnoi`, `matematica_iii`, `lengua_literatura`, `informatica_i`, `fisica_aplicada`, `ingles_tecnico_iii`, `analisis_diseno_i`, `etica_orientacion`, `lab_info`, `frogramacion_i`, `mercadotecnia`, `organizacion_trabajo`, `proyectos_presupuesto`, `legislacion`, `lab_info_ii`, `informatica_ii`, `programacion_ii`, `analisis_diseno_ii`) VALUES
(71, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `btpi_ii`
--

CREATE TABLE `btpi_ii` (
  `alumnoi_ii` int(11) DEFAULT 0,
  `lab_info_iii` float DEFAULT 0,
  `programacion_iii` float DEFAULT 0,
  `mantenimiento_repa_i` float DEFAULT 0,
  `redes_informatica_i` float DEFAULT 0,
  `diseno_web_i` float DEFAULT 0,
  `lab_info_iv` float DEFAULT 0,
  `diseno_web_ii` float DEFAULT 0,
  `programacion_iv` float DEFAULT 0,
  `mantenimiento_repa_ii` float DEFAULT 0,
  `redes_informatica_ii` float DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `btpi_ii`
--

INSERT INTO `btpi_ii` (`alumnoi_ii`, `lab_info_iii`, `programacion_iii`, `mantenimiento_repa_i`, `redes_informatica_i`, `diseno_web_i`, `lab_info_iv`, `diseno_web_ii`, `programacion_iv`, `mantenimiento_repa_ii`, `redes_informatica_ii`) VALUES
(99, 90, 100, 0, 0, 0, 0, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `modalidad`
--

CREATE TABLE `modalidad` (
  `id_modalidad` int(2) NOT NULL,
  `modalidad_alumno` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `modalidad`
--

INSERT INTO `modalidad` (`id_modalidad`, `modalidad_alumno`) VALUES
(1, 'Básica'),
(2, 'Año de fundamento'),
(3, 'BCH'),
(4, 'BCH AC'),
(5, 'BTPAE'),
(6, 'BTPCF'),
(7, 'BTPI');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notas`
--

CREATE TABLE `notas` (
  `id_nota` int(11) NOT NULL,
  `matematicas` decimal(10,0) DEFAULT 0,
  `espanol` decimal(10,0) DEFAULT 0,
  `ingles` decimal(10,0) DEFAULT 0,
  `educacionart` float DEFAULT 0,
  `tecnologia` float DEFAULT 0,
  `cienciasnaturales` float DEFAULT 0,
  `estudios_sociales` float DEFAULT 0,
  `educacion_civica` float DEFAULT 0,
  `educacion_fisicay_deportes` float DEFAULT 0,
  `ano` int(11) DEFAULT 2000
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `notas`
--

INSERT INTO `notas` (`id_nota`, `matematicas`, `espanol`, `ingles`, `educacionart`, `tecnologia`, `cienciasnaturales`, `estudios_sociales`, `educacion_civica`, `educacion_fisicay_deportes`, `ano`) VALUES
(47, '90', '90', '90', 90, 90, 90, 90, 90, 90, 2020),
(48, '90', '90', '0', 90, 0, 0, 0, 0, 0, 2020),
(49, '0', '90', '0', 90, 0, 0, 0, 0, 0, 2020),
(50, '90', '90', '0', 90, 0, 0, 0, 0, 0, 2020),
(51, '90', '0', '0', 90, 0, 0, 0, 0, 0, 2020),
(52, '90', '90', '0', 90, 0, 0, 0, 0, 0, 2020),
(53, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2020),
(55, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2020),
(60, '0', '0', '0', 0, 0, 0, 0, 100, 0, 2020),
(61, '90', '90', '90', 90, 90, 90, 90, 90, 90, 2020),
(62, '90', '90', '90', 90, 90, 90, 90, 90, 90, 2020),
(63, '90', '90', '90', 90, 90, 90, 90, 90, 90, 2020),
(64, '90', '90', '90', 90, 90, 90, 90, 90, 90, 2020),
(65, '90', '90', '90', 90, 90, 90, 90, 90, 90, 2020),
(66, '90', '90', '90', 90, 90, 90, 90, 90, 90, 2020),
(72, '90', '90', '90', 90, 90, 90, 90, 90, 90, 2020),
(73, '0', '90', '90', 90, 90, 90, 90, 90, 90, 2020),
(74, '90', '90', '90', 90, 90, 90, 90, 90, 90, 2020),
(76, '90', '90', '90', 90, 90, 90, 90, 90, 90, 2020),
(90, '90', '90', '90', 90, 90, 90, 90, 90, 90, 2020),
(91, '80', '0', '0', 0, 0, 0, 0, 0, 0, 2020);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alumno`
--
ALTER TABLE `alumno`
  ADD PRIMARY KEY (`ide_alumno`),
  ADD KEY `alumno_ibfk_1` (`modalidad_alumno`);

--
-- Indices de la tabla `anofundamento`
--
ALTER TABLE `anofundamento`
  ADD KEY `alumno` (`alumno`);

--
-- Indices de la tabla `bch`
--
ALTER TABLE `bch`
  ADD KEY `idalumno` (`id_bch`);

--
-- Indices de la tabla `bchac`
--
ALTER TABLE `bchac`
  ADD KEY `alu_bchac_idx` (`id_bchac`);

--
-- Indices de la tabla `btpae`
--
ALTER TABLE `btpae`
  ADD KEY `alumnobtpae` (`id_btpae`);

--
-- Indices de la tabla `btpae_ii`
--
ALTER TABLE `btpae_ii`
  ADD KEY `alumno_ae_idx` (`alumnoae_ii`);

--
-- Indices de la tabla `btpcf`
--
ALTER TABLE `btpcf`
  ADD KEY `alumnobtpcf_idx` (`id_alumnocf`);

--
-- Indices de la tabla `btpcf_ii`
--
ALTER TABLE `btpcf_ii`
  ADD KEY `alumno_cf_idx` (`alumnocf_ii`);

--
-- Indices de la tabla `btpi`
--
ALTER TABLE `btpi`
  ADD KEY `alui_idx` (`alumnoi`);

--
-- Indices de la tabla `btpi_ii`
--
ALTER TABLE `btpi_ii`
  ADD KEY `alumno_i_idx` (`alumnoi_ii`);

--
-- Indices de la tabla `modalidad`
--
ALTER TABLE `modalidad`
  ADD PRIMARY KEY (`id_modalidad`);

--
-- Indices de la tabla `notas`
--
ALTER TABLE `notas`
  ADD KEY `id_alu` (`id_nota`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `alumno`
--
ALTER TABLE `alumno`
  MODIFY `ide_alumno` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=146;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `alumno`
--
ALTER TABLE `alumno`
  ADD CONSTRAINT `alumno_ibfk_1` FOREIGN KEY (`modalidad_alumno`) REFERENCES `modalidad` (`id_modalidad`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `anofundamento`
--
ALTER TABLE `anofundamento`
  ADD CONSTRAINT `anofundamento_ibfk_1` FOREIGN KEY (`alumno`) REFERENCES `alumno` (`ide_alumno`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `bch`
--
ALTER TABLE `bch`
  ADD CONSTRAINT `idalumno` FOREIGN KEY (`id_bch`) REFERENCES `alumno` (`ide_alumno`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `bchac`
--
ALTER TABLE `bchac`
  ADD CONSTRAINT `alu_bchac` FOREIGN KEY (`id_bchac`) REFERENCES `alumno` (`ide_alumno`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `btpae_ii`
--
ALTER TABLE `btpae_ii`
  ADD CONSTRAINT `alumno_ae` FOREIGN KEY (`alumnoae_ii`) REFERENCES `alumno` (`ide_alumno`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `btpcf`
--
ALTER TABLE `btpcf`
  ADD CONSTRAINT `alubtpcf` FOREIGN KEY (`id_alumnocf`) REFERENCES `alumno` (`ide_alumno`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `btpcf_ii`
--
ALTER TABLE `btpcf_ii`
  ADD CONSTRAINT `alumno_cf` FOREIGN KEY (`alumnocf_ii`) REFERENCES `alumno` (`ide_alumno`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `btpi`
--
ALTER TABLE `btpi`
  ADD CONSTRAINT `alui` FOREIGN KEY (`alumnoi`) REFERENCES `alumno` (`ide_alumno`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `btpi_ii`
--
ALTER TABLE `btpi_ii`
  ADD CONSTRAINT `alumno_i` FOREIGN KEY (`alumnoi_ii`) REFERENCES `alumno` (`ide_alumno`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `notas`
--
ALTER TABLE `notas`
  ADD CONSTRAINT `id_alu` FOREIGN KEY (`id_nota`) REFERENCES `alumno` (`ide_alumno`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
