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

// bcrypt - has and salt the password
const bcrypt = require("bcrypt");

// handle newUser
const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  // chk if user and pwd exist
  if (!user || !pwd) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  // chk for duplicate user
  const duplicate = usersDB.users.find((person) => {
    // username of person === submitted user
    return person.username === user;
  });
  if (duplicate) {
    return res.status(409).json({ message: `Username ${user} already exist.` }); // conflict
  }

  //
  try {
    // encrypt the pwd
    const salt = 10;
    const hashedPwd = await bcrypt.hash(pwd, salt);
    // Store new user
    const newUser = {
      username: user,
      role: { user: 2001 },
      password: hashedPwd,
    };
    // concat array
    usersDB.setUsers([...usersDB.users, newUser]);
    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(usersDB.users)
    );
    console.log(usersDB.users);
    return res.status(201).json({ success: `New user ${user} created.` });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// export
module.exports = { handleNewUser };
