import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Shirt, 
  User, 
  Baby, 
  Footprints, 
  Briefcase, 
  Gem, 
  Sparkles, 
  Home, 
  Trophy, 
  Smartphone, 
  BookOpen, 
  Gamepad2 
} from 'lucide-react';

export default function CategoryGrid() {
  const categories = [
    { name: 'Women', icon: <Shirt size={32} />, link: '/category/women', color: '#ff6b9d' },
    { name: 'Men', icon: <User size={32} />, link: '/category/men', color: '#667eea' },
    { name: 'Kids', icon: <Baby size={32} />, link: '/category/kids', color: '#ffa726' },
         { name: 'Shoes', icon: <Footprints size={32} />, link: '/category/shoes', color: '#ab47bc' },
    { name: 'Bags', icon: <Briefcase size={32} />, link: '/category/bags', color: '#26a69a' },
    { name: 'Accessories', icon: <Gem size={32} />, link: '/category/accessories', color: '#ff7043' },
    { name: 'Beauty', icon: <Sparkles size={32} />, link: '/category/beauty', color: '#ec407a' },
    { name: 'Home', icon: <Home size={32} />, link: '/category/home', color: '#8d6e63' },
    { name: 'Sports', icon: <Trophy size={32} />, link: '/category/sports', color: '#66bb6a' },
    { name: 'Electronics', icon: <Smartphone size={32} />, link: '/category/electronics', color: '#42a5f5' },
    { name: 'Books', icon: <BookOpen size={32} />, link: '/category/books', color: '#7e57c2' },
    { name: 'Toys', icon: <Gamepad2 size={32} />, link: '/category/toys', color: '#ffb74d' }
  ];

  return (
    <section style={{
      padding: '40px 20px',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      <div style={{
        textAlign: 'center',
        marginBottom: '40px'
      }}>
        <h2 style={{
          fontSize: '28px',
          fontWeight: 'bold',
          color: '#333',
          marginBottom: '12px'
        }}>
          Shop by Category
        </h2>
        <p style={{
          fontSize: '16px',
          color: '#666',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          Explore our wide range of categories and find exactly what you're looking for
        </p>
      </div>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px'
      }}>
        {categories.map((category, index) => (
          <Link
            key={index}
            to={category.link}
            style={{
              background: 'white',
              padding: '24px',
              borderRadius: '12px',
              textDecoration: 'none',
              color: '#333',
              textAlign: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              border: '1px solid #f1f1f1',
              transition: 'transform 0.3s, box-shadow 0.3s',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-4px)';
              e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
            }}
          >
            {/* Background Accent */}
            <div style={{
              position: 'absolute',
              top: '0',
              left: '0',
              right: '0',
              height: '4px',
              background: category.color,
              opacity: '0.8'
            }}></div>
            
            <div style={{
              marginBottom: '16px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              {category.icon}
            </div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: 'bold',
              marginBottom: '8px',
              color: '#333'
            }}>
              {category.name}
            </h3>
            <p style={{
              fontSize: '14px',
              color: '#666',
              margin: 0
            }}>
              Explore {category.name.toLowerCase()} items
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
} 