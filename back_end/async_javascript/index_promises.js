console.log('Before');
getUser(1)
    .then(username => getRepositories(username))
    .then(repos => getCommits(repos))
    .then(commits => console.log(commits))
    .catch(error => console.log("ERROR", error.message));
console.log('After');


function getUser(id) {
    return new Promise( (resolve, error) => {
    setTimeout(() => {
        console.log('Reading a user from a database...');
        resolve({ id: id, gitHubUsername: 'mosh' });
        }, 1000)
    });
}

function getRepositories(username) {
    return new Promise( (resolve, error) => {
        setTimeout(() => {
        console.log('Calling GitHub API...');
        resolve(['repo1', 'repo2', 'repo3']);
        }, 1000)
    });
}

function getCommits(repo) {
    return new Promise( (resolve, error) => {
        setTimeout(() => {
        console.log('Calling GitHub API...');
        resolve(['commit1 ', 'commit2', 'commit3']);
        }, 1000)
    });
}