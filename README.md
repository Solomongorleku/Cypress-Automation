## **Python Behave BDD Framework**

This is a BDD automation framework developed on Selenium and Python Behave.

Page Object Model is followed in this framework

**pages** folder contains the elements and corresponding actions of the pages

**features** folder contains **steps** folder which has all the test files and also the feature files.

**configuration** directory contains the configuration files

**requirements.txt** file contains all the python packages needed to run this framework

**reports** directory contains the json files generated with allure reports



### **Commands to run the tests**

**To run the test with allure report**
`behave -f allure_behave.formatter:AllureFormatter -o reports/ features/marketplace.feature`

**To run the test without allure report** `behave features/marketplace.feature`

**To generate the html allure report from the json files inside reports folder**
`allure serve reports/`