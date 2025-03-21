INTRODUCTION

PT Trans Indah Lestari is a company that operates in the car rental sector. The business is renting luxury cars to travellers in Bali. For the transaction still manual, This company plans to create an application that makes it easier for customers to rent and market their cars via the internet. Your task is to implement the backend with Laravel PHP Framework and interactive frontend with JavaScript to consume the backend API. The detailed description and tools that you can use will be described below.

DESCRIPTION OF PROJECT AND TASKS

API List:

Create dummy users on users table (password is hashed):

username

admin_24

user_24

password

admin_24

user_24

These are the list of web service endpoint that requested by the company:

1. Authentication

a. Login

URL: [domain/a24/auth/login

Description: For admin to generate and get login token using username and password. Username

and password must be valid.

Method: POST

Request Parameter:

* Body:


Username

Password

0

Response:

* If login success:

Header: response status: 200

Body: (token) (authorization token generated by the system from logged in user id with bcrypt hashing method)

If login failed (username or password do not match or empty):

Header: response status: 401

Body: (message: invalid login)

b. Logout

URL: [domain]/a24/auth/logout

Description: For server to make token invalid

Method: GET

Header: Authorization: Bearer (TOKEN)

Response:

If logout success:

Header: response status: 200

Body: {message: logout success)

If logout failed (token invalid):

Header: response status: 401

Body: (message: unauthorised user)

2. Register

Url: a24/register?token=(AUTHORIZATION_TOKEN)

Description: Tenants register which can be done online

Request method: GET, POST, PUT, DELETE

Header: authorization Option

Request parameter:

- Body:

ID

* No_KTP
* Name

* Date_of_birth

Email

* Password

* Phone

Description

Response:

If success:

Header, response status: 200

Body: {message: create register success)

If input validation failed:

Header: response status: 422

Body: (message: invalid field)

If accessed without token:

Header response status: 403

Body: (message: forbidden}

3. Car

URL: a24/cars?token=(AUTHORIZATION_TOKEN)

Deskripsi: Car list

Request method: GET, POST, PUT, DELETE

Header: header authorization Option

Request Parameter:

Body:

* Id,

* No_Car,

* Name_Car.

Type_Car.

Year,

* Seat,

* Image,

Total.

Price,

. Status

Response:

If success

Header response status: 200
Body: (message: create Car success)

If input validation failed:

Header: response status: 422

Body: (message: invalid field)

If accessed without token:

Header: response status: 403

Body: (message: forbidden)

4. Rent

URL: a24/rents?token=(AUTHORIZATION_TOKEN)

Deskripsi: List of user car rentals

Request method: GET, POST, PUT, DELETE

Header: header authorization Option

Request Parameter

Body:

Id.

id Tenant,

Id Car,

Date borrow,

Date_Return,

Down_Payment,

* Discount,

* Total

Response:

If success:

Header: response status: 200

Body: (message: create Rent success)

If input validation failed:

Header response status: 422

Body: (message: invalid field)

If accessed without token:

Header: response status: 403

Body: (message: forbidden)
5. Return

URL: a24/retum?token=(AUTHORIZATION TOKEN))

Deskripsi: List of car retums

Request method: GET, POST, PUT, DELETE

Header: header authorization Option

Request Parameter

Body:

Id.

* Id Teriant

id Car

Id_Pinalties

Date borrow,

. Date Return,

Penalties Total

Discount

Total

Response:

If success:

Header: response status: 200

Body: (message: create Retum success)

. If input validation failed

Header: response status: 422

Body: (message: invalid field)

If accessed without token:

Header response status: 403

Body (message: forbidden)

6. Penalties

URL: a24/penalties?token=(AUTHORIZATION TÜKENJ

Deskripsi: List of penalties for rent car by tenant

Request method. GET, POST, PUT, DELETE

Header: header authorization Option

Request Parameter:

Body

* Id.

Penalties Name,
Description

Id Car

Penalties Total

Response

If success

Header: response status: 200

Body (message: create Penalties success)

If input validation failed:

Header response status: 422

Body: (message. invalid field)

If accessed without token:

Header: response status: 403

Body: (message: forbidden)

The complete PT Trans Indah Lestari system should cover the following requirement

Login

The system's role can be an Admin or a User

The user (admin or user) can login (and logout) into the system on the start page of the application

* After login, admin have access to "Car", "Rent", "Retum", "Peralties" and "Register" menu

After login, user can view all menu transaction base on User ID

Links to the authorised menu and logout link are always visible on the top part of the page while the user is logged in

* Make sure your system is preventing users to access unauthonsed menu


Car

On. "Car" menu, admin can add new Car

Admin can view update and delete existing car

All input form is must be filled

Rent

On "Rent" menu, admin can add new Rent Car

Admin can view, update and delete existing Rent Car

All input form is must be filled

user can view rent Transaction. If thay login

System can calculate decount and down payment automatic so that can reduce the total payment

Return

On "Return menu, admin can add new Return

Admin can view.update and delete existing Return

All input form is must be filled

System can caliculate penalty Payment automatic so that can reduce the total payment

Penalties

On "Penatties" menu, admin can add new Penalties

Admin can view, update and delete existing Penalties

All input form is must be filled

Register

* On "Register" menu, admin can view Transaction

Admin can view, update and delete existing Register

All input form is must be filled