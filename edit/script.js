// Mock data for the dashboard
const mockData = {
    userChartData: [
        { month: "Jan", users: 45 },
        { month: "Feb", users: 52 },
        { month: "Mar", users: 38 },
        { month: "April", users: 42 },
        { month: "May", users: 68 },
        { month: "June", users: 35 },
        { month: "July", users: 40 },
        { month: "Aug", users: 58 }
    ],
    referralData: [
        { id: "01", referrer: "John", referral: "10", commission: "5000" },
        { id: "02", referrer: "John", referral: "10", commission: "5000" },
        { id: "03", referrer: "John", referral: "10", commission: "5000" }
    ],
    coursesData: [
        {
            id: "01",
            name: "React Chapter-1",
            instructor: "English",
            date: "12 May 2024",
            status: "In Progress"
        },
        {
            id: "02",
            name: "Complete Problem Set #5",
            instructor: "Maths",
            date: "12 May 2024",
            status: "Not Started"
        }
    ],
    usersData: [
        {
            id: "01",
            name: "React Chapter-1",
            email: "English",
            role: "12 May 2024",
            status: "In Progress"
        },
        {
            id: "02",
            name: "Complete Problem Set #5",
            email: "Maths",
            role: "12 May 2024",
            status: "Not Started"
        },
        {
            id: "03",
            name: "Write Lab Report on Acid-Base Titration",
            email: "Physics",
            role: "12 May 2024",
            status: "In Progress"
        },
        {
            id: "04",
            name: "Prepare for Oral Presentation",
            email: "Chemistry",
            role: "12 May 2024",
            status: "In Progress"
        },
        {
            id: "05",
            name: "Create Art Piece for Final Project",
            email: "English",
            role: "12 May 2024",
            status: "Completed"
        },
        {
            id: "06",
            name: "Submit Final Design for Architecture Project",
            email: "Architecture",
            role: "12 May 2024",
            status: "In Progress"
        }
    ],
    manageUsersData: [
        { id: "01", name: "John", date: "12 May 2024" },
        { id: "02", name: "John", date: "12 May 2024" },
        { id: "03", name: "John", date: "12 May 2024" }
    ],
    emailsData: [
        {
            id: 1,
            name: "Jane Cooper",
            role: "Developer, 04:32 pm",
            avatar: "*"
        },
        {
            id: 2,
            name: "Kristin Watson",
            role: "Manager, 04:32 pm",
            avatar: "*"
        },
        {
            id: 3,
            name: "Jenny Wilson",
            role: "Designer, 04:32 pm",
            avatar: "*"
        },
        {
            id: 4,
            name: "Brooklyn Sim",
            role: "Developer, 04:32 pm",
            avatar: "*"
        },
        {
            id: 5,
            name: "Darrell Steward",
            role: "Can we visit at 4 week",
            avatar: "*"
        }
    ],
    scheduleData: [
        { id: 1, subject: "English", time: "9:00 AM" },
        { id: 2, subject: "math", time: "10:30 AM" },
        { id: 3, subject: "Science", time: "1:00 PM" },
        { id: 4, subject: "Social", time: "2:30 PM" },
        { id: 5, subject: "CS", time: "4:00 PM" }
    ]
};

document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
    populateTables();
    generateCalendar();
    populateEmailsList();
    populateSchedule();
    setupEventListeners();
});

function initializeCharts() {
    // User Chart
    const userCtx = document.getElementById('userChart').getContext('2d');
    new Chart(userCtx, {
        type: 'bar',
        data: {
            labels: mockData.userChartData.map(item => item.month),
            datasets: [{
                data: mockData.userChartData.map(item => item.users),
                backgroundColor: '#3B82F6',
                borderRadius: 4,
                maxBarThickness: 20
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#6B7280',
                        font: {
                            size: 12
                        }
                    }
                },
                y: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#6B7280',
                        font: {
                            size: 12
                        }
                    }
                }
            }
        }
    });

    // Progress Chart (Doughnut)
    const progressCtx = document.getElementById('progressChart').getContext('2d');
    new Chart(progressCtx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [80, 20],
                backgroundColor: ['#8B5CF6', '#FDE68A'],
                borderWidth: 0,
                cutout: '70%'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            }
        },
        plugins: [{
            beforeDraw: function(chart) {
                const width = chart.width;
                const height = chart.height;
                const ctx = chart.ctx;
                
                ctx.restore();
                const fontSize = (height / 114).toFixed(2);
                ctx.font = `bold ${fontSize}em sans-serif`;
                ctx.textBaseline = "middle";
                ctx.fillStyle = "#111827";
                
                const text = "80%";
                const textX = Math.round((width - ctx.measureText(text).width) / 2);
                const textY = height / 2;
                
                ctx.fillText(text, textX, textY);
                ctx.save();
            }
        }]
    });
}

// Populate tables with data
function populateTables() {
    // Referral Table
    const referralTableBody = document.querySelector('#referralTable tbody');
    referralTableBody.innerHTML = mockData.referralData.map(item => `
        <tr>
            <td>${item.id}</td>
            <td>${item.referrer}</td>
            <td>${item.referral}</td>
            <td>${item.commission}</td>
        </tr>
    `).join('');

    // Courses Table
    const coursesTableBody = document.querySelector('#coursesTable tbody');
    coursesTableBody.innerHTML = mockData.coursesData.map(course => `
        <tr>
            <td>${course.id}</td>
            <td>${course.name}</td>
            <td>${course.instructor}</td>
            <td>${course.date}</td>
            <td><span class="status-badge ${getStatusClass(course.status)}">${course.status}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn edit"><i class="fas fa-edit"></i></button>
                    <button class="action-btn delete"><i class="fas fa-trash"></i></button>
                    <button class="action-btn view"><i class="fas fa-user"></i></button>
                </div>
            </td>
        </tr>
    `).join('');

    // Users Table
    const usersTableBody = document.querySelector('#usersTable tbody');
    usersTableBody.innerHTML = mockData.usersData.map(user => `
        <tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td><span class="status-badge ${getStatusClass(user.status)}">${user.status}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn edit"><i class="fas fa-edit"></i></button>
                    <button class="action-btn delete"><i class="fas fa-trash"></i></button>
                </div>
            </td>
        </tr>
    `).join('');

    // Manage Users Table
    const manageUsersBody = document.getElementById('manageUsersBody');
    manageUsersBody.innerHTML = mockData.manageUsersData.map(user => `
        <tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.date}</td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn edit"><i class="fas fa-edit"></i></button>
                    <button class="action-btn delete"><i class="fas fa-trash"></i></button>
                </div>
            </td>
            <td>
                <button class="action-btn view"><i class="fas fa-user"></i></button>
            </td>
        </tr>
    `).join('');
}

// Generate calendar
// Define global variables
let currentDate = new Date(2021, 8, 1); // Default to September 2021
let selectedDate = new Date(2021, 8, 19);

// Month names for display
const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

// Calendar navigation
document.addEventListener('DOMContentLoaded', function () {
    generateCalendar();

    document.getElementById('prevMonth').addEventListener('click', function () {
        currentDate.setMonth(currentDate.getMonth() - 1);
        generateCalendar();
    });

    document.getElementById('nextMonth').addEventListener('click', function () {
        currentDate.setMonth(currentDate.getMonth() + 1);
        generateCalendar();
    });

    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('calendar-day') && !e.target.classList.contains('other-month')) {
            document.querySelectorAll('.calendar-day').forEach(day => day.classList.remove('selected'));
            e.target.classList.add('selected');
            selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), parseInt(e.target.dataset.day));
        }
    });
});

function generateCalendar() {
    const calendarBody = document.getElementById('calendarBody');
    const monthYearDisplay = document.getElementById('calendarMonthYear');

    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const daysInPrevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();

    let calendarHTML = '';
    let dayCount = 1;
    let nextMonthDay = 1;

    monthYearDisplay.textContent = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;

    for (let week = 0; week < 6; week++) {
        for (let day = 0; day < 7; day++) {
            const cellIndex = week * 7 + day;

            if (cellIndex < firstDay) {
                const prevMonthDay = daysInPrevMonth - (firstDay - cellIndex - 1);
                calendarHTML += `<div class="calendar-day other-month" data-day="${prevMonthDay}">${prevMonthDay}</div>`;
            } else if (dayCount <= daysInMonth) {
                const isSelected =
                    currentDate.getFullYear() === selectedDate.getFullYear() &&
                    currentDate.getMonth() === selectedDate.getMonth() &&
                    dayCount === selectedDate.getDate();

                calendarHTML += `<div class="calendar-day ${isSelected ? 'selected' : ''}" data-day="${dayCount}">${dayCount}</div>`;
                dayCount++;
            } else {
                calendarHTML += `<div class="calendar-day other-month" data-day="${nextMonthDay}">${nextMonthDay}</div>`;
                nextMonthDay++;
            }
        }
    }

    calendarBody.innerHTML = calendarHTML;
}


// emails list
function populateEmailsList() {
    const emailsList = document.getElementById('emailsList');
    emailsList.innerHTML = mockData.emailsData
         .map(
            email => `
        <div class="email-item">
            <div class="email-avatar">
                <img src="${email.avatar}" alt="${email.name}">
            </div>
            <div class="email-info">
                <div class="email-name">${email.name}</div>
                <div class="email-role">${email.role}</div>
            </div>
        </div>
    `,
            )
         .join("");
}

// Populate schedule
function populateSchedule() {
    const scheduleList = document.getElementById('scheduleList');
    scheduleList.innerHTML = mockData.scheduleData
    .map(
        item => `
        <div class="schedule-item ${item.subject.toLowerCase()}">
            <span class="schedule-subject">${item.subject}</span>
            <span class="schedule-time">${item.time}</span>
        </div>
    `).join('');
}

function setupEventListeners() {
    // Navigation menu
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function() {
            document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });
    // Calendar days
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('calendar-day') && !e.target.classList.contains('empty')) {
            document.querySelectorAll('.calendar-day').forEach(day => day.classList.remove('selected'));
            e.target.classList.add('selected');
        }
    });

    // Search functionality
    document.querySelectorAll('.search-box input').forEach(input => {
        input.addEventListener('input', function() {
            console.log('Searching for:', this.value);
        });
    });
}

// Helper function to get status class
function getStatusClass(status) {
    switch (status) {
        case "In Progress":
            return "status-in-progress";
        case "Not Started":
            return "status-not-started";
        case "Completed":
            return "status-completed";
        default:
            return "";
    }
}
// Initialize calendar with September 2021 as default (matching reference)
document.addEventListener('DOMContentLoaded', function() {
    currentDate = new Date(2021, 8, 1); // September 2021
    selectedDate = new Date(2021, 8, 19); // September 19, 2021
});
