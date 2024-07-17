const select = document.querySelector('select');

const errorDiv = document.querySelector('#message');

const input = document.querySelector('input');

const ul = document.querySelector('ul');

let option = document.createElement('option');

option.text = 'All';

option.value = '';

select.appendChild(option);

fetch('http://localhost:8080/departments', {
    method: "GET"
})
    .then(response => response.json())
    .then(departments => {
        departments.forEach(department => {
            let option = document.createElement('option');

            option.text = department;

            option.value = department;

            select.appendChild(option);
        });
    });

fetch('http://localhost:8080/employees', {
    method: "GET"
})
    .then(response => response.json())
    .then(employees => {
        employees.forEach(employee => {
            let li = document.createElement('li');

            li.innerHTML = `
                <div>Name: ${employee.name}</div>
                <div>Department: ${employee.department}</div>
                <div>Position: ${employee.position}</div>
            `;

            ul.appendChild(li);
        });
    });

function getEmployees() {
    let search = input.value;

    let filter = select.value;

    fetch(`http://localhost:8080/employees/?search=${search}&department=${filter}`, {
        method: "GET"
    })
        .then(response => {
            if (response.status == 400) {
                errorDiv.innerText = 'Name can contain only letters!';

                return;
            }

            errorDiv.innerText = '';

            return response.json()
        })
        .then(employees => {
            ul.innerHTML = "";

            employees.forEach(employee => {
                let li = document.createElement('li');
    
                li.innerHTML = `
                    <div>Name: ${employee.name}</div>
                    <div>Department: ${employee.department}</div>
                    <div>Position: ${employee.position}</div>
                `;
    
                ul.appendChild(li);
            })
        });
}

input.addEventListener('keyup', getEmployees);

select.addEventListener('change', getEmployees);