const newFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#recipe-name').value.trim();
    const description = document.querySelector('#recipe-desc').value.trim();
  
    if (name  && description) {
      const response = await fetch(`/api/recipe`, {
        method: 'POST',
        body: JSON.stringify({ name, description }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to create recipe');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/recipe/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete recipe');
      }
    }
  };
  
  document
    .querySelector('#btn1')
    .addEventListener('submit', newFormHandler);
  
  document
    .querySelector('#btn2')
    .addEventListener('click', delButtonHandler);
  