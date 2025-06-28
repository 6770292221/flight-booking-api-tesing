Feature: Airline Management via raw JSON body

Scenario: Create a new airline using raw JSON body
    Given I have a valid admin token
    When I create a new airline with body:
      """
      {
        "carrierCode": "JL",
        "airlineName": "Japan Airlines",
        "logoUrl": "https://upload.wikimedia.org/wikipedia/en/8/84/Japan_Airlines_logo.svg",
        "country": "Japan",
        "isLowCost": false
      }
      """
    Then the response status should be 201
    And the response body should contain:
      | status  | success                  |
      | code    | AIR_1001                 |
      | message | Airline created successfully. | 
    And the response data should contain fields:
      | carrierCode |
      | airlineName |
      | logoUrl     |
      | country     |
      | isLowCost   |

Scenario: Get airline with valid ID
    Given I have a valid admin token
    When I get airline by ID "67fa2f6d208cdb649f55f757"
    Then the response status should be 200
    And the response body should contain:
      | status  | success                       |
      | code    | AIR_1004                      |
      | message | Airports retrieved successfully. |
    And the response data should contain fields:
      | _id         |
      | carrierCode |
      | airlineName |
      | country     |
      | isLowCost   |

Scenario: Retrieve list of airlines and verify first item
    Given I have a valid admin token
    When I get the list of all airlines
    Then the response status should be 200
    And the response body should contain:
      | status  | success                       |
      | code    | AIR_1004                      |
      | message | Airports retrieved successfully. |
    And the airline list should have at least 5 items
    And the first airline should have fields:
      | _id         |
      | carrierCode |
      | airlineName |
      | logoUrl     |
      | country     |
      | isLowCost   |
      | updatedAt   |
      | createdAt   |
    And the first airline should contain values:
      | carrierCode | DD        |
      | airlineName | Nok Air   |
      | country     | Thailand  |
      | isLowCost   | true      |

Scenario: Update logoUrl and isLowCost of an existing airline
    Given I have a valid admin token
    When I update airline with ID "67df871a4226b11375cd3960" using body:
      """
      {
        "logoUrl": "https://upload.wikimedia.org/wikipedia/en/f/fd/Thai_Lion_Air_logo.svg",
        "isLowCost": true
      }
      """
    Then the response status should be 200
    And the response body should contain:
      | status | success  |
      | code   | AIR_1006 |
    And the response data should contain values:
      | logoUrl   | https://upload.wikimedia.org/wikipedia/en/f/fd/Thai_Lion_Air_logo.svg |
      | isLowCost | true                                                                  |