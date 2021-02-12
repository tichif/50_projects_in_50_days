const jokeEl = document.getElementById('joke');
const jokeBtn = document.getElementById('jokeBtn');

generateJoke();

async function generateJoke() {
  const config = {
    headers: {
      Accept: 'application/json',
    },
  };
  const resp = await fetch('https://icanhazdadjoke.com', config);
  const { joke } = await resp.json();
  jokeEl.innerHTML = joke;
}

jokeBtn.addEventListener('click', generateJoke);
