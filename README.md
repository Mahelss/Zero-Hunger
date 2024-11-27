ZERO HUNGER PROJECT 

The Zero Hunger Project is an initiative aimed at tackling food insecurity worldwide by leveraging technology, data, and community-based solutions. The platform offers tools for analyzing food distribution, tracking aid effectiveness, and optimizing resources to ensure sustainable access to nutritious food for vulnerable populations.

📋 Table of Contents
1. Project Overview
2. Features
3. Technologies Used
4. Installation & Setup
5. Database Configuration
6. Running the Project Locally
7. Challenges
8. License


📝 Project Overview

The Zero Hunger Project is designed to address food insecurity through a combination of data analysis, community engagement, and resource optimization. The platform utilizes real-time data on food availability and distribution to help governments, NGOs, and local communities respond more effectively to hunger crises.

🎯 Features
1. Food Distribution Tracker-
Monitor food aid distribution in real-time to ensure no community is left behind.
2. Community Feedback System-
Allows local communities to report food shortages and share insights on food security issues.
3. Nutritional Analysis-
Track the nutritional value of distributed food and optimize aid programs.
4. Policy & Program Impact Evaluation-
Evaluate the success of different hunger alleviation policies and strategies.
5. Data-Driven Recommendations-
Use machine learning to suggest the most effective food distribution strategies.

🛠️ Technologies Used

1. Backend: Node.js, Express.js
2. Database: MySQL (using mysql2 library)
3. Authentication & Security: bcrypt for password hashing, dotenv for environment variable management
4. Data Visualization: Draw.io
5. Version Control: Git, GitHub

🚀 Installation & Setup
Prerequisites
- Before you start, make sure you have these tools installed on your machine:
1. Node.js (v16 or higher)
2.MySql Workench
3. Git
Clone the Repository
- Start by cloning the repository to your local machine:
bash
git clone https://github.com/your-username/zero-hunger.git
cd zero-hunger
- Install Backend Dependencies
Navigate to the project directory and install all necessary backend dependencies:

- bash
npm install
in my case it was npm install express mysql2 bcrypt gitignore dotenv

🗄️ Database Configuration
1. Set Up MySQL
Ensure MySQL is installed and running locally or use a cloud-based MySQL service like Amazon RDS or Google Cloud SQL.

2. Create the Database
Create a new database for the project. You can do this using the MySQL command line or a GUI tool like phpMyAdmin or MySQL Workbench. For example:
sql
CREATE DATABASE zero_hunger;  
CREATE TABLE 

3. Update Configuration
   
-Create a .env file in the root directory and add your MySQL credentials:
env
DB_HOST=localhost  
DB_USER=your_username  
DB_PASSWORD=your_password  
DB_NAME=zero_hunger_db  

▶️ Running the Project Locally
Start the Backend Server
node server.js
This will open the frontend at http://localhost:xxxx in your browser.


🌟 Challenges
1. Data Availability and Quality-
Gathering accurate and timely data on food insecurity posed significant challenges, especially in remote areas.
2. Scaling for Large Data-
Optimizing the database and machine learning models to handle large-scale data across multiple regions was complex.
3. Community Adoption-
Ensuring that the platform is user-friendly and accessible to community members with limited technical experience was crucial.
4. Sustainability of Solutions-
Developing solutions that are scalable and sustainable over time, particularly in low-resource settings, required thoughtful design

📜 License-

This project is licensed under the MIT License. See the LICENSE file for more information.
