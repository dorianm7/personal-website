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

    return {id:id, 
            articleName: articleName, 
            articleBody: articleBody, 
            submitType: submitType}; 
};

const handle = (event) => {
    let output = document.getElementById('response');
    let data = getFormData();
    let date = new Date();

    //check the button value
    switch(event.target.value){
        default:
        console.log(event.target.value);
        console.log(data.id, data.articleName, data.articleBody, data.submitType);
    //  Post:
    //      action = 'https://httpbin.org/post'
    //      method = 'post' 
    //      break;
    //  Get:
    //      action = 'https://httpbin.org/get'
    //      method = 'get'
    //      break;
    //  Put:
    //      action = 'https://httpbin.org/put'
    //      method = 'put' 
    //      break;
    //  Delete:
    //      action = 'https://httpbin.org/delete'
    //      method = 'delete' 
    //      break;
    }

    if(data['submitType'] === 'XMLHttpRequest'){
    //  XMLHttpRequest open ()
    //  XMLHttpRequest send ()
    //  response = 
    //  output.value = response
        output.value = data['submitType'];
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