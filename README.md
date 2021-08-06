# 13 - ORM: e-Commerce Back-End 

## Project

The project consists on creating the Back-End for an e-Commerce application. 
The scope covers the architecture and be able to interact with the Back-End system. 


- [Installation](#Installation)
- [UserStory](#UserStory)
- [AcceptanceCriteria](#AcceptanceCriteria)
- [Demo](#Demo)
- [Technologies](#Technologies)




## Installation  

1. Clone the repo  
2. Use the package manager "npm" to install all the node modules that are on the package.json, run `npm install`
3. Create the DB
4. Run `npm run seed` to seed the database
5. Run `npm start` to start the app


## User Story

```md
AS A manager at an internet retail company
I WANT a back end for my e-commerce website that uses the latest technologies
SO THAT my company can compete with other e-commerce companies
```


## Acceptance Criteria

```md
GIVEN a functional Express.js API
WHEN I add my database name, MySQL username, and MySQL password to an environment variable file
THEN I am able to connect to a database using Sequelize
WHEN I enter schema and seed commands
THEN a development database is created and is seeded with test data
WHEN I enter the command to invoke the application
THEN my server is started and the Sequelize models are synced to the MySQL database
WHEN I open API GET routes in Insomnia Core for categories, products, or tags
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia Core
THEN I am able to successfully create, update, and delete data in my database
```




## Demo URLs 


You can watch the app functionality in the following links:  
- <a href="https://drive.google.com/file/d/1hAZTjxZxFGTTea_mXW4IzR-72Ae5uGYi/view?usp=sharing" target="_blank">Products Insomnia Demo </a>
- <a href="https://drive.google.com/file/d/1DErOXrtmsmetnOA877JNAz5jiQgNG2Zk/view?usp=sharing" target="_blank">Categories Insomnia Demo </a>
- <a href="https://drive.google.com/file/d/1yvZHrGEwUgCwNJFUAd4sfDr0900WA0xh/view?usp=sharing" target="_blank">Tags Insomnia Demo</a>




## Technologies

- Express
- Sequelize
- MySQL
- JavaScript
- DotEnv




### Contributor


Nicolas Cedano Avena
- - -
© 2021 Trilogy Education Services, LLC, a 2U, Inc. brand. Confidential and Proprietary. All Rights Reserved.
