function addNote() {
    const notesContainer = document.getElementById('notesContainer');
    const note = document.createElement('div');
    note.className = 'note';
  
    const textarea = document.createElement('textarea');
    textarea.placeholder = 'Write something...';
  
    const stickBtn = document.createElement('button');
    stickBtn.textContent = '📌 Stick';
    stickBtn.className = 'stick';
    stickBtn.onclick = () => stickNote(note, textarea);
  
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'X';
    deleteBtn.className = 'delete';
    deleteBtn.onclick = () => notesContainer.removeChild(note);
  
    note.appendChild(deleteBtn);
    note.appendChild(textarea);
    note.appendChild(stickBtn);
    notesContainer.appendChild(note);
  }
  
  function stickNote(note, textarea) {
    const content = textarea.value.trim();
    if (content === '') return;
  
    const textPara = document.createElement('p');
    textPara.textContent = content;
  
    textarea.remove();
    note.querySelector('.stick').remove();
    note.appendChild(textPara);
  }
  