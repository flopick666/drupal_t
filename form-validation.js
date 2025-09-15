/**
 * Form Validation Script
 * Handles real-time validation for sign-up form with required fields
 */
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signupForm');
    const requiredFields = form.querySelectorAll('input[required], select[required]');

    requiredFields.forEach(field => {
        field.addEventListener('blur', validateField);
        field.addEventListener('input', clearErrorState);
        
        if (field.tagName === 'SELECT') {
            field.addEventListener('change', function() {
                this.classList.add('user-interacted');
            });
        }
    });

    /**
     * Main form submit handler with validation
     */
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        const errors = [];

        requiredFields.forEach(field => {
            if (!validateField({ target: field })) {
                isValid = false;
                errors.push(getFieldLabel(field));
            }
        });

        if (isValid) {
            console.log('Form is valid and ready to submit');
            showSuccessMessage();
        } else {
            console.log('Form validation failed for fields:', errors);
            showErrorSummary(errors);
        }
    });

    /**
     * Validates individual form field based on type and requirements
     */
    function validateField(event) {
        const field = event.target;
        const value = field.value.trim();
        let isValid = true;
        
        clearErrorState({ target: field });

        if (field.hasAttribute('required') && !value) {
            showFieldError(field, 'This field is required');
            isValid = false;
        }
        
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

        if (isValid && value) {
            field.classList.add('correct');
            field.classList.remove('error');
        }

        return isValid;
    }

    function clearErrorState(event) {
        const field = event.target;
        field.classList.remove('error', 'correct');
        
        const errorMsg = field.parentNode.querySelector('.error-message');
        if (errorMsg) {
            errorMsg.remove();
        }
    }

    function showFieldError(field, message) {
        field.classList.add('error');
        field.classList.remove('correct');
        
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
    }

    function getFieldLabel(field) {
        const label = field.parentNode.querySelector('label');
        return label ? label.textContent.replace(' *', '') : field.name;
    }

    /**
     * Email format validation using regex
     */
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Phone number format validation
     */
    function isValidPhone(phone) {
        const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    }

    /**
     * Display success message after valid form submission
     */
    function showSuccessMessage() {
        const existingMsg = document.querySelector('.form-message');
        if (existingMsg) existingMsg.remove();

        const successDiv = document.createElement('div');
        successDiv.className = 'form-message success-message';
        successDiv.innerHTML = '✓ Form submitted successfully!';
        form.insertBefore(successDiv, form.firstChild);

        setTimeout(() => {
            if (successDiv.parentNode) {
                successDiv.remove();
            }
        }, 5000);
    }

    /**
     * Display error summary for failed validation
     */
    function showErrorSummary(errors) {
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