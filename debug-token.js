// Debug script to check current user authentication state
// Run this in your browser console on any page

console.log('=== AUTH DEBUG ===');

// Check the auth token cookie
const authToken = document.cookie
  .split('; ')
  .find(row => row.startsWith('auth-token='))
  ?.split('=')[1];

console.log('1. Auth token in cookie:', authToken ? 'Found' : 'Not found');

if (authToken) {
  // Decode JWT token (just the payload, not verified)
  try {
    const base64Url = authToken.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    
    const payload = JSON.parse(jsonPayload);
    console.log('2. JWT payload:', payload);
    console.log('3. User role in token:', payload.userRole);
    console.log('4. User name:', payload.name);
    console.log('5. User email:', payload.email);
  } catch (error) {
    console.log('2. Error decoding token:', error);
  }
} else {
  console.log('2. No auth token found - user needs to log in');
}

// Check if there's any user data in localStorage or sessionStorage
console.log('6. LocalStorage keys:', Object.keys(localStorage));
console.log('7. SessionStorage keys:', Object.keys(sessionStorage));

// Check current page URL
console.log('8. Current URL:', window.location.href);

// Try to make a test API call to check auth status
fetch('/api/auth/me')
  .then(response => response.json())
  .then(data => {
    console.log('9. API /auth/me response:', data);
  })
  .catch(error => {
    console.log('9. API /auth/me error:', error);
  });
