// Cart Management
class CartManager {
  constructor() {
    this.cart = this.loadCart();
    this.cartDrawerOpen = false;
    this.init();
  }

  init() {
    this.updateCartCounter();
    this.setupEventListeners();
  }

  loadCart() {
    const savedCart = localStorage.getItem('stylenest_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  }

  saveCart() {
    localStorage.setItem('stylenest_cart', JSON.stringify(this.cart));
  }

  addToCart(product) {
    const existingItem = this.cart.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }
    
    this.saveCart();
    this.updateCartCounter();
    this.renderCartDrawer();
    this.openCartDrawer();
  }

  removeFromCart(productId) {
    this.cart = this.cart.filter(item => item.id !== productId);
    this.saveCart();
    this.updateCartCounter();
    this.renderCartDrawer();
  }

  updateQuantity(productId, quantity) {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }
    
    const item = this.cart.find(item => item.id === productId);
    if (item) {
      item.quantity = quantity;
      this.saveCart();
      this.updateCartCounter();
      this.renderCartDrawer();
    }
  }

  getTotalItems() {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  }

  getTotalPrice() {
    return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  clearCart() {
    this.cart = [];
    this.saveCart();
    this.updateCartCounter();
    this.renderCartDrawer();
  }

  updateCartCounter() {
    const counter = document.querySelector('.cart-counter');
    const totalItems = this.getTotalItems();
    
    if (counter) {
      if (totalItems > 0) {
        counter.textContent = totalItems;
        counter.style.display = 'flex';
      } else {
        counter.style.display = 'none';
      }
    }
  }

  openCartDrawer() {
    const drawer = document.querySelector('.cart-drawer');
    const overlay = document.querySelector('.cart-overlay');
    
    if (drawer && overlay) {
      this.cartDrawerOpen = true;
      drawer.classList.add('open');
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
      this.renderCartDrawer();
    }
  }

  closeCartDrawer() {
    const drawer = document.querySelector('.cart-drawer');
    const overlay = document.querySelector('.cart-overlay');
    
    if (drawer && overlay) {
      this.cartDrawerOpen = false;
      drawer.classList.remove('open');
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  renderCartDrawer() {
    const cartContent = document.querySelector('.cart-drawer-content');
    if (!cartContent) return;

    if (this.cart.length === 0) {
      cartContent.innerHTML = `
        <div class="empty-cart">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          <p>Your cart is empty</p>
        </div>
      `;
      return;
    }

    const cartItemsHTML = this.cart.map(item => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
        <div class="cart-item-details">
          <h3>${item.name}</h3>
          <p class="cart-item-price">$${item.price.toFixed(2)}</p>
          <div class="cart-item-quantity">
            <button class="quantity-btn" onclick="cartManager.updateQuantity('${item.id}', ${item.quantity - 1})">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
            </button>
            <span>${item.quantity}</span>
            <button class="quantity-btn" onclick="cartManager.updateQuantity('${item.id}', ${item.quantity + 1})">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
            </button>
          </div>
        </div>
        <button class="cart-item-remove" onclick="cartManager.removeFromCart('${item.id}')">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
    `).join('');

    cartContent.innerHTML = `
      <div class="cart-items-list">
        ${cartItemsHTML}
      </div>
      <div class="cart-footer">
        <div class="cart-total">
          <span>Total:</span>
          <span class="cart-total-price">$${this.getTotalPrice().toFixed(2)}</span>
        </div>
        <a href="checkout.html" class="btn-checkout" onclick="cartManager.closeCartDrawer()">
          Proceed to Checkout
        </a>
      </div>
    `;
  }

  setupEventListeners() {
    // Cart button click
    const cartBtn = document.querySelector('.cart-btn');
    if (cartBtn) {
      cartBtn.addEventListener('click', () => this.openCartDrawer());
    }

    // Cart overlay click
    const overlay = document.querySelector('.cart-overlay');
    if (overlay) {
      overlay.addEventListener('click', () => this.closeCartDrawer());
    }

    // Cart drawer close button
    const closeBtn = document.querySelector('.cart-drawer-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeCartDrawer());
    }

    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
      mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
        const icon = mobileMenuBtn.querySelector('svg');
        if (mobileMenu.classList.contains('open')) {
          icon.innerHTML = '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>';
        } else {
          icon.innerHTML = '<line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>';
        }
      });
    }
  }
}

// Initialize cart manager
const cartManager = new CartManager();

// Helper function to render product cards
function renderProductCard(product) {
  return `
    <div class="product-card">
      <div class="product-image-wrapper">
        <img src="${product.image}" alt="${product.name}" class="product-image">
      </div>
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-price">$${product.price.toFixed(2)}</p>
        <button class="btn-add-to-cart" onclick='cartManager.addToCart(${JSON.stringify(product)})'>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          Add to Cart
        </button>
      </div>
    </div>
  `;
}

// Checkout Form Validation
function initCheckoutForm() {
  const checkoutForm = document.getElementById('checkout-form');
  if (!checkoutForm) return;

  checkoutForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Clear previous errors
    document.querySelectorAll('.error-message').forEach(el => el.remove());
    document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
    
    let isValid = true;
    const formData = {
      name: document.getElementById('name').value.trim(),
      email: document.getElementById('email').value.trim(),
      phone: document.getElementById('phone').value.trim(),
      address: document.getElementById('address').value.trim(),
      city: document.getElementById('city').value.trim(),
      state: document.getElementById('state').value.trim(),
      zipCode: document.getElementById('zipCode').value.trim(),
    };

    // Validate name
    if (!formData.name) {
      showError('name', 'Name is required');
      isValid = false;
    }

    // Validate email
    if (!formData.email) {
      showError('email', 'Email is required');
      isValid = false;
    } else if (!isValidEmail(formData.email)) {
      showError('email', 'Please enter a valid email');
      isValid = false;
    }

    // Validate phone
    if (!formData.phone) {
      showError('phone', 'Phone number is required');
      isValid = false;
    } else if (!isValidPhone(formData.phone)) {
      showError('phone', 'Please enter a valid phone number');
      isValid = false;
    }

    // Validate address
    if (!formData.address) {
      showError('address', 'Address is required');
      isValid = false;
    }

    // Validate city
    if (!formData.city) {
      showError('city', 'City is required');
      isValid = false;
    }

    // Validate state
    if (!formData.state) {
      showError('state', 'State is required');
      isValid = false;
    }

    // Validate zip code
    if (!formData.zipCode) {
      showError('zipCode', 'ZIP code is required');
      isValid = false;
    }

    if (isValid) {
      // Clear cart and redirect to success page
      cartManager.clearCart();
      window.location.href = 'order-success.html';
    }
  });
}

function showError(fieldId, message) {
  const field = document.getElementById(fieldId);
  field.classList.add('error');
  const errorDiv = document.createElement('p');
  errorDiv.className = 'error-message';
  errorDiv.textContent = message;
  field.parentNode.appendChild(errorDiv);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
  return /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/.test(phone);
}

// Contact Form
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) return;

  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    alert("Thank you for contacting us! We'll get back to you soon.");
    contactForm.reset();
  });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  initCheckoutForm();
  initContactForm();
  
  // Check if cart is empty on checkout page
  if (window.location.pathname.includes('checkout.html')) {
    if (cartManager.cart.length === 0) {
      const checkoutContainer = document.querySelector('.checkout-container');
      if (checkoutContainer) {
        checkoutContainer.innerHTML = `
          <div class="empty-cart-message">
            <h1>Your cart is empty</h1>
            <p>Add some items to your cart to checkout</p>
            <a href="index.html" class="btn-primary">Continue Shopping</a>
          </div>
        `;
      }
    } else {
      renderCheckoutSummary();
    }
  }
});

// Render checkout summary
function renderCheckoutSummary() {
  const summaryContainer = document.querySelector('.order-summary-items');
  if (!summaryContainer) return;

  const itemsHTML = cartManager.cart.map(item => `
    <div class="summary-item">
      <img src="${item.image}" alt="${item.name}">
      <div class="summary-item-details">
        <p>${item.name}</p>
        <p class="summary-item-qty">Qty: ${item.quantity}</p>
        <p class="summary-item-price">$${(item.price * item.quantity).toFixed(2)}</p>
      </div>
    </div>
  `).join('');

  summaryContainer.innerHTML = itemsHTML;

  // Update totals
  const subtotal = document.querySelector('.summary-subtotal');
  const total = document.querySelector('.summary-total');
  
  if (subtotal) subtotal.textContent = `$${cartManager.getTotalPrice().toFixed(2)}`;
  if (total) total.textContent = `$${cartManager.getTotalPrice().toFixed(2)}`;
}
