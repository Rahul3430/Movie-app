🎬 MERN Movie App

A full-stack **MERN (MongoDB, Express, React, Node.js)** Movie Application that allows users to browse, search, sort, and manage movies with secure authentication.


 🚀 Live Demo

Frontend:
[https://mern-movie-app-six.vercel.app](https://mern-movie-app-six.vercel.app/)

Backend API:
[https://movie-app-ws2r.onrender.com](https://movie-app-ws2r.onrender.com)

 🛠️ Tech Stack

* **Frontend:** React, Vite, Axios, Tailwind CSS
* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas
* **Authentication:** JWT, bcryptjs
* **Deployment:** Vercel (Frontend), Render (Backend)



✨ Key Functionalities

🔐 Authentication

* User Registration
* User Login & Logout
* JWT-based secure authentication
* Password hashing using bcrypt
* Protected routes (only logged-in users can access movies)


🎥 Movie Management

* Fetch movies from MongoDB Atlas
* Display movies in a responsive grid
* View movie details


🔍 Search

* Search movies by name
* Real-time filtering based on search input


 ↕️ Sorting

* Sort movies by:

  * Latest
  * Rating
  * Duration


📄 Pagination

* Server-side pagination
* Movies loaded page-wise
* Previous & Next navigation buttons
* Displays current page and total pages


✏️ Update Movies

* Edit existing movie details
* Update movie information in the database


❌ Delete Movies

* Delete a movie from the database
* Instantly reflects changes on UI


⚡ Error Handling

* Proper API error handling using try-catch
* Graceful UI messages when no movies are found
* Handles unauthorized access (401 errors)


🔑 Demo Login Credentials

Use the following test account to explore the app:

```
Email: test@test.com
Password: test123
```




 API Features Summary

* Secure REST APIs
* Authentication middleware
* Query-based filtering (search, sort)
* Pagination support
* CRUD operations on movies


📌 Notes

* MongoDB Atlas is used as a cloud database
* Ensure Atlas IP Whitelist is set to `0.0.0.0/0`
* Backend must be running for frontend to function properly


👨‍💻 Author

Rahul Sharma
BSc IT Graduate (2025)
Skills: MERN Stack, JavaScript, Python, MongoDB

