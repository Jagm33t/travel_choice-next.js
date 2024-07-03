# **Travel Choice**

Travel Choice is a travel web application developed using Next.js, React, and OpenLayers to create an interactive map-based travel advisor platform. The application integrates various technologies to provide users with location-based recommendations for restaurants, hotels, and attractions.

**Live Link:** [Travel Choice](https://travelchoice.netlify.app/)

## **Lessons Learned**
- **API Integration:** Gained experience in integrating third-party APIs and handling asynchronous data fetching with Axios.
- **State Management:** Improved skills in managing application state using React hooks like `useState` and `useEffect`.
- **UI/UX Design:** Enhanced ability to design and implement responsive, user-friendly interfaces using Chakra UI and Semantic UI React.
- **Geolocation and Mapping:** Learned to work with geolocation services and map libraries such as OpenLayers to create interactive map-based applications.

## **Hard Parts**
- **API Rate Limits:** Managing rate limits imposed by third-party APIs and implementing error handling for failed requests.
- **Complex State Management:** Handling complex state updates and ensuring the application remains responsive and performant.
- **Map Rendering:** Ensuring smooth and accurate rendering of map layers and markers as the user navigates and interacts with the map.
- **Asynchronous Data Handling:** The most challenging part was handling asynchronous data, where the application needed to record screen coordinates using OpenLayers, store them, send them to make API requests, and log back the results while effectively handling errors.


## **How Everything is Performed**

### **Map Initialization and User Location**
**Libraries Used:** OpenLayers, Axios, Chakra UI, Semantic UI React.  
**Functionality:**
- Initializes a map with OpenLayers, setting up layers for points of interest.
- Fetches the user's location using the Geolocation API to center the map.
- Tracks map coordinates (latitude and longitude) as the user navigates.

### **Fetching and Displaying Data**
**API Integration:**
- `getPlacesData` function makes asynchronous calls to the Travel Advisor API with Axios, using current map bounds to fetch relevant data.
- Data fetching is triggered by changes in map bounds, user location, or selected place type.

**Data Handling:**
- Stores fetched data in state variables using React's `useState`.
- Data includes place details like name, rating, location, and type.

**UI Rendering:**
- Uses Chakra UI and Semantic UI React for styling and layout.
- Displays places in a `<List />` component and markers on a `<Map />` component.
- `<Header />` component includes search functionality and filters.

### **Filtering and Searching**
**Filtering:**
- Allows users to filter places by ratings, implemented with a `useEffect` hook.

**Search:**
- Manages search input state with React hooks, dynamically updating the displayed places.

### **Asynchronous Data Handling**
**Promises and Async/Await:**
- Handles data fetching asynchronously with promises and async/await syntax for smooth, non-blocking operations.
- Implements error handling for API calls to manage potential issues.



## Technologies Used

- Next.js
- OpenLayers
- Geolocation
- HTML
- JavaScript
- Chakra UI
- React Icons
- Rest Api

## Installation

To run this project locally, follow these steps:

1. Clone the repository.
2. Install the dependencies using `npm install`.
3. Start the development server with `npm run dev`.

## Video


https://github.com/Jagm33t/travel_choice-next.js/assets/130860323/9956aa04-779a-4ed1-81a2-ccf7998bc001




## Screenshots

Here are some screenshots from the Travel Choice project:

![Screenshot 1](/public/res.png)
![Screenshot 2](/public/attrac.png)
![Screenshot 3](/public/hotels.png)
