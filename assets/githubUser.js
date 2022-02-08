var userFormEl = document.querySelector("#search-user-form");
var nameInputEl = document.querySelector("#search-user");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

// if #repo-search-term span gets displayed: 
// Search username for repos
// if user has amount of repos 1-10, 10-25, 25-50, 50-75, 75+
// Display different pokemon for each amount
// Repos 1-10=Pokemon 1-25
// 10-25=25-50
// 25-50=50-75
// 50-75=75-100
// 75+=100-150

var getUser = function (user) {
    // format the github api url
    var apiUrl = "https://api.github.com/users/" + user;

    // make a request to the url
    fetch(apiUrl).then(function (response) {
        response.json().then(function (data) {
            displayUser(data, user);
        });
    });
};

var addUserName = function(user) {

    var userExists = false;

    // check if the user already exists
    for (var i=0; i < githubUsr.length; i++) {
        if (githubUsr[i] == user) {
            userExists = true;
        };
    };
    // if the user doesn't exists
    if (!userExists) {
        // add user to the end of githubUsr array and refresh localStorage ghUsers array
        githubUsr[githubUsr.length] = user;
        createUser(user);
        localStorage.setItem("ghUsers", JSON.stringify(githubUsr));

    }
};

var formSubmitHandler = function (event) {
    event.preventDefault();
    // get value from input element
    var username = nameInputEl.value.trim();

    if (username) {
        getUser(username);
        nameInputEl.value = "";
    } else {
        alert("Please enter a GitHub username");
    }
    console.log(event);
};

var displayUser = function (repos, searchTerm) {
    // clear old content
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;
    // loop over repos
    for (var i = 0; i < repos.length; i++) {
        // format repo name
        var repoName = repos[i].owner.login + "/" + repos[i].name;

        // create a span element to hold repository name
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        // append to container
        repoEl.appendChild(titleEl);
    }
};






userFormEl.addEventListener("submit", formSubmitHandler);




