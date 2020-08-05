import {createBlogDialog, createBlogPost} from './blog.js';
import {database, getBlogsDB} from './firebase-db.js';

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
        if(!oldPost) { //new post
            database.ref(`/blogs/${blog.title}`).set(blog)
                .catch((e) => alert(e));
        }
        else { //editing
            database.ref(`/blogs/${oldPost.title}`).remove();
            database.ref(`/blogs/${blog.title}`).set(blog)
                .catch((e) => alert(e));
        }
        updateBlogHolderDB();
        //remove dialog
        dialog.close(false);
        dialog.parentNode.removeChild(dialog);
    });
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
    });
};

//sets up the delete button for the given blog post element
const setUpDelete = (blogPostEl) => {
    let buttonEls = blogPostEl.querySelectorAll('button');
    let deleteButtonEl = buttonEls[1];
    let postTitle = blogPostEl.querySelector('.blog-title').innerText;

    deleteButtonEl.addEventListener('click', () => {
        database.ref(`/blogs/${postTitle}`).remove()
            .catch((e) => alert(e));
        updateBlogHolderDB();
    });
};

const updateBlogHolderDB = async (edit=true) => {
    let blogPostEl;
    let post;
    let blogsArrLength = 0;
    let blogsDB = await getBlogsDB();
    let blogHolder = document.getElementById('blog-holder');
    blogHolder.innerHTML = '';

    for(let key in blogsDB) {
        post = blogsDB[key];
        blogPostEl = createBlogPost(post.title, post.date, post.summary, edit);
        if(edit) {
            setUpEdit(blogPostEl);
            setUpDelete(blogPostEl);
        }
        blogHolder.appendChild(blogPostEl);
        blogsArrLength++;
    }

    updateEmptyMessage(blogsArrLength);
};

const updateEmptyMessage = (blogsLength) => {
    let emptyMessage = document.getElementById('empty-message');
    if(blogsLength == 0) {
        emptyMessage.classList.remove('hide');
    }
    else{
        emptyMessage.classList.add('hide');
    }
};

//Wire up elements here
document.addEventListener('DOMContentLoaded', () => {
    if(window.location.href.includes('blogedit.html')) {
        setUpAddButton();
        updateBlogHolderDB();
    }
    else{
        updateBlogHolderDB(false);
    }
});
