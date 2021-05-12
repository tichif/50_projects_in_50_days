const button = document.getElementById('button');
const toasts = document.getElementById('toasts');

const messages = [
  'Message One',
  'Message Two',
  'Message Three',
  'Message Four',
];

button.addEventListener('click', () =>
  createNotification('Invalid data !', 'error')
);

const createNotification = (message = null, type = null) => {
  const notif = document.createElement('div');
  notif.classList.add('toast');
  notif.classList.add(type ? type : 'info');

  notif.innerText = message ? message : getRandomMessage();
  toasts.appendChild(notif);

  setTimeout(() => {
    notif.remove();
  }, 2000);
};

const getRandomMessage = () =>
  messages[Math.floor(Math.random() * messages.length)];
