Podcast App
Welcome to the Podcast App, a portfolio piece showcasing your skills in React and API integration. This project allows users to browse, explore, and listen to podcasts with various features and functionalities.

Table of Contents
Technology
Data
User Stories
Setup Instructions
Usage Examples
Contact Information
Technology
This project is built using React for the frontend, incorporating state management and data fetching mechanisms typical in modern web applications. While TypeScript is recommended, the project can be adapted to use JavaScript if preferred.

Data
The Podcast App retrieves data from a public API that provides information structured into three main units:

SHOW: Represents a podcast series, which includes one or more seasons.
SEASON: A collection of episodes released over a specific period within a SHOW.
EPISODE: Corresponds to a specific audio file that users can listen to.
Additional data includes:

PREVIEW: Summarized information about a SHOW, often used for listing multiple podcasts.
GENRE: Categories that can be assigned to a SHOW.
Relationships
Data relationships are structured such that SHOW contains SEASON(s), and SEASON contains EPISODE(s).

Endpoints
Data is fetched from the following endpoints:

https://podcast-api.netlify.app/: Returns an array of PREVIEW objects.
https://podcast-api.netlify.app/genre/<ID>: Returns detailed GENRE information for a specific genre ID.
https://podcast-api.netlify.app/id/<ID>: Returns detailed SHOW information including embedded SEASON and EPISODE objects.
Genre Titles
Genres are identified by IDs and corresponding titles:

ID	Title
1	Personal Growth
2	Investigative Journalism
3	History
4	Comedy
5	Entertainment
6	Business
7	Fiction
8	News
9	Kids and Family
User Stories
The Podcast App is designed to fulfill several user stories ranging from basic browsing functionalities to more advanced features like favoriting episodes and filtering by genres.

For detailed user stories, please refer to the DJS rubric provided in your project guidelines.

Setup Instructions
To run this project locally, follow these steps:

Clone the repository from GitHub:

bash
Copy code
git clone <repository_url>
Navigate into the project directory:

bash
Copy code
cd podcast-app
Install dependencies:

bash
Copy code
npm install
Start the development server:

bash
Copy code
npm start
Open your browser and visit http://localhost:3000 to view the app.

Usage Examples
Here are some examples of how to use the Podcast App:

Browse Shows: View a list of available shows sorted alphabetically.
Listen to Episodes: Navigate through seasons and episodes to listen to podcasts.
Filter by Genre: Filter shows based on specific genres.
Manage Favorites: Mark favorite episodes and manage them in a dedicated favorites view.
Contact Information
For any questions or feedback regarding this project, feel free to reach out to:

Name: Ethan Kyle Afrika-peters
Email: afrikapetersek@gmail.com
