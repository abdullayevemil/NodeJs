const select = document.querySelector('select');

const ul = document.querySelector('ul');

let option = document.createElement('option');

option.text = 'All';

option.value = 'All';

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

            li.innerHTML = `<li>
                <div>Name: ${employee.name}</div>
                <div>Department: ${employee.department}</div>
                <div>Position: ${employee.position}</div>
            </li>`;

            ul.appendChild(li);
        });
    });