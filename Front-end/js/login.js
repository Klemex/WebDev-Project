import { supabase } from './dBConnection.js';

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const inputs = document.querySelectorAll('.input-group input');

    // Function to show error
    function showError(inputId, message) {
        const inputGroup = document.getElementById(inputId).closest('.input-group');
        const errorSpan = document.getElementById(`${inputId}Error`);
        
        inputGroup.classList.add('error');
        errorSpan.textContent = message;
        errorSpan.style.display = 'block';
    }

    // Function to clear error
    function clearError(inputId) {
        const inputGroup = document.getElementById(inputId).closest('.input-group');
        const errorSpan = document.getElementById(`${inputId}Error`);
        
        inputGroup.classList.remove('error');
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

    // Real-time validation
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            validateField(input);
        });

        input.addEventListener('blur', () => {
            validateField(input);
        });
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

        // Validate all fields
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });

        if (!isValid) return;

        const loginInput = document.getElementById('loginInput').value.trim();
        const passwordInput = document.getElementById('password').value;

        try {
            // Fetch user by username, email, or phone
            const { data, error } = await supabase
                .from('users')
                .select('id, username, email, password, phone')
                .or(`username.eq.${loginInput},email.eq.${loginInput},phone.eq.${loginInput}`)
                .single();

            if (error || !data) {
                console.error('Error fetching user:', error ? error.message : 'User not found');
                alert('Invalid username or password');
                return;
            }

            // Verify password
            if (data.password !== passwordInput) {
                alert('Invalid username or password');
                return;
            }

            // Store user info in session storage
            sessionStorage.setItem('user', JSON.stringify({
                id: data.id,
                email: data.email,
                username: data.username,
                phone: data.phone
            }));

            // Show success message and redirect
            alert('Login successful!');
            window.location.href = 'index.html';

        } catch (err) {
            console.error('Login error:', err);
            alert('Login failed. Please try again.');
        }
    });
});
