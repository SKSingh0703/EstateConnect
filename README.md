# EstateConnect
EstateConnect is a comprehensive real estate management platform designed to streamline property buying, selling, and renting. Built with modern technologies and best practices, this project offers a user-friendly experience with advanced features for managing real estate listings.

# Table of Contents
- Features
- Technologies Used
- Installation
- Usage
- Contributing

# Features
- Advanced Authentication: Secure login and registration with email/password and Google OAuth integration using JSON Web Tokens.
- State Management: Efficient state management with Redux Toolkit.
- User Profile Management: Secure user profile pages allowing updates to username, email, password, and profile picture.
- CRUD Operations: Create, read, update, and delete property listings with support for discounted pricing and up to 6 images via Firebase.
- Image Slider: Showcase property images with an integrated image slider on each page.
- Advanced Search: Modern sidebar search facility with filters for title, type, and other criteria, utilizing MongoDB queries. Includes a "Show More" button to display additional listings.
- Responsive Design: Fully responsive layout ensuring a seamless experience across devices.
- Contact Options: Convenient contact options for easy communication.
  
# Technologies Used
- Frontend: React.js, Tailwind CSS, React Router DOM
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JSON Web Tokens, Google OAuth
- State Management: Redux Toolkit
- Image Storage: Firebase
- Deployment: Render

#Installation
- Clone the repository:

bash

git clone https://github.com/SKSingh0703/EstateConnect.git
- Navigate to the project directory:

cd EstateConnect
- Install dependencies for both client and server:


npm install
npm install --prefix client
Build the client-side application:

npm run build --prefix client
Start the application:

npm start
The server will start on http://localhost:3000 by default.

# Usage
- Visit the application in your browser:
Navigate to [http://localhost:3000](https://estateconnect-1.onrender.com/) to access the EstateConnect platform.

- Authentication:
Use the registration and login pages to create and access your account. Google OAuth is also supported.

- Manage Listings:
Create, view, update, and delete property listings through your profile.

- Search and Filter:
Utilize the advanced search facility to find properties by title, type, and other criteria.

# Contributing
We welcome contributions to improve EstateConnect. To contribute:

- Fork the repository.
- Create a new branch:

- git checkout -b feature/your-feature
- Commit your changes:

- git commit -am 'Add new feature'
- Push to the branch:

- git push origin feature/your-feature
- Create a new Pull Request.
