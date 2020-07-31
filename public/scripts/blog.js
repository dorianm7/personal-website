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

const blogPostEditTemplate = document.createElement('template');
blogPostEditTemplate.innerHTML =    `<section class="full-card">
                                    <h3 class="blog-title"></h3>
                                    <time class="blog-date"></time>
                                    <p class="blog-summary"></p>
                                    <button class="blog-button button-like"><svg style="width:24px;height:24px" viewBox="0 0 24 24">
    <path fill="currentColor" d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
</svg>Edit</button>
                                    <button class="blog-button button-like"><svg style="width:24px;height:24px" viewBox="0 0 24 24">
    <path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
</svg>Delete</button>
                                </section>`;

const blogPostTemplate = document.createElement('template');
blogPostTemplate.innerHTML =    `<section class="full-card">
                                    <h3 class="blog-title"></h3>
                                    <time class="blog-date"></time>
                                    <p class="blog-summary"></p>
                                </section>`;

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

const createBlogPost = (title = '', date = '', summary = '', edit=true) => {
    let blogPost = edit ? blogPostEditTemplate.content
                                    .firstElementChild
                                    .cloneNode(true)
                        : blogPostTemplate.content
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