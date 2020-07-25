const blogDialogTemplate = document.createElement('template');
blogDialogTemplate.innerHTML =  `<dialog>
                                    <form>
                                        <label for="title">Title</label>
                                        <input type="text" id="title">
                                        <label for="date">Date</label>
                                        <input type="date" id="date">
                                        <label for="summary">Summary</label>
                                        <input type="text" id="summary">

                                        <input type="reset" value="Cancel" id="cancel">
                                        <input type="submit" value="Save" id="save">
                                    </form>
                                </dialog>`;

const blogPostTemplate = document.createElement('template');
blogPostTemplate.innerHTML =    `<div class="blog-post">
                                    <p class="blog-title"></p>
                                    <time class="blog-time"></time>
                                    <p class="blog-summary">
                                    <button class="blog-button">Edit</button>
                                    <button class="blog-button">Delete</button>
                                </div>`;

//not adding listeners yet.
const createBlogDialog = (title = '', date = '', summary = '') => {
    let dialog = blogDialogTemplate.content
                            .firstElementChild
                            .cloneNode(true);
    let titleEl = dialog.querySelector('#title');
    let dateEl = dialog.querySelector('#date');
    let summaryEl = dialog.querySelector('#summary');
    titleEl.value = title;
    dateEl.value = date;
    summaryEl.value = summary; 

    return dialog;
} 
