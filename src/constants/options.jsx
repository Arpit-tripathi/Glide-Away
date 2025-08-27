export const SelectTravelesList = [
  {
    id: 1,
    title: "just Me",
    desc: "A Solo Travels in exploration",
    icon: "🛩️",
    people: "1",
  },
  {
    id: 2,
    title: "A Couple",
    desc: "Two travels in tandem",
    icon: "🥂",
    people: "2",
  },
  {
    id: 3,
    title: "Family",
    desc: "A group of fun loving adv",
    icon: "🏡",
    people: "3 to 5 people",
  },
  {
    id: 4,
    title: "Friends",
    desc: "A bunch of thrill-seekes",
    icon: "⛵",
    people: "5 to 10 people",
  },
];

export const SelectBudgetOptions = [
  {
    id: 1,
    title: "Cheep",
    desc: "Stay conscious of costs",
    icon: "🍽️",
  },

  {
    id: 2,
    title: "Moderate",
    desc: "Keep const on the average side",
    icon: "💰",
  },
  {
    id: 3,
    title: "Luxury",
    desc: "Dont worry about cost",
    icon: "💸",
  },
];

// export const AI_PROMPT = "Generate Travel Plan for Location:{location},for{totalDays} Days for{traveler} with a {budget},give me  Hotels options list {totalDays} days with each day plan with best time to visit in JSON format";

// export const AI_PROMPT="Generate Travel Plan for Location: {location}, for {totalDays} Days for {traveler} People with a  {budget}, give me Hotels options list with Hotel Name, Hotel address, Price,hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format ex "



export const AI_PROMPT = `Generate Travel Plan for Location: {location}, for {totalDays} Days for {traveler} People with a {budget}. 

Give me hotel options list with:
- Hotel Name
- Hotel Address
- Price (converted to INR if local currency is different)
- Hotel Image URL (working image)
- Geo Coordinates
- Rating
- Description

Also suggest itinerary with:
- Place Name
- Place Details
- Place Image URL(working image)
- Geo Coordinates
- Ticket Pricing (in INR)
- Travel Time (in minutes)
- Best Time to Visit

Return the result in valid JSON format and follow this exact schema:

{
  "location": "string",
  "durationDays": 3,
  "personCount": 1,
  "hotels": [
    {
      "name": "string",
      "address": "string",
      "pricePerNightINR": 0,
      "imageUrl": "string (URL)",
      "geo": { "lat": 0, "lng": 0 },
      "rating": 0,
      "description": "string"
    }
  ],
  "itinerary": [
    {
      "day": 1,
      "bestTimeToVisit": "string",
      "places": [
        {
          "name": "string",
          "details": "string",
          "imageUrl": "string (URL)",
          "geo": { "lat": 0, "lng": 0 },
          "ticketPriceINR": 0,
          "travelTimeMinutes": 0
        }
      ]
    },
    {
      "day": 2,
      "bestTimeToVisit": "string",
      "places": [
        {
          "name": "string",
          "details": "string",
          "imageUrl": "string (URL)",
          "geo": { "lat": 0, "lng": 0 },
          "ticketPriceINR": 0,
          "travelTimeMinutes": 0
        }
      ]
    },
    {
      "day": 3,
      "bestTimeToVisit": "string",
      "places": [
        {
          "name": "string",
          "details": "string",
          "imageUrl": "string (URL)",
          "geo": { "lat": 0, "lng": 0 },
          "ticketPriceINR": 0,
          "travelTimeMinutes": 0
        }
      ]
    }
  ]
}


Requirements:

- Use real places and data from {location}.
- Ensure the JSON is strictly valid and ready for Firestore storage.
- Do not include any extra commentary or explanation—only return the JSON object.
`;