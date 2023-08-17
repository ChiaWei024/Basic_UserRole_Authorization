//
const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    // if req not exist or req.roles not exist
    if (!req?.roles) {
      return res.sendStatus(401); // unauthorized
    }

    //
    const rolesArray = [...allowedRoles];
    console.log(rolesArray); // the allowed roles (based on which route is visting?)
    console.log(req.roles); // from verified jwt

    // is the authenticated user has the role to enter the route
    // result is a true/false array
    const result = req.roles
      .map((role) => {
        return rolesArray.includes(role); // is allowed roles include user's roles, return true if there are
      })
      .find((value) => {
        // chain find, since we only need one true to enter the route
        return value === true;
      });

    // if no result (all false) -> unauthorized
    if (!result) {
      return res.sendStatus(401);
    }

    // if one true, then the user can enter the route
    next();
  };
};

//
module.exports = verifyRoles;
