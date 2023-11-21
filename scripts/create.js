document.addEventListener('DOMContentLoaded', function() {
  var addButton = document.querySelector('.add_field');
  var form = document.getElementById('create');
  var inputContainer = document.getElementById('inputContainer');

  addButton.addEventListener('click', function() {
    var newInput = document.createElement('input');
    newInput.type = 'text';
    newInput.className = 'input';
    newInput.name = 'question';
    newInput.value = '';

    var removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.className = 'remove_field';
    removeButton.innerText = 'Remove';

    var lineBreak = document.createElement('br');

    var wrapper = document.createElement('div');
    wrapper.appendChild(newInput);
    wrapper.appendChild(removeButton);
    
    wrapper.appendChild(lineBreak.cloneNode());
    wrapper.appendChild(lineBreak.cloneNode());

    inputContainer.appendChild(wrapper);
  });

  // Event delegation for dynamically created remove buttons
  form.addEventListener('click', function(event) {
    if (event.target.classList.contains('remove_field')) {
      event.target.parentElement.remove();
    }
  });
});