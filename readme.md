# Description

This is a practice of basic authorization based on users' role.

Following the tutorial: https://www.youtube.com/watch?v=f2EqECiTBL8

Following previous practice: Basic_JWT - https://github.com/ChiaWei024/Basic_JWT.git

# Content

1. User roles and permissions

   - Provide different leveks of access
   - Sent in access token payload (hide user's role in payload and sign)
   - Verified with middleware

1. Authentication v.s. Authorization

   - Authentication: Thu process of verifying who someone is.
     - Login
   - Authorization: The process of verifying what resources a user has access to.
     - JWT
       - Comfirm authentication
       - Allow access to API endpoints
       - Endpoints provide data resoureces
       - Use authorixation header

1. const authHeader = req.headers.authorization || req.headers.Authorization;

   - The authorization header might come in as lowercase or uppercase "a"

1. 再新增一些重點整理....
