const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear");
const filter = document.getElementById("filter");
const formBtn = itemForm.querySelector("button");
let isEditMode = false;

resetUI();

function displayItems() {
    let items = getItemsFromStorage();
    items.forEach((item) => addItemToDOM(item));
}

function onAddItemSubmit(e) {
    e.preventDefault();

    if (itemInput.value === "") {
        alert("Please enter text for new item");
        return;
    }

    if (isEditMode) {
        const itemToEdit = itemList.querySelector(".edit-mode");
        removeItemFromStorage(itemToEdit.textContent);
        itemToEdit.remove();
    } else {
        if (checkDuplicates(itemInput.value)) {
            alert("Item exists already");
            return;
        }
    }

    addItemToDOM(itemInput.value);
    addItemToStorage(itemInput.value);

    // clear input
    itemInput.value = "";
    isEditMode = false;
    formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
    formBtn.style.backgroundColor = "#333";
}

function addItemToDOM(item) {
    // create list item, button and icon
    const newListItem = document.createElement("li");
    const button = createButton("remove-item btn-link text-red");
    const icon = createIcon("fa-solid fa-xmark");

    // add elements together
    newListItem.appendChild(document.createTextNode(item));
    button.appendChild(icon);
    newListItem.appendChild(button);

    // add list item to DOM
    itemList.appendChild(newListItem);

    // add filter and clear all buttons
    clearBtn.style.display = "block";
    filter.style.display = "block";
}

// function to create a button, applies given classes
function createButton(classes) {
    const button = document.createElement("button");
    button.className = classes;
    return button;
}

// function to create an icon, applies given classes
function createIcon(classes) {
    const icon = document.createElement("i");
    icon.className = classes;
    return icon;
}

function addItemToStorage(item) {
    const itemsFromStorage = getItemsFromStorage();

    // add new item to array
    itemsFromStorage.push(item);

    // add items back to local storage
    localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage() {
    let itemsFromStorage;

    if (localStorage.getItem("items") === null) {
        itemsFromStorage = [];
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem("items"));
    }

    return itemsFromStorage;
}

function checkDuplicates(item) {
    const itemsFromStorage = getItemsFromStorage();
    return itemsFromStorage.includes(item);
}

function onClickItem(e) {
    if (e.target.parentElement.classList.contains("remove-item")) {
        removeItem(e.target.parentElement.parentElement);
    } else {
        console.log("editing...");
        setItemToEdit(e.target);
    }
}

function setItemToEdit(item) {
    isEditMode = true;

    //clear other selected items
    itemList
        .querySelectorAll("li")
        .forEach((item) => item.classList.remove("edit-mode"));

    item.classList.add("edit-mode");
    formBtn.innerHTML = '<i class="fa-solid fa-pen"></i>    Update Item';
    formBtn.style.backgroundColor = "#228B22";

    itemInput.value = item.textContent;
}

// function to remove an item
function removeItem(listItem) {
    if (confirm("Are you sure?")) {
        listItem.remove();

        // remove item from storage
        removeItemFromStorage(listItem.textContent);
    }

    const items = document.querySelectorAll("li");
    if (items.length === 0) {
        resetUI();
    }
}

function removeItemFromStorage(itemText) {
    let items = getItemsFromStorage();

    // filter items to delete selected one
    items = items.filter((item) => item != itemText);

    // restore the correct items after deletion
    localStorage.setItem("items", JSON.stringify(items));
}

// function to clear all items
function clearItems() {
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }

    // clear from local storage
    localStorage.clear("items");

    resetUI();
}

// function to reset the UI
function resetUI() {
    itemInput.value = "";

    clearBtn.style.display = "none";
    filter.style.display = "none";
}

// function for filter/searching through items
function filterItems(e) {
    const text = e.target.value.toLowerCase();
    const items = itemList.querySelectorAll("li");

    items.forEach((item) => {
        const itemName = item.firstChild.textContent.toLowerCase();
        if (itemName.indexOf(text) != -1) {
            item.style.display = "flex";
        } else {
            item.style.display = "none";
        }
    });
}

// Initialise App
function init() {
    // add event listeners
    itemForm.addEventListener("submit", onAddItemSubmit);
    itemList.addEventListener("click", onClickItem);
    clearBtn.addEventListener("click", clearItems);
    filter.addEventListener("input", filterItems);
    document.addEventListener("DOMContentLoaded", displayItems);
}

init();
