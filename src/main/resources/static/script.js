document.addEventListener('DOMContentLoaded', function () {
    const createForm = document.getElementById('createAppointmentForm');
    const appointmentsList = document.getElementById('appointmentsList');

    createForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const appointmentDate = document.getElementById('appointmentDate').value;
        const appointmentTime = document.getElementById('appointmentTime').value;
        const jobSeekerName = document.getElementById('jobSeekerName').value;
        const consultantName = document.getElementById('consultantName').value;

        const newAppointment = {
            date: appointmentDate,
            time: appointmentTime,
            jobSeekerName: jobSeekerName,
            consultantName: consultantName
        };

        fetch('/appointments/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newAppointment)
        })
            .then(response => response.json())
            .then(data => {
                // Clear form fields
                document.getElementById('appointmentDate').value = '';
                document.getElementById('appointmentTime').value = '';
                document.getElementById('jobSeekerName').value = '';
                document.getElementById('consultantName').value = '';

                // Refresh the list of appointments
                fetchAppointments();
            });
    });

    // ... Rest of your code ...

    function fetchAppointments() {
        fetch('/appointments/getall')
            .then(response => response.json())
            .then(data => {
                appointmentsList.innerHTML = '';

                const table = document.createElement('table');
                table.innerHTML = `
                <tr>
                    <th>Date &emsp;</th>
                    <th>&emsp;Time &emsp;</th>
                    <th>&emsp;Job Seeker Name</th>
                    <th>&emsp;Consultant Name</th>
                    <th>&emsp;Actions</th>
                </tr>
            `;

                data.forEach(appointment => {
                    const row = document.createElement('tr');
                    const formattedDate = new Date(appointment.date).toLocaleDateString('en-US');
                    const time = appointment.time;
                    row.innerHTML = `
                    <td>${formattedDate}</td>
                    <td>&emsp;${time}</td>
                    <td>&emsp;&emsp;&emsp;${appointment.jobSeekerName}</td>
                    <td>&emsp;&emsp;&emsp;${appointment.consultantName}</td>
                    <td>&emsp;
                        <button class="edit-btn" data-id="${appointment.id}">Edit</button>
                        <button class="delete-btn" data-id="${appointment.id}">Delete</button>
                    </td>
                `;
                    table.appendChild(row);
                });

                appointmentsList.appendChild(table);

                const editButtons = document.querySelectorAll('.edit-btn');
                const deleteButtons = document.querySelectorAll('.delete-btn');

                editButtons.forEach(button => {
                    button.addEventListener('click', handleEdit);
                });

                deleteButtons.forEach(button => {
                    button.addEventListener('click', handleDelete);
                });
            });
    }

    function handleEdit(event) {
        const appointmentId = event.target.getAttribute('data-id');
        window.location.href = `/edit-appointment?id=${appointmentId}`;
    }


    function handleDelete(event) {
        const appointmentId = event.target.getAttribute('data-id');
        // Send a DELETE request to the backend API
        fetch(`/appointments/delete/${appointmentId}`, {
            method: 'DELETE'
        })
            .then(response => {
                // Refresh the list of appointments
                fetchAppointments();
            });
    }

    fetchAppointments();

});
