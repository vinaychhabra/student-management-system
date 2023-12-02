-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 02, 2023 at 09:39 PM
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
('54d7f8a8-9544-4e37-a69c-0c04e8e52339', 'Software Development', 'Nisha Muthreja', 0),
('9be17122-e942-4c14-9166-743f47a4f1f5', 'Artificial Intelligence', 'John Doe', 0),
('acb9c211-a454-4c8e-8d3e-7ca82d2439d3', 'Global Business Management', 'James George', 0),
('c4e800a2-3165-4b5a-b601-a46e5e54a651', 'Cloud computing', 'William', 0);

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
('0e1ea1d0-af03-4778-93be-a40593fa9909', 'Joseph', 'Daniel', 'Joseph@gmail.com', '4455233453', '70b0a210-5b5f-4568-bd30-1a68045746ef', '54d7f8a8-9544-4e37-a69c-0c04e8e52339'),
('095f1dcb-8909-408c-99c2-1281dee9c954', 'Oliver', 'Thomas', 'Oliver@gmail.com', '4356778923', '70b0a210-5b5f-4568-bd30-1a68045746ef', 'acb9c211-a454-4c8e-8d3e-7ca82d2439d3'),
('758aeb95-17e7-45b1-a43e-599fc048a293', 'Ankita', 'Bhatt', 'ankitabhatt@gmail.com', '9837310900', '70b0a210-5b5f-4568-bd30-1a68045746ef', 'c4e800a2-3165-4b5a-b601-a46e5e54a651'),
('d0278b4f-d2ae-4ae7-98ad-c7f92872252d', 'pammodi', 'test', 'pammodi@gmail.com', '9837310900', '70b0a210-5b5f-4568-bd30-1a68045746ef', '9be17122-e942-4c14-9166-743f47a4f1f5');

-- --------------------------------------------------------

--
-- Table structure for table `StudentEnrolled`
--

CREATE TABLE `StudentEnrolled` (
  `student_id` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone_no` varchar(20) DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `course` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `StudentEnrolled`
--

INSERT INTO `StudentEnrolled` (`student_id`, `first_name`, `last_name`, `email`, `phone_no`, `user_id`, `course`) VALUES
('1a02e43f-50ca-4e11-9037-48c41bdeb96c', 'VINAY', 'CHHABRA', 'VINAY@TEST.COM', '9837310900', '1', '9be17122-e942-4c14-9166-743f47a4f1f5'),
('1d487de2-c0d3-4c4c-9c03-a66cbc35907b', 'TEST', 'TEST', 'TEST@TEST.COM', '1234567890', '2', 'acb9c211-a454-4c8e-8d3e-7ca82d2439d3'),
('3b99b860-7008-473d-8a27-de07477782f3', 'jack', 'doe', 'doe@gmail.com', '8855774433', '3', '54d7f8a8-9544-4e37-a69c-0c04e8e52339'),
('52e5ac8d-4a67-4a1c-a5f8-8ea6533267ab', 'Samhitha', 'Dubbaka', 'samhithadubbaka@gmail.com', '2748634757', '', '54d7f8a8-9544-4e37-a69c-0c04e8e52339'),
('8532cecb-264a-467d-a6a9-442e8b3a0468', 'mad', 'max', 'max@gmail.com', '1122334455', '3', 'c4e800a2-3165-4b5a-b601-a46e5e54a651'),
('895f7fb1-0bc6-4ba4-b7ac-6fc394876fca', 'rock', 'joe', 'joe@gmail.com', '9837310911', '', '9be17122-e942-4c14-9166-743f47a4f1f5'),
('a2b32a24-e085-45d4-b5f1-37b6a37c2cfa', 'shub', 'bathla', 'shub@gmail.com', '9988776655', '123', '9be17122-e942-4c14-9166-743f47a4f1f5'),
('fac71283-00b7-4d9a-8393-8433e4aa7592', 'john', 'doe', 'john@gmail.com', '2233445566', '5', '54d7f8a8-9544-4e37-a69c-0c04e8e52339');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `username` text NOT NULL,
  `password` text NOT NULL,
  `address` text NOT NULL,
  `phone_no` text NOT NULL,
  `user_role` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `email`, `username`, `password`, `address`, `phone_no`, `user_role`) VALUES
('985681f8-a296-4be8-9091-5f695c849d3b', 'admin@gmail.com', 'admin', '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', 'temp', '1122334455', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`course_id`);

--
-- Indexes for table `StudentEnrolled`
--
ALTER TABLE `StudentEnrolled`
  ADD PRIMARY KEY (`student_id`),
  ADD UNIQUE KEY `email` (`email`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
