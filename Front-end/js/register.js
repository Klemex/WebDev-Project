import { supabase } from './dBConnection.js';

document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
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

    // Check if username exists in database
    async function checkUsernameExists(username) {
        const { data, error } = await supabase
            .from('users')
            .select('username')
            .eq('username', username)
            .single();
        
        return data !== null;
    }

    // Check if email exists in database
    async function checkEmailExists(email) {
        const { data, error } = await supabase
            .from('users')
            .select('email')
            .eq('email', email)
            .single();
        
        return data !== null;
    }

    // Real-time validation for each input
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            validateField(input);
        });

        input.addEventListener('blur', async () => {
            await validateField(input);
        });
    });

    async function validateField(input) {
        const value = input.value.trim();

        switch(input.id) {
            case 'username':
                if (value.length < 3) {
                    showError('username', 'Username must be at least 3 characters');
                    return false;
                }
                // Check if username exists in database
                if (await checkUsernameExists(value)) {
                    showError('username', 'Username already exists');
                    return false;
                }
                clearError('username');
                break;

            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    showError('email', 'Please enter a valid email address');
                    return false;
                }
                // Check if email exists in database
                if (await checkEmailExists(value)) {
                    showError('email', 'Email already exists');
                    return false;
                }
                clearError('email');
                break;

            case 'password':
                const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
                if (!passwordRegex.test(value)) {
                    showError('password', 'Password must be at least 8 characters with letters and numbers');
                    return false;
                }
                clearError('password');
                break;

            case 'confirmPassword':
                const password = document.getElementById('password').value;
                if (value !== password) {
                    showError('confirmPassword', 'Passwords do not match');
                    return false;
                }
                clearError('confirmPassword');
                break;

            case 'phone':
                const phoneRegex = /^\d{11}$/;
                if (!phoneRegex.test(value)) {
                    showError('phone', 'Phone number must be exactly 11 digits');
                    return false;
                }
                clearError('phone');
                break;

            default:
                if (!value) {
                    showError(input.id, `${input.id.charAt(0).toUpperCase() + input.id.slice(1)} is required`);
                    return false;
                }
                clearError(input.id);
        }
        return true;
    }

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        let isValid = true;

        // Validate all fields
        for (const input of inputs) {
            if (!await validateField(input)) {
                isValid = false;
            }
        }

        if (!isValid) {
            // If any field is invalid, shake the form
            const form = document.querySelector('.register-form');
            form.style.animation = 'none';
            form.offsetHeight; // Trigger reflow
            form.style.animation = 'shake 0.3s ease-in-out';
            return;
        }

        try {
            // Insert user data into Supabase
            const { data, error } = await supabase
                .from('users')
                .insert([
                    {
                        username: document.getElementById('username').value.trim(),
                        email: document.getElementById('email').value.trim(),
                        first_name: document.getElementById('firstName').value.trim(),
                        last_name: document.getElementById('lastName').value.trim(),
                        password: document.getElementById('password').value,
                        phone: document.getElementById('phone').value.trim(),
                        address: document.getElementById('address').value.trim()
                    }
                ]);

            if (error) throw error;

            alert('Registration successful!');
            window.location.href = 'pages/login.html';
        } catch (error) {
            console.error('Error:', error.message);
            alert('Registration failed: ' + error.message);
        }
    });
});
