var url = "http://localhost:3000/acc";
main_todo();
//todo.html
async function main_todo() {
    var object_account = await get_Data_JsonServer(url);

    function changeUrl(){
        for (let index = 0; index < object_account.length; index++) {
            if (object_account[index].userName == sessionStorage.getItem("nameAcc")) {
                return index;
            }
        }
        return -1;
    }

        
    // Comment
    var myCmt = [];
    const btn_add_Cmt = document.querySelector('.footer-cmt .btn-add');
    const list_Cmt = document.querySelector('.list-cmt');
    var article_Cmt = document.querySelectorAll('.list-cmt article');
    reset_cmt();

    btn_add_Cmt.addEventListener('click',()=>{
        var input_add = document.querySelector('.footer-cmt input');
        input = delete_Space(input_add.value);
        if (input !=='') {
            myCmt.push(input);
            reset_stask_html_Cmt(myCmt);
            input_add.value ='';
        }
    })

    function reset_cmt() {
        // stasks_String = localStorage.getItem('Stasks');
        // stasks_array = JSON.parse(stasks_String);  
        cmt = object_account[changeUrl()].comment;
        if (cmt !== null || cmt !== []) {
            myCmt = cmt;    
        }
        reset_stask_html_Cmt(myCmt);
    }


    function reset_stask_html_Cmt(params) {
        if (params !== []) {
            string_html_stask ='';
            params.forEach(element => {
                string_html_stask += `<article class="item-list"><div class="name-list">` + 
                element +'</div><div class="icons_list"><i class="fas fa-times"></i></div></article>'
            });
            list_Cmt.innerHTML = string_html_stask;
            article_Cmt = document.querySelectorAll('.list-cmt article');
            add_delete();
        }
    }

    function add_delete() {
        for (let index = 0; index < article_Cmt.length; index++) {
            const element = article_Cmt[index];
            const elementchild = article_Cmt[index].querySelector('.fa-times');
            elementchild.addEventListener('click',()=>{  
                checkText(element);
                reset_stask_html_Cmt(myCmt);
            });
        }
    }

    function checkText(params) {
        for (let index = 0; index < article_Cmt.length; index++) {
            if (params == article_Cmt[index]) {
                myCmt.splice(index,1);
            }
        }
    }

    function delete_Space(element){
        start = 0;
        end = element.length;
        for (let index = 0; index < element.length; index++) {
            if(element[index] != ' '){
                start = index;
                break;
            }
        }
        if (start == 0 && element[0] == ' ') {
            return '';
        }
        for (let index = element.length-1; index >= 0 ; index--) {
            if(element[index] != ' '){
                end = index+1;
                break;
            }
        }
        return element.slice(start,end);
    }

    // stask
    var myStask = [];
    const btn_add_stask = document.querySelector('.footer-todo .btn-add');
    const list_stask = document.querySelector('.tasks');
    var article_stask = document.querySelectorAll('.tasks article');
    reset_stask();

    if(article_stask !== undefined && article_stask !== null && article_stask.length !== 0){
        article_stask.forEach(element => {
            element.children[0].children[0].addEventListener('click', function(){
                if(element.children[0].children[0].checked == true){
                    element.children[0].children[1].style.textDecoration = 'line-through'
                }
                else{
                    element.children[0].children[1].style.textDecoration = 'none';
                }
            })  
        });
    };

    btn_add_stask.addEventListener('click',()=>{
        var input_add = document.querySelector('.footer-todo input');
        input = delete_Space(input_add.value);
        if (input !=='') {
            myStask.push({content: input, checked: 0});
            reset_stask_html(myStask);
            input_add.value ='';
        }
    })

    function reset_stask() {
        stask = object_account[changeUrl()].stask;
        if (stask !== null && stask !== [{}]) {
            myStask = stask;    
        }
        reset_stask_html(myStask);
    }


    function reset_stask_html(params) {
        if (params !== []) {
            string_html_stask ='';
            params.forEach(element => {
                string_html_stask += `<article class="article-task">
                <div class="left_task">
                    <input type="checkbox" id="">
                    <p style="text-decoration: none;">` + element.content +`</p>
                </div>
                <div class="icons_task">
                    <i class="fas fa-edit"></i>
                    <i class="fas fa-trash-alt"></i>
                </div>
            </article>`
            });
            list_stask.innerHTML = string_html_stask;
            article_stask = document.querySelectorAll('.tasks article');
            checked_myStask();
            add_delete_stask();
        }
    }

    function checked_myStask() {
        for (let index = 0; index < myStask.length; index++) {
            var input_Checked = article_stask[index].querySelector('input');
            if (myStask[index].checked == 1) {
                input_Checked.checked = 1;
            }
            else input_Checked.checked = 0;
        }
    }

    function add_delete_stask() {
        for (let index = 0; index < article_stask.length; index++) {
            const element = article_stask[index];
            const elementchild = article_stask[index].querySelector('.fa-trash-alt');
            elementchild.addEventListener('click',()=>{  
                checkText_stask(element);
                reset_stask_html(myStask);
            });
        }
    }

    function checkText_stask(params) {
        for (let index = 0; index < article_stask.length; index++) {
            if (params == article_stask[index]) {
                myStask.splice(index,1);
            }
        }
    }

    window.addEventListener('beforeunload', ()=>{
        for (let index = 0; index < article_stask.length; index++) {
            const element = article_stask[index].querySelector('input');
            if (element.checked == 1) {
                myStask[index].checked = 1;
            } else {
                myStask[index].checked = 0;
            }
        }
        object_account[changeUrl()].stask = myStask;
        object_account[changeUrl()].comment = myCmt;
        update_Data_JsonServer(url + '/' + checkedID(), object_account[changeUrl()]);
    })
    
    function checkedID(){
        for (let index = 0; index < object_account.length; index++) {
            if (object_account[index].userName == sessionStorage.getItem("nameAcc")) {
                return object_account[index].id;
            }
        }
        return -1;
    }
}

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

async function detele_Data_JsonServer(User_url) {
    try {
        let response = await fetch(User_url, {
            method: 'DELETE',
        });
    } catch (error) {
        console.log(error);
    }
}   

const logOut = document.querySelector('.logOut');

logOut.addEventListener('click',function(){
    sessionStorage.removeItem('nameAcc');
    window.location.assign('./login.html');
})

