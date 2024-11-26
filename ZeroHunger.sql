-- Creating and using a  Database
CREATE DATABASE ZERO_HUNGER;
USE ZERO_HUNGER ;

-- Creating food donors table 
CREATE TABLE Donors 
(
id  INT auto_increment  PRIMARY KEY,
donor_contact_email VARCHAR(350),
donor_frequency VARCHAR(350),
donor_location VARCHAR(350)
);

--  Creating beneficiaries table 
CREATE TABLE Beneficiaries
(
id INT auto_increment PRIMARY KEY,
beneficiary_name VARCHAR (350),
beneficiary_contact_email VARCHAR(350),
beneficiary_location VARCHAR(350) );


-- Creating distribution centres table 
CREATE TABLE Distribution_Centre 
(
id INT auto_increment PRIMARY KEY,
distribution_centre_name VARCHAR(350),
distribution_centre_location VARCHAR(350),
distribution_centre_contact_email VARCHAR(350),
distribution_centre_capacity DECIMAL);


-- Creating food types table 
CREATE TABLE Food_type
(
id INT auto_increment PRIMARY KEY,
food_type_name VARCHAR(350),
food_type_expiration_date DATE,
food_centre_quantity DECIMAL);

-- Creating delivery records table 

CREATE TABLE Delivery_records
(
id INT auto_increment PRIMARY KEY,
donor_id INT,
beneficiaries_id INT,
distribution_centre_id INT,
food_type_id INT,
delivery_date DATE,
delivery_quantity DECIMAL,
FOREIGN KEY (donor_id) REFERENCES donors(id),
FOREIGN KEY (beneficiaries_id) REFERENCES beneficiaries(id),
FOREIGN KEY (distribution_centre_id) REFERENCES distribution_centre(id),
FOREIGN KEY (food_type_id) REFERENCES food_type(id)
);

