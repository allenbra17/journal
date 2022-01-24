/* 
-----User Signup------
 */

function userSignUp() {
    // console.log('userSignUp function called');
    let userEmail = document.getElementById("emailSignUp").value;
    let userPass = document.getElementById("pwdSignUp").value;

    let newUserData = {
        user: {
            email: userEmail,
            password: userPass,
        }
    };
    console.log(`newUserData --> ${newUserData.user.email} ${newUserData.user.password}`);

    fetch(`http://localhost:3000/user/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newUserData)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        let token = data.SessionToken;
        localStorage.setItem('sessionToken', token);
        tokenChecker();
    })
    .catch(err => {
        console.log(err)
    })
};

/* 
-------User Login------
 */

function userLogin() {
    // console.log('userLogin function called');
    let userEmail = document.getElementById('emailLogin').value;
    let userPass = document.getElementById('pwdLogin').value;
    console.log(userEmail, userPass)

    let userData = {
        user: {
            email: userEmail,
            password: userPass
        }
    }
    console.log(userData)
    
    fetch(`http://localhost:3000/user/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.sessionToken)
        let token = data.sessionToken;
        localStorage.setItem('sessionToken', token);
        tokenChecker();
    })
    .catch(err => {
        console.error(err)
    })
};

/* 
-----User Logout-----
 */

function userLogout() {
    console.log(localStorage.sessionToken);
    localStorage.setItem('sessionToken', undefined);
    console.log(`sessionToken --> ${localStorage.sessionToken}`);
    tokenChecker();
};

/* 
------Token Checker Function------
 */

function tokenChecker() {
    console.log('token checker called', localStorage.getItem("sessionToken"));
    let display = document.getElementById('journals');
    let header = document.createElement('h5');
    let accessToken = localStorage.getItem('sessionToken');
    let alertText = "Login or sign up to get started!";

    for (let i = 0; i < display.childNodes.length; i++) {
        display.removeChild(display.firstChild);
    }

    if (accessToken === 'undefined') {
        console.log("show this")
        display.appendChild(header);
        header.textContent = alertText;
        header.setAttribute('id', 'defaultLogin');
    } else {
        null
    }
}
tokenChecker()