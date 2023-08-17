// controller for emplooees API

const { setDate } = require("date-fns");

// import
const data = {
  employees: require("../model/employees.json"),
  setEmployees: function (data) {
    console.log(this);
    this.employees = data;
  },
};

// get
const getAllEmployees = (req, res) => {
  return res.json(data.employees);
};

// post
const createNewEmplyees = (req, res) => {
  const newEmployee = {
    // increase id by 1, if no employees in data, id = 1
    // id: data.employees[data.employees.length - 1].id + 1 || 1,
    // or using ternary expression
    id: data.employees?.length
      ? data.employees[data.employees.length - 1].id + 1
      : 1,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  };

  // check required data
  if (!newEmployee.firstname || !newEmployee.lastname) {
    return res
      .status(400)
      .json({ message: "First and last names are required." });
  }

  // set data
  data.setEmployees([...data.employees, newEmployee]);
  return res.status(201).json(data.employees);
};

// Update
const updateNewEmployees = (req, res) => {
  // find who to update
  const employee = data.employees.find((emp) => {
    // check id in data, return the employee that match the given id
    return emp.id === parseInt(req.body.id);
  });

  //
  if (!employee) {
    return res
      .status(400)
      .json({ message: `Employee ID ${req.body.id} not found!` });
  }

  // update if data is given
  if (req.body.firstname) {
    employee.firstname = req.body.firstname;
  }
  if (req.body.lastnamename) {
    employee.lastnamename = req.body.lastnamename;
  }

  // re-organize date with updated data
  const filteredArray = data.employees.filter((emp) => {
    // only un-updated employee will left in the filteredArray
    // i.e. take out the updated one
    return emp.id !== parseInt(req.body.id);
  });
  // concat
  const unsortedArray = [...filteredArray, employee];
  data.setEmployees(
    unsortedArray.sort((a, b) => {
      return a.id > b.id ? 1 : a.id < b.id ? -1 : 0;
    })
  );
  res.json(data.employees);
};

// Delete
const deleteEmployees = (req, res) => {
  // find who to delete
  const employee = data.employees.find((emp) => {
    // check id in data, return the employee that match the given id
    return emp.id === parseInt(req.body.id);
  });

  //
  if (!employee) {
    return res
      .status(400)
      .json({ message: `Employee ID ${req.body.id} not found!` });
  }

  // filter out the employee that wanted to delete
  const filteredArray = data.employees.filter((emp) => {
    return emp.id !== parseInt(req.body.id);
  });
  //
  data.setEmployees([...filteredArray]);
  res.json(data.employees);
};

// get employee by id
const getEmployee = (req, res) => {
  // find that employee
  const employee = data.employees.find((emp) => {
    // check id in data, return the employee that match the given id
    return emp.id === parseInt(req.params.id);
  });

  //
  if (!employee) {
    return res
      .status(400)
      .json({ message: `Employee ID ${req.params.id} not found!` });
  }

  //
  res.json(employee);
};

// export
module.exports = {
  getAllEmployees,
  createNewEmplyees,
  updateNewEmployees,
  deleteEmployees,
  getEmployee,
};
