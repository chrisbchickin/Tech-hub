const createPostFormHandler = async (event) => {
    event.preventDefault();
    const title = document
    .querySelector('#post-title')
    .value
    .trim();

    const post_text = document
    .querySelector('#post-text')
    .value
    .trim();
        
    if (title && post_text) {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({ title, post_text }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
            alert('beautiful post!');
        } else {
            alert('Failed to post!');
        }
    }
}

const updatePostHandler = async (event) => {
    event.preventDefault();
    const title = document
    .querySelector('#edit-post-title')
    .value
    .trim();

    const post_text = document
    .querySelector('#edit-post-text')
    .value
    .trim();

    const post_id = document
    .querySelector('#single-post')
    .getAttribute('data-postId');
    console.log('something');
    if (title && post_text) {
        const response = await fetch('/api/posts/' + post_id, {
            method: 'PUT',
            body: JSON.stringify({ title, post_text }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
            alert('beautiful post!');
        } else {
            alert('Failed to post!');
        }
    }
}

const delButtonHandler = async (event) => {
    event.preventDefault();
    console.log('hello');
    const post_id = document
    .querySelector('#single-post')
    .getAttribute('data-postId');
      const response = await fetch(`/api/posts/${post_id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
        alert('post deleted!')
      } else {
        alert('Failed to delete post!');
      }
    };

document
    .querySelector('.post-form')
    .addEventListener('submit', createPostFormHandler);

document
    .querySelector('#edit-post')
    .addEventListener('submit', updatePostHandler);

document
    .querySelector('#delete-post')
    .addEventListener('click', delButtonHandler);