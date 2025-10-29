

   let btnlogin = document.getElementById("btnlogin");
    btnlogin.addEventListener("click", () => {
    
       //username is used to take the value for the input field;
        let username = document.getElementById("username").value; 
        // password is used to take the value form the input field;
        let password = document.getElementById("password").value;
        if (username == "" && password == "") {
            alert("please enter your name and password");
        } else {
            sessionStorage.setItem("logging", "1")
            window.location.href = "mainpage.html";
        }
    }

    )
// the above code is for login and navigate to main-page