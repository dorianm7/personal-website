import {createBlogDialog, createBlogPost} from './blog.js';

//will add listeners from crud.html in here
var blogs = [{title: 'Title1', date: '10/11/12', summary: 'Summary1'},
            {title: 'Title2', date: '10/11/12', summary: 'Summary2'}];

const tableRowTemplate = document.createElement('template');
tableRowTemplate.innerHTML =    `<tr><td></td></tr>`;

const createTableRow = () => {
    return tableRowTemplate.content
                            .firstElementChild
                            .cloneNode(true);
};

//calls setUpAddButton
const setUpAddButton = () => {
    let addButton = document.getElementById('add-button');
    addButton.addEventListener('click', () => {
        let dialog = createBlogDialog();
        document.body.appendChild(dialog);
        setUpDialog(dialog);
        dialog.showModal();
    });
};

//called inside of setUpAddButton
const setUpDialog = (dialog) => {
    //set up listeners
    let cancelButton = dialog.querySelector('#cancel');
    cancelButton.addEventListener('click', () => {
        dialog.close(false);
        //remove dialog from document
        dialog.parentNode.removeChild(dialog);
    });
    
    let okButton = dialog.querySelector('#save');
    okButton.addEventListener('click', () => {
        //get title, date, summary 
        let titleEl = dialog.querySelector('#title'); 
        let timeEl = dialog.querySelector('#date');
        let summaryEl = dialog.querySelector('#summary');
        let titleString = titleEl.value;
        let dateString = timeEl.value;
        let summaryString = summaryEl.value;

        //create blog object
        let blog = {title: titleString, date: dateString, summary: summaryString};

        //add blog object to array
        blogs.push(blog);

        //place blog post to table
        blogToTable(blog);

        //remove dialog from document
        dialog.close(false);
        dialog.parentNode.removeChild(dialog);
    });
};

const blogToTable = (blog) => {
    let blogPost = createBlogPost(blog.title, blog.date, blog.summary);
    let blogTableRow = createTableRow();
    let blogTableRowTD = blogTableRow.querySelector('td');

    blogTableRowTD.appendChild(blogPost);
    
    let table = document.getElementById('blogs');
    table.appendChild(blogTableRow);
};

//Wire up elements here
document.addEventListener('DOMContentLoaded', () => {
    setUpAddButton();
    //read array
    //place array elements into table
});
