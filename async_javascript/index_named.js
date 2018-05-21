// console.log("before");
// const user = getUser(1);
// const repositories = getRepositories(user);
// const commits = getCommits(repositories);
// console.log("after");

console.log("before");
getUser(1, getRepositories1)
console.log("after");



function getRepositories1(user) {
    getRepositories(user, getCommits1);
}

function getCommits1(repositories) {
    getCommits(repositories[0], displayCommits);
}

function displayCommits(commits) {
    console.log("commits: " + commits);  
}



function getUser (id, callback){
    setTimeout(function (){
        console.log('getting info of user: ' + id);
        callback({ id: id, name: "pseudoincorrect"});
    }, 1000);
}

function getRepositories (user, callback){
    setTimeout(function (){
        console.log("getting repositories of user: " + user.name);
        callback(['repo1', 'repo2', 'repo3']);
    }, 1000);
}

function getCommits (repository, callback){
    setTimeout(function (){
        console.log("getting commits of repos: " + repository);
        callback(['commit1', 'commit2', 'commit3']);
    }, 1000);
}