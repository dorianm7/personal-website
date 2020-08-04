// Part 2
// Will use <dialog> to make your own dialogs
// Using <template> or JS template strings will make code cleaner
// Use DOMPurify 
// Timing issues may or may not be present in this version depending on how you approach it
// Rely on HTML features rather than code writing where possible
// Make sure you know the type of what is returned before wasting lots of time or asking questions

// Define a JS module and import customized dialogs into your page for use
//      You will use variety of DOM methods to add, modify, 
//          and read various aspects of the element put on the page

// functions inside

const myAlertTemplate = document.createElement('template');
myAlertTemplate.innerHTML = `<dialog>
                                <p></p>
                                <button>Ok</button>
                            </dialog>`;

const myConfirmTemplate = document.createElement('template');
myConfirmTemplate.innerHTML =   `<dialog>
                                    <p></p>
                                    <button>Cancel</button>
                                    <button>Ok</button>
                                </dialog>`;

const myPromptTemplate = document.createElement('template');
myPromptTemplate.innerHTML =    `<dialog>
                                    <p></p>
                                    <input type="text">
                                    <button>Cancel</button>
                                    <button>Ok</button>
                                </dialog>`;

const returnTemplate = (type) => {
    let template;
    switch(type) {
        case 'alert':
            template = myAlertTemplate;
            break;
        case 'confirm':
            template = myConfirmTemplate;
            break;
        case 'prompt':
            template = myPromptTemplate;
            break;
    }

    return template;
}

const createDialog = (type, string) => {
    let template = returnTemplate(type);
    let dialog = template.content
                        .firstElementChild
                        .cloneNode(true);
    let pEl = dialog.querySelector('p');
    pEl.innerText = string;
    return dialog;
};

const myAlert = (string) => {
    let dialog = createDialog('alert', string);
    let dialogButton = dialog.querySelector('button');
    dialogButton.addEventListener('click', () => {
        dialog.close();
        dialog.parentNode.removeChild(dialog);
    });

    document.body.appendChild(dialog);
    dialog.showModal();
};

const myConfirm = (string) => {
    let dialog = createDialog('confirm', string);
    let buttonEls = dialog.querySelectorAll('button');
    let cancelButton = buttonEls[0];
    let okButton = buttonEls[1];

    cancelButton.addEventListener('click', () => {
        dialog.close(false);
        dialog.parentNode.removeChild(dialog);
    });

    okButton.addEventListener('click', () => {
        dialog.close(true);
        dialog.parentNode.removeChild(dialog);
    });

    document.body.appendChild(dialog);
    dialog.showModal();
};

const myPrompt = (string) => {
    let dialog = createDialog('prompt', string);
    let textEl = dialog.querySelector('input');
    let buttonEls = dialog.querySelectorAll('button');
    let cancelButton = buttonEls[0];
    let okButton = buttonEls[1];

    cancelButton.addEventListener('click', () => {
        dialog.close(null);
        dialog.parentNode.removeChild(dialog);
    });

    okButton.addEventListener('click', () => {
        dialog.close(textEl.value);
        dialog.parentNode.removeChild(dialog);
    });

    document.body.appendChild(dialog);
    dialog.showModal();
};

// export them at the end
export {myAlert, myConfirm, myPrompt, createDialog};