// Get a reference to the #add-employees-btn element
const addEmployeesBtn = document.querySelector("#add-employees-btn");
let priorEmployees = [];

// Collect employee data
const collectEmployees = function () {
  // TODO: Get user input to create and return an array of employee objects
  // Load prior employees
  let employees = priorEmployees;
  // Collect an employee one by one if asked
  collectEmployee(employees);
  // Cache prior employees incase we press add employee button again
  priorEmployees = employees;
  return employees;
};

function collectEmployee(employeesArray) {
  addEmployee(employeesArray, promptEmployeeData());
  if (confirm("Add New Employee?")) {
    collectEmployee(employeesArray);
  }
}

function addEmployee(employeeArray, inputData) {
  if (isNaN(inputData.salary)) {
    // Not a valid salary number
    console.log("Invalid salary number " + inputData.salary);
    // Default it to 0
    inputData.salary = 0;
  } else {
    inputData.salary = parseInt(inputData.salary);
  }

  employeeArray.push(inputData);
}

function promptEmployeeData() {
  return {
    firstName: prompt("Add First Name"),
    lastName: prompt("Add Last Name"),
    salary: prompt("Add Salary"),
  };
}

// Display the average salary
const displayAverageSalary = function (employees) {
  // TODO: Calculate and display the average salary
  let salariesTotal = 0;
  for (let employee of employees) {
    // Add and Update String salary with number salary
    salariesTotal += employee.salary;
  }
  // Get the average salary
  const averageSalary = salariesTotal / employees.length;
  // Log to console the result
  console.log(
    `Average Salary between our ${
      employees.length
    } employee(s) is $${Math.floor(averageSalary)}`
  );
};

// Select a random employee
const getRandomEmployee = function (employees) {
  // TODO: Select and display a random employee
  // Generate a random number between 0 and employee count
  const randomNumber = Math.floor(Math.random() * employees.length);
  // Grab the nth employee from employees array via our randomNumber index
  const employee = employees[randomNumber];
  // Log to console result
  console.log(
    `Congrats to ${employee.firstName} ${employee.lastName}, our drawing winner!`
  );
};

/*

































  ====================
  STARTER CODE
  Do not modify any of the code below this line:
*/

// Display employee data in an HTML table
const displayEmployees = function (employeesArray) {
  // Get the employee table
  const employeeTable = document.querySelector("#employee-table");

  // Clear the employee table
  employeeTable.innerHTML = "";

  // Loop through the employee data and create a row for each employee
  for (let i = 0; i < employeesArray.length; i++) {
    const currentEmployee = employeesArray[i];

    const newTableRow = document.createElement("tr");

    const firstNameCell = document.createElement("td");
    firstNameCell.textContent = currentEmployee.firstName;
    newTableRow.append(firstNameCell);

    const lastNameCell = document.createElement("td");
    lastNameCell.textContent = currentEmployee.lastName;
    newTableRow.append(lastNameCell);

    const salaryCell = document.createElement("td");
    // Format the salary as currency
    salaryCell.textContent = currentEmployee.salary.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

    newTableRow.append(salaryCell);

    employeeTable.append(newTableRow);
  }
};

const trackEmployeeData = function () {
  const employees = collectEmployees();

  console.table(employees);

  displayAverageSalary(employees);

  console.log("==============================");

  getRandomEmployee(employees);

  employees.sort(function (a, b) {
    if (a.lastName < b.lastName) {
      return -1;
    } else {
      return 1;
    }
  });

  displayEmployees(employees);
};

// Add event listener to 'Add Employees' button
addEmployeesBtn.addEventListener("click", trackEmployeeData);
