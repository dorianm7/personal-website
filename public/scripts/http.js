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
            fetchFunction = postPutFetch;
            break;
        case 'Get':
            method = 'get';
            openSendXHRFunction = openSendGetDeleteXHR;
            fetchFunction = getDeleteFetch;
            break;
        case 'Put':
            method = 'put';
            openSendXHRFunction = openSendPostPutXHR;
            fetchFunction = postPutFetch;
            break;
        case 'Delete':
            method = 'delete'; 
            openSendXHRFunction = openSendGetDeleteXHR;
            fetchFunction = getDeleteFetch;
            break;
    }
    action = `https://httpbin.org/${method}`;

    if(data['submitType'] === 'XMLHttpRequest'){
        let xhr = new XMLHttpRequest();
        xhr.onload = () => {
            output.value = JSON.stringify(JSON.parse(xhr.responseText), undefined, 4);
        };
        delete data.submitType; //not part of the request
        openSendXHRFunction(xhr, data, method, action);
    } else {
        delete data.submitType;//not part of the request
        fetchFunction(data, method, action)
        .then(response => response.json())
        .then(responseData => {
            output.value = JSON.stringify(responseData, undefined, 4);
        })
        .catch(e => {console.log(e);});
    }
};

const postPutFetch = (data, method, action) => {
    let options = {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    return fetch(action, options);
}

//assuming backend is only expecting the id the resource for GET and DELETE 
const getDeleteFetch = (data, method, action) => {
    return fetch(`${action}?id=${encodeURIComponent(data.id)}`, {
        method: method
    });
}

const openSendPostPutXHR = (xhr, data, method, action) => {
    xhr.open(method, action, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data));
};

//Assuming backend is only expecting the id of the resource for GET and DELETE
const openSendGetDeleteXHR = (xhr, data, method, action) => {
    xhr.open(method, `${action}?id=${encodeURIComponent(data.id)}`, true);
    xhr.send();
};

const getEncodedData = (obj) => {
    let encodedDataPairs = [];
    let encodedProp, encodedVal;
    for(let prop in obj){
        encodedProp = encodeURIComponent(prop);
        encodedVal = encodeURIComponent(obj[prop]);
        encodedDataPairs.push(`${encodedProp}=${encodedVal}`);
    }
    return encodedDataPairs.join('&').replace(/%20/g, '+');
};

//set up
window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('post-btn').addEventListener('click', handle);
    document.getElementById('get-btn').addEventListener('click', handle);
    document.getElementById('put-btn').addEventListener('click', handle);
    document.getElementById('delete-btn').addEventListener('click', handle);
});