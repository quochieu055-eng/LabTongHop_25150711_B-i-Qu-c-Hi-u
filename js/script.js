document.addEventListener('DOMContentLoaded', () => {
    // PHẦN 3: JAVASCRIPT CƠ BẢN
 

    // 1. Array of Objects (Static Skill Data)
    const skillsData = [
        { id: 1, name: 'HTML5 & CSS3', level: 'Thành thạo', status: 'Hoàn thành' },
        { id: 2, name: 'SCSS / SASS', level: 'Khá', status: 'Hoàn thành' },
        { id: 3, name: 'JavaScript (ES6+)', level: 'Thành thạo', status: 'Đang nâng cao' },
        { id: 4, name: 'Fetch API & LocalStorage', level: 'Khá', status: 'Hoàn thành' },
        { id: 5, name: 'Git & GitHub', level: 'Cơ bản', status: 'Hoàn thành' }
    ];

    // 2. Render Skill Table using DOM manipulation (Arrow Function)
    const renderSkillsTable = (skills) => {
        const tbody = document.getElementById('skills-tbody');
        if (!tbody) return;

        tbody.innerHTML = ''; // Clear hardcoded content

        // Map array into DOM table rows
        const rowsHTML = skills.map((skill, index) => `
            <tr>
                <td>${index + 1}</td>
                <td><strong>${skill.name}</strong></td>
                <td>${skill.level}</td>
                <td>${skill.status}</td>
            </tr>
        `).join('');

        tbody.innerHTML = rowsHTML;
    };

    renderSkillsTable(skillsData);

    // 3. Form Validation with JS
    const contactForm = document.getElementById('contact-form');
    const formResponse = document.getElementById('form-response');

    // Validation rules object
    const validationRules = {
        fullname: (value) => {
            if (!value.trim()) return 'Vui lòng nhập họ và tên.';
            if (value.trim().length < 2) return 'Họ và tên phải có ít nhất 2 ký tự.';
            return '';
        },
        email: (value) => {
            if (!value.trim()) return 'Vui lòng nhập email.';
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) return 'Email không đúng định dạng.';
            return '';
        },
        phone: (value) => {
            if (!value.trim()) return 'Vui lòng nhập số điện thoại.';
            const phoneRegex = /^[0-9]{10,11}$/;
            if (!phoneRegex.test(value)) return 'Số điện thoại phải gồm 10-11 chữ số.';
            return '';
        },
        message: (value) => {
            if (!value.trim()) return 'Vui lòng nhập lời nhắn.';
            if (value.trim().length < 10) return 'Lời nhắn phải có ít nhất 10 ký tự.';
            return '';
        }
    };

    // Helper to validate a single field
    const validateField = (fieldId) => {
        const input = document.getElementById(fieldId);
        const errorElement = document.getElementById(`error-${fieldId}`);
        if (!input || !errorElement) return true;

        const errorMessage = validationRules[fieldId](input.value);
        errorElement.textContent = errorMessage;

        if (errorMessage) {
            input.classList.add('error');
            return false;
        } else {
            input.classList.remove('error');
            return true;
        }
    };

    // Real-time validation listeners
    ['fullname', 'email', 'phone', 'message'].forEach((fieldId) => {
        const input = document.getElementById(fieldId);
        if (input) {
            input.addEventListener('input', () => validateField(fieldId));
        }
    });

    // Form Submit Event Handler
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Validate all fields
        const isValidName = validateField('fullname');
        const isValidEmail = validateField('email');
        const isValidPhone = validateField('phone');
        const isValidMessage = validateField('message');

        if (isValidName && isValidEmail && isValidPhone && isValidMessage) {
            formResponse.textContent = 'Gửi thông tin liên hệ thành công! Cảm ơn bạn.';
            contactForm.reset();
            // Clear inline error styles
            ['fullname', 'email', 'phone', 'message'].forEach((id) => {
                document.getElementById(id).classList.remove('error');
            });
        } else {
            formResponse.textContent = '';
        }
    });

    // PHẦN 4: JAVASCRIPT NÂNG CAO & FETCH API
    
    // 1. Fetch API to load Projects from js/data.json
    const loadProjects = async () => {
        const projectsContainer = document.getElementById('projects-grid');
        const errorContainer = document.getElementById('projects-error');

        try {
            const response = await fetch('js/data.json');
            
            if (!response.ok) {
                throw new Error(`HTTP Error! Status: ${response.status}`);
            }

            const projects = await response.json();

            // Render projects using DOM
            projectsContainer.innerHTML = '';
            projects.forEach((proj) => {
                const card = document.createElement('div');
                card.className = 'project-card';
                card.innerHTML = `
                    <h3>${proj.ten}</h3>
                    <p><strong>Công nghệ:</strong> ${proj.congNghe}</p>
                    <p><strong>Năm hoàn thành:</strong> ${proj.namHoanThanh}</p>
                `;
                projectsContainer.appendChild(card);
            });
        } catch (error) {
            console.error('Lỗi khi tải dữ liệu dự án:', error);
            if (errorContainer) {
                errorContainer.style.display = 'block';
            }
        }
    };

    loadProjects();

    // 2. LocalStorage - Dark / Light Mode Toggle
    const themeToggleBtn = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('portfolio_theme');

    // Restore saved state from LocalStorage on load
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggleBtn.textContent = '☀️ Light Mode';
    }

    // Toggle event
    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');

        if (isDarkMode) {
            localStorage.setItem('portfolio_theme', 'dark');
            themeToggleBtn.textContent = '☀️ Light Mode';
        } else {
            localStorage.setItem('portfolio_theme', 'light');
            themeToggleBtn.textContent = '🌙 Dark Mode';
        }
    });
});