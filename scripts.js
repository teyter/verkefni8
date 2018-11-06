const ENTER_KEYCODE = 13;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const items = document.querySelector('.items');

  text.init(form, items);
});

const text = (() => {
  let items;

  function init(_form, _items) {
    items = _items;
    _form.addEventListener('submit', formHandler);
/*daematimi */
    console.log(_items);
    console.log(_form);

    const itemList = items.querySelectorAll('.item');
    
    for (let i = 0; i < itemList.length; i++) {
        let checkbox = itemList[i].querySelector('.item__checkbox');    
        let text = itemList[i].querySelector('.item__text');
        let button = itemList[i].querySelector('.item__button');

        checkbox.addEventListener('click',finish);
        text.addEventListener('click',edit);
        button.addEventListener('click',deleteItem);
    }
/*daematimi*/

    // TODO láta hluti í _items virka
  }

  function formHandler(e) {
    e.preventDefault();
    
    add(document.querySelector('.form__input').value);

    for (let item of items.querySelectorAll('item__checkbox')) {
        item.addEventListener('click', finish);
    }

      console.log('ratata');
    let input = document.querySelector('.form__input').value;

    let li = document.createElement('li');
    li.className = 'item';

    let content = document.createElement('input');
    content.type = 'checkbox';
    content.className = 'item__checkbox';

    let span = document.createElement('span');

    span.className = 'item__text';
    span.appendChild(document.createTextNode(input));

    let button = document.createElement('button');
    button.appendChild(document.createTextNode('Eyða'));
    button.className = 'item__button';

    li.appendChild(content);
    li.appendChild(span);
    li.appendChild(button);

    let gonkdroid = document.querySelector('.items');
    gonkdroid.appendChild(li);

    button.addEventListener('click', deleteItem);
    e.target.reset();
  }

  // event handler fyrir það að klára færslu
  function finish(e) {
      const {target} = e;
      if (e.target.checked) {
          e.target.parentNode.classList.add('item--done');
      } else {
          e.target.parentNode.classList.remove('item--done');
      }
      console.log('finish'); 
  }

  // event handler fyrir það að breyta færslu
  function edit(e) {
    const {target} = e;
    const {textContent, parentNode} = target;

    parentNode.removeChild(target);
    
    //let input = el('input','item__edit');
    let input = document.createElement('input');
    input.classList.add('item__edit');
    input.addEventListener('keyup', commit);
    input.setAttribute('type', 'text');

    const button = parentNode.querySelector('item__button');
    parentNode.insertBefore(input, button);
    input.value = textContent;

    input.focus();

  }

  // event handler fyrir það að klára að breyta færslu
  function commit(e) {
      const {keyCode} = e;
      if (keyCode == ENTER_KEYCODE) {
        console.log('Enter was pressed');
      }
  }

  // fall sem sér um að bæta við nýju item
  function add(value) {
/*
      let input = value;

      let li = document.createElement('li');
      li.className = 'item';

      let content = document.createElement('input');
      content.type = 'checkbox';
      content.className = 'item__checkbox';

      let span = document.createElement('span');
      span.className = 'item__text';
      span.appendChild(document.createTextNode(input));

      let button = document.createElement('button');
      button.appendChild(document.createTextNode('Eyda'));
      button.className = 'item__button';

      li.appendChild(content);
      li.appendChild(span);
      li.appendChild(button);

      items.appendChild(li);

      console.log(input);
*/
      
  }

  // event handler til að eyða færslu
  function deleteItem(e) {
    const { target } = e;
    const parent = target.parentNode;
    let checkbox = parent.querySelector('.item__checkbox');
    checkbox.removeEventListener('click',finish);

    parent.parentNode.removeChild(parent);
    
  }

  // hjálparfall til að útbúa element
  function el(type, className, clickHandler) {
        // bua til div
      let div = document.createElement('div');
      // gefa class
      div.classList.add('container');
      div.addEventListener('click',add);

      return div;
  }

  return {
    init: init
  }
})();
