"use strict";
// if user is in index.html run this
if (window.location.pathname.endsWith("/")) {
    // window.addEventListener("load", () => {
    //   if (localStorage.getItem("currentUser")) {
    //     window.location.href = "main.html";
    //   }
    // });
    signUpPanelBtn.addEventListener("click", () => {
        entryPageMainContainer.classList.add("active");
    });
    signInPanelBtn.addEventListener("click", () => {
        entryPageMainContainer.classList.remove("active");
    });
    // signUpForm.addEventListener("submit", handleSignUp);
    // signInForm.addEventListener("submit", handleSignIn);
    // signInForm.addEventListener("keydown", (e) => {
    //   if (e.key == "Enter") {
    //     if (userNameInput.value === "" || passwordInput.value === "") {
    //       return;
    //     }
    //     handleSignIn(e);
    //   }
    // });
}
// ---------------------- forgotPassword.html ----------------------
if (window.location.pathname.endsWith("forgotPassword.html")) {
    recoveryForm.addEventListener("submit", handleRecovery);
}
// ---------------------- main.html ----------------------
if (window.location.pathname.endsWith("/main")) {
    User.currentUserFromStorage();
    // window.addEventListener("load", () => {
    //   if (!localStorage.getItem("currentUser")) {
    //     window.location.href = "index.html";
    //   }
    // });
    // renderBoardsToMain(currentUser.boardList);
    createBoardWindowBtn.addEventListener("click", () => (newBoardWindow.style.display = "flex"));
    cancelCreateBoardBtn.addEventListener("click", () => (newBoardWindow.style.display = "none"));
    boardImageBtn.addEventListener("click", () => {
        backgroundImageSelectionDiv.style.display = "grid";
        const backgroundImages = document.querySelectorAll(".backgroundImage");
        backgroundImages.forEach((img) => {
            img.addEventListener("click", () => {
                imageDisplayedInCreate.src = img.src;
                backgroundImageSelectionDiv.style.display = "none";
            });
        });
    });
    createBoardBtn.addEventListener("click", () => createBoard(newBoardName.value, imageDisplayedInCreate.src.toString()));
    searchBar.addEventListener("keyup", () => {
        if (searchBar.value != "") {
            boardArea.innerHTML = "";
            const listToDisplay = currentUser.boardList.filter((ele) => ele.name.toLowerCase().includes(searchBar.value));
            if (listToDisplay) {
                renderBoardsToMain(listToDisplay);
            }
        }
        else {
            renderBoardsToMain(currentUser.boardList);
        }
    });
    boardArea.addEventListener("click", (e) => {
        const target = e.target;
        if (target.dataset.name) {
            const check = confirm("Are you sure you want to delete?");
            if (check)
                Board.deleteBoard(target.dataset.name);
            renderBoardsToMain(currentUser.boardList);
        }
        if (target.classList.contains("boardClick")) {
            Board.setCurrentBoard(target.innerHTML);
            window.location.href = "board.html";
        }
    });
}
//---------------------- board.html ----------------------
if (window.location.pathname.endsWith("board.html")) {
    window.addEventListener("load", () => {
        if (!localStorage.getItem("currentUser")) {
            window.location.href = "index.html";
        }
    });
    renderBoardInBoardPage();
    addListBtn.addEventListener("click", () => List.createList(newListInput.value));
    editBoardBtn.addEventListener("click", () => {
        currentBoard.edit(nameInputEle.value, imageDisplayedInEdit.src);
        editBoardWindow.style.display = "none";
    });
    updatedBoardImageBtn.addEventListener("click", () => {
        backgroundImageSelectionDiv.style.display = "grid";
        const backgroundImages = document.querySelectorAll(".backgroundImage");
        backgroundImages.forEach((img) => {
            img.addEventListener("click", () => {
                imageDisplayedInEdit.src = img.src;
                backgroundImageSelectionDiv.style.display = "none";
            });
        });
    });
    boardContainer.addEventListener("dragover", ({ clientX }) => {
        let cardIsDragged = false;
        cards.forEach((card) => {
            if (card.classList.contains("isDragging")) {
                cardIsDragged = true;
            }
        });
        if (cardIsDragged)
            return;
        const leftList = insertLeftOfLisk(boardContainer, clientX);
        const curList = boardContainer.querySelector(".isDragging");
        if (!leftList) {
            boardContainer.insertBefore(curList, trashCanDiv);
        }
        else {
            boardContainer.insertBefore(curList, leftList);
        }
        currentBoard.update();
    });
    window.addEventListener("click", (e) => {
        const target = e.target;
        if (target.className === "newCardBtn") {
            const listElement = target.closest(".boardContainer__main__list");
            const newCardTextArea = listElement.querySelector(".newCardTextArea");
            if (newCardTextArea.value == "")
                return;
            createCardElement(newCardTextArea.value, listElement);
            newCardTextArea.value = "";
        }
        if (target.classList.contains("cancelEditBoardBtn")) {
            editBoardWindow.style.display = "none";
        }
    });
    boardContainer.addEventListener("keyup", () => {
        currentBoard.update();
    });
    newListInput.addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
            List.createList(newListInput.value);
        }
    });
    trashCan.addEventListener("drop", () => {
        const confirmDelete = confirm("Are you sure you want to delete?");
        if (confirmDelete) {
            const element = document.querySelector(".isDragging");
            element.remove();
            currentBoard.update();
        }
    });
    document.addEventListener("dragover", (event) => {
        event.preventDefault();
    });
}
