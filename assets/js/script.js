// nav2
document.addEventListener("DOMContentLoaded", function () {
  // Enable dropdowns to open on click
  let dropdowns = document.querySelectorAll(".dropdown");
  dropdowns.forEach((dropdown) => {
    let toggleButton = dropdown.querySelector(".dropdown-toggle");
    let menu = dropdown.querySelector(".dropdown-menu");

    // Toggle dropdown on click
    toggleButton.addEventListener("click", function (event) {
      event.preventDefault();
      menu.style.display = menu.style.display === "block" ? "none" : "block";
    });

    // Close dropdown when mouse leaves the dropdown area
    dropdown.addEventListener("mouseleave", function () {
      menu.style.display = "none";
    });
  });

  // Submenu hover effect for nested dropdowns
  let submenus = document.querySelectorAll(".dropdown-submenu");
  submenus.forEach((submenu) => {
    let submenuToggle = submenu.querySelector(".dropdown-toggle");
    let submenuMenu = submenu.querySelector(".dropdown-menu");

    // Show submenu on mouse enter
    submenu.addEventListener("mouseenter", function () {
      if (submenuMenu) submenuMenu.style.display = "block";
    });

    // Hide submenu on mouse leave
    submenu.addEventListener("mouseleave", function () {
      if (submenuMenu) submenuMenu.style.display = "none";
    });
  });
});
document.addEventListener("DOMContentLoaded", function () {
  let dropdownToggles = document.querySelectorAll(".dropdown-toggle");

  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", function (event) {
      event.preventDefault();
      let dropdown = this.closest(".dropdown");

      // Toggle the dropdown menu display
      dropdown.classList.toggle("show");
    });
  });
});
// end of nav2
// owl carousel
$(document).ready(function () {
  $(".owl-carousel").owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    autoplay: true,
    autoplayTimeout: 2000, // Set auto-slide delay
    autoplayHoverPause: true, // Pause on hover
    responsive: {
      0: { items: 1 }, // For mobile devices
      600: { items: 2 }, // For small tablets
      900: { items: 3 }, // For tablets
      1200: { items: 4 }, // For small desktops
      1600: { items: 5 }, // For larger desktops
    },
  });
});



// product page js start
// JavaScript to handle like button toggle
document.querySelectorAll(".like-btn").forEach(function (likeBtn) {
  likeBtn.addEventListener("click", function () {
    this.classList.toggle("liked"); // Toggle 'liked' class on click
  });
});

// Quantity control logic

document.addEventListener('DOMContentLoaded', function () {
  // Function to update the quantity display
  function updateQuantity(card, change) {
    let quantityDisplay = card.querySelector('.quantity-display');
    let currentQuantity = parseInt(quantityDisplay.textContent);
    let newQuantity = currentQuantity + change;

    // Ensure quantity is not less than 1
    if (newQuantity < 1) {
      newQuantity = 1;
    }

    quantityDisplay.textContent = newQuantity;
  }

  // Event listener for all increase and decrease buttons
  document.querySelectorAll('.quantity-control').forEach(control => {
    // Handle decrease button
    control.querySelector('.quantity-btn:first-child').addEventListener('click', function () {
      updateQuantity(control.closest('.product-card'), -1);
    });

    // Handle increase button
    control.querySelector('.quantity-btn:last-child').addEventListener('click', function () {
      updateQuantity(control.closest('.product-card'), 1);
    });
  });
});



// Array to hold the discount percentages for each card
const discountPercentages = [20,10, 15, 10, 5, 25, 32, 23, 10, 10]; // Set discounts for each card

// Function to recalculate the discount and update the DOM
function applyDiscount(cardIndex) {
  const originalPriceElement = document.querySelector(`#original-price-${cardIndex}`);
  const discountedPriceElement = document.querySelector(`#discounted-price-${cardIndex}`);
  const discountBadgeElement = document.querySelector(`#discount-badge-${cardIndex}`);

  if (originalPriceElement && discountedPriceElement && discountBadgeElement) {
    // Parse the original price as a number, removing any non-numeric characters
    const originalPrice = parseFloat(originalPriceElement.innerText.replace(/[^0-9.]/g, ''));

    // Get the discount percentage for the current card
    const discountPercentage = discountPercentages[cardIndex - 1]; // Adjust index for 0-based array

    // Calculate the discounted price
    const discountedPrice = originalPrice * (1 - discountPercentage / 100);

    // Update the displayed discounted price and discount badge
    discountedPriceElement.innerText = `₹${discountedPrice.toFixed(2)}`; // Format to 2 decimal places
    discountBadgeElement.innerText = `${discountPercentage}% OFF`; // Update the discount badge text
  }
}

// Run the function for each card on DOMContentLoaded or when an update occurs
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.card').forEach((card, index) => {
    applyDiscount(index + 1); // Call the function for each card, 1-based index
  });
});

// product page js end


// login page 
function goBack() {
  window.history.back();
}
































// vaishnavi cart page js 
// Array of item data, each with unique id, price, and discount

const items = [
  { id: 1, price: 199, discount: 20 },
  { id: 2, price: 250, discount: 25 }
  // Add additional items here as needed
];

// Function to update quantity based on button clicks
function updateQuantity(id, change) {
  const qtyInput = document.getElementById(`item-qty-${id}`);
  let currentQty = parseInt(qtyInput.value);

  currentQty += change;
  if (currentQty < 1) currentQty = 0;
  qtyInput.value = currentQty;

  calculatePrice();
}

// Function to calculate total price and discount
function calculatePrice() {
  let totalMRP = 0;
  let totalDiscount = 0;

  items.forEach(item => {
    const qty = parseInt(document.getElementById(`item-qty-${item.id}`).value);

    // Calculate MRP and discount for each item based on its quantity
    totalMRP += item.price * qty;
    totalDiscount += item.discount * qty;
  });

  const totalAmount = totalMRP - totalDiscount;

  // Update the price details in the DOM
  document.getElementById('total-mrp').innerText = `₹${totalMRP.toFixed(2)}`;
  document.getElementById('discount').innerText = `-₹${totalDiscount.toFixed(2)}`;
  document.getElementById('total-amount').innerText = `₹${totalAmount.toFixed(2)}`;
}

// cart page confirm message 



function confirmRemove(itemId) {
  // Initialize the modal
  const modal = new bootstrap.Modal(document.getElementById("custom-confirm-modal"));
  modal.show();

  // Handle cancel button
  const cancelButton = document.querySelector('.btn-dark');
  cancelButton.onclick = function () {
    console.log('Cancel button clicked!');
    modal.hide();
  };

  // Handle OK button
  const okButton = document.getElementById("modal-ok-button");

  // Remove previous event listener to prevent stacking
  okButton.onclick = null;

  okButton.onclick = function () {
    removeItem(itemId); // Call the removeItem function
    modal.hide(); // Hide the modal after confirming
  };
}

// Function to handle item removal
function removeItem(itemId) {
  const item = document.querySelector(`.cart-items[data-id="${itemId}"]`); // Match HTML class
  if (item) {
    item.remove();
    alert("Item has been removed successfully."); // Optional: Feedback for user
  } else {
    console.error("Item not found.");
  }
}










// JavaScript to show modal when "Checkout" button is clicked
document.getElementById("checkoutBtn").addEventListener("click", function () {
  $('#orderSuccessModal').modal('show');
});



// Pause autoplay on hover
// const swiperContainer = document.querySelector(".js-reviews-slider");

// // Stop autoplay on mouse enter
// swiperContainer.addEventListener("mouseenter", () => {
//   swiper.autoplay.stop();
// });

// // Resume autoplay on mouse leave
// swiperContainer.addEventListener("mouseleave", () => {
//   swiper.autoplay.start();
// });




// Function to toggle collapsible content visibility
function toggleCollapse() {
  const content = document.getElementById("collapseContent");
  const icon = document.getElementById("collapseIcon");

  // Check if content is visible
  if (content.style.display === "block") {
    content.style.display = "none";       // Hide content
    icon.classList.remove("fa-minus");    // Change icon to plus
    icon.classList.add("fa-plus");
  } else {
    content.style.display = "block";      // Show content
    icon.classList.remove("fa-plus");     // Change icon to minus
    icon.classList.add("fa-minus");
  }
}




// thumbnail is clicked
function changeImage(element) {
  const productImg = document.getElementById('productImg');
  productImg.src = element.src;
}




// Original price and discount percentage
const originalPrice = 14.00; // Set your original price here
const discountPercentage = 5; // Set your discount percentage here

// Calculate discounted price
const discountedPrice = originalPrice * (1 - discountPercentage / 100);

// Update HTML content
document.getElementById("originalPrice").innerText = `₹${originalPrice.toFixed(2)}`;
document.getElementById("discountMessage").innerText = `-${discountPercentage}% off`;
document.getElementById("finalPrice").innerText = `₹${discountedPrice.toFixed(2)}`;




