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
    let xhr = new XMLHttpRequest();
    let openSendXHRFunction;

    //check the button value
    switch(event.target.value){
        case 'Post':
            method = 'post';
            openSendXHRFunction = openSendPostPutXHR;
            fetchFunction = postFetch;
            break;
        case 'Get':
            method = 'get';
            openSendXHRFunction = openSendGetXHR;
            fetchFunction = getFetch;
            break;
        case 'Put':
            method = 'put';
            openSendXHRFunction = openSendPostPutXHR;
            fetchFunction = putFetch;
            break;
        case 'Delete':
            method = 'delete'; 
            openSendXHRFunction = openSendDeleteXHR;
            fetchFunction = deleteFetch;
            break;
    }
    action = `https://httpbin.org/${method}`;

    if(data['submitType'] === 'XMLHttpRequest'){
        let xhr = new XMLHttpRequest();
        xhr.onload = () => {
            output.value = JSON.stringify(JSON.parse(xhr.responseText), undefined, 4);
        };
        openSendXHRFunction(xhr, data, method, action);
    } else {
        fetchFunction(data, method, action)
        .then(response => response.json())
        .then(responseData => {
            output.value = JSON.stringify(responseData, undefined, 4);
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
 
    return fetch(action, options);
};

const getFetch = (data, method, action) => {
    let validUri = getActionURL(action, data); 
    return fetch(validUri, {
        method: method
    });
};

const putFetch = (data, method, action) => {
    delete data.submitType;//not part of info needed
    let options = {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    return fetch(action, options);
};

//assuming backend is only expecting the id the resource to delete
const deleteFetch = (data, method, action) => {
    return fetch(`${action}?id=${data.id}`, {
        method: method
    });
}

const openSendPostPutXHR = (xhr, data, method, action) => {
    delete data.submitType;
    xhr.open(method, action, true);
    xhr.send(JSON.stringify(data));
};

const openSendGetXHR = (xhr, data, method, action) => {
    let validUri = getActionURL(action, data);
    xhr.open(method, validUri, true);
    xhr.send();
};

//Assuming backend is only expecting the id of the resource to delete
const openSendDeleteXHR = (xhr, data, method, action) => {
    xhr.open(method, `${action}?id=${data.id}`, true);
    xhr.send();
};

const getActionURL = (action, obj) => {
    return encodeURI(`${action}?id=${obj.id}&articleName=${obj.articleName}&articleBody=${obj.articleBody}&date=${obj.date}`);
};

//set up
window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('post-btn').addEventListener('click', handle);
    document.getElementById('get-btn').addEventListener('click', handle);
    document.getElementById('put-btn').addEventListener('click', handle);
    document.getElementById('delete-btn').addEventListener('click', handle);
});