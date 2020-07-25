import {createBlogDialog} from './blog.js';

//will add listeners from crud.html in here
var dialog;

const setUpAddButton = () => {
    let addButton = document.getElementById('add-button');
    addButton.addEventListener('click', () => {
        dialog = createBlogDialog();
        document.body.appendChild(dialog);
        dialog.showModal();
    });
};

//Wire up elements here
document.addEventListener('DOMContentLoaded', () => {
    setUpAddButton();
});
