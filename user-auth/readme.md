# User authentication in Web Apps (Passport.js, Node, Express)

## User Authentication Choices

- Sessions
- JSON Web Tokens
- OAuth:
    - In-House
    - SaaS
- Other/Ad-Hoc

## What is Passport JS?

- Welcome to Express middlewares!
    - On each HTTP request, Passport will use a "Strategy" to determine whether the requestor has permission to view that resource
    - If the user does not have permission, a 401 *Unauthorized* Error is thrown

- Passport Strategies??
    - Each strategy uses the Passport JS framework as a template
    - The Passport Local Strategy utilizes Cookies, Express Sessions, and some authentication logic

## Intro to HTTP headers and Cookies

[HTTP headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers), metadata of our HTTP request
- General: Request and response side of things

- Response Headers: 
    - set-cookie, request to set a cookie(information that have a expire date and live on the browser)

- Request Headers: The kind of data that we can accept
    - cookie: cookies set

# Links

- [Video](https://www.youtube.com/watch?v=F-sFp_AvHc8)
- [Passport](https://www.passportjs.org/)
