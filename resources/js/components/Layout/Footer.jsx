import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{
      background: '#2c3e50',
      color: 'white',
      padding: '40px 0 20px 0',
      marginTop: 'auto'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px'
      }}>
        {/* Main Footer Content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '40px',
          marginBottom: '30px'
        }}>
          {/* Company Info */}
          <div>
            <h3 style={{
              fontSize: '20px',
              fontWeight: 'bold',
              marginBottom: '15px',
              color: '#ff4757'
            }}>
              Restyle
            </h3>
            <p style={{
              fontSize: '14px',
              lineHeight: '1.6',
              color: '#bdc3c7',
              marginBottom: '15px'
            }}>
              Your ultimate destination for fashion and lifestyle. Discover the latest trends in clothing, accessories, and more.
            </p>
            <div style={{
              display: 'flex',
              gap: '15px'
            }}>
              <span style={{ fontSize: '20px', cursor: 'pointer' }}>📘</span>
              <span style={{ fontSize: '20px', cursor: 'pointer' }}>📷</span>
              <span style={{ fontSize: '20px', cursor: 'pointer' }}>🐦</span>
              <span style={{ fontSize: '20px', cursor: 'pointer' }}>📺</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{
              fontSize: '16px',
              fontWeight: 'bold',
              marginBottom: '15px'
            }}>
              Quick Links
            </h4>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              <li style={{ marginBottom: '8px' }}>
                <Link to="/about" style={{
                  color: '#bdc3c7',
                  textDecoration: 'none',
                  fontSize: '14px',
                  transition: 'color 0.3s'
                }}
                onMouseEnter={(e) => e.target.style.color = '#ff4757'}
                onMouseLeave={(e) => e.target.style.color = '#bdc3c7'}
                >
                  About Us
                </Link>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <Link to="/contact" style={{
                  color: '#bdc3c7',
                  textDecoration: 'none',
                  fontSize: '14px',
                  transition: 'color 0.3s'
                }}
                onMouseEnter={(e) => e.target.style.color = '#ff4757'}
                onMouseLeave={(e) => e.target.style.color = '#bdc3c7'}
                >
                  Contact Us
                </Link>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <Link to="/careers" style={{
                  color: '#bdc3c7',
                  textDecoration: 'none',
                  fontSize: '14px',
                  transition: 'color 0.3s'
                }}
                onMouseEnter={(e) => e.target.style.color = '#ff4757'}
                onMouseLeave={(e) => e.target.style.color = '#bdc3c7'}
                >
                  Careers
                </Link>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <Link to="/press" style={{
                  color: '#bdc3c7',
                  textDecoration: 'none',
                  fontSize: '14px',
                  transition: 'color 0.3s'
                }}
                onMouseEnter={(e) => e.target.style.color = '#ff4757'}
                onMouseLeave={(e) => e.target.style.color = '#bdc3c7'}
                >
                  Press
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 style={{
              fontSize: '16px',
              fontWeight: 'bold',
              marginBottom: '15px'
            }}>
              Customer Service
            </h4>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              <li style={{ marginBottom: '8px' }}>
                <Link to="/help" style={{
                  color: '#bdc3c7',
                  textDecoration: 'none',
                  fontSize: '14px',
                  transition: 'color 0.3s'
                }}
                onMouseEnter={(e) => e.target.style.color = '#ff4757'}
                onMouseLeave={(e) => e.target.style.color = '#bdc3c7'}
                >
                  Help Center
                </Link>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <Link to="/shipping" style={{
                  color: '#bdc3c7',
                  textDecoration: 'none',
                  fontSize: '14px',
                  transition: 'color 0.3s'
                }}
                onMouseEnter={(e) => e.target.style.color = '#ff4757'}
                onMouseLeave={(e) => e.target.style.color = '#bdc3c7'}
                >
                  Shipping Info
                </Link>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <Link to="/returns" style={{
                  color: '#bdc3c7',
                  textDecoration: 'none',
                  fontSize: '14px',
                  transition: 'color 0.3s'
                }}
                onMouseEnter={(e) => e.target.style.color = '#ff4757'}
                onMouseLeave={(e) => e.target.style.color = '#bdc3c7'}
                >
                  Returns & Exchanges
                </Link>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <Link to="/size-guide" style={{
                  color: '#bdc3c7',
                  textDecoration: 'none',
                  fontSize: '14px',
                  transition: 'color 0.3s'
                }}
                onMouseEnter={(e) => e.target.style.color = '#ff4757'}
                onMouseLeave={(e) => e.target.style.color = '#bdc3c7'}
                >
                  Size Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 style={{
              fontSize: '16px',
              fontWeight: 'bold',
              marginBottom: '15px'
            }}>
              Legal
            </h4>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              <li style={{ marginBottom: '8px' }}>
                <Link to="/privacy" style={{
                  color: '#bdc3c7',
                  textDecoration: 'none',
                  fontSize: '14px',
                  transition: 'color 0.3s'
                }}
                onMouseEnter={(e) => e.target.style.color = '#ff4757'}
                onMouseLeave={(e) => e.target.style.color = '#bdc3c7'}
                >
                  Privacy Policy
                </Link>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <Link to="/terms" style={{
                  color: '#bdc3c7',
                  textDecoration: 'none',
                  fontSize: '14px',
                  transition: 'color 0.3s'
                }}
                onMouseEnter={(e) => e.target.style.color = '#ff4757'}
                onMouseLeave={(e) => e.target.style.color = '#bdc3c7'}
                >
                  Terms of Service
                </Link>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <Link to="/cookies" style={{
                  color: '#bdc3c7',
                  textDecoration: 'none',
                  fontSize: '14px',
                  transition: 'color 0.3s'
                }}
                onMouseEnter={(e) => e.target.style.color = '#ff4757'}
                onMouseLeave={(e) => e.target.style.color = '#bdc3c7'}
                >
                  Cookie Policy
                </Link>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <Link to="/accessibility" style={{
                  color: '#bdc3c7',
                  textDecoration: 'none',
                  fontSize: '14px',
                  transition: 'color 0.3s'
                }}
                onMouseEnter={(e) => e.target.style.color = '#ff4757'}
                onMouseLeave={(e) => e.target.style.color = '#bdc3c7'}
                >
                  Accessibility
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid #34495e',
          paddingTop: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '10px'
        }}>
          <div style={{
            fontSize: '12px',
            color: '#bdc3c7'
          }}>
            © 2024 Restyle. All rights reserved.
          </div>
          <div style={{
            display: 'flex',
            gap: '20px',
            fontSize: '12px'
          }}>
            <span style={{ color: '#bdc3c7' }}>🇺🇸 United States</span>
            <span style={{ color: '#bdc3c7' }}>💳 Secure Payment</span>
            <span style={{ color: '#bdc3c7' }}>🔒 SSL Protected</span>
          </div>
        </div>
      </div>
    </footer>
  );
} 