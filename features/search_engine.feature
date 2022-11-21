Feature: Search Engine

Scenario: Report search via Search Engine
    Given I am on the homepage
    When the user writes the URL in the search engine
    Then it presents the total number of accessibility problems found and all the information
    

Scenario: Report fetch via URL params
    Given I am on the homepage
    When the user writes the URL in the search engine
    Then it presents the total number of accessibility problems found and all the information