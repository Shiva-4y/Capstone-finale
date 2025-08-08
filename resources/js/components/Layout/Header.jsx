import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Search, 
  Heart, 
  ShoppingCart, 
  User, 
  ChevronDown,
  Package,
  MessageCircle,
  Eye,
  LogOut,
  Settings,
  FileText,
  HelpCircle,
  Shirt,
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

export default function Header() {
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showCategoriesDropdown, setShowCategoriesDropdown] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const categories = [
    { name: 'Women', icon: <Shirt size={16} />, link: '/category/women' },
    { name: 'Men', icon: <User size={16} />, link: '/category/men' },
    { name: 'Kids', icon: <Baby size={16} />, link: '/category/kids' },
         { name: 'Shoes', icon: <Footprints size={16} />, link: '/category/shoes' },
    { name: 'Bags', icon: <Briefcase size={16} />, link: '/category/bags' },
    { name: 'Accessories', icon: <Gem size={16} />, link: '/category/accessories' },
    { name: 'Beauty', icon: <Sparkles size={16} />, link: '/category/beauty' },
    { name: 'Home', icon: <Home size={16} />, link: '/category/home' },
    { name: 'Sports', icon: <Trophy size={16} />, link: '/category/sports' },
    { name: 'Electronics', icon: <Smartphone size={16} />, link: '/category/electronics' },
    { name: 'Books', icon: <BookOpen size={16} />, link: '/category/books' },
    { name: 'Toys', icon: <Gamepad2 size={16} />, link: '/category/toys' }
  ];

  return (
    <header style={{
      background: 'white',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      {/* Top Bar */}
      <div style={{
        background: '#ff4757',
        color: 'white',
        padding: '8px 0',
        textAlign: 'center',
        fontSize: '14px'
      }}>
        🎉 Free Shipping on Orders Over $50! Limited Time Only
      </div>

      {/* Main Header */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '70px'
      }}>
        {/* Logo */}
        <Link to="/" style={{
          fontSize: '28px',
          fontWeight: 'bold',
          color: '#ff4757',
          textDecoration: 'none'
        }}>
          Restyle
        </Link>

        {/* Search Bar */}
        <div style={{
          flex: 1,
          maxWidth: '500px',
          margin: '0 40px',
          position: 'relative'
        }}>
          <input
            type="text"
            placeholder="Search for clothes, accessories, and more..."
            style={{
              width: '100%',
              padding: '12px 50px 12px 20px',
              border: '2px solid #f1f1f1',
              borderRadius: '25px',
              fontSize: '14px',
              outline: 'none',
              transition: 'border-color 0.3s'
            }}
            onFocus={(e) => e.target.style.borderColor = '#ff4757'}
            onBlur={(e) => e.target.style.borderColor = '#f1f1f1'}
          />
                     <button style={{
             position: 'absolute',
             right: '5px',
             top: '50%',
             transform: 'translateY(-50%)',
             background: '#ff4757',
             border: 'none',
             borderRadius: '50%',
             width: '40px',
             height: '40px',
             cursor: 'pointer',
             display: 'flex',
             alignItems: 'center',
             justifyContent: 'center',
             color: 'white'
           }}>
             <Search size={18} />
           </button>
        </div>

        {/* Right Side Icons */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '25px'
        }}>
          {/* Categories Dropdown */}
          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            fontSize: '14px',
            color: '#333',
            fontWeight: '500'
          }}
          onMouseEnter={() => setShowCategoriesDropdown(true)}
          onMouseLeave={() => setShowCategoriesDropdown(false)}
          >
                       <span style={{ marginRight: '5px' }}>
             <Package size={16} />
           </span>
           Categories

            {/* Categories Dropdown Menu */}
            {showCategoriesDropdown && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: '0',
                background: 'white',
                border: '1px solid #ddd',
                borderRadius: '8px',
                boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                minWidth: '200px',
                zIndex: 1001,
                marginTop: '5px',
                padding: '10px 0'
              }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '5px',
                  padding: '0 15px'
                }}>
                  {categories.map((category, index) => (
                    <Link
                      key={index}
                      to={category.link}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '8px 12px',
                        color: '#333',
                        textDecoration: 'none',
                        fontSize: '13px',
                        borderRadius: '4px',
                        transition: 'background-color 0.3s'
                      }}
                      onMouseEnter={(e) => e.target.style.background = '#f8f9fa'}
                      onMouseLeave={(e) => e.target.style.background = 'transparent'}
                    >
                                             <span style={{ marginRight: '8px', display: 'flex', alignItems: 'center' }}>
                         {category.icon}
                       </span>
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Wishlist */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            cursor: 'pointer',
            fontSize: '12px',
            color: '#666'
          }}>
                       <span style={{ fontSize: '20px', marginBottom: '2px' }}>
             <Heart size={20} />
           </span>
           <span>Wishlist</span>
          </div>

          {/* Cart */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            cursor: 'pointer',
            fontSize: '12px',
            color: '#666',
            position: 'relative'
          }}>
                       <span style={{ fontSize: '20px', marginBottom: '2px' }}>
             <ShoppingCart size={20} />
           </span>
           <span>Cart</span>
            <span style={{
              position: 'absolute',
              top: '-5px',
              right: '-5px',
              background: '#ff4757',
              color: 'white',
              borderRadius: '50%',
              width: '18px',
              height: '18px',
              fontSize: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              0
            </span>
          </div>

          {/* User Menu */}
          <div style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            cursor: 'pointer',
            fontSize: '12px',
            color: '#666'
          }}
          onMouseEnter={() => setShowUserDropdown(true)}
          onMouseLeave={() => setShowUserDropdown(false)}
          >
                       <span style={{ fontSize: '20px', marginBottom: '2px' }}>
             <User size={20} />
           </span>
           <span>{user ? user.first_name : 'Account'}</span>

            {/* Dropdown Menu */}
            {showUserDropdown && (
              <div style={{
                position: 'absolute',
                top: '100%',
                right: '0',
                background: 'white',
                border: '1px solid #ddd',
                borderRadius: '8px',
                boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                minWidth: '150px',
                zIndex: 1001,
                marginTop: '5px'
              }}>
                {user ? (
                  <>
                    <div style={{
                      padding: '12px 16px',
                      color: '#333',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      borderBottom: '1px solid #f1f1f1'
                    }}>
                      Welcome, {user.first_name}!
                    </div>
                                         <Link to="/profile" style={{
                       display: 'flex',
                       alignItems: 'center',
                       padding: '12px 16px',
                       color: '#333',
                       textDecoration: 'none',
                       fontSize: '14px',
                       borderBottom: '1px solid #f1f1f1'
                     }}
                     onMouseEnter={(e) => e.target.style.background = '#f8f9fa'}
                     onMouseLeave={(e) => e.target.style.background = 'white'}
                     >
                       <Settings size={16} style={{ marginRight: '8px' }} />
                       My Profile
                     </Link>
                     <Link to="/wardrobe" style={{
                       display: 'flex',
                       alignItems: 'center',
                       padding: '12px 16px',
                       color: '#333',
                       textDecoration: 'none',
                       fontSize: '14px',
                       borderBottom: '1px solid #f1f1f1'
                     }}
                     onMouseEnter={(e) => e.target.style.background = '#f8f9fa'}
                     onMouseLeave={(e) => e.target.style.background = 'white'}
                     >
                       <Package size={16} style={{ marginRight: '8px' }} />
                       My Wardrobe
                     </Link>
                     <Link to="/my-listings" style={{
                       display: 'flex',
                       alignItems: 'center',
                       padding: '12px 16px',
                       color: '#333',
                       textDecoration: 'none',
                       fontSize: '14px',
                       borderBottom: '1px solid #f1f1f1'
                     }}
                     onMouseEnter={(e) => e.target.style.background = '#f8f9fa'}
                     onMouseLeave={(e) => e.target.style.background = 'white'}
                     >
                       <Package size={16} style={{ marginRight: '8px' }} />
                       My Listings
                     </Link>
                     <Link to="/messages" style={{
                       display: 'flex',
                       alignItems: 'center',
                       padding: '12px 16px',
                       color: '#333',
                       textDecoration: 'none',
                       fontSize: '14px',
                       borderBottom: '1px solid #f1f1f1'
                     }}
                     onMouseEnter={(e) => e.target.style.background = '#f8f9fa'}
                     onMouseLeave={(e) => e.target.style.background = 'white'}
                     >
                       <MessageCircle size={16} style={{ marginRight: '8px' }} />
                       Messages
                     </Link>
                                         <button
                       onClick={logout}
                       style={{
                         display: 'flex',
                         alignItems: 'center',
                         width: '100%',
                         padding: '12px 16px',
                         color: '#ff4757',
                         textDecoration: 'none',
                         fontSize: '14px',
                         background: 'none',
                         border: 'none',
                         textAlign: 'left',
                         cursor: 'pointer'
                       }}
                       onMouseEnter={(e) => e.target.style.background = '#f8f9fa'}
                       onMouseLeave={(e) => e.target.style.background = 'white'}
                     >
                       <LogOut size={16} style={{ marginRight: '8px' }} />
                       Logout
                     </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" style={{
                      display: 'block',
                      padding: '12px 16px',
                      color: '#333',
                      textDecoration: 'none',
                      fontSize: '14px',
                      borderBottom: '1px solid #f1f1f1'
                    }}
                    onMouseEnter={(e) => e.target.style.background = '#f8f9fa'}
                    onMouseLeave={(e) => e.target.style.background = 'white'}
                    >
                      Sign In / Register
                    </Link>
                                         <div style={{
                       display: 'flex',
                       alignItems: 'center',
                       padding: '12px 16px',
                       color: '#666',
                       fontSize: '14px'
                     }}>
                       <FileText size={16} style={{ marginRight: '8px' }} />
                       Track Order
                     </div>
                     <div style={{
                       display: 'flex',
                       alignItems: 'center',
                       padding: '12px 16px',
                       color: '#666',
                       fontSize: '14px'
                     }}>
                       <HelpCircle size={16} style={{ marginRight: '8px' }} />
                       Help Center
                     </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
} 