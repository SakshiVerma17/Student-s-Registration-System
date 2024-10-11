// Function to save the students to localStorage
function saveStudentsToLocalStorage(students) {
    localStorage.setItem('students', JSON.stringify(students));
}

// Function to load the students from localStorage
function loadStudentsFromLocalStorage() {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    return students;
}

// Function to add a student to the table
function addStudentToTable(name, studentID, email, contact) {
    const tableRow = document.createElement('tr');

    const nameCell = document.createElement('td');
    nameCell.textContent = name;

    const idCell = document.createElement('td');
    idCell.textContent = studentID;

    const emailCell = document.createElement('td');
    emailCell.textContent = email;

    const contactCell = document.createElement('td');
    contactCell.textContent = contact;

    const actionsCell = document.createElement('td');
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';

    actionsCell.appendChild(editButton);
    actionsCell.appendChild(deleteButton);

    tableRow.appendChild(nameCell);
    tableRow.appendChild(idCell);
    tableRow.appendChild(emailCell);
    tableRow.appendChild(contactCell);
    tableRow.appendChild(actionsCell);

    document.querySelector('#student-list').appendChild(tableRow);

    // Delete button functionality
    deleteButton.addEventListener('click', function() {
        tableRow.remove();
        let students = loadStudentsFromLocalStorage();
        students = students.filter(student => student.studentID !== studentID);
        saveStudentsToLocalStorage(students);
    });

    // Edit button functionality
    editButton.addEventListener('click', function() {
        document.getElementById('a').value = name;
        document.getElementById('b').value = studentID;
        document.getElementById('c').value = email;
        document.getElementById('d').value = contact;
        tableRow.remove();
        let students = loadStudentsFromLocalStorage();
        students = students.filter(student => student.studentID !== studentID);
        saveStudentsToLocalStorage(students);
    });
}

// Load saved students when the page loads
window.addEventListener('DOMContentLoaded', (event) => {
    const students = loadStudentsFromLocalStorage();
    students.forEach(student => {
        addStudentToTable(student.name, student.studentID, student.email, student.contact);
    });
});

// Listen for form submission
document.getElementById('registration-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('a').value;
    const studentID = document.getElementById('b').value;
    const email = document.getElementById('c').value;
    const contact = document.getElementById('d').value;

    // Add student to table and array
    addStudentToTable(name, studentID, email, contact);

    // Save student to localStorage
    let students = loadStudentsFromLocalStorage();
    students.push({ name, studentID, email, contact });
    saveStudentsToLocalStorage(students);

    // Clear the form
    document.getElementById('registration-form').reset();
});


