import {createBlogDialog, createBlogPost} from './blog.js';

//will add listeners from crud.html in here
var blogsArr;
var blogsArrLength; //used because array length lies when using delete

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
            blogsArr.push(blog);

            //remove empty message
            let message = document.getElementById('empty-message');
            message.classList.add('hide');
        }
        else //editing
        {
            //replace old, with edited
            let index = blogsArr.findIndex((post) => {
                if(post) {
                    return (post.title === oldPost.title &&
                        post.date === oldPost.date &&
                        post.summary === oldPost.summary);
                }
            });
            blogsArr[index] = blog;
        }
        updateBlogHolder();
        //remove dialog
        dialog.close(false);
        dialog.parentNode.removeChild(dialog);

        //update local storage
        window.localStorage.setItem('blogs', JSON.stringify(blogsArr));
    });
};

const addToBlogHolder = (item) => {
    let blogHolder = document.getElementById('blogs');
    blogHolder.appendChild(item);
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
        //update local storage
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
            updateBlogHolder();
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
        blogsArr = [{title: 'Initial1', date: '1914-11-12', summary: '1 Here is a short summary of something words.'},
                        {title: 'Initial2', date: '1914-11-12', summary: '2 Here is a short summary of somethings words.'}];
        window.localStorage.setItem('blogs', JSON.stringify(blogsArr));
    }

    updateBlogHolder();
});

//populate blog holder
const updateBlogHolder = () => {
    //create blog post elements from blogs in array
    let blogHolder = document.getElementById('blogs');
    blogHolder.innerHTML = '';
    let blogPostEls = []
    blogsArrLength = 0;
    blogsArr.forEach(post => {
        if(post) {
            let blogPostEl = createBlogPost(post.title, post.date, post.summary);
            setUpEdit(blogPostEl);
            setUpDelete(blogPostEl);
            blogPostEls.push(blogPostEl);
            blogsArrLength++;
        }
    });

    //place blog post elements in blog holder 
    blogPostEls.forEach(postEl => addToBlogHolder(postEl));
};