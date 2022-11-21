Feature: Reports

Scenario: Present the problems reported in the report
    Given I am on the homepage
    When that there are 1 problem or more
    Then it presents a set of information on the card (such as: code, type, type code, message, context and selector)

Scenario: Don't submit any report
    Given I am on the homepage
    When the total number of problems equals 0 (zero)
    And when the file or url is from an invalid report
    Then it displays a message written on the screen "No reports found"