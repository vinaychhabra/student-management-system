-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 01, 2023 at 02:47 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sms_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `course_id` varchar(36) NOT NULL,
  `course_name` varchar(255) NOT NULL,
  `instructor` varchar(255) NOT NULL,
  `credits` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`course_id`, `course_name`, `instructor`, `credits`) VALUES
('54d7f8a8-9544-4e37-a69c-0c04e8e52339', 'Business Communication', 'Nisha Muthreja', 0),
('9be17122-e942-4c14-9166-743f47a4f1f5', 'check1', 'test', 0),
('acb9c211-a454-4c8e-8d3e-7ca82d2439d3', 'PHP', 'David Chan', 0),
('c4e800a2-3165-4b5a-b601-a46e5e54a651', 'SDLC', 'Micheal', 0);

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `student_id` text NOT NULL,
  `first_name` text NOT NULL,
  `last_name` text NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone_no` text NOT NULL,
  `user_id` text NOT NULL,
  `Course` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`student_id`, `first_name`, `last_name`, `email`, `phone_no`, `user_id`, `Course`) VALUES
('968bf98e-6a8d-45ff-ae4e-ce14b0799c7a', 'fsdfs', 'fdsfdsf', 'sdsf@sd.com', '2323242222', '70b0a210-5b5f-4568-bd30-1a68045746ef', '9be17122-e942-4c14-9166-743f47a4f1f5'),
('0e1ea1d0-af03-4778-93be-a40593fa9909', 'test', 'test', 'test@gmail.com', '9837310900', '70b0a210-5b5f-4568-bd30-1a68045746ef', '54d7f8a8-9544-4e37-a69c-0c04e8e52339'),
('f11f0e2a-17a1-4e4f-ad71-f6119ca87824', 'qwert', 'qwert', 'qewret', 'ertg', '70b0a210-5b5f-4568-bd30-1a68045746ef', NULL),
('095f1dcb-8909-408c-99c2-1281dee9c954', 'wesd', 'sdf', 'test@kfd.dsds', '9837310900', '70b0a210-5b5f-4568-bd30-1a68045746ef', 'c4e800a2-3165-4b5a-b601-a46e5e54a651'),
('758aeb95-17e7-45b1-a43e-599fc048a293', 'Ankita', 'Bhatt', 'ankita@gmail.com', '9837310900', '70b0a210-5b5f-4568-bd30-1a68045746ef', 'c4e800a2-3165-4b5a-b601-a46e5e54a651'),
('d0278b4f-d2ae-4ae7-98ad-c7f92872252d', 'pammodi', 'test', 'pammodi@gmail.com', '9837310900', '70b0a210-5b5f-4568-bd30-1a68045746ef', '9be17122-e942-4c14-9166-743f47a4f1f5');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `username` text NOT NULL,
  `password` varchar(50) NOT NULL,
  `address` text NOT NULL,
  `phone_no` text NOT NULL,
  `user_role` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `email`, `username`, `password`, `address`, `phone_no`, `user_role`) VALUES
('70b0a210-5b5f-4568-bd30-1a68045746ef', 'vchhabra10feb@gmail.com', 'Vinay_Chhabra', '12345', 'QWERTY', '12345', 1),
('e52ce8f3-9787-4fbd-8a3e-33e46d512c90', 'test@gmail.com', 'test', '12345', 'test@', '12345', 3),
('e6db1e1d-115f-44d4-be22-321eda3268e4', 'test@gmail.com', 'test_1', '12345', 'sdfgffddf', '987345678', 1),
('d2268908-a94f-4e86-ad92-ed0197a737ad', 'ddsfdsfsd@fdfd.com', 'fdfsdfgdfg', '12345', 'dgdfgdfgfd', 'dfdgfgfdgdfgd', 2),
('67b34090-c3a5-4781-b2b9-99591eabcdfd', 'dddd@dsds.com', 'bfbfbdkkd', '12345', 'hfhdhd', 'fddfgdfg', 2),
('23a19faa-cfa7-47e5-87f0-d7682936c250', 'ggdf@fdf.com', 'dgfgdfg', '1234', 'hdfhdh', 'fdfdffh', 2),
('e26491e6-ac0e-4e8f-9ca9-568acb4b6d3b', 'qwerty@com.com', 'qwerty', '12345', 'wfg', '9837310900', 3);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`course_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
