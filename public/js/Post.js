// create post event handler
const createPostFormHandler = async (event) => {
    event.preventDefault();
    console.log('create post handler');
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
            alert('beautiful post!');
            document.location.replace('/dashboard');
        } else {
            alert('Failed to post!');
        }
    }
}
// update post event handler
const updatePostHandler = async (event) => {
    event.preventDefault();
    console.log('update post handler')
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
//delete post event handler
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
        console.log(response)
        alert('Failed to delete post!');
    }
};

const test = (e) => {
    e.preventDefault();
    console.log("test");
}

console.log('test Post.js');

document
    .querySelector('.create-post-button')
    .addEventListener('click', createPostFormHandler);


document
    .querySelector('#edit-post-button')
    .addEventListener('click', updatePostHandler);

document
    .querySelector('#delete-post')
    .addEventListener('click', delButtonHandler);