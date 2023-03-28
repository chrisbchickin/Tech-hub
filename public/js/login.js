//login event handler
const loginFormHandler = async (event) => {
  event.preventDefault();
console.log('test login form handler')
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
      alert('login successful');
    } else {
      alert('Failed to log in');
      console.log(response);
    }
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

console.log('test login.js')