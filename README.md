# E-Commerce--ORM

[![License](https://img.shields.io/badge/License-MIT-blue.svg)]

## Description

This project is a back-end application for an e-commerce website. It provides a RESTful API to interact with a PostgreSQL database using Sequelize ORM. The application allows you to manage your store goods by categories, products, tags, and product tags.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Questions](#questions)

## Installation

Clone this repository:          
    
    git clone https://github.com/Sei-cloud/E-Commerce--ORM.git
    

## Usage

1. Make sure Node.js and Postgres are installed on your machine. 
2. Install dependencies
    ```bash
    npm install
3. Navigate to the project directory:
    ```bash
    cd E-Commerce--ORM
4. Initiate the database
    ```bash
    Psql postgres 
    
    \i db/schema.sql
    
    \q
5. Seed data
    ```bash
    node seeds/index.js
6. Run the app
    ```bash
    node server.js

7. If you're still struggling watch the video tutorial [here](https://vimeo.com/954512968?share=copy).

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

## Contributing

Others can contribute to this project via Github.



## Questions

For questions about the project, please feel free to contact [Sei-Cloud](https://github.com/Sei-Cloud) or [Email me](mailto:rocketsei.009@gmail.com).
