Feature: Create a new order

    Background: Enter Marketplace
        Given Launch the browser
        When Open the website
        And Provide the username and password 
        And Click on the Login button
        And Click on marketplace


    Scenario: Access Product list
        And Verify New order button is enabled
        And Click on New order
        And Add some products to cart
        And Click on the cart button
        Then Confirm order
        Then Confirm message
       