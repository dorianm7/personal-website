//functions

//based on the button pressed, will add form attribute:
//  action
//  method
//for the specified buttons

const getFormData = () => {
    let formEl = document.getElementById('form');
    let id = formEl.querySelector('#id').value;
    let articleName = formEl.querySelector('#article-name').value;
    let articleBody = formEl.querySelector('#article-body').value;
    let submitType = formEl.querySelector('input[name="submit-type"]:checked').value;
    let date = new Date();

    return {id:id, 
            articleName: articleName, 
            articleBody: articleBody, 
            submitType: submitType,
            date: date}; 
};

const handle = (event) => {
    let output = document.getElementById('response');
    let data = getFormData();
    let method;
    let action;

    //check the button value
    switch(event.target.value){
        case 'Post':
            method = 'post' 
            break;
        case 'Get':
            method = 'get'
            break;
        case 'Put':
            method = 'put' 
            break;
        case 'Delete':
            method = 'delete' 
            break;
    }
    action = `https://httpbin.org/${method}`;

    if(data['submitType'] === 'XMLHttpRequest'){
        let xhr = new XMLHttpRequest();
        xhr.open(method, action, true);
        xhr.onload = () => {
            output.value = xhr.responseText;
        };
        xhr.send (JSON.stringify(data));
    } else {
    //  Fetch send ()
    //  response = 
    //  output.value = response
        output.value = data['submitType'];
    }
};

//set up
window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('post-btn').addEventListener('click', handle);
    document.getElementById('get-btn').addEventListener('click', handle);
    document.getElementById('put-btn').addEventListener('click', handle);
    document.getElementById('delete-btn').addEventListener('click', handle);
});