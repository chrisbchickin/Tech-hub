//signup event handler
const signupFormHandler = async (event) => {
    event.preventDefault();
    console.log('test signup form handler');
    const username = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (username && email && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        // alert(response.statusText);
        const errorData = await response.json();
        alert(errorData.message);
      }
    }
  };
console.log('test signup.js');
document
.querySelector('#signup')
.addEventListener('submit', signupFormHandler);