const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');

const API_URL = 'https://api.github.com/users';

async function getUser(username) {
  try {
    const { data } = await axios.get(`${API_URL}/${username}`);
    createUserCard(data);
    getRepos(username);
  } catch (error) {
    if (error.response.status === 404) {
      createErrorCard('No profile with this username.');
    }
  }
}

async function getRepos(username) {
  try {
    const { data } = await axios.get(
      `${API_URL}/${username}/repos?sort=created`
    );
    addReposToCard(data);
  } catch (error) {
    createErrorCard('Problem fetching repos');
  }
}

function createUserCard(user) {
  const cardHtml = ` <div class="card">
  <div>
    <img
      src="${user.avatar_url}"
      alt="${user.name}"
      class="avatar"
    />
  </div>
  <div class="user-infos">
    <h2>${user.name}</h2>
    <p>
      ${user.bio}
    </p>
    <ul>
      <li>${user.followers} <strong>Followers</strong></li>
      <li>${user.following} <strong>Following</strong></li>
      <li>${user.public_repos} <strong>Repos</strong></li>
    </ul>

    <div id="repos"></div>
  </div>
</div>`;

  main.innerHTML = cardHtml;
}

function createErrorCard(msg) {
  const cardHtml = `
    <div class="card">
      <h1>${msg}</h1>
    </div>
  `;
  main.innerHTML = cardHtml;
}

function addReposToCard(repos) {
  const reposEl = document.getElementById('repos');
  repos.slice(0, 10).forEach((repo) => {
    const repoLink = document.createElement('a');
    repoLink.classList.add('repo');
    repoLink.href = repo.html_url;
    repoLink.target = '_blank';
    repoLink.innerText = repo.name;

    reposEl.appendChild(repoLink);
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const user = search.value;
  if (user) {
    getUser(user);
    search.value = '';
  }
});
