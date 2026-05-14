import React, { useState, useEffect } from 'react';

function Toast({ message, type = 'success' }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (message) {
      setShow(true);
      const timer = setTimeout(() => setShow(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (!show) return null;

  const bgColor = type === 'success' ? 'bg-success' : type === 'danger' ? 'bg-danger' : 'bg-info';

  return (
    <div 
      id="toast"
      className={`${bgColor} text-white p-3 rounded`}
      style={{
        position: 'fixed',
        top: '80px',
        right: '20px',
        zIndex: 1050,
        minWidth: '300px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        animation: 'slideIn 0.3s ease-out'
      }}
    >
      {message}
    </div>
  );
}

export default Toast;
