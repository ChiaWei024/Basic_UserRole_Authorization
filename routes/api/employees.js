// sub directory

const express = require("express");
const router = express();
// const path = require("path");
const ROLES_LIST = require("../../config/role_list");
const verifyRoles = require("../../middleware/verifyRoles");

// import controller
const empolyeesControllers = require("../../controllers/employeesController");

// Routing
// chain different http method

// upon this point, user has the access token that contain user's role
router
  .route("/")
  // single route protection
  // .get(verifyJWT, empolyeesControllers.getAllEmployees)
  .get(empolyeesControllers.getAllEmployees)
  // only Admin/Editor can enter post
  .post(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    empolyeesControllers.createNewEmplyees
  )
  .put(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    empolyeesControllers.updateNewEmployees
  )
  // only Admin can enter post
  .delete(verifyRoles(ROLES_LIST.Admin), empolyeesControllers.deleteEmployees);

// other router
router.route("/:id").get(empolyeesControllers.getEmployee);

// export
module.exports = router;
