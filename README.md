# REBOOT_Poject_2
API Rest Management of a Local Market

### Authentication Endpoints

The Authentication flow for the application is:

### User login / signup

METHOD | ENDPOINT         | TOKEN | ROLE | DESCRIPTION              | POST PARAMS                                     | RETURNS
-------|------------------|-------|------|--------------------|-------------------------------------------------|--------------------
POST   | /auth/signup     | -     | - | User Signup           | userName, email, password | {token : token}
POST   | /auth/login     | -     | - | User Login           | email, password | {token : token}


### Admin Endpoints

METHOD | ENDPOINT         | TOKEN | ROLE | DESCRIPTION              | POST PARAMS                                     | RETURNS
-------|------------------|-------|------|--------------------|-------------------------------------------------|--------------------
GET   | -     | -     | admin | -             | -  | -
GET  | -    | -     | admin | -             | - | -


### Owner Endpoints

METHOD | ENDPOINT         | TOKEN | ROLE | DESCRIPTION              | POST PARAMS                                     | RETURNS
-------|------------------|-------|------|--------------------|-------------------------------------------------|--------------------
GET   | -     | -     | owner | -             | -  | -
GET  | -    | -     | owner | -             | - | -


### Customer Endpoints

METHOD | ENDPOINT         | TOKEN | ROLE | DESCRIPTION              | POST PARAMS                                     | RETURNS
-------|------------------|-------|------|--------------------|-------------------------------------------------|--------------------
GET   | /user/profile     | YES    | - | Get own profile            | -  | {user}
PUT   | /user/profile     | YES    | - | Update own profile            | PENDING | {message: "Profile updated!"}

