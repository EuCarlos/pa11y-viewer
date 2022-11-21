Feature: Search Suggestion

Scenario: Suggested search for reports by browsing history
    Given I am on the homepage
    When the user clicks on the search engine
    And there's already been a search done
    Then it presents a list of your actions with URLs already accessed during
    And with option to remove the item from the list