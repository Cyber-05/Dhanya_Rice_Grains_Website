document.addEventListener('DOMContentLoaded', () => {
  // Intersection Observer for animations
  const animated = document.querySelectorAll('.anim-slide-in, .anim-fade-in');
  const obs = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  animated.forEach(el => {
    el.style.animationPlayState = 'paused';
    obs.observe(el);
  });

  // Cart logic
  const cart = [];
  const cartItemsEl = document.getElementById('cart-items');
  const cartTotalEl = document.getElementById('cart-total');
  const cartCountEl = document.getElementById('cart-count');

  function updateCartDisplay() {
    cartItemsEl.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
      total += item.price;
      const p = document.createElement('p');
      p.textContent = `${item.name} — ₹${item.price}`;
      cartItemsEl.appendChild(p);
    });
    cartTotalEl.textContent = `Total: ₹${total}`;
    cartCountEl.textContent = cart.length;
  }

  document.querySelectorAll('.buy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.getAttribute('data-name');
      const price = parseInt(btn.getAttribute('data-price'));
      cart.push({ name, price });
      updateCartDisplay();
      // Optionally show a toast or small feedback
      btn.textContent = 'Added';
      setTimeout(() => btn.textContent = 'Add to Cart', 800);
    });
  });

  // Checkout navigation
  document.getElementById('checkout-btn').addEventListener('click', () => {
    if (cart.length === 0) {
      alert('Cart is empty!');
      return;
    }
    location.hash = '#checkout';
  });

  const paymentSelect = document.getElementById('payment-method');
  const cardDetailsDiv = document.getElementById('card-details');
  paymentSelect.addEventListener('change', () => {
    if (paymentSelect.value === 'card') {
      cardDetailsDiv.style.display = 'block';
    } else {
      cardDetailsDiv.style.display = 'none';
    }
  });

  document.getElementById('pay-btn').addEventListener('click', () => {
    const name = document.getElementById('checkout-name').value.trim();
    const address = document.getElementById('checkout-address').value.trim();
    const method = paymentSelect.value;
    if (!name || !address || !method) {
      alert('Please fill all required fields.');
      return;
    }
    if (method === 'card') {
      const cardNum = document.getElementById('card-number').value.trim();
      const expiry = document.getElementById('card-expiry').value.trim();
      const cvv = document.getElementById('card-cvv').value.trim();
      if (cardNum.length !== 16 || !expiry || cvv.length !== 3) {
        alert('Please enter valid card details.');
        return;
      }
      // Simulate card payment success
      alert('Payment successful! Order placed.');
    } else {
      // Cash on delivery
      alert('Order placed! Pay on delivery.');
    }
    // Clear cart
    cart.length = 0;
    updateCartDisplay();
    // Optionally redirect
    location.hash = '#home';
  });

  // Contact form
  const contactForm = document.getElementById('contactForm');
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    alert('Thank you! We will reach you soon.');
    contactForm.reset();
  });
});
