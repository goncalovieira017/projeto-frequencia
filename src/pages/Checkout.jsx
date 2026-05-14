import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { Link, useNavigate } from 'react-router';

function Checkout() {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Redirect if cart is empty
  if (cart.length === 0 && !showOrderModal) {
    return navigate('/cart');
  }

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Generate order ID
    const newOrderId = String(Date.now()).slice(-10);
    setOrderId(newOrderId);
    setShowOrderModal(true);
    clearCart();
  };

  const handleCardNumberInput = (e) => {
    let value = e.target.value.replace(/\s/g, '');
    let formatted = value.replace(/(\d{4})/g, '$1 ').trim();
    e.target.value = formatted;
  };

  const handleExpiryInput = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    e.target.value = value;
  };

  if (showOrderModal) {
    return (
      <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
        <div className="text-center p-5" style={{ backgroundColor: '#fff', borderRadius: '20px', boxShadow: '0 8px 32px rgba(0,0,0,0.1)', maxWidth: '400px' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
          <h2 className="mb-3 fw-bold">Order Confirmed!</h2>
          <p className="text-muted mb-2">Thank you for your order.</p>
          <p className="mb-4 text-muted">Order ID: <strong>{orderId}</strong></p>
          <p className="text-muted mb-4">A confirmation email has been sent to your email address.</p>
          <Link to="/" className="btn btn-warning" style={{ backgroundColor: '#fd7e14', border: 'none', borderRadius: '25px', padding: '0.85rem 2rem', fontWeight: '600' }}>
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="container mt-5 mb-5">
      <h1 className="mb-4" style={{ fontSize: '2rem', fontWeight: '700' }}>Checkout</h1>
      
      <div className="row g-4">
        {/* Shipping and Payment Form */}
        <div className="col-lg-8">
          <form onSubmit={handleSubmit}>
            {/* Shipping Information */}
            <div className="card mb-4" style={{ borderRadius: '15px', border: 'none', boxShadow: '0 8px 28px rgba(0,0,0,0.08)' }}>
              <div className="card-body p-4">
                <h3 className="mb-4" style={{ fontSize: '1.3rem', fontWeight: '700' }}>Shipping Information</h3>
                <div className="row g-3 mb-3">
                  <div className="col-sm-6">
                    <label htmlFor="firstName" className="form-label fw-bold">First Name</label>
                    <input type="text" className="form-control" id="firstName" required style={{ borderRadius: '10px', border: '1px solid rgba(0,0,0,0.1)', padding: '0.75rem' }} />
                  </div>
                  <div className="col-sm-6">
                    <label htmlFor="lastName" className="form-label fw-bold">Last Name</label>
                    <input type="text" className="form-control" id="lastName" required style={{ borderRadius: '10px', border: '1px solid rgba(0,0,0,0.1)', padding: '0.75rem' }} />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="address" className="form-label fw-bold">Street Address</label>
                  <input type="text" className="form-control" id="address" placeholder="123 Main Street" required style={{ borderRadius: '10px', border: '1px solid rgba(0,0,0,0.1)', padding: '0.75rem' }} />
                  <small className="text-muted d-block mt-2">Apt, Suite, etc. (optional)</small>
                  <input type="text" className="form-control mt-2" placeholder="Apt, Suite, etc. (optional)" style={{ borderRadius: '10px', border: '1px solid rgba(0,0,0,0.1)', padding: '0.75rem' }} />
                </div>

                <div className="row g-3 mb-3">
                  <div className="col-sm-6">
                    <label htmlFor="city" className="form-label fw-bold">City</label>
                    <input type="text" className="form-control" id="city" required style={{ borderRadius: '10px', border: '1px solid rgba(0,0,0,0.1)', padding: '0.75rem' }} />
                  </div>
                  <div className="col-sm-3">
                    <label htmlFor="state" className="form-label fw-bold">State</label>
                    <select className="form-select" id="state" required style={{ borderRadius: '10px', border: '1px solid rgba(0,0,0,0.1)', padding: '0.75rem' }}>
                      <option>Select State</option>
                      <option>California</option>
                      <option>New York</option>
                      <option>Texas</option>
                    </select>
                  </div>
                  <div className="col-sm-3">
                    <label htmlFor="zip" className="form-label fw-bold">ZIP Code</label>
                    <input type="text" className="form-control" id="zip" placeholder="12345" required style={{ borderRadius: '10px', border: '1px solid rgba(0,0,0,0.1)', padding: '0.75rem' }} />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="phone" className="form-label fw-bold">Phone Number</label>
                  <input type="tel" className="form-control" id="phone" placeholder="(555) 123-4567" required style={{ borderRadius: '10px', border: '1px solid rgba(0,0,0,0.1)', padding: '0.75rem' }} />
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="card" style={{ borderRadius: '15px', border: 'none', boxShadow: '0 8px 28px rgba(0,0,0,0.08)' }}>
              <div className="card-body p-4">
                <h3 className="mb-4" style={{ fontSize: '1.3rem', fontWeight: '700' }}>Payment Information</h3>
                
                <div className="mb-3">
                  <label htmlFor="cardName" className="form-label fw-bold">Name on Card</label>
                  <input type="text" className="form-control" id="cardName" required style={{ borderRadius: '10px', border: '1px solid rgba(0,0,0,0.1)', padding: '0.75rem' }} />
                </div>

                <div className="mb-3">
                  <label htmlFor="cardNumber" className="form-label fw-bold">Card Number</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="cardNumber" 
                    placeholder="1234 5678 9012 3456"
                    maxLength="19"
                    onInput={handleCardNumberInput}
                    required 
                    style={{ borderRadius: '10px', border: '1px solid rgba(0,0,0,0.1)', padding: '0.75rem' }} 
                  />
                </div>

                <div className="row g-3">
                  <div className="col-sm-6">
                    <label htmlFor="expiry" className="form-label fw-bold">Expiration Date</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="expiry" 
                      placeholder="MM/YY"
                      maxLength="5"
                      onInput={handleExpiryInput}
                      required 
                      style={{ borderRadius: '10px', border: '1px solid rgba(0,0,0,0.1)', padding: '0.75rem' }} 
                    />
                  </div>
                  <div className="col-sm-6">
                    <label htmlFor="cvv" className="form-label fw-bold">CVV</label>
                    <input type="text" className="form-control" id="cvv" placeholder="123" maxLength="3" required style={{ borderRadius: '10px', border: '1px solid rgba(0,0,0,0.1)', padding: '0.75rem' }} />
                  </div>
                </div>

                <button type="submit" className="btn btn-success btn-lg w-100 mt-4" style={{ borderRadius: '25px', padding: '0.85rem', fontWeight: '600', backgroundColor: '#198754', border: 'none' }}>
                  Place Order
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Order Summary Sidebar */}
        <div className="col-lg-4">
          <div className="card order-summary-sidebar" style={{ borderRadius: '15px', border: 'none', boxShadow: '0 8px 28px rgba(0,0,0,0.08)', position: 'sticky', top: '20px' }}>
            <div className="card-body p-4">
              <h3 className="mb-4" style={{ fontSize: '1.3rem', fontWeight: '700' }}>Order Summary</h3>
              
              <div className="mb-3" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {cart.map(item => (
                  <div key={item.id} className="order-item d-flex justify-content-between mb-3 pb-3" style={{ borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                    <div>
                      <p className="mb-0 fw-bold" style={{ fontSize: '0.95rem' }}>{item.name}</p>
                      <p className="mb-0 text-muted small">x{item.qty}</p>
                    </div>
                    <p className="mb-0 fw-bold">€{(item.price * item.qty).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: '2px solid rgba(0,0,0,0.1)', paddingTop: '1rem' }}>
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal</span>
                  <span id="subtotal">€{subtotal.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span>Tax (8%)</span>
                  <span id="tax">€{tax.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between" style={{ borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: '1rem' }}>
                  <span className="fw-bold fs-5">Total</span>
                  <span className="fw-bold fs-5" id="total" style={{ color: '#fd7e14' }}>€{total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Checkout;
