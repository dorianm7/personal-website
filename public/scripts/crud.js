import {createBlogDialog, createBlogPost} from './blog.js';

//will add listeners from crud.html in here
var blogsArr = [{title: 'Title1', date: '1914-11-12', summary: 'Summary1'},
            {title: 'Title2', date: '1914-11-12', summary: 'Summary2'}];

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
        setUpCancel(dialog);
        setUpSave(dialog);
        dialog.showModal();
    });
};

const setUpCancel = (dialog) => {
    let cancelButton = dialog.querySelector('#cancel');
    cancelButton.addEventListener('click', () => {
        //remove dialog
        dialog.close(false);
        dialog.parentNode.removeChild(dialog);
    });
};

const setUpSave = (dialog) => {
    let saveButton = dialog.querySelector('#save');
    saveButton.addEventListener('click', () => {
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
        blogsArr.push(blog);

        //add blog object to local storage

        //place blog post to table
        let blogPost = createBlogPost(blog.title, blog.date, blog.summary);
        addToTable(blogPost);

        //remove dialog
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
    let blogPostEls = blogsArr.map((post) => {
        let blogPostEl = createBlogPost(post.title, post.date, post.summary);
        let buttonEls = blogPostEl.querySelectorAll('button');
        //add listener to edit button
        let editButtonEl = buttonEls[0];
//TODO
        editButtonEl.addEventListener('click', () => {
            console.log(`edit button clicked on ${post.title}`);
            //get from table
                //place values into blogDialog
            let blogDialog = createBlogDialog(post.title, post.date, post.summary);

            //open blogDialog
        });

        //add listener to delete button
        let deleteButtonEl = buttonEls[1];
        deleteButtonEl.addEventListener('click', () => {
            console.log(`delete button clicked on ${post.title}`);
            //delete from array

            //delete from local storage

            //remove from table
        });

        return blogPostEl;
    });
    //place array elements into table
    blogPostEls.forEach(postEl => addToTable(postEl));
});
