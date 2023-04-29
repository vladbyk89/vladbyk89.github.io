// if user is in index.html run this
if (window.location.pathname.endsWith("/")) {
  window.addEventListener("load", async () => {
    currentUser = await User.setCurrentUser();
    if (currentUser) {
      // window.location.href = "/main";
    }
  });
  signUpPanelBtn.addEventListener("click", () => {
    entryPageMainContainer.classList.add("active");
  });

  signInPanelBtn.addEventListener("click", () => {
    entryPageMainContainer.classList.remove("active");
  });
}

// ---------------------- forgotPassword.html ----------------------
if (window.location.pathname.endsWith("/passwordRecovery")) {
  // recoveryForm.addEventListener("submit", handleRecovery);
}

// ---------------------- main.html ----------------------
if (window.location.pathname.endsWith("/main")) {
  window.addEventListener("load", async () => {
    currentUser = await User.setCurrentUser();
    if (!currentUser) {
      window.location.href = "/";
    }
    const boards: BoardTemplate[] = await getUserBoards(currentUser._id);
    renderBoardsToMain(boards);
  });

  createBoardWindowBtn.addEventListener(
    "click",
    () => (newBoardWindow.style.display = "flex")
  );

  cancelCreateBoardBtn.addEventListener(
    "click",
    () => (newBoardWindow.style.display = "none")
  );

  boardImageBtn.addEventListener("click", () => {
    backgroundImageSelectionDiv.style.display = "grid";

    const backgroundImages = document.querySelectorAll(
      ".backgroundImage"
    ) as NodeListOf<HTMLImageElement>;

    backgroundImages.forEach((img) => {
      img.addEventListener("click", () => {
        imageDisplayedInCreate.src = img.src;
        backgroundImageSelectionDiv.style.display = "none";
      });
    });
  });

  createBoardBtn.addEventListener("click", () =>
    createBoard(
      newBoardName.value,
      imageDisplayedInCreate.src.toString(),
      currentUser._id
    )
  );

  searchBar.addEventListener("keyup", async () => {
    const boards: BoardTemplate[] = await getUserBoards(currentUser._id);

    if (searchBar.value != "") {
      boardArea.innerHTML = "";

      const listToDisplay: BoardTemplate[] = boards.filter((ele) =>
        ele.boardName.toLowerCase().includes(searchBar.value)
      );
      if (listToDisplay) {
        renderBoardsToMain(listToDisplay);
      }
    } else {
      renderBoardsToMain(boards);
    }
  });

  boardArea.addEventListener("click", async (e) => {
    const target = e.target as HTMLElement;
    if (target.dataset.name) {
      const check = confirm("Are you sure you want to delete?");
      if (check) {
        await Board.deleteBoard(target.dataset.name);
        const boards = await getUserBoards(currentUser._id);
        renderBoardsToMain(boards);
      }
    }

    if (target.classList.contains("boardClick")) {
      const board = target.parentElement as HTMLDivElement;
      if (board.id) {
        await Board.setCurrentBoard(board.id);
        window.location.href = "/board";
      }
    }
  });
}

//---------------------- board.html ----------------------
if (window.location.pathname.endsWith("/board")) {
  window.addEventListener("load", async () => {
    await Board.getCurrentBoard();
    renderBoardInBoardPage();
    console.log(currentBoard);
    if (!currentBoard) {
      window.location.href = "/";
    }
  });

  addListBtn.addEventListener("click", () =>
    List.createList(newListInput.value, currentBoard._id)
  );

  editBoardBtn.addEventListener("click", () => {
    Board.edit(nameInputEle.value, imageDisplayedInEdit.src, currentBoard._id);
    editBoardWindow.style.display = "none";
  });

  updatedBoardImageBtn.addEventListener("click", () => {
    backgroundImageSelectionDiv.style.display = "grid";

    const backgroundImages = document.querySelectorAll(
      ".backgroundImage"
    ) as NodeListOf<HTMLImageElement>;
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

    if (cardIsDragged) return;

    const leftList = insertLeftOfLisk(boardContainer, clientX);
    const curList = boardContainer.querySelector(".isDragging") as HTMLElement;

    if (!leftList) {
      boardContainer.insertBefore(curList, trashCanDiv);
    } else {
      boardContainer.insertBefore(curList, leftList);
    }
    // currentBoard.update();
  });

  window.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    if (target.className === "newCardBtn") {
      const listElement = target.closest(
        ".boardContainer__main__list"
      ) as HTMLDivElement;
      const newCardTextArea = listElement.querySelector(
        ".newCardTextArea"
      ) as HTMLTextAreaElement;
      if (newCardTextArea.value == "") return;
      createCardElement(newCardTextArea.value, listElement);
      newCardTextArea.value = "";
    }
    if (target.classList.contains("cancelEditBoardBtn")) {
      editBoardWindow.style.display = "none";
    }
  });

  boardContainer.addEventListener("keyup", () => {
    // currentBoard.update();
  });
  newListInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      List.createList(newListInput.value, currentBoard._id);
    }
  });

  trashCan.addEventListener("drop", () => {
    const confirmDelete = confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      const element = document.querySelector(".isDragging") as HTMLDivElement;
      element.remove();
      // currentBoard.update();
    }
  });
  document.addEventListener("dragover", (event) => {
    event.preventDefault();
  });
}
