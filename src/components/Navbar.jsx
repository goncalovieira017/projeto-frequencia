import { Link } from 'react-router';
import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

function Navbar({ showToast }) {
  const { cart } = useContext(CartContext);
  // Calcula o total de itens (se tiveres 2x o mesmo tour, conta como 2)
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#2d8659', boxShadow: '0 2px 12px rgba(0,0,0,0.12)', padding: '1rem 0' }}>
      <div className="container d-flex align-items-center justify-content-between flex-wrap gap-3">
        <Link className="navbar-brand logo text-white fw-bold d-flex align-items-center" to="/" title="Página Inicial" style={{ fontSize: '1.45rem', letterSpacing: '0.03em', textShadow: '1px 1px 3px rgba(0,0,0,0.18)', textDecoration: 'none' }}>
          🧭 Roteiros
        </Link>

        <div className="d-flex align-items-center gap-3 flex-wrap">
          <Link
            className="btn btn-light cart-link fw-bold d-flex align-items-center"
            to="/cart"
            aria-label="Ir para o carrinho"
            title="Ir para o carrinho"
            style={{
              borderRadius: '30px',
              padding: '0.55rem 1rem',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 14px rgba(0,0,0,0.08)',
              color: '#333',
              textDecoration: 'none'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            🛒 Carrinho <span id="cartCount" className="badge bg-danger ms-2" style={{ fontSize: '0.8rem', minWidth: '22px' }}>{totalItems}</span>
          </Link>

          <Link
            className="btn btn-outline-light fw-bold"
            to="/login"
            style={{
              borderRadius: '30px',
              padding: '0.55rem 1rem',
              transition: 'all 0.3s ease',
              textDecoration: 'none'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            Login
          </Link>

          <Link
            className="btn btn-light fw-bold"
            to="/signup"
            style={{
              borderRadius: '30px',
              padding: '0.55rem 1rem',
              transition: 'all 0.3s ease',
              textDecoration: 'none',
              backgroundColor: '#fff',
              color: '#2d8659'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;