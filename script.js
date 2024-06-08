document.addEventListener("DOMContentLoaded", () => {
  const authSection = document.getElementById("auth-section");
  const mainSection = document.getElementById("main-section");
  const paymentSection = document.getElementById("payment-section");

  const registerForm = document.getElementById("register-form");
  const loginForm = document.getElementById("login-form");
  const logoutBtn = document.getElementById("logout-btn");
  const categoryFilter = document.getElementById("category-filter");
  const foodItemsDiv = document.getElementById("food-items");
  const cartItemsUl = document.getElementById("cart-items");
  const checkoutBtn = document.getElementById("checkout-btn");
  const paymentForm = document.getElementById("payment-form");

  const users = [];
  let loggedInUser = null;
  let cart = [];

  const foodItems = [
    { id: 1, name: "Pepperoni Pizza", category: "pizza" },
    { id: 2, name: "Cheese Pizza", category: "pizza" },
    { id: 3, name: "veg Burger", category: "burgers" },
    { id: 4, name: "Chicken Burger", category: "burgers" },
    { id: 5, name: "California Roll", category: "sushi" },
    { id: 6, name: "Salmon Roll", category: "sushi" },
  ];

  function renderFoodItems(items) {
    foodItemsDiv.innerHTML = "";
    items.forEach((item) => {
      const foodDiv = document.createElement("div");
      foodDiv.className = "food-item";
      foodDiv.innerHTML = `
                <p>${item.name}</p>
                <button onclick="addToCart(${item.id})">Add to Cart</button>
            `;
      foodItemsDiv.appendChild(foodDiv);
    });
  }

  function addToCart(itemId) {
    const item = foodItems.find((item) => item.id === itemId);
    cart.push(item);
    renderCartItems();
  }

  function renderCartItems() {
    cartItemsUl.innerHTML = "";
    cart.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item.name;
      cartItemsUl.appendChild(li);
    });
  }

  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("reg-username").value;
    const password = document.getElementById("reg-password").value;
    users.push({ username, password });
    alert("Registration successful");
  });

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;
    const user = users.find(
      (user) => user.username === username && user.password === password
    );
    if (user) {
      loggedInUser = user;
      authSection.style.display = "none";
      mainSection.style.display = "block";
      renderFoodItems(foodItems);
    } else {
      alert("Invalid login credentials");
    }
  });

  logoutBtn.addEventListener("click", () => {
    loggedInUser = null;
    mainSection.style.display = "none";
    authSection.style.display = "block";
  });

  categoryFilter.addEventListener("change", (e) => {
    const category = e.target.value;
    if (category === "all") {
      renderFoodItems(foodItems);
    } else {
      const filteredItems = foodItems.filter(
        (item) => item.category === category
      );
      renderFoodItems(filteredItems);
    }
  });

  checkoutBtn.addEventListener("click", () => {
    mainSection.style.display = "none";
    paymentSection.style.display = "block";
  });

  paymentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Payment successful");
    cart = [];
    renderCartItems();
    paymentSection.style.display = "none";
    mainSection.style.display = "block";
  });
});
