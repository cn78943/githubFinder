// const octokit = new Octokit({
//     auth: ''
//   })

//   await octokit.request('GET /search/users', {
//     headers: {
//       'X-GitHub-Api-Version': '2022-11-28'
//     }
//   })

const searchInput = document.querySelector('.search_input');
const searchBtn = document.querySelector('.search_btn');
const userContainer = document.querySelector('.user_container');
const repoContainer = document.querySelector('.repo_container');
const viewBtn = document.querySelector('.view_btn');


searchBtn.addEventListener('click', function () {

    console.log(searchInput.value);
    fetchUser(searchInput.value);
    repoUser(searchInput.value);
    repoContainer.innerHTML = "";
});

function fetchUser(userName) {
    fetch(`http://api.github.com/users/${userName}`)
        .then(res => res.json())
        .then(data => {
            displayUser(data)
            return
        });

}

function displayUser(data) {
    userContainer.innerHTML = `
    <div class="user">
    <img src="${data.avatar_url}" alt="user">
    <button type="button">View Profile</button>
</div>

<div class="user_detail">

    <button type="button" class="btn btn-primary">Public Repos: ${data.public_repos}</button>
    <button type="button" class="btn btn-secondary">Public Gists: ${data.public_gists}</button>
    <button type="button" class="btn btn-warning">Followers: ${data.followers}</button>
    <button type="button" class="btn btn-info">Following: ${data.following}</button>

    <div class="user_info">
        <div>Company: ${data.company}</div>
        <div>Website: ${data.blog}</div>
        <div>Location: ${data.location}</div>
        <div>Since: ${data.created_at}</div>
    </div>

</div>`
}


function repoUser(userName) {
    fetch(`http://api.github.com/users/${userName}/repos`)
        .then(res => res.json())
        .then(data => {
            displayRepos(data)
            return console.log(data)
        });

}
function displayRepos(data) {
    data.forEach(repo => {
        const repoDiv = document.createElement('div');
        repoDiv.className = 'repos';

        const repoDetailDiv = document.createElement('div');
        repoDetailDiv.className = 'repo_detail';

        const repoNameLink = document.createElement('a');
        repoNameLink.href = repo.html_url;
        repoNameLink.className = 'repo_name';
        repoNameLink.textContent = repo.name;

        const starsButton = document.createElement('button');
        starsButton.type = 'button';
        starsButton.className = 'btn btn-primary';
        starsButton.textContent = `Stars: ${repo.stargazers_count}`;

        const watchersButton = document.createElement('button');
        watchersButton.type = 'button';
        watchersButton.className = 'btn btn-secondary';
        watchersButton.textContent = `Watchers: ${repo.watchers_count}`;

        const forksButton = document.createElement('button');
        forksButton.type = 'button';
        forksButton.className = 'btn btn-warning';
        forksButton.textContent = `Forks: ${repo.forks_count}`;

        repoDetailDiv.appendChild(repoNameLink);
        repoDetailDiv.appendChild(starsButton);
        repoDetailDiv.appendChild(watchersButton);
        repoDetailDiv.appendChild(forksButton);
        repoDiv.appendChild(repoDetailDiv);
        repoContainer.appendChild(repoDiv);
    });
}