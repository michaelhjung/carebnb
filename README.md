# CareBnB
<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#project-wiki">Project Wiki</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#sample-features">Sample Features</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project
![carebnb-logo]

[carebnb-logo]: ./frontend/src/logo/carebnb-logo-v5.png

<!-- [CareBnB](https://carebnb-2022.herokuapp.com/) -->
CareBnB* is a web application inspired by AirBnB. CareBnB provides a platform for
users to offer or find vacation rentals around the world.
*NOTE: The site is temporary down to save costs. Feel free to clone the repo for a local version!

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Project Wiki
* [API Documentation](https://github.com/michaelhjung/airBnB-clone/wiki/API-Documentation)
* [Database Schema](https://github.com/michaelhjung/airBnB-clone/wiki/Database-Schema)
* [Features List](https://github.com/michaelhjung/airBnB-clone/wiki/Features-List)
* [Redux State Shape](https://github.com/michaelhjung/airBnB-clone/wiki/Redux-Store-Shape)


### Built With
#### Frameworks, Platforms, & Libraries:
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)

#### Database:
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)


<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- SAMPLE FEATURES -->
## Sample Features

  - ### Log in as a Demo User:
    ![demo-user]

  - ### Dynamic image layout when creating a spot and adding images:
    ![demo-dynamic-img-layout]

  - ### Create and delete bookings:
    ![demo-create-booking]

  - ### Bookings data depend whether or not you are the spot owner:
    ![demo-show-bookings]


<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple example steps.

1. Clone the repo:

    SSH version:
    ```sh
    git clone git@github.com:michaelhjung/airBnB-clone.git
    ```
    or

    HTTPS version:
    ```sh
    git clone https://github.com/michaelhjung/airBnB-clone.git
    ```

2. cd into the backend folder and npm install the packages.
    ```sh
    npm install
    ```
3. Use the .env.example file to create a .env file at the root of the backend folder and change the appropriate fields. For example:
    ```sh
    cp .env.example .env
    ```
4. Migrate and seed the files. There are the following json scripts for your convenience:
    ```sh
    npm run migrate
    ```
    ```sh
    npm run seed
    ```
5. Check to make sure the server is running by running npm start.
    ```sh
    npm start
    ```
6. cd into the frontend folder and npm install the packages.
    ```sh
    npm install
    ```
7. npm start and make sure you are redirected to http://localhost:3000/
    ```sh
    npm start
    ```

<!-- ROADMAP -->
## Roadmap

- [x] Spots
    - [x] Create a spot
    - [x] Load all spots
    - [x] Load a spot by detail
    - [x] See list of current user's spots
    - [x] Update a current user's spot
    - [x] Delete a current user's spot
- [x] Bookings
    - [x] Create a booking
    - [x] See list of current user's bookings
    - [x] See list of bookings by spot
    - [x] Update a current user's booking
    - [x] Delete a current user's booking
- [x] Reviews
    - [x] Create a review
    - [x] See all reviews of a spot
    - [x] See all reviews of current user
    - [x] Update a review
    - [x] Delete a review
- [x] Images
    - [x] Add an image to a spot
    - [x] Delete a spot image
    - [x] Add an image to a review
    - [x] Delete a review image
- [ ] Spot Search Filter
    - [ ] page
    - [ ] size
    - [ ] minimum latitude
    - [ ] maximum latitude
    - [ ] minimum longitude
    - [ ] maximum longitude
    - [ ] minimum price
    - [ ] maximum price
- [ ] Other Improvements:
    - [x] Dynamic spot images CSS grid layout
    - [x] Auto delete past user bookings
    - [ ] Dynamic load more spots on scroll
    - [ ] Select new preview image
    - [ ] Reorder spot images
    - [ ] Page for spot images beyond 5


<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTACT -->
## Contact
[![LinkedIn][linkedin-shield]][linkedin-url]

Project Link: [https://github.com/michaelhjung/airBnB-clone](https://github.com/michaelhjung/airBnB-clone)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/michael-h-jung/
[product-screenshot]: images/screenshot.png
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[demo-user]: ./demo/demo-demo-user.gif
[demo-dynamic-img-layout]: ./demo/demo-dynamic-img-layout.gif
[demo-create-booking]: ./demo/demo-create-delete-bookings.gif
[demo-show-bookings]: ./demo/demo-check-bookings.gif
