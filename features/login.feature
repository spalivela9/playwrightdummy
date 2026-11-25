Feature: OpenCart Login Functionality

  Background:
    Given user navigates to OpenCart application at "http://opencart.abstracta.us"

  @positive @login
  Scenario: Successful login with valid credentials
    And user enters username "spalivela@yahoo.com"
    And user enters password "Password123"
    And user clicks the login button
    Then user should be logged in successfully
    And user dashboard should be visible
    And the My Account heading should be displayed

  @positive @login
  Scenario: Login page should load with proper elements
    Then login page should display username field
    And login page should display password field
    And login page should display login button
    And login page should display forget password link

  @negative @login @invalid-credentials
  Scenario: Login fails with invalid username
    When user enters username "invaliduser@example.com"
    And user enters password "Test@123"
    And user clicks the login button
    Then user should see error message
    And error message should contain "No match for E-Mail Address and/or Password."
    And user should remain on login page

  @negative @login @invalid-credentials
  Scenario: Login fails with invalid password
    When user enters username "spalivela@yahoo.com"
    And user enters password "WrongPassword123"
    And user clicks the login button
    Then user should see error message
    And error message should contain "No match for E-Mail Address and/or Password."
    And user should remain on login page

  @negative @login @empty-fields
  Scenario: Login fails when username field is empty
    When user leaves username field empty
    And user enters password "Test@123"
    And user clicks the login button
    Then validation error should be displayed
    And error message should contain "No match for E-Mail Address and/or Password."

  @negative @login @empty-fields
  Scenario: Login fails when password field is empty
    When user enters username "test@example.com"
    And user leaves password field empty
    And user clicks the login button
    Then validation error should be displayed
    And error message should contain "No match for E-Mail Address and/or Password."

  @negative @login @empty-fields
  Scenario: Login fails when both fields are empty
    When user leaves username field empty
    And user leaves password field empty
    And user clicks the login button
    Then validation error should be displayed

  @negative @login @sql-injection
  Scenario: SQL injection attempt should be handled safely
    When user enters username "admin' OR '1'='1"
    And user enters password "anything"
    And user clicks the login button
    Then user should see error message
    And user should remain on login page

  @positive @login @case-sensitivity
  Scenario: Login should be case-insensitive for email
    When user enters username "SPALIVELA@YAHOO.COM"
    And user enters password "Password123"
    And user clicks the login button
    Then user should be logged in successfully

  @negative @login @special-characters
  Scenario: Login fails with special characters in password
    When user enters username "test@example.com"
    And user enters password "<script>alert('xss')</script>"
    And user clicks the login button
    Then user should see error message
    And user should remain on login page
