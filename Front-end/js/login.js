import { supabase } from './dBConnection.js';


document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const inputs = document.querySelectorAll('.input-group input');

    // Function to show error and highlight the input container
    function showError(inputId, message) {
        const inputGroup = document.getElementById(inputId).closest('.input-group');
        const errorSpan = document.getElementById(`${inputId}Error`);
        
        // Add error class to highlight the input container
        inputGroup.classList.add('error');
        // Display the error message
        errorSpan.textContent = message;
        errorSpan.style.display = 'block';
    }

    // Function to clear error and remove the highlight
    function clearError(inputId) {
        const inputGroup = document.getElementById(inputId).closest('.input-group');
        const errorSpan = document.getElementById(`${inputId}Error`);
        
        // Remove error class to unhighlight the input container
        inputGroup.classList.remove('error');
        // Hide the error message
        errorSpan.style.display = 'none';
    }

    // Add password toggle functionality
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');

    togglePassword.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        togglePassword.classList.toggle('fa-eye');
        togglePassword.classList.toggle('fa-eye-slash');
    });

    function validateField(input) {
        const value = input.value.trim();

        switch(input.id) {
            case 'loginInput':
                if (!value) {
                    showError('loginInput', 'Please enter your username, email, or phone number');
                    return false;
                }
                clearError('loginInput');
                break;

            case 'password':
                if (!value) {
                    showError('password', 'Please enter your password');
                    return false;
                }
                clearError('password');
                break;
        }
        return true;
    }

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        let isValid = true;

        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });

        if (!isValid) return;

        const loginInput = document.getElementById('loginInput').value.trim();
        const passwordInput = document.getElementById('password').value;

        // Check for hardcoded admin credentials first
        if (loginInput === "admin12345" && passwordInput === "12345") {
            sessionStorage.setItem('user', JSON.stringify({
                id: 1,
                username: "admin12345",
                email: "admin@example.com",
                firstName: "Admin",
                lastName: "User",
                phone: "1234567890",
                address: "Admin Address"
            }));

            alert('Login successful!');
            window.location.href = 'admin.html';
            return;
        }

        try {
            // Check if Supabase client is initialized
            if (!supabase) {
                console.error('Supabase client is not initialized');
                alert('Login failed. Please try again.');
                return;
            }

            // Query the database
            const { data, error } = await supabase
                .from('users')
                .select('*')
                .or(`email.ilike.${loginInput},username.ilike.${loginInput},phone.ilike.${loginInput}`);

            if (error) {
                console.error('Database error:', error.message);
                alert('Login failed. Please check your credentials and try again.');
                return;
            }

            if (!data || data.length === 0) {
                // Highlight both username and password fields if no user is found
                showError('loginInput', 'Invalid username or password');
                showError('password', 'Invalid username or password');
                return;
            }

            // If multiple users are found, we will just take the first match
            const user = data[0];

            // Verify password using bcrypt
            const isPasswordValid = await bcrypt.compare(passwordInput, user.password); // Compare with hashed password

            if (!isPasswordValid) {
                // Highlight both username and password fields if password is invalid
                showError('loginInput', 'Invalid username or password');
                showError('password', 'Invalid username or password');
                return;
            }

            // Store user info in session storage
            sessionStorage.setItem('user', JSON.stringify({
                id: user.id,
                username: user.username,
                email: user.email,
                firstName: user.first_name,
                lastName: user.last_name,
                phone: user.phone,
                address: user.address
            }));

            alert('Login successful!');
            window.location.href = 'index.html';

        } catch (err) {
            console.error('Login error:', err);
            alert('Login failed. Please try again.');
        }
    });
});
