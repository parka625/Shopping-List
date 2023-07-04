const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");

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

itemForm.addEventListener("submit", addItem);
