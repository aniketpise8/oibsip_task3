document.addEventListener("DOMContentLoaded", function () {
    const navButtons = document.querySelectorAll('.nav-button');
    const dataItems = document.querySelectorAll(".data-item");
    const addNewButton = document.getElementById("add-new");
    const allNotesButton = document.getElementById("all-notes");

    function hideAllItems() {
        dataItems.forEach(item => {
            item.style.display = "none";
        });
    }

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            navButtons.forEach(btn => btn.classList.remove('active-tab'));
            button.classList.add('active-tab');
            hideAllItems();

            if (button === addNewButton) {
                dataItems.forEach(item => {
                    item.style.display = (item.style.display === "none" || item.style.display === "") ? "block" : "none";
                });

                addNewButton.classList.remove('active-tab');
                allNotesButton.classList.add("active-tab");
            }
        });
    });

    hideAllItems();
    allNotesButton.classList.add("active-tab");

    let notesData = [];

    function showNotesList(notes) {
        const notesList = document.querySelector('#notes-list');
        notesList.innerHTML = '';

        for (const note of notes) {
            const noteItem = document.createElement('div');
            noteItem.classList.add('note-item');

            const noteAction = document.createElement('div');
            noteAction.classList.add('note-action');

            const noteTitle = document.createElement('div');
            noteTitle.classList.add('note-title');
            noteTitle.textContent = note.title;

            const buttonBlock = document.createElement('div');
            buttonBlock.classList.add('button-block');

            const checkButton = document.createElement('button');
            if (note.status !== "completed") {
                const checkIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>`;
                checkButton.innerHTML = checkIcon;

                checkButton.addEventListener('click', function () {
                    note.status = "completed";
                    buttonBlock.removeChild(checkButton);

                    if (pendingButton.classList.contains('active-tab')) {
                        showPendingNotes(notes);
                    } else {
                        showAllNotes(notes);
                    }
                });

                buttonBlock.appendChild(checkButton);
            }

            if (note.status === "deleted") {
                buttonBlock.removeChild(checkButton);

                const restoreButton = document.createElement('button');
                const restoreIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M105.1 202.6c7.7-21.8 20.2-42.3 37.8-59.8c62.5-62.5 163.8-62.5 226.3 0L386.3 160H336c-17.7 0-32 14.3-32 32s14.3 32 32 32H463.5c0 0 0 0 0 0h.4c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32s-32 14.3-32 32v51.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5zM39 289.3c-5 1.5-9.8 4.2-13.7 8.2c-4 4-6.7 8.8-8.1 14c-.3 1.2-.6 2.5-.8 3.8c-.3 1.7-.4 3.4-.4 5.1V448c0 17.7 14.3 32 32 32s32-14.3 32-32V396.9l17.6 17.5 0 0c87.5 87.4 229.3 87.4 316.7 0c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.5 62.5-163.8 62.5-226.3 0l-.1-.1L125.6 352H176c17.7 0 32-14.3 32-32s-14.3-32-32-32H48.4c-1.6 0-3.2 .1-4.8 .3s-3.1 .5-4.6 1z"/></svg>`;
                restoreButton.innerHTML = restoreIcon;

                restoreButton.addEventListener('click', function () {
                    note.status = note.previousStatus;
                    showDeletedNotes(notes);
                });

                buttonBlock.appendChild(restoreButton);
            }

            const trashButton = document.createElement('button');
            const trashIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>`;
            trashButton.innerHTML = trashIcon;

            trashButton.addEventListener('click', function () {
                if (deletedButton.classList.contains('active-tab')) {
                    note.status = "deleted";
                    const noteIndex = notesData.indexOf(note);
                    if (noteIndex !== -1) {
                        notesData.splice(noteIndex, 1);
                    }
                    showDeletedNotes();
                } else {
                    note.previousStatus = note.status;
                    note.status = "deleted";
                    showAllNotes(notesData);
                }
            });

            buttonBlock.appendChild(trashButton);

            noteAction.appendChild(noteTitle);
            noteAction.appendChild(buttonBlock);

            const noteDescription = document.createElement('div');
            noteDescription.classList.add('note-short-description');
            noteDescription.textContent = note.description;

            noteItem.appendChild(noteAction);
            noteItem.appendChild(noteDescription);

            notesList.appendChild(noteItem);
        }
    }

    const saveButton = document.querySelector('#button-block-input-area button:last-child');
    const discardButton = document.querySelector('#button-block-input-area button:first-child');

    saveButton.addEventListener('click', saveNote);
    discardButton.addEventListener('click', discardNote);

    function saveNote() {
        const titleInput = document.querySelector('#title-input-div input');
        const descriptionInput = document.querySelector('#description-input-div textarea');

        const title = titleInput.value;
        const description = descriptionInput.value;
        const status = "pending";
        const previousStatus = status;

        if (title && description) {
            const note = { title, description, status, previousStatus };
            notesData.push(note);

            hideAllItems();
            showNotesList(notesData);

            titleInput.value = '';
            descriptionInput.value = '';
        }
    }

    allNotesButton.addEventListener("click", showAllNotes);

    function showAllNotes() {
        const nonDeletedNotes = notesData.filter(note => note.status !== "deleted");
        showNotesList(nonDeletedNotes);
    }

    const pendingButton = document.getElementById("pending-notes");
    pendingButton.addEventListener("click", showPendingNotes);

    function showPendingNotes() {
        const pendingNotes = notesData.filter(note => note.status === "pending");
        showNotesList(pendingNotes);
    }

    const completedButton = document.getElementById("completed-notes");
    completedButton.addEventListener("click", showCompletedNotes);

    function showCompletedNotes() {
        const completedNotes = notesData.filter(note => note.status === "completed");
        showNotesList(completedNotes);
    }

    const deletedButton = document.getElementById("deleted-notes");
    deletedButton.addEventListener("click", showDeletedNotes);

    function showDeletedNotes() {
        const deletedNotes = notesData.filter(note => note.status === "deleted");
        showNotesList(deletedNotes);
    }

    function discardNote() {
        const titleInput = document.querySelector('#title-input-div input');
        const descriptionInput = document.querySelector('#description-input-div textarea');

        titleInput.value = '';
        descriptionInput.value = '';

        hideAllItems();
    }
});

