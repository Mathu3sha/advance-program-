document.addEventListener('DOMContentLoaded', function () {
    const editForm = document.getElementById('editAppointmentForm');
    const editAppointmentId = document.getElementById('editAppointmentId');
    const editAppointmentDate = document.getElementById('editAppointmentDate');
    const editAppointmentTime = document.getElementById('editAppointmentTime');
    const editJobSeekerName = document.getElementById('editJobSeekerName');
    const editConsultantName = document.getElementById('editConsultantName');

    // Get appointment ID from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const appointmentId = urlParams.get('id');

    // Fetch appointment details and populate form fields
    fetch(`/appointments/get/${appointmentId}`)
        .then(response => response.json())
        .then(appointment => {
            editAppointmentId.value = appointment.id;
            editAppointmentDate.value = appointment.date;
            editAppointmentTime.value = appointment.time;
            editJobSeekerName.value = appointment.jobSeekerName;
            editConsultantName.value = appointment.consultantName;
        });

    editForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const updatedAppointment = {
            id: editAppointmentId.value,
            date: editAppointmentDate.value,
            time: editAppointmentTime.value,
            jobSeekerName: editJobSeekerName.value,
            consultantName: editConsultantName.value
        };

        // Send a PUT request to the backend API to update the appointment
        fetch(`/appointments/update/${appointmentId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedAppointment)
        })
            .then(response => {
                // Redirect back to the main page after updating
                window.location.href = '/';
            });
    });
});
