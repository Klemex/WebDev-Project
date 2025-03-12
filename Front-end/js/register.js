import { createUser } from './dBConnection.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log('Registration page loaded');
    
    const registerForm = document.getElementById('registerForm');
    const registerBtn = document.getElementById('registerBtn');

    // Input fields
    const username = document.getElementById('username');
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const phone = document.getElementById('phone');
    const address = document.getElementById('address');

    const validateForm = () => {
        let isValid = true;

        // [Validation code here]

        return isValid;
    };

    const validateUsername = () => {
        // Implementation of validateUsername
        return true; // Placeholder return, actual implementation needed
    };

    const validateName = (element, fieldName) => {
        // Implementation of validateName
        return true; // Placeholder return, actual implementation needed
    };

    const validatePassword = () => {
        // Implementation of validatePassword
        return true; // Placeholder return, actual implementation needed
    };

    const validateConfirmPassword = () => {
        // Implementation of validateConfirmPassword
        return true; // Placeholder return, actual implementation needed
    };

    const validatePhone = () => {
        // Implementation of validatePhone
        return true; // Placeholder return, actual implementation needed
    };

    const validateAddress = () => {
        // Implementation of validateAddress
        return true; // Placeholder return, actual implementation needed
    };

    // Form submission
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log('Form submission started');

        // Validate all fields
        const isValid = 
            validateUsername() &&
            validateName(firstName, 'First name') &&
            validateName(lastName, 'Last name') &&
            validatePassword() &&
            validateConfirmPassword() &&
            validatePhone() &&
            validateAddress();

        if (!isValid) {
            console.log('Form validation failed');
            return;
        }

        registerBtn.disabled = true;
        registerBtn.textContent = 'Processing...';

        try {
            console.log('Attempting to create user in database...');
            
            const userData = {
                username: username.value.trim(),
                f_name: firstName.value.trim(),
                l_name: lastName.value.trim(),
                password: password.value,
                number: phone.value.trim(),
                address: address.value.trim(),
                email: username.value.trim() + '@example.com',
            };

            console.log('User data to be sent:', userData);

            const createdUser = await createUser(userData);
            console.log('User created successfully:', createdUser);

            // Create success notification
            const notification = document.createElement('div');
            notification.className = 'notification success';
            notification.innerHTML = `
                <i class="fas fa-check-circle"></i>
                Registration successful! Redirecting to login...
            `;
            document.body.appendChild(notification);

            // Redirect after showing success message
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
            
        } catch (error) {
            console.error('Registration error:', error);
            
            // Create error notification
            const notification = document.createElement('div');
            notification.className = 'notification error';

            if (error.message.includes('duplicate key')) {
                notification.innerHTML = `
                    <i class="fas fa-exclamation-circle"></i>
                    Username already exists
                `;
                showError(username, 'Username already exists');
            } else {
                notification.innerHTML = `
                    <i class="fas fa-exclamation-circle"></i>
                    Registration failed: ${error.message}
                `;
            }
            document.body.appendChild(notification);
            
        } finally {
            registerBtn.disabled = false;
            registerBtn.textContent = 'Register';
            
            // Remove notification after 5 seconds
            setTimeout(() => {
                const notifications = document.querySelectorAll('.notification');
                notifications.forEach(notif => {
                    notif.remove();
                });
            }, 5000);
        }
    });
});
