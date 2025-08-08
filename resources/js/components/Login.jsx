import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const result = await login(formData);
      
      if (result.success) {
        alert('Login successful! Welcome back!');
        navigate('/'); // Redirect to homepage
      } else {
        alert(result.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #ff6b9d, #ff8fab)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '40px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
        width: '100%',
        maxWidth: '400px'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <Link to="/" style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#ff4757',
            textDecoration: 'none'
          }}>
            Restyle
          </Link>
          <h2 style={{
            fontSize: '24px',
            color: '#333',
            marginTop: '10px',
            marginBottom: '5px'
          }}>Welcome Back</h2>
          <p style={{
            color: '#666',
            fontSize: '14px'
          }}>Sign in to your account</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#333',
              fontSize: '14px',
              fontWeight: '500'
            }}>
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
                transition: 'border-color 0.3s',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#ff4757'}
              onBlur={(e) => e.target.style.borderColor = '#ddd'}
            />
          </div>

          <div style={{ marginBottom: '25px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#333',
              fontSize: '14px',
              fontWeight: '500'
            }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  paddingRight: '50px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.3s',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#ff4757'}
                onBlur={(e) => e.target.style.borderColor = '#ddd'}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '16px',
                  color: '#666'
                }}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '25px'
          }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: '14px',
              color: '#666',
              cursor: 'pointer'
            }}>
              <input
                type="checkbox"
                style={{
                  marginRight: '8px',
                  transform: 'scale(1.2)'
                }}
              />
              Remember me
            </label>
            <Link to="/forgot-password" style={{
              color: '#ff4757',
              textDecoration: 'none',
              fontSize: '14px'
            }}>
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              background: '#ff4757',
              color: 'white',
              border: 'none',
              padding: '15px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
              marginBottom: '20px'
            }}
            onMouseEnter={(e) => e.target.style.background = '#e63946'}
            onMouseLeave={(e) => e.target.style.background = '#ff4757'}
          >
                         {isLoading ? 'Signing In...' : 'Sign In'}
           </button>

          <div style={{
            textAlign: 'center',
            fontSize: '14px',
            color: '#666'
          }}>
            Don't have an account?{' '}
            <Link to="/register" style={{
              color: '#ff4757',
              textDecoration: 'none',
              fontWeight: 'bold'
            }}>
              Sign Up
            </Link>
          </div>
        </form>

        {/* Social Login */}
        <div style={{
          marginTop: '30px',
          textAlign: 'center'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '15px'
          }}>
            <div style={{
              flex: 1,
              height: '1px',
              background: '#ddd'
            }}></div>
            <span style={{
              padding: '0 15px',
              color: '#666',
              fontSize: '14px'
            }}>Or continue with</span>
            <div style={{
              flex: 1,
              height: '1px',
              background: '#ddd'
            }}></div>
          </div>
          
          <div style={{
            display: 'flex',
            gap: '10px'
          }}>
            <button style={{
              flex: 1,
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              background: 'white',
              cursor: 'pointer',
              fontSize: '14px',
              transition: 'background-color 0.3s'
            }}
            onMouseEnter={(e) => e.target.style.background = '#f8f9fa'}
            onMouseLeave={(e) => e.target.style.background = 'white'}
            >
              📧 Google
            </button>
            <button style={{
              flex: 1,
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              background: 'white',
              cursor: 'pointer',
              fontSize: '14px',
              transition: 'background-color 0.3s'
            }}
            onMouseEnter={(e) => e.target.style.background = '#f8f9fa'}
            onMouseLeave={(e) => e.target.style.background = 'white'}
            >
              📘 Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 