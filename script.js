const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear");
const filter = document.getElementById("filter");

function addItem(e) {
  e.preventDefault();

  if (itemInput.value === "") {
    alert("Please enter text for new item");
    return;
  }

  // create list item, button and icon
  const newListItem = document.createElement("li");
  const button = createButton("remove-item btn-link text-red");
  const icon = createIcon("fa-solid fa-xmark");

  // add elements together
  newListItem.appendChild(document.createTextNode(itemInput.value));
  button.appendChild(icon);
  newListItem.appendChild(button);

  // add list item to list
  itemList.appendChild(newListItem);

  // clear input
  itemInput.value = "";

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

// function to remove an item
function removeItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    e.target.parentElement.parentElement.remove();
  }

  const items = document.querySelectorAll("li");
  if (items.length === 0) {
    resetUI();
  }
}

// function to clear all items
function clearItems() {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
  resetUI();
}

// function to reset the UI
function resetUI() {
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

// add event listeners
itemForm.addEventListener("submit", addItem);
itemList.addEventListener("click", removeItem);
clearBtn.addEventListener("click", clearItems);
filter.addEventListener("input", filterItems);
