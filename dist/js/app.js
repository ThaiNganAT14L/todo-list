var url = "http://localhost:3000/acc";
var object_account = {};
get_Data_JsonServer(url);

async function get_Data_JsonServer(User_url) {
    try {
        let response = await fetch(User_url, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json'
            }
        });
        const myJson = await response.json();
        object_account = myJson;
        return myJson;
    } catch (error) {
        console.log(error);
    }
}

async function update_Data_JsonServer(User_url, data) {
    try {
        response = await fetch(User_url, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        });
    } catch (error) {
        console.log(error);
    }
}   

async function post_Data_JsonServer(User_url, data) {
    try {
        let response = await fetch(User_url, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers: {
              'Content-Type': 'application/json; charset=utf-8'
            }
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}


//login.html

const btn_login = document.querySelector(".btn-login");
const input_login = document.querySelectorAll('.input-login input');
if(btn_login !== undefined && btn_login !== null){
    window.addEventListener('keypress', function(event){
        if (event.key === "Enter") {
            checkedAccLogin();
        }
    })
    btn_login.addEventListener('click', checkedAccLogin)
    function checkedAccLogin() {
        if (input_login[0].value !=='' && input_login[1].value !=='') {
            if(checkAccount(input_login[0].value, input_login[1].value) == true){
                sessionStorage.setItem("nameAcc", input_login[0].value);
                window.location.assign('./todo.html');
            }
            else {
                alert ("User or Password is Fail");
            }
        } 
    }
    
    function checkAccount(user, pass) {
        var check = false;
        object_account.forEach(element => {
            if(element.userName == user && element.pass == pass){
                check = true;
            }
        });
        return check;
    }
}

//reigister.html

const btn_register =  document.querySelector('.btn-register');
const input_register = document.querySelectorAll('.input-register input');

if(btn_register !== undefined && btn_register !== null){
    window.addEventListener('keypress', function(event){
        if (event.key === "Enter") {
            creatAcc();
        }
    });
    btn_register.addEventListener('click', creatAcc);

    window.addEventListener('click',(click)=>{
        let check = 0;
        click.path.forEach(element => {
            if (element === input_register[1]) {
                check = 1; 
            }
            if (element === input_register[2]) {
                check = 2; 
            }
        });
        if (check == 1) {
            input_register[1].style.borderColor = "#F7F7F7";
        }
        if (check == 2) {
            input_register[2].style.borderColor = "#F7F7F7";
        }
    });

    function check_string(element){
        if(element ==''){
            return 0;
        }
        for (let index = 0; index < element.length; index++) {
            if(check_characters(element[index]) == 0)
                return 0
        }
        return 1;
    }
    const specialCharacters = ["q","w","e","r","t","y","u","i","o","p","a","s","d","f","g","h","j","k","l","z","x","c","v","b",
                            "n","m","1","2","3","4","5","6","7","8","9","0"];

    function check_characters(character) {
        for (let index = 0; index < specialCharacters.length; index++) {
            if (character === specialCharacters[index]) {
                return 1;
            }
        }
        return 0;
    }

    function createAccount(user, pass, email) {
        let data = {}
        data.userName = user;
        data.email = email,
        data.pass = pass;
        data.id = object_account.length + 1;
        data.stask = [];
        data.comment = [];
        post_Data_JsonServer(url, data);
        update_Data_JsonServer(url, data);
    }

    function creatAcc() {   
        if (check_string(input_register[1].value) == 1 && check_string(input_register[2].value) == 1) {
            if(checkAccount(input_register[1].value) == false){
                createAccount(input_register[1].value, input_register[2].value, input_register[0].value);
                input_register[1].value = '';
                input_register[2].value = '';
                input_register[0].value = '';
                alert('Created Account');
            }
            else {
                alert ("User is used");
            }
        }
        else {
            alert ("Can't create Account");
            if (check_string(input_register[1].value) == 0) {
                input_register[1].style.borderColor = "red";
            }
            if (check_string(input_register[2].value) == 0) {
                input_register[1].style.borderColor = "red";
            }
        }
    }
    
    function checkAccount(user) {
        var check = false;
        object_account.forEach(element => {
            if(element.userName == user){
                check = true;
            }
        });
        return check;
    }
}




console.log('succes!!!');