const path = 'http://localhost:3002';

const socket = io('path');
const msgBox = document.getElementById('exampleFormControlTextarea1');
const msgCont = document.getElementById('data-container');
const email = document.getElementById('email');

const messages = [];
function getMessages() {
  fetch(`${path}/api/chat`)
    .then((resp) => resp.json())
    .then((data) => {
      loadData(data);
      data.fotEach((el) => {
        messages.push(el);
      });
    })
    .catch((err) => console.error(err));
}
getMessages();

msgBox.addEventListener('keydown', (e) => {
  if (e.keyCode == 13) {
    sendMessage({ emain: email.value, text: e.target.value });
    e.target.value = '';
  }
});

function loadData(data) {
  let messages = '';
  data.map((message) => {
    messages += `<li class="bg-primary p-2 rounded mb-2 text-light">
    <span class="fw-bolder">${message.email}</span>
    ${message.text}
    </li>`;
  });
  msgCont.innerHTML = messages;
}

function sendMessage(message) {
  socket.emit('sendMessage', message);
}

socket.on('recMessage', (message) => {
  message.push(message);
  loadData(messages);
});
