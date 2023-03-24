// Get elements from the DOM
const landingPage = document.querySelector(".landing-page");
const mainPage = document.querySelector(".main-page");
const nameInput = document.getElementById("nameInput");
const userName = document.getElementById("userName");
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");

let items = []; // Array to store the to-do list items

// Function to proceed to main page
function proceedToMainPage() {
  if (nameInput.value.trim() === "") {
    alert("Please enter your name.");
    return;
  }
  userName.textContent = nameInput.value.trim();
  landingPage.classList.add("d-none");
  mainPage.classList.remove("d-none");
}

// Add an event listener to the nameInput element
nameInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && nameInput.value.trim() !== "") {
    // Check if the key pressed was the enter key and the name input is not empty
    proceedToMainPage();
  }
});

// Add an event listener to the document for "keypress" event
document.addEventListener("keypress", (event) => {
  if (event.key === "Enter" && event.target === todoInput) {
    // Check if the key pressed was the enter key and the event target is the todo input
    addItem();
  }
});

// Add an event listener to the proceed button
const proceedButton = document.getElementById("proceedButton");
proceedButton.addEventListener("click", proceedToMainPage);

// Function to add an item to the list
function addItem() {
  const itemText = todoInput.value.trim();
  if (itemText === "") {
    alert("Please enter an item.");
    return;
  }
  const item = {
    id: Date.now(),
    text: itemText,
  };
  items.unshift(item);
  renderItems();
  todoInput.value = "";
}

// Function to remove an item from the list
function removeItem(itemId) {
  items = items.filter((item) => item.id !== itemId);
  renderItems();
}

// Function to render the items in the list
function renderItems() {
  todoList.innerHTML = "";
  items.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.className = "list-group-item";
    listItem.innerHTML = `
  <span>${item.text}</span>
  <button class="delete-btn"><i class="fa-regular fa-trash-can"></i></button>
  
`;
    listItem.querySelector(".delete-btn").addEventListener("click", () => {
      removeItem(item.id);
    });
    todoList.appendChild(listItem);
  });
}

// Function to exit to landing page
function exitToLandingPage() {
  landingPage.classList.remove("d-none");
  mainPage.classList.add("d-none");
  nameInput.value = "";
  items.length = 0;
  todoList.innerHTML = "";
  todoInput.value = "";
 
}
