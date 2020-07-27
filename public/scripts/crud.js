import {createBlogDialog, createBlogPost} from './blog.js';

//will add listeners from crud.html in here
var blogsArr;
var blogsArrLength; //used because array length lies when using delete

const tableRowTemplate = document.createElement('template');
tableRowTemplate.innerHTML =    `<tr><td></td></tr>`;

const createTableRow = () => {
    return tableRowTemplate.content
                            .firstElementChild
                            .cloneNode(true);
};

//sets up add button listener
const setUpAddButton = () => {
    let addButton = document.getElementById('add-button');
    addButton.addEventListener('click', () => {
        let dialog = createBlogDialog();
        setUpCancel(dialog);
        setUpSave(dialog);
        document.body.appendChild(dialog);
        dialog.showModal();
    });
};

//sets up the cancel button listener for the dialog given
const setUpCancel = (dialog) => {
    let cancelButton = dialog.querySelector('#cancel');
    cancelButton.addEventListener('click', () => {
        //remove dialog
        dialog.close(false);
        dialog.parentNode.removeChild(dialog);
    });
};

//sets up the save button for the dialog given. oldPost is used when editing.
const setUpSave = (dialog, oldPost = undefined) => {
    let saveButton = dialog.querySelector('#save');
    saveButton.addEventListener('click', () => {
        //get title, date, summary from dialog 
        let titleEl = dialog.querySelector('#title'); 
        let timeEl = dialog.querySelector('#date');
        let summaryEl = dialog.querySelector('#summary');
        let titleString = titleEl.value;
        let dateString = timeEl.value;
        let summaryString = summaryEl.value;

        //create blog object
        let blog = {title: titleString, date: dateString, summary: summaryString};
        if(!oldPost) //new post
        {
            //add blog object to array
            blogsArr.push(blog);

            //place blog post to table
            let blogPost = createBlogPost(blog.title, blog.date, blog.summary);
            setUpEdit(blogPost);
            setUpDelete(blogPost);
            addToTable(blogPost);
            blogsArrLength++;

            //remove empty message
            let message = document.getElementById('empty-message');
            message.classList.add('hide');
        }
        else //editing
        {
            //replace old, with edited
            let index = blogsArr.findIndex((post) => {
                return (post.title === oldPost.title &&
                        post.date === oldPost.date &&
                        post.summary === oldPost.summary);
            });
            blogsArr[index] = blog;
            let blogPost = createBlogPost(blog.title, blog.date, blog.summary);
            setUpEdit(blogPost);
            setUpDelete(blogPost);
            replaceInTable(blogPost, index);
        }
        //remove dialog
        dialog.close(false);
        dialog.parentNode.removeChild(dialog);

        //update local storage
        window.localStorage.setItem('blogs', JSON.stringify(blogsArr));
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

//replaces row data at specified index with item given
const replaceInTable = (item, index) => {
    let blogTableRowTD = document.createElement('td');
    let table = document.getElementById('blogs');
    let tableRows = table.querySelectorAll('tr');

    blogTableRowTD.appendChild(item);
    tableRows[index].innerHTML = '';//remove innards
    tableRows[index].appendChild(blogTableRowTD);
};

//sets up the edit button for the given blog post element
const setUpEdit = (blogPostEl) => {
    let buttonEls = blogPostEl.querySelectorAll('button');
    let editButtonEl = buttonEls[0];
    let oldTitle = blogPostEl.querySelector('.blog-title').innerText;
    let oldDate = blogPostEl.querySelector('.blog-date').innerText;
    let oldSummary = blogPostEl.querySelector('.blog-summary').innerText;

    let oldPost = {title: oldTitle, date: oldDate, summary: oldSummary};

    editButtonEl.addEventListener('click', () => {
        let blogDialog = createBlogDialog(oldTitle, oldDate, oldSummary);
        setUpCancel(blogDialog);
        setUpSave(blogDialog, oldPost);
        document.body.appendChild(blogDialog);
        blogDialog.showModal();
        window.localStorage.setItem('blogs', JSON.stringify(blogsArr));
    });
};

//sets up the delete button for the given blog post element
const setUpDelete = (blogPostEl) => {
    let buttonEls = blogPostEl.querySelectorAll('button');
    let deleteButtonEl = buttonEls[1];
    let postTitle = blogPostEl.querySelector('.blog-title').innerText;
    let postDate = blogPostEl.querySelector('.blog-date').innerText;
    let postSummary = blogPostEl.querySelector('.blog-summary').innerText;
    let toDelete = {title: postTitle, date: postDate, summary: postSummary};

    deleteButtonEl.addEventListener('click', () => {
        let index = blogsArr.findIndex((oldPost) => {
            return (oldPost && toDelete.title === oldPost.title &&
                    toDelete.date === oldPost.date &&
                    toDelete.summary === oldPost.summary);
        });
        if(index >= 0){
            delete blogsArr[index];
            removeFromTable(toDelete);
            blogsArrLength--;
            //delete from local storage
            if(blogsArrLength == 0){
                let emptyMessage = document.getElementById('empty-message');
                emptyMessage.classList.remove('hide');
                window.localStorage.removeItem('blogs');
            }
            else {
                window.localStorage.setItem('blogs', JSON.stringify(blogsArr));
            }
        }
    });
};

//finds and removes the table rows corresponding to post object given
//if duplicate of same post, will all be deleted
const removeFromTable = (postObj) => {
    let table = document.getElementById('blogs');
    let rows = table.querySelectorAll('tr');
    console.log(rows);
    
    rows.forEach((row) => {
        if(row.textContent.includes(postObj.title) &&
            row.innerText.includes(postObj.date) &&
            row.innerText.includes(postObj.summary)) {
                row.parentNode.removeChild(row);
        }
    });
};

//Wire up elements here
document.addEventListener('DOMContentLoaded', () => {
    setUpAddButton();

    //read from local storage, place into array
    blogsArr = JSON.parse(window.localStorage.getItem('blogs'));
    blogsArrLength = 0;

    //if deleted everything, start with some initial blogs
    if(!blogsArr){
        blogsArr = [{title: 'Initial1', date: '1914-11-12', summary: 'Summary1'},
                        {title: 'Initial2', date: '1914-11-12', summary: 'Summary2'}];
        window.localStorage.setItem('blogs', JSON.stringify(blogsArr));
    }

    //create blog post elements from blogs in array
    let blogPostEls = []
    blogsArr.forEach(post => {
        if(post) {
            let blogPostEl = createBlogPost(post.title, post.date, post.summary);
            setUpEdit(blogPostEl);
            setUpDelete(blogPostEl);
            blogsArrLength++;
            blogPostEls.push(blogPostEl);
        }
    });

    //place blog post elements in table
    blogPostEls.forEach(postEl => addToTable(postEl));
});