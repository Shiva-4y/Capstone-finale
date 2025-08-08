import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    agreeToTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    if (!formData.agreeToTerms) {
      alert('Please agree to the terms and conditions!');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const result = await register({
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.confirmPassword,
        phone: formData.phone
      });
      
      if (result.success) {
        alert('Registration successful! Welcome to Restyle!');
        navigate('/'); // Redirect to homepage
      } else {
        if (result.errors) {
          // Show validation errors
          const errorMessages = Object.values(result.errors).flat().join('\n');
          alert('Registration failed:\n' + errorMessages);
        } else {
          alert(result.message || 'Registration failed. Please try again.');
        }
      }
    } catch (error) {
      console.error('Registration error:', error);
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
        maxWidth: '450px'
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
          }}>Create Account</h2>
          <p style={{
            color: '#666',
            fontSize: '14px'
          }}>Join our fashion community</p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '15px',
            marginBottom: '20px'
          }}>
            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                color: '#333',
                fontSize: '14px',
                fontWeight: '500'
              }}>
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First name"
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
            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                color: '#333',
                fontSize: '14px',
                fontWeight: '500'
              }}>
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last name"
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
          </div>

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

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#333',
              fontSize: '14px',
              fontWeight: '500'
            }}>
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
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

          <div style={{ marginBottom: '20px' }}>
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
                placeholder="Create a password"
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

          <div style={{ marginBottom: '25px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#333',
              fontSize: '14px',
              fontWeight: '500'
            }}>
              Confirm Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
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
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
                {showConfirmPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <div style={{
            marginBottom: '25px'
          }}>
            <label style={{
              display: 'flex',
              alignItems: 'flex-start',
              fontSize: '14px',
              color: '#666',
              cursor: 'pointer',
              lineHeight: '1.4'
            }}>
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                style={{
                  marginRight: '8px',
                  marginTop: '2px',
                  transform: 'scale(1.2)'
                }}
              />
              I agree to the{' '}
              <Link to="/terms" style={{
                color: '#ff4757',
                textDecoration: 'none'
              }}>
                Terms of Service
              </Link>
              {' '}and{' '}
              <Link to="/privacy" style={{
                color: '#ff4757',
                textDecoration: 'none'
              }}>
                Privacy Policy
              </Link>
            </label>
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
                         {isLoading ? 'Creating Account...' : 'Create Account'}
           </button>

          <div style={{
            textAlign: 'center',
            fontSize: '14px',
            color: '#666'
          }}>
            Already have an account?{' '}
            <Link to="/login" style={{
              color: '#ff4757',
              textDecoration: 'none',
              fontWeight: 'bold'
            }}>
              Sign In
            </Link>
          </div>
        </form>

        {/* Social Registration */}
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
            }}>Or sign up with</span>
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