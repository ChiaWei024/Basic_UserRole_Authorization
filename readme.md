# Description

This practice establish a authorization based on users' role.

Following the tutorial: https://www.youtube.com/watch?v=f2EqECiTBL8

Following previous practice: Basic_JWT - https://github.com/ChiaWei024/Basic_JWT.git

# Content

1. User roles and permissions

   - Provide different levels of access
   - Sent in access token payload (hide user's role in payload and signed)
   - Verified with middleware

1. Authentication v.s. Authorization

   - Authentication: The process of verifying who someone is.
     - e.g. login
   - Authorization: The process of verifying what resources a user has access to.
     - JWT
       - Comfirm authentication
       - Allow access to API endpoints
       - Endpoints provide data resoureces
       - Use authorization header (for JWT which contains -> bearer JWT)

1. const authHeader = req.headers.authorization || req.headers.Authorization;

   - The authorization header might come in as lowercase or uppercase "a"

1. What is a autherization header?
   - MDN web doc: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization
   - The HTTP Authorization request header can be used to provide credentials that authenticate a user agent with a server, allowing access to a protected resource.
