// src/components/Card.js
import React from 'react';

const Card = ({ title, children, className = '' }) => {
  return (
    <div className={`bg-slate-900 p-6 rounded-xl shadow-lg ${className}`}>
      {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}
      {children}
    </div>
  );
};

export default Card;