# Inventory Keeper
Authors: Benjamin Pogue, Bryce Townsend, Deja Barclay, and Morguhn Burke

We are building an inventory management application for everyone that will allow them to add, track, and get notified about items that they would like to track. 
Our hope is to help people be better organized when it comes to daily used items such as perishable foods or frequently purchased items. 


## Table of Contents
* [General Info](#general-information)
* [Technologies Used](#technologies-used)
* [Features](#features)


## General Information
![Image of inventory management](./public/img/InventoryManagement.png)


## Technologies Used
- [Android SDK/Studio](https://developer.android.com/studio)
- [Jira](https://www.atlassian.com/software/jira)
- [BitBucket](https://bitbucket.org/)
- [CircleCI](https://circleci.com/)
- [ReactNative](https://reactnative.dev/)


## Features
- Inventory
    - Description: Ability for users of the app to setup items that they would like to track.
    - User Story: As a user of the app, I would like to have a website that allows me to store my grocery inventory so I won't forget what items I have to restock my pantry with. 
- Search
    - Description: Ability for users of the app to search through their inventory of items.
    - User Story: As a user of the app, I would like to have an ability to search through my available items and recent items so that I have quick access to a particular item.
- Reminders/Alerts
    - Description: Ability for users of the app to setup reminders or alerts for items that are perishable or that run out of stock.
    - User Story: As a user of the app, I would like the application to have an application to manually input perishable food expiration times for a reminder of when  to replace, so that I can consider when to buy perishable foods.

## Sprint 1 - Contributions 
- DeJa 
    - I set up my intial devlopment enviroment using react native, node, android studio. - https://bitbucket.org/cs3398-s22-callisto/inventory-keeper/src/master/Research 
    - I learned the react native framework by watching youtube videos and practiced coding projects. - https://bitbucket.org/cs3398-s22-callisto/inventory-keeper/src/master/Research 
    - I created a branch called begining and I commited the adding items to the list I coded in react native. - https://bitbucket.org/cs3398-s22-callisto/inventory-keeper/branch/Beginning
    - I researched how to edit a FlatList in React Native. The Next step is to start coding the feature. - https://bitbucket.org/cs3398-s22-callisto/inventory-keeper/src/master/Research
- Bryce
    - I set up my development environment consisting of node, android studio, and react Native - https://bitbucket.org/cs3398-s22-callisto/inventory-keeper/src/master/Research 
    - I researched react Native through some youtube crash courses and demonstration videos - https://bitbucket.org/cs3398-s22-callisto/inventory-keeper/src/master/Research 
    - I created a branch where I implemented a login screen with user and password input - https://bitbucket.org/cs3398-s22-callisto/inventory-keeper/src/bgt17-login/
    - I researched React Navigation and how you can switch between different screens. This is very important for our next sprint as we can start to divide up work between different screen implementation.- https://bitbucket.org/cs3398-s22-callisto/inventory-keeper/src/master/Research
- Ben
    - Completed research on how to use React Native and the recommended tooling for development: [Link to documentation](https://reactnative.dev/docs/environment-setup)
    - Worked on automation for installing the tools needed for the development environment. This was completed using a powershell script, and lives under the `dev` folder within the repo: [Link to script](https://bitbucket.org/cs3398-s22-callisto/inventory-keeper/src/master/dev/dev_setup.ps1)
    - Additionally, I created a README document which also lives in the `dev` folder and walks through how to use the powershell script: [Link to README](https://bitbucket.org/cs3398-s22-callisto/inventory-keeper/src/master/dev/README.md)
    - The goal of this work was to help the team quickly get setup with a development environment and to help match our environments accross the team.


## Next Steps for Sprint 2
- DeJa
    - Get the edit feature to work.
    - Connect adding item to a cloud database. 
    - Improve the UI. 
    - Clear input field after item has been added. 
- Bryce
    - Refactor code through react navigation so that our code can be merged together with the use of different screens.
    - Improve the UI so we can merge functionality of the UI landing page and login features I'll implement.
    
## Sprint 2 - Contributions 
- DeJa
    - Refactored adding items to the item list. - https://bitbucket.org/cs3398-s22-callisto/inventory-keeper/commits/1058929c4f1d920c2d311286065c4f6b9061a3d1
    - Added items to the database when the button is clicked. - https://bitbucket.org/cs3398-s22-callisto/inventory-keeper/commits/c149d68817a53b5c4b77a968017a90d2969e3dd4
- Morguhn
    - Added Initial Inventory Item Object Class - https://bitbucket.org/cs3398-s22-callisto/inventory-keeper/commits/c2e8d9f92058e05404979c92bad2c2db888df6cd
    - General App functionality Changes, Implimenting setting up item details - https://bitbucket.org/cs3398-s22-callisto/inventory-keeper/commits/4a15e953d3eaa43adb19bd33ef9e93fc5a8ecbd2
    - Add Learn More Screen - https://bitbucket.org/cs3398-s22-callisto/inventory-keeper/commits/5d07f66bc3ad81db0f954a967130600721139c4f
- Bryce
    - Created a foundation of react navigation screens for the premise of refactoring our code - https://bitbucket.org/cs3398-s22-callisto/inventory-keeper/branch/feature/bgt17-refactor-with-React-Navigation
    - Refactored previous login code to work with react navigation - https://bitbucket.org/cs3398-s22-callisto/inventory-keeper/branch/feature/bgt17---loginreactnav
    - Did a pull request for the login code linked with react navigation UI - https://bitbucket.org/cs3398-s22-callisto/inventory-keeper/branch/feature/CAL-35-link-login-ui-to-react-navigation
- Ben
    - Setup jest test framework for the entire project includng configuration of the basic 
    - Created some intial tests to ensure that the app compiles and runs as well as some snapshot tests which ensures that no unintended changes happened to file.

## Sprint 3 Contributions
- Morguhn
    - Add Input Validation for adding / editing items: https://bitbucket.org/cs3398-s22-callisto/inventory-keeper/branch/feature/CAL-49-Input-Validation
    - Added Item Descriptions and Categories: https://bitbucket.org/cs3398-s22-callisto/inventory-keeper/branch/feature/CAL-50-Item-Descriptions-And-Catagories
    - Added Edit Item functionality: https://bitbucket.org/cs3398-s22-callisto/inventory-keeper/branch/feature/CAL-52-Update-Edit-Item
- DeJa 
    - Clear input field after items has been added - https://bitbucket.org/cs3398-s22-callisto/inventory-keeper/branch/feature/CAL-31-clear-input-field-after-item-added
    - Render Items from Database - https://bitbucket.org/cs3398-s22-callisto/inventory-keeper/branch/feature/CAL-47-render-items-from-database
    - Delete Item from Database - https://bitbucket.org/cs3398-s22-callisto/inventory-keeper/branch/feature/CAL-42-delete-item-from-database
- Ben
    - [CAL-38](https://cs3398s22callisto.atlassian.net/browse/CAL-38) - Setup real-time search on the list items page: https://bitbucket.org/cs3398-s22-callisto/inventory-keeper/branch/feature/CAL-38-set-up-search-component
    - [CAL-54](https://cs3398s22callisto.atlassian.net/browse/CAL-54) - Fix an issue with our dependencies that was causing dev issues and testing errors: https://bitbucket.org/cs3398-s22-callisto/inventory-keeper/branch/bug/CAL-54_fix_failing_tests
    - [CAL-41](https://cs3398s22callisto.atlassian.net/browse/CAL-41) - Setup circleci config and get tests working: https://bitbucket.org/cs3398-s22-callisto/inventory-keeper/branch/feature/CAL-41_create_new_tests
- Bryce 
    - [CAL-24](https://cs3398s22callisto.atlassian.net/browse/CAL-24) - I set up a login page in attempt to connect to our data base: https://bitbucket.org/cs3398-s22-callisto/inventory-keeper/branch/CAL-24-login-authentication
    - [CAL-48](https://cs3398s22callisto.atlassian.net/browse/CAL-48) - The user interface for the homescreen was updated to match the style of the other screens in our application https://bitbucket.org/cs3398-s22-callisto/inventory-keeper/branch/CAL-48-improve-user-interface
    - [CAL-51](https://cs3398s22callisto.atlassian.net/browse/CAL-51) - The login screen was changed to a welcome screen that fits the styling of our application with the how to use screen moved to it. https://bitbucket.org/cs3398-s22-callisto/inventory-keeper/branch/CAL-51-improve-login-screen

## Next Steps for Sprint 4

- Morguhn
    - Allow for item date's to be optional
    - Visual queue for how close an item is to it's expiration / reminder date
    - Refactor/Clean up Add Item, Edit Item, and InventoryItem files
- DeJa 
    - Add Category to next each item on the item list.
    - Add delete button next to item name.
    - Refactor item list code.
- Ben
    - Add filters for item fields on the item list page, e.g. for category and expiration/reminder dates
    - Add push notifications for reminder dates
    - Add a dark/light ui mode for the app that can be changed in the app settings
- Bryce 
    - Try and get the login screen operational. Crashed every time I tried to create a log in.
    - Update images to the User interface.
    - Add an option to log in without having to sign up.