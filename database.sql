-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 20, 2021 at 03:21 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `newdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `companytype`
--

CREATE TABLE `companytype` (
  `CompanyTypeId` int(11) NOT NULL,
  `CompanyTypeName` varchar(100) COLLATE utf8_bin NOT NULL,
  `Active` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `companytype`
--

INSERT INTO `companytype` (`CompanyTypeId`, `CompanyTypeName`, `Active`) VALUES
(1, 'Privat', 1),
(2, 'Firma', 1),
(3, 'Offentlig', 1),
(4, 'Forening', 1);

-- --------------------------------------------------------

--
-- Table structure for table `country`
--

CREATE TABLE `country` (
  `CountryId` int(11) NOT NULL,
  `CountryName` varchar(100) COLLATE utf8_bin NOT NULL,
  `ISO3166_Alpha2` char(2) COLLATE utf8_bin NOT NULL,
  `Active` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `country`
--

INSERT INTO `country` (`CountryId`, `CountryName`, `ISO3166_Alpha2`, `Active`) VALUES
(1, 'Denmark', 'DK', 1),
(2, 'Sweden', 'SE', 1),
(3, 'Norway', 'NO', 1);

-- --------------------------------------------------------

--
-- Table structure for table `currency`
--

CREATE TABLE `currency` (
  `CurrencyId` int(11) NOT NULL,
  `CurrencyName` varchar(100) COLLATE utf8_bin NOT NULL,
  `ISO4217_ISO` char(3) COLLATE utf8_bin NOT NULL,
  `ModifiedDate` datetime NOT NULL DEFAULT current_timestamp(),
  `Active` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `currency`
--

INSERT INTO `currency` (`CurrencyId`, `CurrencyName`, `ISO4217_ISO`, `ModifiedDate`, `Active`) VALUES
(1, 'Danish krone', 'DKK', '2013-10-25 10:23:41', 1),
(2, 'Euro', 'EUR', '2013-10-25 10:24:20', 1);

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `CustomerId` int(11) NOT NULL,
  `CompanyTypeId` int(11) NOT NULL,
  `CVR` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `Name` varchar(100) COLLATE utf8_bin NOT NULL,
  `Address` varchar(100) COLLATE utf8_bin NOT NULL,
  `Zipcode` varchar(100) COLLATE utf8_bin NOT NULL,
  `City` varchar(100) COLLATE utf8_bin NOT NULL,
  `CountryId` int(11) NOT NULL,
  `Email` varchar(100) COLLATE utf8_bin NOT NULL,
  `Active` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`CustomerId`, `CompanyTypeId`, `CVR`, `Name`, `Address`, `Zipcode`, `City`, `CountryId`, `Email`, `Active`) VALUES
(1, 3, '24900907', 'Cynthea Tewkesbury', '520 Express Center', '8683', 'Gushi', 3, 'test@test.com', 1),
(2, 3, '60668152', 'Isa Jahner', '41646 Erie Avenue', '4132', 'Tagakpan', 3, 'ijahner0@google.it', 0),
(3, 1, '96504065', 'Ugo Tudge', '1438 West Place', '9745', 'Haolibao', 3, 'utudge1@archive.org', 1),
(4, 1, '51275153', 'Gillie Hillam', '1881 Corry Circle', '2798', 'Dimiao', 2, 'ghillam2@1und1.de', 0),
(5, 1, '58284528', 'Tootsie Gummer', '1 Moose Plaza', '7178', 'Barra de São Francisco', 1, 'tgummer3@1688.com', 1);

-- --------------------------------------------------------

--
-- Table structure for table `customerpassword`
--

CREATE TABLE `customerpassword` (
  `FK_CustomerId` int(11) NOT NULL,
  `hashedPassword` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customerpassword`
--

INSERT INTO `customerpassword` (`FK_CustomerId`, `hashedPassword`) VALUES
(1, '$2a$10$UdZ.k1xmU5/UngVQkuRQyuZZk5luyvIpFtcFgTEBHwi2BVR4Kj3Nq');

-- --------------------------------------------------------

--
-- Table structure for table `invoice`
--

CREATE TABLE `invoice` (
  `InvoiceId` int(11) NOT NULL,
  `CustomerId` int(11) NOT NULL,
  `CreateDate` datetime NOT NULL,
  `ModifiedDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `invoice`
--

INSERT INTO `invoice` (`InvoiceId`, `CustomerId`, `CreateDate`, `ModifiedDate`) VALUES
(28, 1, '2021-12-18 00:59:25', '2021-12-18 00:59:25'),
(37, 1, '2021-12-19 15:34:02', '2021-12-19 15:34:02');

-- --------------------------------------------------------

--
-- Table structure for table `invoiceline`
--

CREATE TABLE `invoiceline` (
  `InvoiceLineId` int(11) NOT NULL,
  `InvoiceId` int(11) NOT NULL,
  `ProductId` int(11) NOT NULL,
  `Price` decimal(10,2) NOT NULL,
  `Quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `invoiceline`
--

INSERT INTO `invoiceline` (`InvoiceLineId`, `InvoiceId`, `ProductId`, `Price`, `Quantity`) VALUES
(1, 28, 3, '449.50', 1),
(2, 28, 2, '471.20', 1),
(3, 28, 1, '38.70', 1),
(18, 37, 5, '163.30', 2),
(19, 37, 4, '350.60', 1);

-- --------------------------------------------------------

--
-- Table structure for table `language`
--

CREATE TABLE `language` (
  `LanguageId` int(11) NOT NULL,
  `NameDanish` varchar(100) COLLATE utf8_bin NOT NULL,
  `NameEnglish` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `DisplayOrder` int(11) NOT NULL,
  `Active` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `language`
--

INSERT INTO `language` (`LanguageId`, `NameDanish`, `NameEnglish`, `DisplayOrder`, `Active`) VALUES
(1, 'Dansk', 'Danish', 1, 1),
(2, 'Engelsk', 'English', 2, 1),
(3, 'Svensk', 'Swedish', 3, 1),
(4, 'Norsk', 'Norwegian (Bokmål)', 4, 1),
(5, 'mha Sprog', 'mha Language', 10, 1);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `ProductId` int(11) NOT NULL,
  `Name` varchar(100) COLLATE utf8_bin NOT NULL,
  `Price` decimal(10,2) NOT NULL,
  `Comment` text COLLATE utf8_bin DEFAULT NULL,
  `ProductCategoryId` int(11) NOT NULL,
  `ImageFile` varchar(250) COLLATE utf8_bin DEFAULT NULL,
  `Active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`ProductId`, `Name`, `Price`, `Comment`, `ProductCategoryId`, `ImageFile`, `Active`) VALUES
(1, 'Skid-Steer', '38.70', 'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.', 1, '1', 1),
(2, 'Grader', '471.20', 'Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.', 1, '2', 0),
(3, 'Dragline', '449.50', 'Morbi a ipsum. Integer a nibh.', 5, '3', 1),
(4, 'Compactor', '350.60', 'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.', 2, '4', 1),
(5, 'Backhoe', '163.30', 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.', 3, '5', 1),
(6, 'Grader', '305.00', 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien.', 3, '6', 1),
(7, 'Skid-Steer', '218.60', 'Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula.', 2, '7', 1),
(8, 'Trencher', '348.60', 'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros.', 2, '8', 1),
(9, 'Skid-Steer', '425.10', 'Fusce consequat. Nulla nisl. Nunc nisl.', 4, '9', 1),
(10, 'Grader', '301.10', 'Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.', 1, '10', 1),
(11, 'Crawler', '183.80', 'Sed ante. Vivamus tortor. Duis mattis egestas metus.', 1, '11', 1),
(12, 'Compactor', '211.50', 'Nullam molestie nibh in lectus. Pellentesque at nulla.', 1, '12', 1),
(13, 'Compactor', '346.80', 'Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.', 1, '13', 1),
(14, 'Bulldozer', '33.30', 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.', 3, '14', 1),
(15, 'Grader', '221.10', 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.', 3, '15', 1),
(16, 'Crawler', '415.20', 'Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero. Nullam sit amet turpis elementum ligula vehicula consequat.', 1, '16', 1),
(17, 'Excavator', '264.40', 'Nunc purus. Phasellus in felis. Donec semper sapien a libero.', 4, '17', 1),
(18, 'Compactor', '280.50', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue.', 3, '18', 1),
(19, 'Backhoe', '132.70', 'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.', 5, '19', 1),
(20, 'Dump Truck', '338.30', 'Fusce consequat. Nulla nisl.', 2, '20', 1),
(21, 'Excavator', '227.20', 'Nulla ut erat id mauris vulputate elementum. Nullam varius.', 5, '21', 1),
(22, 'Trencher', '160.80', 'Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis. Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl.', 2, '22', 1),
(23, 'Compactor', '25.90', 'Etiam pretium iaculis justo. In hac habitasse platea dictumst. Etiam faucibus cursus urna.', 5, '23', 1),
(24, 'Excavator', '31.50', 'Aliquam erat volutpat. In congue.', 4, '24', 1),
(25, 'Dump Truck', '80.30', 'Nam dui. Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis.', 4, '25', 1),
(26, 'Crawler', '235.60', 'Etiam faucibus cursus urna. Ut tellus.', 2, '26', 1),
(27, 'Crawler', '324.80', 'Ut at dolor quis odio consequat varius. Integer ac leo. Pellentesque ultrices mattis odio.', 5, '27', 1),
(28, 'Backhoe', '399.10', 'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.', 2, '28', 1),
(29, 'Trencher', '322.80', 'Duis bibendum. Morbi non quam nec dui luctus rutrum.', 1, '29', 1),
(30, 'Trencher', '211.60', 'Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem. Integer tincidunt ante vel ipsum.', 3, '30', 1),
(31, 'Bulldozer', '269.30', 'Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.', 5, '31', 1),
(32, 'Backhoe', '489.50', 'Nulla facilisi. Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit.', 1, '32', 1),
(33, 'Scraper', '324.60', 'Suspendisse potenti. In eleifend quam a odio.', 1, '33', 1),
(34, 'Crawler', '460.00', 'Donec vitae nisi. Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla.', 3, '34', 1),
(35, 'Grader', '57.70', 'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.', 2, '35', 1),
(36, 'Grader', '295.70', 'Donec dapibus. Duis at velit eu est congue elementum.', 4, '36', 1),
(37, 'Skid-Steer', '186.10', 'Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem. Fusce consequat.', 4, '37', 1),
(38, 'Excavator', '312.90', 'Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim.', 1, '38', 1),
(39, 'Scraper', '476.20', 'Integer non velit. Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi.', 4, '39', 1),
(40, 'Backhoe', '118.90', 'Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus. Curabitur at ipsum ac tellus semper interdum.', 3, '40', 1),
(41, 'Grader', '462.80', 'Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.', 5, '41', 1),
(42, 'Grader', '404.00', 'Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh. Quisque id justo sit amet sapien dignissim vestibulum.', 1, '42', 1),
(43, 'Crawler', '409.00', 'Suspendisse accumsan tortor quis turpis. Sed ante.', 4, '43', 1),
(44, 'Excavator', '479.30', 'Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.', 4, '44', 1),
(45, 'Bulldozer', '13.70', 'Quisque ut erat. Curabitur gravida nisi at nibh.', 3, '45', 1),
(46, 'Grader', '155.80', 'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit.', 2, '46', 1),
(47, 'Excavator', '255.30', 'Nullam varius. Nulla facilisi.', 1, '47', 1),
(48, 'Dragline', '173.20', 'Cras pellentesque volutpat dui. Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc.', 5, '48', 1),
(49, 'Bulldozer', '379.80', 'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem.', 3, '49', 1),
(50, 'Scraper', '8.00', 'Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus. Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis.', 2, '50', 1);

-- --------------------------------------------------------

--
-- Table structure for table `productcategory`
--

CREATE TABLE `productcategory` (
  `ProductCategoryId` int(11) NOT NULL,
  `ProductCategoryName` varchar(100) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `productcategory`
--

INSERT INTO `productcategory` (`ProductCategoryId`, `ProductCategoryName`) VALUES
(1, 'men\'s clothing'),
(2, 'jewelery'),
(3, 'electronics'),
(4, 'women\'s clothing'),
(5, 'bicycles');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `companytype`
--
ALTER TABLE `companytype`
  ADD PRIMARY KEY (`CompanyTypeId`);

--
-- Indexes for table `country`
--
ALTER TABLE `country`
  ADD PRIMARY KEY (`CountryId`);

--
-- Indexes for table `currency`
--
ALTER TABLE `currency`
  ADD PRIMARY KEY (`CurrencyId`),
  ADD UNIQUE KEY `Currency_uq` (`ISO4217_ISO`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`CustomerId`),
  ADD KEY `Customer_fk_CompanyType` (`CompanyTypeId`),
  ADD KEY `Customer_fk_Country` (`CountryId`);

--
-- Indexes for table `customerpassword`
--
ALTER TABLE `customerpassword`
  ADD KEY `FK_PasswordCustomer` (`FK_CustomerId`);

--
-- Indexes for table `invoice`
--
ALTER TABLE `invoice`
  ADD PRIMARY KEY (`InvoiceId`),
  ADD KEY `Invoice_fk_Customer` (`CustomerId`);

--
-- Indexes for table `invoiceline`
--
ALTER TABLE `invoiceline`
  ADD PRIMARY KEY (`InvoiceLineId`),
  ADD KEY `InvoiceLine_fk_Invoice` (`InvoiceId`),
  ADD KEY `InvoiceLine_fk_Product` (`ProductId`);

--
-- Indexes for table `language`
--
ALTER TABLE `language`
  ADD PRIMARY KEY (`LanguageId`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`ProductId`),
  ADD KEY `Product_fk_ProductCategory` (`ProductCategoryId`);

--
-- Indexes for table `productcategory`
--
ALTER TABLE `productcategory`
  ADD PRIMARY KEY (`ProductCategoryId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `companytype`
--
ALTER TABLE `companytype`
  MODIFY `CompanyTypeId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `country`
--
ALTER TABLE `country`
  MODIFY `CountryId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `currency`
--
ALTER TABLE `currency`
  MODIFY `CurrencyId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `CustomerId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `invoice`
--
ALTER TABLE `invoice`
  MODIFY `InvoiceId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `invoiceline`
--
ALTER TABLE `invoiceline`
  MODIFY `InvoiceLineId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `language`
--
ALTER TABLE `language`
  MODIFY `LanguageId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `ProductId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=95000030;

--
-- AUTO_INCREMENT for table `productcategory`
--
ALTER TABLE `productcategory`
  MODIFY `ProductCategoryId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `customer`
--
ALTER TABLE `customer`
  ADD CONSTRAINT `Customer_fk_CompanyType` FOREIGN KEY (`CompanyTypeId`) REFERENCES `companytype` (`CompanyTypeId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `Customer_fk_Country` FOREIGN KEY (`CountryId`) REFERENCES `country` (`CountryId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `customerpassword`
--
ALTER TABLE `customerpassword`
  ADD CONSTRAINT `FK_PasswordCustomer` FOREIGN KEY (`FK_CustomerId`) REFERENCES `customer` (`CustomerId`);

--
-- Constraints for table `invoice`
--
ALTER TABLE `invoice`
  ADD CONSTRAINT `Invoice_fk_Customer` FOREIGN KEY (`CustomerId`) REFERENCES `customer` (`CustomerId`);

--
-- Constraints for table `invoiceline`
--
ALTER TABLE `invoiceline`
  ADD CONSTRAINT `InvoiceLine_fk_Invoice` FOREIGN KEY (`InvoiceId`) REFERENCES `invoice` (`InvoiceId`),
  ADD CONSTRAINT `InvoiceLine_fk_Product` FOREIGN KEY (`ProductId`) REFERENCES `product` (`ProductId`);

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `Product_fk_ProductCategory` FOREIGN KEY (`ProductCategoryId`) REFERENCES `productcategory` (`ProductCategoryId`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
