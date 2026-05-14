import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../context/CartContext';

function Home({ showToast }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetch('/products.json')
      .then(response => response.json())
      .then(data => setProducts(data));
  }, []);

  // Lógica de pesquisa e filtro exigida
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.description.toLowerCase().includes(search.toLowerCase().trim());
    const matchesCategory = category === '' || p.category === category;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (product) => {
    addToCart(product);
    showToast && showToast('Added to cart');
  };

  return (
    <main>
      <section className="hero text-white text-center py-5" style={{ background: 'linear-gradient(135deg, #2d8659 0%, #3da06b 45%, #26684d 100%)', minHeight: '54vh', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'inset 0 0 120px rgba(0,0,0,0.18)', position: 'relative', overflow: 'hidden' }}>
        <div className="container" style={{ zIndex: 1 }}>
          <h1 style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '1rem', textShadow: '2px 2px 8px rgba(0,0,0,0.25)' }}>Madeira aguarda pela tua história</h1>
          <p className="lead" style={{ fontSize: '1.15rem', fontWeight: '300', color: 'rgba(255,255,255,0.92)', maxWidth: '650px', margin: '0 auto' }}>Entra num mundo onde o Atlântico encontra a eterna Primavera</p>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', overflow: 'hidden', lineHeight: 0 }}>
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: '80px' }}>
            <path d="M0,0 C300,120 600,0 900,80 C1050,120 1200,45 1200,45 L1200,120 L0,120 Z" fill="#f8f9fa" />
          </svg>
        </div>
      </section>

      <div className="container mt-5 mb-5">
        {/* Barra de Pesquisa e Filtros */}
        <div className="row mb-5 g-3 justify-content-center">
          <div className="col-lg-7">
            <label htmlFor="searchInput" className="form-label visually-hidden">Pesquisar</label>
            <div className="input-group shadow-sm" style={{ borderRadius: '999px', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.08)' }}>
              <input
                type="text"
                id="searchInput"
                className="form-control"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Pesquisar na descrição..."
                style={{ border: 'none', padding: '0.9rem 1.2rem', fontSize: '1rem' }}
              />
              <button
                id="searchBtn"
                className="btn btn-success"
                onClick={() => {}}
                title="Pesquisar"
                aria-label="Pesquisar"
                style={{ borderRadius: '0', padding: '0.85rem 1.7rem', fontWeight: '600', color: '#fff', transition: 'all 0.3s ease', backgroundColor: '#2d8659', border: 'none' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1e5a3f'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2d8659'}
              >
                🔍 Pesquisar
              </button>
            </div>
          </div>
          <div className="col-lg-3">
            <label htmlFor="categoryFilter" className="form-label visually-hidden">Categoria</label>
            <select
              id="categoryFilter"
              className="form-select shadow-sm"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              title="Filtrar por categoria"
              aria-label="Filtrar por categoria"
              style={{ borderRadius: '25px', border: '1px solid rgba(0,0,0,0.1)', padding: '0.85rem 1rem', fontSize: '1rem' }}
            >
              <option value="">Todas as Categorias</option>
              <option value="natureza">Natureza</option>
              <option value="gastronomia">Gastronomia</option>
              <option value="cultura">Cultura</option>
            </select>
          </div>
        </div>

        {/* Heading */}
        <div className="mb-4">
          <h2 className="h3 fw-bold" style={{ color: '#333' }}>Experiências</h2>
        </div>

        {/* Grelha de Produtos */}
        <div id="productGrid" className="row g-4 mb-5">
          {filteredProducts.map((product) => (
            <div key={product.id} className="col-md-4">
              <div
                className="card product-card h-100"
                style={{ borderRadius: '15px', border: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', transition: 'transform 0.3s ease, box-shadow 0.3s ease', overflow: 'hidden' }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.15)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)'; }}
              >
                <img src={product.image} className="card-img-top" alt={product.name} style={{ height: '220px', objectFit: 'cover' }} />
                <div className="card-body d-flex flex-column" style={{ padding: '1.6rem' }}>
                  <div className="product-info flex-grow-1">
                    <h3 className="h6 fw-bold" style={{ fontSize: '1.05rem', marginBottom: '0.75rem', color: '#333' }}>{product.name}</h3>
                    <p className="text-muted small" style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>{product.category}</p>
                  </div>
                  <p className="product-price fw-bold fs-5 mb-1" style={{ color: '#2d8659', fontSize: '1.3rem' }}>€{product.price}</p>
                  <p className="product-stock text-secondary small mb-3" style={{ fontSize: '0.85rem' }}>{product.stock} vagas</p>
                  <button
                    className="btn btn-success add-to-cart-btn w-100"
                    style={{ border: 'none', borderRadius: '25px', padding: '0.75rem', fontWeight: '600', transition: 'all 0.3s ease', backgroundColor: '#2d8659' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1e5a3f'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2d8659'}
                    onClick={() => handleAddToCart(product)}
                    aria-label={`Adicionar ${product.name} ao carrinho`}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Home;