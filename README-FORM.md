# Form Component - Sign Up Page

## Overview
A modern, responsive sign-up form with complete validation system and custom dark theme styling based on UI design specifications.

## Files Structure

```
drupal_t/
├── form.html                    # Main form HTML structure
├── form-styles.css             # Complete styling with 5-state color scheme
├── form-validation.js          # JavaScript validation logic
└── README-FORM.md             # This documentation
```

## Features

### 🎨 **UI Design**
- **Dark Theme**: Professional dark background with custom color scheme
- **5-State Color System**: Normal, Hover, Active, Error, Success states
- **Responsive Layout**: Mobile-first design with grid system
- **Custom Components**: Styled dropdowns, checkboxes, and buttons

### 📋 **Form Structure**
- **Contact Information**: Name, Email, Phone (required fields)
- **Delivery Information**: Country dropdown, City, Zip code (required)  
- **Preferences**: 3 marketing consent checkboxes
- **Submit Button**: Animated hover effect with size scaling

### ✅ **Validation System**
- **Required Field Validation**: All asterisk (*) marked fields are mandatory
- **Real-time Validation**: Instant feedback on blur/input events
- **Email Format Check**: Proper email address validation
- **Phone Number Validation**: Basic phone format checking
- **Visual State Indicators**: Error (red) and Success (green) styling
- **Form Submit Prevention**: Blocks submission if validation fails
- **Error Messages**: Contextual error text below invalid fields

## Color Scheme

### CSS Variables (5 States)
```css
/* Normal State - Dark gray with light borders */
--color-normal-bg: #2a2d3a;
--color-normal-border: #4a5568;
--color-normal-text: #e2e8f0;

/* Hover State - Orange accent */
--color-hover-border: #ff6b47;
--color-hover-label: #ff6b47;

/* Active/Focus State - Blue accent */
--color-active-border: #4299e1;
--color-active-label: #4299e1;

/* Error State - Red for validation */
--color-error-border: #f56565;
--color-error-message: #f56565;

/* Success State - Green for valid fields */
--color-correct-border: #48bb78;
```

## Interactive Elements

### Button Animation
```css
.submit-btn:hover {
    transform: scale(1.05);    /* Size increase on hover */
    background-color: #e53e3e; /* Color change */
    box-shadow: 0 4px 20px rgba(255, 107, 71, 0.3); /* Glow effect */
}
```

### Custom Dropdown
- Removed native styling (`appearance: none`)
- Custom SVG arrow icon
- Consistent styling with text inputs
- Supports all 5 color states

### Custom Checkboxes
- Hidden native checkboxes
- Custom styled checkmarks
- Hover effects and animations
- Consistent with overall design theme

## Validation Rules

### Required Fields (marked with *)
- **Full name**: Must not be empty
- **E-mail**: Must not be empty + valid email format
- **Phone number**: Must not be empty + basic phone format
- **Country**: Must select from dropdown options
- **City**: Must not be empty  
- **Zip code**: Must not be empty

### Validation Triggers
1. **On Blur**: When user leaves a field
2. **On Input**: Clears error state when user starts typing
3. **On Submit**: Complete form validation before submission
4. **On Enter**: Prevents form submission from invalid fields

## Technical Implementation

### JavaScript Features
- **Event-driven validation**: Real-time user feedback
- **Form state management**: Tracks validation status
- **Error message handling**: Dynamic error text insertion/removal
- **Success feedback**: Visual confirmation of valid submission
- **Accessibility support**: Keyboard navigation and screen reader friendly

### CSS Architecture
- **CSS Custom Properties**: Centralized color management
- **Mobile-first approach**: Responsive breakpoints
- **Flexbox/Grid layouts**: Modern CSS layout techniques
- **Smooth transitions**: Enhanced user experience with animations

## Browser Support
- Chrome/Chromium (latest)
- Firefox (latest)  
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Usage Instructions

### Development
1. Open `form.html` in a web browser
2. All styles and scripts are linked automatically
3. Form validation works immediately without setup

### Integration
1. Copy `form.html`, `form-styles.css`, and `form-validation.js`
2. Modify form action/method for your backend
3. Customize validation rules in `form-validation.js` as needed
4. Adjust color scheme variables in `form-styles.css`

### Customization
- **Colors**: Modify CSS custom properties in `:root`
- **Validation**: Edit validation functions in JavaScript
- **Fields**: Add/remove form fields in HTML structure
- **Styling**: Extend CSS classes for new components

## Design Compliance
This form implements the exact design specifications from UI.png:
- ✅ 5-state color system (normal, hover, active, error, correct)
- ✅ Dark theme with proper contrast ratios
- ✅ Button hover animation with size scaling
- ✅ Custom dropdown styling
- ✅ Professional form layout and typography
- ✅ Comprehensive form validation system

## Future Enhancements
- Server-side integration
- Advanced phone number formatting
- Country-specific zip code validation
- Multi-language support
- Form progress indication
- File upload capabilities