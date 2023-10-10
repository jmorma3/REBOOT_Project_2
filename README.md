# REBOOT_Poject_2
This REST API is designed to manage a local market through a website, where customers, shop owners and main web admin can acces to different funtionalities related with products, suppliers,  purchases, sales, etc. 

## Rols:
There are 3 main rols:
Webmaster ("Admin"). This is a full access rol. Admin can create, update and delete different shops, products and suppliers in the marketplace, access to contact information from every user and create, update and delete users. 

Shop Owner ("Owner"). This one is a mid level access rol. Owner has access to his own shop, adding, updating and deleting new products and suppliers to its own shop. Also can access to sales to customers and purchases from suppliers. 

Customer ("Customer"). Customer is the most limited rol, having access to products, its own contact information (being able to update and delete its own profile) and its buying history into the marketplace. 

## Permissions:
![image](https://github.com/jmorma3/REBOOT_Poject_2/assets/122169852/6479f67d-8c4d-4cf9-82ee-894e9500d04f)

## Tables Diagram:
![image](https://github.com/jmorma3/REBOOT_Poject_2/assets/122169852/d9b91d10-186b-4e54-b45a-7d7870381dc3)



## Authentication Endpoints

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

