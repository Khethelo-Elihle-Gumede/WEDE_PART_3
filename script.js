//Quick-Shop website Javascript
//This script.js file adds website features to this website HTML.

const products = [
    {
        id: 1,
        name: "Classic White T-Shirt",
        category: "tops",
        price: 150,
        images: "images/casual-shirt.jpg",
        description: "A simple everyday essential."
    },
    {
        id: 2,
        name: "Blue Demin Jeans",
        category: "botttoms",
        price: 300,
        images: "images/jeans.jpg",
        description: "Versatile demin for casual outfits." 

    },
    {
        id: 3,
        name: "Everyday Summer Dress",
        category: "dresses",
        price: 250,
        images: "images/dress.jpg",
        description: "A Comfortable dress for everyday wear."
    },
    {
        id: 4,
        name: "Casual Jacket",
        category: "outerwear",
        price: 340,
        images: "images/jacket.jpg",
        description: "A useful extra layer for cooler days."
    },
    {
        id: 5,
        name: "Basic Black Top",
        category: "tops",
        price: 130,
        images: "images/black-top.jpg",
        description: "Easy to pair with different outfits."
    },
    {
        id: 6,
        name: "Casual Chino Trousers",
        category: "bottoms",
        price: 285,
        images: "images/trousers.jpg",
        description: "A smart-casual wardrobe option."
    }
];

// Format prices with the South African currency Rands.
function formatPrice(price) {
    return new Intl.NumberFormat("en-ZA", {
        style: "currency",
        currency: "RANDS"
    }).format(price);
}

const productList =
document.getElementsById("product-list");
const searchInput =
document.getElementById("product-search");
const categoryFilter =
document.getElementById("category-filter");
const sortSelect =
document.getElementById("sort-products");
const productMessage =
document.getElementById("products-message");

let basketCount = 0;

// Products will be displayed Actively.
// This fucnction will apply also on the category, search and sorting choices.
function displayProducts() {
    //The following elements will only apply on the home page only.
    if (!productList) return;

    const searchTerm = searchInput.value.trim().toLowerCase();
    const selectedCategory = categoryFilter.value;
    const sortOption = sortSelect.value;

    let filteredProducts = products.filter(function(product) {
        const matchesSearch =

        product.name.toLowerCase().includes(searchTerm) ||

        product.description.toLowerCase().includes(searchTerm);

        const matchesCategory =
            selectedCategory === "all" ||
            product.category === selectedCategory;

        return matchesSearch && matchesCategory;     
    });

    // Sort a new array so the main products will not be changed.
    if (sortOption === "low") {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === "high") {
        filteredProducts.sort((a, b) => b.price - a.price);
    } else if (sortOption === "name") {
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name)
        );
    }

    // Fuction to show a message when no products match.
    if (filteredProducts.length === 0) {
        productList.innerHTML =
        "<p> No matching clothing was found. Try another search.</p>";
        productMessage.textContext = "";
        return;
    }
    
    // Building product cards from the filtered array.
    productList.innerHTML = filteredProducts.map(function (product) {
        return ` 
            <article class="product-card">
                <button 
                    class="product-image-button"
                    type="button"
                    data-image="${product.image}"
                    data-caption="${product.name}"
                    aria-label="View ${product.name} image">
                    <img
                        src="${product.image}"
                        alt="${product.name}"
                        loading="lazy">
                </button>
                
                <div class="product-details>
                    <p class="product-category">
                        ${product.category}
                    </p>
                    <h3>${product.name}</h3>
                    <p class="product-description">
                        ${product.description}
                    </p>
                    <p class="products-price">
                        ${formatPrice(product.price)}
                    </p>
                    
                    <div class="product-actions">
                        <button
                            class="button add-to-cart"
                            type="button"
                            data-products-id="${product.id}">
                            Add to basket
                        </button>
                        
                        <a class="text-link"
                            href="href=enquiry.html? product=${product.id}>
                            Enquire
                        </a>
                    </div>
                </div>
            </article>
        `;
    }).join("");

    productMessage.textContent = `${filteredProducts.length} products(s) displayed.`;
}

// Listerner for roduct search, category and sorting changes.
if (searchInput) {
    searchInput.addEventListener("input", displayProducts);
}
if (categoryFilter) {
    categoryFilter.addEventListener("change", displayProducts);
}
if (sortSelect) {
    sortSelect.addEventListener("change", displayProducts);
}

if (productList) {
    productList.addEventListener("click", function (event) {
        const cartButton = event.target.closest(".add-to-cart");

        if (cartButton) {
            basketCount++; document.getElementById("cart-count").textContent = basketCount;

            productMessage.textContent = "Item added to your demo basket. No payment was taken.";
        }

        const imageButton = event.target.closest(".product-image-button"

        );

        if (imageButton) {
            openLightBox(
                imageButton.dataset.image,
                imageButton.dataset.caption
            );
        }
    });
}

// Gallery Lightbox will open when any image is selected.
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxCaption = document.getElementById("lightbox-caption");

function openLightbox(imagePath, caption) {
    if (!lightbox) return;

    lightboxImage.src = imagePath;
    lightboxImage.alt = caption;
    lightboxCaption.textContent = caption;

    if (typeof lightbox.showModel === "function") {
        lightbox.showModal();
    }
}

// Builing a connection with gallery images to the same lightbox.
document.querySelectorAll(".gallery-item").forEach(function (button) {
    button.addEventListener("click", function () {
        openLightbox(button.dataset.image, button.dataset.caption);
    });
});

//Build a button or an Escape key to close LightBox.
const closeLightbox = document.getElementById("close-lightbox");

if (closeLightbox && lightbox) {
    closeLightbox.addEventListener("click", function () {
        lightbox.close();
    });
}

//Form Validation

document.querySelectorAll(".validated-form").forEach(function (form) {
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const messageBox = form.querySelector(".form-message");

        //Clear past error messages.
        messageBox.textContent = ""; 
        
        messageBox.classList.remove("success-message");

        // Use HTML validation and check any rules.
        if (!form.checkValidity()) {
            form.reportValidity();
            messageBox.textContent = "Please check the highlighted fields and try again.";
            return;
        }

        const messageField = form.querySelector(
            'textarea[name="message"]'
        );

        if (messageField && messageField.value.trim().length < 10) {
            messageField.setCustomValidity(
                "Please enter at least 10 characters."
            );
            messageField.reportValidity();
            messageField.setCustomValidity("");
            messageBox.textContent = "Please provide a little more detail in your message.";
            return;
        }

        //This demo prepares the email in the users email application.
        const formData = new FormData(form);
        const formType = form.dataset.formType;
        const subject = formType === "enquiry" 
                    ? "Quick-Shop product enquiry"
                    : "Quick-Shop customer message";

        const body = Array.from(formData.entries())
        .map(([key, value]) => `${key}: ${value}`)
        .join("\n");
        
        //This addres will be replaced with Quick-Shop's address.
        const recipient = "info@quickshop.co.za";

        const mailtoURL = `mailto:${recipient}?subject=${encodeURIComponent(subject)}` + `&body=${encodeURIComponent(body)}`;

        messageBox.textContent = "Your form is valid. Your email application will open" + "with your message prepared. Please review and send it.";

        messageBox.classList.add("successs-message");

        window.location.href = mailtoURL;
    });
});

//Automatic fill on a selcted product from the Enquire Link.
const enquireProduct = document.getElementById("enquiry-product");

if (enquiryProduct) {
    const params = new URLSearchParams(window.location.search);
    const productId = Number(params.get("product"));
    const chosenProduct = products.find(p => p.id === productId);

    if (chosenProduct) {
        enquiryProduct.value = String(chosenProduct.id);
    }
}

//To update the footer on every page automatically.
document.querySelectorAll("#current-year").forEach(function (element) {
    element.textContent = new Date().getFullYear();
});

displayProducts();