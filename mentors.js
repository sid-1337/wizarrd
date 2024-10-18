// Simulated mentor data (in a real application, this would be fetched from a server)
const mentors = [
    { id: 1, name: 'Dr. Amar Singh', expertise: 'Machine Learning', availability: [
        { date: '2023-10-20', slots: ['10:00', '11:00', '14:00'] },
        { date: '2023-10-21', slots: ['09:00', '13:00', '15:00'] }
    ]},
    { id: 2, name: 'Dr. Priya Sharma', expertise: 'Web Development', availability: [
        { date: '2023-10-20', slots: ['09:00', '12:00', '16:00'] },
        { date: '2023-10-21', slots: ['10:00', '14:00', '15:00'] }
    ]},
    // Add more mentors as needed
];

// Function to populate mentor list
function populateMentorList() {
    const mentorList = document.getElementById('mentor-list');
    mentorList.innerHTML = '';
    mentors.forEach(mentor => {
        const mentorDiv = document.createElement('div');
        mentorDiv.innerHTML = `
            <h3>${mentor.name}</h3>
            <p>Expertise: ${mentor.expertise}</p>
        `;
        mentorList.appendChild(mentorDiv);
    });
}

// Function to populate mentor select dropdown
function populateMentorSelect() {
    const mentorSelect = document.getElementById('mentor-select');
    mentorSelect.innerHTML = '<option value="">Select a mentor</option>';
    mentors.forEach(mentor => {
        const option = document.createElement('option');
        option.value = mentor.id;
        option.textContent = mentor.name;
        mentorSelect.appendChild(option);
    });
}

// Call these functions when the page loads
document.addEventListener('DOMContentLoaded', function() {
    populateMentorList();
    populateMentorSelect();
});