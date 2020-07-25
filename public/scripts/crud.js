import {createBlogDialog} from './blog.js';

//will add listeners from crud.html in here
var dialog;
var blogs = [{title: 'Title1', date: '10/11/12', summary: 'Summary1'},
            {title: 'Title2', date: '10/11/12', summary: 'Summary2'}];

const setUpAddButton = () => {
    let addButton = document.getElementById('add-button');
    addButton.addEventListener('click', () => {
        dialog.showModal();
    });
};

const setUpDialog = () => {
    dialog = createBlogDialog();
    document.body.appendChild(dialog);

    //set up listeners
    let cancelButton = dialog.querySelector('#cancel');
    cancelButton.addEventListener('click', () => {
        dialog.close(false);
    });
    
    let okButton = dialog.querySelector('#save');
    okButton.addEventListener('click', () => {
        dialog.close(false);
        //get title, date, summary 
        //blogs.push({title, date, summary})
        //place {title, date, summary} to table
    });
};

//Wire up elements here
document.addEventListener('DOMContentLoaded', () => {
    setUpDialog();
    setUpAddButton();
});
