# RGA_ToolApp
## DEMO 
[Click here to check the demo](https://rga-app.herokuapp.com/)  ||  https://rga-app.herokuapp.com/ 

### Log in as: 

#### Admin:
Email: adminroy@gmail.com
Password: Asd123.

#### University:
Email: university@gmail.com
Password: Asd123.

#### Coordinator:
Email: coordinatortest@gmail.com
Password: Asd123.

#### Teacher:
Email: teacher@gmail.com
Password: Asd123.

#### Student:
Email: student@gmail.com
Password: Asd123.


# About RGA
RGA is a Web application software meant for Universities, Teachers and Students.

# User Types/Roles
In RGA there are five user roles: Admin, University, Coordinator/Supervisor, Teachers and Students

1. Admin: Administrators are in charge of adding/registering new universities, they can also modify universities basic info or delete them. 
2. University: Universities are in charge of registering new Coordinators and faculties/departments for that university.
3. Coordinators: Coordinators are allowed to add new teachers, courses/classrooms templates and courses/classrooms.
4. Teachers: Teachers are allowed to visualize the courses that they have been assigned to. They can modify the classroom data, upload documents and create tasks/homeworks for the students. Teachers will also grant or deny the access of each of the students that have sent an access request to one of his classrooms.
5. Students: Students are capable of sending access requests to any of the existents classrooms (Their teachers will have to share their classroom ID with the students in order for them to send their requests). Once they have accessed to a classroom, they'll be able to view the content and deliver their tasks/homeworks.  


# Back-end Setup

``` bash
# access backend directory
cd back

# install dependencies
npm install

# serve at localhost:3000
npm run dev


``` 
#### Note: Be aware that you will have to setup your own MongoDB Atlas Database in the .env file in the "back" directory


# Front-end Setup

``` bash
# access frontend directory
cd front

# install dependencies
yarn install

# serve at localhost:8080
yarn start

# build for production with minification
yarn run build

``` 
#### Note: Be aware that you will have to setup your own Cloudinary API KEY  in the .env file in the "front" directory

