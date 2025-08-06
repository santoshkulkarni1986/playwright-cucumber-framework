Feature: Login functionality

@smoke
Scenario Outline: Valid login
    Given I navigate to the login page
    When I enter the userName "<username>"
    When I enter the password "<password>"
    And I click the login button

Examples:
    | username | password    |
    | student  | Password123 |
    | student  | Password123 |
