const blogDialogTemplate = document.createElement('template');
blogDialogTemplate.innerHTML =  `<dialog>
                                    <form method="dialog">
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
const createBlogDialog = () => {
    return blogDialogTemplate.content
                            .firstElementChild
                            .cloneNode(true);
} 

export {createBlogDialog};