Feature: Validate the login feature

  Scenario: Enter Marketplace
    Given Launch the browser
    When Open the website
    And Provide the username and password 
    And Click on the Login button
    And Click on marketplace
    #Then Close the browser

  # @valid_login
  # Scenario: Login with valid credentials
  #   And Provide the username "uitester" and password "uitester"
  #   And Click on the Login button
  #   Then Login is successful and HomePage is opened
  #   Then Close the browser

  # Scenario Outline: Login with invalid credentials
  #   And Provide the username "<username>" and password "<password> "
  #   And Click on the Login button
  #   Then Login is failed and invlid credential error is displayed
  #   Then Close the browser
  #   Examples:
  #     | username | password |
  #     | abcd     | 1234     |
  #     | 35473    | afsdf    |

  