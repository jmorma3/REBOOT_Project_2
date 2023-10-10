# REBOOT_Poject_2
This REST API is designed to manage a local market through a website, where customers, shop owners and main web admin can acces to different funtionalities related with products, suppliers,  purchases, sales, etc. 

## Roles:
There are 3 main rols:
- Webmaster ("Admin"). This is a full access role. Admin can create, update and delete different shops, products and suppliers in the marketplace, access to contact information from every user and create, update and delete users. 
- Shop Owner ("Owner"). This one is a mid level access role. Owner has access to his own shop, adding, updating and deleting new products and suppliers to its own shop. Also can access to sales to customers and purchases from suppliers. 
- Customer ("Customer"). Customer is the most limited role, having access to products, its own contact information (being able to update and delete its own profile) and its buying history into the marketplace. 

## Permissions:
![image](https://github.com/jmorma3/REBOOT_Poject_2/assets/122169852/6479f67d-8c4d-4cf9-82ee-894e9500d04f)

## Tables Diagram:
![image](https://github.com/jmorma3/REBOOT_Poject_2/assets/122169852/d9b91d10-186b-4e54-b45a-7d7870381dc3)



## Authentication Endpoints

The Authentication flow for the application is:


### User login / signup

METHOD | ENDPOINT         | TOKEN | ROLE | DESCRIPTION              | POST PARAMS                                     | RETURNS
-------|------------------|-------|------|--------------------|-------------------------------------------------|--------------------
POST   | /auth/signup     | -     | - | User Signup           | userName, email, password, name, surname, phone, address, zipcode | {token : token}
POST   | /auth/login     | -     | - | User Login           | email, password | {token : token}


### User Endpoints

METHOD | ENDPOINT         | TOKEN | ROLE | DESCRIPTION              | POST PARAMS                                     | RETURNS
-------|------------------|-------|------|--------------------|-------------------------------------------------|--------------------
GET   | /user/profile    | YES    | - | Get own profile           | - | {user}
GET   | /user    | YES    | admin | Get all users           | Query params | [{user}]
GET   | /user/:userId    | YES    | admin | Get one user           | - | {user}
POST   | /user    | YES    | admin | Create one user           | userName, email, role, name, surname, phone, address, zipcode  | {user}
PUT   | /user/profile    | YES    | - | Update user profile (owner and customer only update own profile)         | userName, email, name, surname, phone, address, zipcode | {message: "Profile updated!"}
PUT   | /user/password    | YES    | - | Reset user password (owner and customer only reset own password)         | newPassword, repeatPassword | {message: "Password updated!"}
PUT   | /user/:userId    | YES    | admin | Update one user           | userName, eamil, role, name, surname, phone, address, zipcode | {message: "User updated!"}
DELETE   | /user/profile    | YES    | - | Delete user profile (owner and customer only delete own profile)         | - | {message: "Profile deleted!"}
DELETE   | /user/:userId    | YES    | admin | Delete one user           | - | {message: "User deleted!"}



### Product Endpoints

METHOD | ENDPOINT         | TOKEN | ROLE | DESCRIPTION              | POST PARAMS                                     | RETURNS
-------|------------------|-------|------|--------------------|-------------------------------------------------|--------------------
GET   | /product    | YES    | - | Get all products           | Query params | [{product}]
GET   | /product/:productId    | YES    | - | Get one product           | - | {product}
POST   | /product    | YES    | owner, admin | Create one product           | name, description, price | {product}
PUT   | /product/:productId    | YES    | owner, admin | Update one product           | name, description, price | {message: "Product updated!"}
DELETE   | /product/:productId    | YES    | owner, admin | Delete one product           | - | {message: "Product deleted!"}


### Category Endpoints

METHOD | ENDPOINT         | TOKEN | ROLE | DESCRIPTION              | POST PARAMS                                     | RETURNS
-------|------------------|-------|------|--------------------|-------------------------------------------------|--------------------
GET   | /category    | YES    | - | Get all categories           | Query params | [{category}]
GET   | /category/:categoryId    | YES    | - | Get one category           | - | {category}
POST   | /category    | YES    | owner, admin | Create one category           | name, description | {category}
PUT   | /category/:categoryId  | YES    | owner, admin | Update one category           | name, description | {message: "Category updated!"}
DELETE   | /category/:categoryId    | YES    | owner, admin | Delete one category           | - | {message: "Category deleted!"}


### Supplier Endpoints

METHOD | ENDPOINT         | TOKEN | ROLE | DESCRIPTION              | POST PARAMS                                     | RETURNS
-------|------------------|-------|------|--------------------|-------------------------------------------------|--------------------
GET   | /supplier    | YES    | owner, admin | Get all suppliers           | Query params | [{supplier}]
GET   | /supplier/:supplierId    | YES    | owner, admin | Get one supplier           | - | {supplier}
POST   | /supplier    | YES    | admin | Create one supplier           | name | {supplier}
PUT   | /supplier/:supplierId  | YES    | admin | Update one supplier           | name | {message: "Supplier updated!"}
DELETE   | /supplier/:supplierId    | YES    | admin | Delete one supplier           | - | {message: "Supplier deleted!"}


### Shop Endpoints

METHOD | ENDPOINT         | TOKEN | ROLE | DESCRIPTION              | POST PARAMS                                     | RETURNS
-------|------------------|-------|------|--------------------|-------------------------------------------------|--------------------
GET   | /shop    | YES    | admin | Get all shops           | Query params | [{shop}]
GET   | /shop/:shopId    | YES    | owner, admin | Get one shop (owner only gets own shop)          | - | {shop}
POST   | /shop    | YES    | owner, admin | Create one shop (owner only creates own shop)         | name, category | {shop}
PUT   | /shop/:shopId  | YES    | owner, admin | Update one shop (owner only updates own shop)         | name, category | {message: "Shop updated!"}
DELETE   | /shop/:shopId    | YES    | owner, admin | Delete one shop (owner only deletes own shop)           | - | {message: "Shop deleted!"}
