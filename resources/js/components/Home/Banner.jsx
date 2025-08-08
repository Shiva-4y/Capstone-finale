import React from 'react';
import { Link } from 'react-router-dom';

export default function Banner() {
  return (
    <section style={{
      padding: '40px 20px',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        position: 'relative'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #ff6b9d, #ff8fab)',
          padding: '60px 40px',
          color: 'white',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Background Pattern */}
          <div style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '200px',
            height: '200px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '50%',
            transform: 'rotate(45deg)'
          }}></div>
          <div style={{
            position: 'absolute',
            bottom: '-30px',
            left: '-30px',
            width: '150px',
            height: '150px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '50%'
          }}></div>
          
          <div style={{
            position: 'relative',
            zIndex: 2
          }}>
            <h1 style={{
              fontSize: '42px',
              fontWeight: 'bold',
              marginBottom: '16px',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              Discover Local Fashion
            </h1>
            <p style={{
              fontSize: '18px',
              marginBottom: '30px',
              opacity: 0.95,
              maxWidth: '600px',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}>
              Connect with local sellers in Lapu-Lapu City and Mandaue City. 
              Find amazing deals on fashion items from your community.
            </p>
            
            <div style={{
              display: 'flex',
              gap: '16px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <Link to="/register" style={{
                background: 'white',
                color: '#ff4757',
                padding: '16px 32px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 'bold',
                fontSize: '16px',
                transition: 'transform 0.3s, box-shadow 0.3s',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 16px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
              }}
              >
                Start Selling
              </Link>
              <Link to="/browse" style={{
                background: 'transparent',
                color: 'white',
                border: '2px solid white',
                padding: '16px 32px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 'bold',
                fontSize: '16px',
                transition: 'background-color 0.3s'
              }}
              onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'}
              onMouseLeave={(e) => e.target.style.background = 'transparent'}
              >
                Browse Items
              </Link>
            </div>
          </div>
        </div>
        
        {/* Stats Section */}
        <div style={{
          padding: '30px 40px',
          background: 'white',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '20px',
          borderTop: '1px solid #f1f1f1'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#ff4757',
              marginBottom: '4px'
            }}>
              500+
            </div>
            <div style={{
              fontSize: '14px',
              color: '#666'
            }}>
              Local Sellers
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#ff4757',
              marginBottom: '4px'
            }}>
              2,000+
            </div>
            <div style={{
              fontSize: '14px',
              color: '#666'
            }}>
              Items Listed
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#ff4757',
              marginBottom: '4px'
            }}>
              95%
            </div>
            <div style={{
              fontSize: '14px',
              color: '#666'
            }}>
              Satisfaction Rate
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#ff4757',
              marginBottom: '4px'
            }}>
              {'< 5km'}
            </div>
            <div style={{
              fontSize: '14px',
              color: '#666'
            }}>
              Average Distance
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 