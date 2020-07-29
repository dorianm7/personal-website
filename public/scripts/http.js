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
    let fetchFunction;

    //check the button value
    switch(event.target.value){
        case 'Post':
            method = 'post';
            fetchFunction = postFetch;
            break;
        case 'Get':
            method = 'get';
            fetchFunction = getFetch;
            break;
        case 'Put':
            method = 'put';
            fetchFunction = putFetch;
            break;
        case 'Delete':
            method = 'delete'; 
            fetchFunction = deleteFetch;
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
        fetchFunction(data, method, action)
            .then(response => response.json())
            .then(responseData => {
                output.value = JSON.stringify(responseData);
            })
            .catch(e => {console.log(e);});
    }
};

const postFetch = (data, method, action) => {
    delete data.submitType;//not part of info needed
    let options = { 
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
 
    return fetch(action, options)
    console.log('Fetched using POST');
};

const getFetch = (data, method, action) => {
    //fetch(action)
    let validUri = getActionURL(action, data); 
    return fetch(validUri, {
        method: method,
    })
    console.log('Fetched using GET');
};

const putFetch = (data, method, action) => {
    delete data.submitType;
    let options = {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    return fetch(action, options)
    console.log('Fetched using PUT');
};

const deleteFetch = (data, method, action) => {
    //options = 

    //fetch(action, options)
    console.log('Fetched using DELETE');
}

const getActionURL = (action, obj) => {
    return encodeURI(`${action}?id=${obj.id}&name=${obj.articleName}&body=${obj.articleBody}&date=${obj.date}`);
};

//set up
window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('post-btn').addEventListener('click', handle);
    document.getElementById('get-btn').addEventListener('click', handle);
    document.getElementById('put-btn').addEventListener('click', handle);
    document.getElementById('delete-btn').addEventListener('click', handle);
});