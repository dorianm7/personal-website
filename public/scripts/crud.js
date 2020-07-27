import {createBlogDialog, createBlogPost} from './blog.js';

//will add listeners from crud.html in here
var blogsArr;
var blogsArrLength;

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
        setUpCancel(dialog);
        setUpSave(dialog);
        document.body.appendChild(dialog);
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
        if(!oldPost)
        {
            //add blog object to array
            blogsArr.push(blog);

            //add blog object to local storage

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

        //add to local storage
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

const replaceInTable = (item, index) => {
    let blogTableRowTD = document.createElement('td');
    let table = document.getElementById('blogs');
    let tableRows = table.querySelectorAll('tr');

    blogTableRowTD.appendChild(item);
    tableRows[index].innerHTML = '';//remove innards
    tableRows[index].appendChild(blogTableRowTD);
};

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

    if(!blogsArr){
        //add initial array values to local storage
        blogsArr = [{title: 'Initial1', date: '1914-11-12', summary: 'Summary1'},
                        {title: 'Initial2', date: '1914-11-12', summary: 'Summary2'}];
        window.localStorage.setItem('blogs', JSON.stringify(blogsArr));
    }

    //read array
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

    //place array elements into table
    blogPostEls.forEach(postEl => addToTable(postEl));
});