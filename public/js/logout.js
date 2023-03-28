const logout = async () => {
  console.log('logout listener');
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    alert('user logged out')
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
};
console.log('test logout.js')
document
  .querySelector('.logout')
  .addEventListener('click', logout);
