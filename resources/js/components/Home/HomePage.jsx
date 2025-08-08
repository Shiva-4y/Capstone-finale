import React from 'react';
import PromotionalBar from './PromotionalBar';
import Banner from './Banner';
import CategoryGrid from './CategoryGrid';

export default function HomePage() {
  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh' }}>
      <PromotionalBar />
      <Banner />
      <CategoryGrid />
    </div>
  );
} 