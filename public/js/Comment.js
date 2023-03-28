const commentFormHandler = async (event) => {
    event.preventDefault();
    const comment_text = document
    .querySelector('#comment-input')
    .value
    .trim();

    const post_id = document
    .querySelector('#single-post')
    .getAttribute('data-postId');
        
    if (comment_text && post_id) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ comment_text, post_id }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
            alert('beautiful comment!');
        } else {
            alert('Failed to comment');
        }
    }
}


document
    .querySelector('.comment-form')
    .addEventListener('submit', commentFormHandler);