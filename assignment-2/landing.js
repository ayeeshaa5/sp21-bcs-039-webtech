const button = document.getElementById('toggleMode');
const text=document.getElementById('text');
    const body = document.body;

    button.addEventListener('click', () => {
      if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        button.innerText = 'Turn Me Dark';
        text.style.color='black';
      } else {
        body.classList.add('dark-mode');
        button.innerText = 'Turn Me Light';
        text.style.color='white';
      }
    });
  
