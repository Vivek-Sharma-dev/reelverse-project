ReelVerse: A Modern Movie & TV Discovery Web App

ReelVerse is a feature-rich, 100% client-side web application for discovering and tracking movies, TV shows, and actors. Built with a modern React stack, it's designed to be lightning-fast, fully responsive, and packed with "god-level" features that solve traditional backend problems (like watchlists and contact forms) using only frontend technologies.

This project was built from scratch in 4-5 days, demonstrating rapid, high-quality development.

This isn't just a simple API-fetching app. Here are the advanced features we built:

Smart Card Component (<MovieCard />): One component that intelligently handles both Movie and TV Show data. It displays the correct title (title vs. name), date (release_date vs. first_air_date), and links to the correct details page (/movie/:id or /tv/:id).

3 Dynamic Detail Pages:

/movie/:id: Full movie details, including "Where to Watch."

/tv/:id: Full TV show details, including "Created By" and season count.

/person/:id: Full actor details, including bio and a "Known For" grid of their complete filmography (movies and TV shows).

Multi-Search Engine: The search bar is a "multi-search" that calls three API endpoints at once (/search/movie, /search/tv, /search/person) and displays the results in clean, separate categories.

Infinite Scroll: All 8 content pages (Trending, Hollywood, Bollywood, Anime, etc.) feature a smooth infinite scroll built with the IntersectionObserver API to load more content on demand.

Persistent Watchlist (No Database): A complete "Add to Watchlist" feature. It uses React Context for global state and LocalStorage to save the user's list, so it persists even after the browser is closed.

Hero Carousel: A "Netflix-style" auto-playing hero carousel on the homepage and all discovery pages, built with Swiper.js.

Trailer Modal: An in-app pop-up modal to watch movie/TV trailers, so the user never has to leave the site.

Working Contact Form (No Backend): A professional contact form that submits directly to your email using the Formspree service.

Pro-Level UX:

Automatic Scroll-to-Top on every page navigation.

Bug-Free Mobile Menu that closes on link clicks and outside clicks.

Keyboard Hiding on mobile after a search is submitted.

🚀 Tech Stack

Core: React 18 (with Hooks)

Build Tool: Vite

Styling: Tailwind CSS (Utility-First)

Routing: React Router DOM v6

API Client: Axios (with a reusable, centralized instance)

Carousel: Swiper.js

Icons: React Icons

🛠️ Installation & Setup

To run this project locally, follow these steps:

1. Clone the repository:

git clone [https://github.com/Vivek-Sharma-dev/reelverse.git](https://github.com/Vivek-Sharma-dev/reelverse.git)
cd reelverse


2. Install dependencies:

npm install


3. Set up your Environment File (CRITICAL):
This project requires a secret API key from The Movie Database (TMDb).

Create a new file in the root of the project named:
.env

Open the file and add your API Read Access Token (v4 auth):

VITE_TMDB_API_TOKEN=your_long_api_token_here


IMPORTANT: The variable must start with VITE_ for Vite to see it.

4. Run the development server:

npm run dev


Open http://localhost:5173 to see the app!

🎬 API Attribution

This project would not be possible without the free and amazing data provided by TMDb.

This product uses the TMDb API but is not endorsed or certified by TMDb.