
const MASTER_PASSWORD = "your-master-password";

function login() {
    const password = document.getElementById('masterPassword').value;
    if (password === MASTER_PASSWORD) {
        document.querySelector('.login-screen').style.display = 'none';
        document.querySelector('.dashboard').style.display = 'block';
    } else {
        alert('Invalid Password');
    }
}

function addPatient() {
    const form = document.getElementById('patientForm');
    const tableBody = document.getElementById('patientTableBody');

    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${document.getElementById('name').value}</td>
        <td>${document.getElementById('age').value}</td>
        <td>${document.getElementById('gender').value}</td>
        <td>${document.getElementById('ward').value}</td>
        <td>${document.getElementById('bed').value}</td>
        <td>${document.getElementById('admissionDate').value}</td>
        <td>${document.getElementById('diagnosis').value}</td>
        <td>${document.getElementById('plan').value}</td>
        <td>${document.getElementById('followUp').value}</td>
        <td>${document.getElementById('notes').value}</td>
        <td>${document.getElementById('doctor').value}</td>
    `;
    tableBody.appendChild(newRow);

    form.reset();
}
