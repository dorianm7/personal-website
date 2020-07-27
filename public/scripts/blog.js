const blogDialogTemplate = document.createElement('template');
blogDialogTemplate.innerHTML =  `<dialog>
                                    <form method="dialog">
                                        <label for="title">Title</label>
                                        <input type="text" id="title">
                                        <label for="date">Date</label>
                                        <input type="date" id="date">
                                        <label for="summary">Summary</label>
                                        <input type="text" id="summary">

                                        <input type="submit" value="Save" id="save" class="button-like">
                                        <input type="reset" value="Cancel" id="cancel" class="button-like">
                                    </form>
                                </dialog>`;

const blogPostTemplate = document.createElement('template');
blogPostTemplate.innerHTML =    `<div class="blog-post">
                                    <p class="blog-title"></p>
                                    <time class="blog-date"></time>
                                    <p class="blog-summary"></p>
                                    <button class="blog-button button-like"><img src="./images/pencil.png"></img>Edit</button>
                                    <button class="blog-button button-like"><img src="./images/delete.png"> Delete</button>
                                </div>`;

const createBlogDialog = (title = '', date = '', summary = '') => {
    let blogDialog = blogDialogTemplate.content
                            .firstElementChild
                            .cloneNode(true);
    let titleEl = blogDialog.querySelector('#title'); 
    let timeEl = blogDialog.querySelector('#date');
    let summaryEl = blogDialog.querySelector('#summary');
    titleEl.value = title;
    timeEl.value = date; 
    summaryEl.value = summary;
    return blogDialog;
} 

const createBlogPost = (title = '', date = '', summary = '') => {
    let blogPost = blogPostTemplate.content
                                    .firstElementChild
                                    .cloneNode(true);
    let titleEl = blogPost.querySelector('.blog-title');
    let timeEl = blogPost.querySelector('.blog-date');
    let summaryEl = blogPost.querySelector('.blog-summary');
    titleEl.innerText = title;
    timeEl.innerText = date;
    summaryEl.innerText = summary;
    return blogPost;
}

export {createBlogDialog, createBlogPost};