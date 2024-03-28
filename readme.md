# Just to make it clear I have build 2 completely working project: backendOny and fullstack

## BackendOnly Project Setup

This project is built using Node.js and Express.js. To set up the project locally, follow these steps:

first you have to hit signup route and then login route. you will automatically receive an email containing payment link just after hiting loging route with correct credential

1. Clone the backendOnly folder of this repository


2. Install dependencies: npm install


3. Create a `.env` file based on the provided `env.example` file and update the necessary environment variables.

4. Start the server with : npm start  or npm run dev(with nodemon)


##  Route Information

### Signup
- Endpoint: auth/signup (POST)
- Description: Register a new user account.
- Request Body: 

                       "name":"",
                       "number":"",
                        "email":"",
                        "password":""

- Response:
                        {
                        "message": "User created successfully",
                        "user": user details object,
                        "token": jwt auth token
                        }

-welcome Email: you will receive wel comme  email on registered email id after signup.




### Login
- Endpoint:  auth/login
- Description: Authenticate user and generate access token.
- Request Body:
                        {
                        "email": "",
                        "password": ""
                        }

- Response:
                        {
                        "user": user details object,
                        "token": jwt auth token
                        }

-payment Email: you will receive an email on this email id just after login. email will contain a link to make the payment.Now complete payment using razor pay test payment details provided bellow












## fullStack Project Setup

1. Clone the fullstack folder of this repository


2. Install dependencies: npm install

2.a go to client folder by :cd client =>> then run npm i

2.a go to server folder by :cd server  =>> then run npm i

3. Create a `.env` file based on the provided `env.example` under SERVER file and update the necessary environment variables.

4. Start the server with : npm start  or npm run dev

5. Start the client with : npm start  or npm run dev


##  Testing task Information for project


now your front end should be running on http://localhost:5173


1. hit this url ( http://localhost:5173/ ) in browser, you will see a signup page =>> do signup with credential. you will receive a welcome email.

2.Now (you will be automatically redirect to login page after signup) or hit this url ( http://localhost:5173/login ) in browser, you will see a login page =>> do login with credential. you will automatically receive an email containing payment link.

3. Now do checkout the payment link which received on email, you will be there on product page now complete payment using razor pay test payment details provided bellow











-To test payment  integration use these test credentials details:

## Razorpay Test Card and UPI Information

### Test Card Details
- Card Number: 4111 1111 1111 1111
- Expiry Date: Any future date
- CVV: Any 3-digit number
- Cardholder Name: Any name

### Test UPI Details
- UPI ID: success@razorpay (for success)
- UPI ID: failure@razorpay (for failed)
<!-- - PIN: Any 4-digit PIN -->

Use the provided test card and UPI details for testing payment integration with Razorpay.

