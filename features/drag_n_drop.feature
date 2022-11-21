Feature: Drag n Drop

Scenario: Send Pa11y report files
    Given I am on the homepage
    And the user drags and drops a file
    When a modal with an upload message appears
    And that it is a valid report
    Then it presents the total number of accessibility problems found and all the information