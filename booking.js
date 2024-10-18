// Function to generate calendar
function generateCalendar(mentorId) {
    const mentor = mentors.find(m => m.id === parseInt(mentorId));
    if (!mentor) return;

    const calendar = document.getElementById('calendar');
    calendar.innerHTML = '';

    mentor.availability.forEach(day => {
        const dayDiv = document.createElement('div');
        dayDiv.innerHTML = `
            <h4>${day.date}</h4>
            <ul>
                ${day.slots.map(slot => `<li>${slot}</li>`).join('')}
            </ul>
        `;
        calendar.appendChild(dayDiv);
    });
}

// Function to handle mentor selection
document.getElementById('mentor-select').addEventListener('change', function(e) {
    const mentorId = e.target.value;
    generateCalendar(mentorId);
});

// Function to handle booking submission
document.getElementById('booking-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const mentorId = document.getElementById('mentor-select').value;
    const selectedDate = document.getElementById('selected-date').value;
    const selectedTimeSlot = document.getElementById('selected-time-slot').value;

    if (!mentorId || !selectedDate || !selectedTimeSlot) {
        alert('Please select a mentor, date, and time slot');
        return;
    }

    // In a real application, you would send this data to a server
    alert(`Booking confirmed with Mentor ID: ${mentorId} on ${selectedDate} at ${selectedTimeSlot}`);
});