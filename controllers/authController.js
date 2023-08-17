// Pulled in the simulated user database
const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

//
const bcrypt = require("bcrypt");

// JWT
const jwt = require("jsonwebtoken");
// env
require("dotenv").config();
//
const fsPromises = require("fs").promises;
const path = require("path");

// handle login
const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  // chk if user and pwd exist
  if (!user || !pwd) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  // find user
  const foundUser = usersDB.users.find((person) => person.username === user);
  if (!foundUser) {
    return res.sendStatus(401); // Unautherize
  }
  // chk password

  const match = await bcrypt.compare(pwd, foundUser.password);
  console.log(match);
  if (match) {
    // get user role (value)
    const roles = Object.values(foundUser.roles);
    // create jwt (payload, secret, opts)
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );
    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    // save refresh token to DB
    // filter: create array of users with out the loggin one
    const otherUser = usersDB.users.filter((person) => {
      return person.username !== foundUser.username;
    });
    // save current user with created token
    const currentUser = { ...foundUser, refreshToken };
    usersDB.setUsers([...otherUser, currentUser]);
    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(usersDB.users)
    );

    // return res.json({ success: `User ${user} is logged in!` });
    // send the token
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken });
  } else {
    return res.status(401).json({ message: "Login failed." });
  }
};

//
module.exports = { handleLogin };
