import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router';

function Cart() {
  const { cart, incrementQty, removeFromCart, clearCart } = useContext(CartContext);
  // Cálculo exato do total (preço x quantidade)
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  return (
    <main className="container mt-5 mb-5">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '700', color: '#333', margin: 0 }}>Your Shopping Cart</h1>
        <Link to="/" className="btn btn-outline-success" style={{ borderRadius: '25px', padding: '0.65rem 1.5rem', fontWeight: '600' }}>
          Continue Shopping
        </Link>
      </div>
      
      {cart.length === 0 ? (
        <div id="emptyCart" className="text-center py-5" style={{ backgroundColor: '#f8f9fa', borderRadius: '15px', boxShadow: '0 8px 28px rgba(0,0,0,0.08)' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛒</div>
          <p className="fs-5 text-muted mb-3">Your cart is empty</p>
          <Link to="/" className="btn btn-success btn-lg" style={{ backgroundColor: '#2d8659', border: 'none', borderRadius: '25px', padding: '0.85rem 2rem', fontWeight: '600', transition: 'all 0.3s ease' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1e5a3f'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2d8659'} aria-label="Listar experiências">
            Start Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="row g-4 mb-4">
            <div className="col-lg-8">
              {cart.map((item) => (
                <div key={item.id} className="card mb-3" style={{ borderRadius: '15px', border: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.08)', overflow: 'hidden', transition: 'transform 0.3s ease' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                  <div className="row g-0 align-items-center">
                    {item.image && (
                      <div className="col-auto">
                        <img src={item.image} alt={item.name} className="img-fluid" style={{ width: '140px', height: '140px', objectFit: 'cover' }} />
                      </div>
                    )}
                    <div className="col">
                      <div className="card-body d-flex flex-column flex-md-row justify-content-between align-items-start gap-3" style={{ padding: '1.5rem' }}>
                        <div>
                          <h2 className="h6 mb-2 fw-bold" style={{ fontSize: '1.1rem' }}>{item.name}</h2>
                          <p className="text-muted mb-2" style={{ fontSize: '0.9rem' }}>€{item.price.toFixed(2)}</p>
                          <div className="d-flex flex-wrap align-items-center gap-2">
                            <button className="btn btn-sm btn-outline-success qty-btn" onClick={() => incrementQty(item.id)} aria-label="Adicionar mais um" style={{ borderRadius: '50%', width: '36px', height: '36px', padding: '0', fontSize: '1rem', fontWeight: '700' }}>+</button>
                            <span className="text-muted" style={{ fontSize: '0.95rem' }}>Qty: <strong className="qty-value">{item.qty}</strong></span>
                            <button className="btn btn-sm btn-outline-danger remove-btn" onClick={() => removeFromCart(item.id)} aria-label="Remover item" style={{ borderRadius: '25px', padding: '0.3rem 0.8rem', fontWeight: '600', fontSize: '0.85rem' }}>Remove</button>
                          </div>
                        </div>
                        <div className="text-end">
                          <p className="mb-0 fw-bold" style={{ fontSize: '1.3rem', color: '#2d8659' }}>€{(item.price * item.qty).toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="col-lg-4">
              <div className="card" style={{ borderRadius: '15px', border: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.08)', position: 'sticky', top: '20px' }}>
                <div className="card-body p-4">
                  <h3 className="mb-4" style={{ fontSize: '1.2rem', fontWeight: '700' }}>Order Summary</h3>
                  
                  <div className="mb-4 pb-4" style={{ borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                    {cart.map(item => (
                      <div key={item.id} className="d-flex justify-content-between mb-3">
                        <span className="text-muted" style={{ fontSize: '0.95rem' }}>{item.name} x{item.qty}</span>
                        <span className="fw-bold">€{(item.price * item.qty).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="d-flex justify-content-between mb-4">
                    <span className="fw-bold">Subtotal</span>
                    <span>€{totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-4">
                    <span className="fw-bold">Shipping</span>
                    <span style={{ color: '#2d8659' }}>FREE</span>
                  </div>
                  <div className="d-flex justify-content-between mb-4" style={{ borderTop: '2px solid rgba(0,0,0,0.1)', paddingTop: '1rem' }}>
                    <span className="fw-bold fs-5">Total</span>
                    <span className="fw-bold fs-5" id="total" style={{ color: '#2d8659' }}>€{totalPrice.toFixed(2)}</span>
                  </div>

                  <Link to="/checkout" className="btn btn-success w-100 mb-2" style={{ backgroundColor: '#2d8659', border: 'none', borderRadius: '25px', padding: '0.85rem', fontWeight: '600' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1e5a3f'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2d8659'}>
                    Proceed to Checkout
                  </Link>

                  <button id="clearCartBtn" className="btn btn-outline-danger w-100" onClick={clearCart} aria-label="Limpar todo o carrinho" style={{ borderRadius: '25px', padding: '0.65rem', fontWeight: '600' }}>
                    Clear Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
export default Cart;