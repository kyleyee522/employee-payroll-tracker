// Get a reference to the #add-employees-btn element
const addEmployeesBtn = document.querySelector('#add-employees-btn');
// employeesArray is in global scope so that when the collectEmployees function is called again, it will not reset
let employeesArray = [];
// Collect employee data
const collectEmployees = function () {
	// Get user input to create and return an array of employee objects

	let repeatPrompt = true;
	while (repeatPrompt) {
		// Cannot have employee object in global scope because it will keep overriding past entries if I do not keep a number tracker as the key
		// Doing it this way rids of the need of the number tracker as it always updates the employees array while still keeping track of the index
		let employeeTest = {};

		// Obtain user input and check if it is valid
		let firstName = prompt('Please enter your first name.');
		if (firstName === null) {
			return;
		}
		while (firstName === '') {
			firstName = prompt('Invalid first name. Please try again.');
		}

		let lastName = prompt('Please enter your last name.');
		if (lastName === null) {
			return;
		}
		while (lastName === '') {
			lastName = prompt('Invalid last name. Please try again.');
		}

		let salary = parseInt(prompt('Please enter your salary.'));
		if (salary === null) {
			return;
		}
		while (salary === 0 || isNaN(salary)) {
			salary = parseInt(prompt('Invalid salary. Please try again.'));
		}

		employeeTest['firstName'] = firstName;
		employeeTest['lastName'] = lastName;
		employeeTest['salary'] = salary;

		employeesArray.push(employeeTest);

		repeatPrompt = confirm('Do you want to add another employee?');
	}

	return employeesArray;
	// console.log(employeeMess);
};

// Display the average salary
const displayAverageSalary = function (employeesArray) {
	// Calculate and display the average salary
	let averageSalary = 0;
	for (i = 0; i < employeesArray.length; i++) {
		averageSalary += employeesArray[i].salary;
	}
	averageSalary = averageSalary / employeesArray.length;
	console.log(
		`The average employee salary between our ${employeesArray.length} employee(s) is ${averageSalary}`
	);
};

// Select a random employee
const getRandomEmployee = function (employeesArray) {
	// Select and display a random employee
	let firstName;
	let lastName;
	let randomNumber = Math.floor(Math.random() * employeesArray.length);
	firstName = employeesArray[randomNumber].firstName;
	lastName = employeesArray[randomNumber].lastName;

	console.log(
		`Congratulations to ${firstName} ${lastName}, our random drawing winner!`
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
	const employeeTable = document.querySelector('#employee-table');

	// Clear the employee table
	employeeTable.innerHTML = '';

	// Loop through the employee data and create a row for each employee
	for (let i = 0; i < employeesArray.length; i++) {
		const currentEmployee = employeesArray[i];

		const newTableRow = document.createElement('tr');

		const firstNameCell = document.createElement('td');
		firstNameCell.textContent = currentEmployee.firstName;
		newTableRow.append(firstNameCell);

		const lastNameCell = document.createElement('td');
		lastNameCell.textContent = currentEmployee.lastName;
		newTableRow.append(lastNameCell);

		const salaryCell = document.createElement('td');

		// Format the salary as currency
		salaryCell.textContent = currentEmployee.salary.toLocaleString('en-US', {
			style: 'currency',
			currency: 'USD',
		});

		newTableRow.append(salaryCell);

		employeeTable.append(newTableRow);
	}
};

const trackEmployeeData = function () {
	const employees = collectEmployees();

	console.table(employees);

	displayAverageSalary(employees);

	console.log('==============================');

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
addEmployeesBtn.addEventListener('click', trackEmployeeData);
