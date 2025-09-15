// Form Validation Script
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signupForm');
    const requiredFields = form.querySelectorAll('input[required], select[required]');

    // Add real-time validation for each required field
    requiredFields.forEach(field => {
        field.addEventListener('blur', validateField);
        field.addEventListener('input', clearErrorState);
    });

    // Form submit validation
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        const errors = [];

        // Validate all required fields
        requiredFields.forEach(field => {
            if (!validateField({ target: field })) {
                isValid = false;
                errors.push(getFieldLabel(field));
            }
        });

        if (isValid) {
            // Form is valid - you can submit the data
            console.log('Form is valid and ready to submit');
            showSuccessMessage();
        } else {
            console.log('Form validation failed for fields:', errors);
            showErrorSummary(errors);
        }
    });

    function validateField(event) {
        const field = event.target;
        const value = field.value.trim();
        let isValid = true;
        
        // Remove existing error styling and messages
        clearErrorState({ target: field });

        // Check if required field is empty
        if (field.hasAttribute('required') && !value) {
            showFieldError(field, 'This field is required');
            isValid = false;
        }
        
        // Additional validation based on field type
        if (value) {
            switch (field.type) {
                case 'email':
                    if (!isValidEmail(value)) {
                        showFieldError(field, 'Please enter a valid email address');
                        isValid = false;
                    }
                    break;
                case 'tel':
                    if (!isValidPhone(value)) {
                        showFieldError(field, 'Please enter a valid phone number');
                        isValid = false;
                    }
                    break;
            }
        }

        // Show success state for valid fields
        if (isValid && value) {
            field.classList.add('correct');
            field.classList.remove('error');
        }

        return isValid;
    }

    function clearErrorState(event) {
        const field = event.target;
        field.classList.remove('error', 'correct');
        
        // Remove error message
        const errorMsg = field.parentNode.querySelector('.error-message');
        if (errorMsg) {
            errorMsg.remove();
        }
    }

    function showFieldError(field, message) {
        field.classList.add('error');
        field.classList.remove('correct');
        
        // Remove existing error message
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Add new error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
    }

    function getFieldLabel(field) {
        const label = field.parentNode.querySelector('label');
        return label ? label.textContent.replace(' *', '') : field.name;
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function isValidPhone(phone) {
        // Basic phone validation - adjust regex as needed
        const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    }

    function showSuccessMessage() {
        // Remove any existing messages
        const existingMsg = document.querySelector('.form-message');
        if (existingMsg) existingMsg.remove();

        const successDiv = document.createElement('div');
        successDiv.className = 'form-message success-message';
        successDiv.innerHTML = '✓ Form submitted successfully!';
        form.insertBefore(successDiv, form.firstChild);

        // Remove message after 5 seconds
        setTimeout(() => {
            if (successDiv.parentNode) {
                successDiv.remove();
            }
        }, 5000);
    }

    function showErrorSummary(errors) {
        // Remove any existing messages
        const existingMsg = document.querySelector('.form-message');
        if (existingMsg) existingMsg.remove();

        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-message error-summary';
        errorDiv.innerHTML = `
            <strong>Please fix the following errors:</strong>
            <ul>${errors.map(error => `<li>${error}</li>`).join('')}</ul>
        `;
        form.insertBefore(errorDiv, form.firstChild);
    }

    // Prevent form submission if Enter is pressed on invalid field
    form.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const activeField = document.activeElement;
            if (activeField.tagName === 'INPUT' || activeField.tagName === 'SELECT') {
                if (!validateField({ target: activeField })) {
                    e.preventDefault();
                }
            }
        }
    });
});