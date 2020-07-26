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

        //add blog object to local storage

        //place blog post to table
        let blogPost = createBlogPost(blog.title, blog.date, blog.summary);
        addToTable(blogPost);

        //remove dialog from document
        dialog.close(false);
        dialog.parentNode.removeChild(dialog);
    });
};

//Item must be a DOM node
const addToTable = (item) => {
    let blogTableRow = createTableRow();
    let blogTableRowTD = blogTableRow.querySelector('td');
    let table = document.getElementById('blogs');

    blogTableRowTD.appendChild(item);
    table.appendChild(blogTableRow);
};

//on local storage change, update table?
//  already being done by blog post dialog save button


//Wire up elements here
document.addEventListener('DOMContentLoaded', () => {
    setUpAddButton();

    //read from local storage, place into array

    //read array
    let blogPostEls = blogs.map((post) => {
        return createBlogPost(post.title, post.date, post.summary);
    });
    //place array elements into table
    blogPostEls.forEach(postEl => addToTable(postEl));
});
