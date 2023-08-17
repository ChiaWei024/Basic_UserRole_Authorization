// Pulled in the simulated user database
const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

//
const fsPromises = require("fs").promises;
const path = require("path");

// handle logout
const handleLogout = async (req, res) => {
  // On client, also delete the access token
  const cookies = req.cookies;
  // chk if cookie exist, and if exist, is cookie.jwt exist (chaining)
  if (!cookies?.jwt) {
    // since we're going to delete the cookies
    // thus if there no cookies, it's fine
    return res.sendStatus(204); // no content to send back
  }

  // Is refresh token in DB?
  const refreshToken = cookies.jwt;

  // find user by refresh token
  const foundUser = usersDB.users.find(
    (person) => person.refreshToken === refreshToken
  );

  if (!foundUser) {
    // clear cookies
    // Note: same options needed to be filled in
    res.clearCookie("jwt", { httpOnly: true });
    return res.sendStatus(204); // no content to send back
  }

  // Delete the refresh token
  const otherUsers = usersDB.users.filter((person) => {
    person.refreshToken !== foundUser.refreshToken;
  });
  const currentUser = { ...foundUser, refreshToken: "" };
  // update usersDB
  usersDB.setUsers([...otherUsers, currentUser]);
  // write to DB
  await fsPromises.writeFile(
    path.join(__dirname, "..", "model", "users.json"),
    JSON.stringify(usersDB.users)
  );

  // clear cookies
  res.clearCookie("jwt", { httpOnly: true });
  // In production, might add
  // secure: true (only serves on https)
  return res.sendStatus(204);
};

//
module.exports = { handleLogout };
