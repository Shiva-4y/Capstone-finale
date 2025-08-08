import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { 
  Package, 
  MessageCircle, 
  Eye, 
  Heart, 
  ShoppingBag,
  Clock,
  Truck,
  Star,
  RotateCcw,
  Settings,
  FileText,
  HelpCircle,
  ChevronRight
} from 'lucide-react';

export default function AuthenticatedHomePage() {
  const { user } = useAuth();

  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh' }}>
      {/* Welcome Section - Shein Style */}
      <section style={{
        background: 'white',
        padding: '30px 20px',
        borderBottom: '1px solid #e9ecef'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <h1 style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: '#333',
              marginBottom: '8px'
            }}>
              Hi, {user?.first_name}! 👋
            </h1>
            <p style={{
              fontSize: '16px',
              color: '#666',
              margin: 0
            }}>
              Welcome to your personal marketplace dashboard
            </p>
          </div>
                       <Link to="/profile" style={{
               color: '#ff4757',
               textDecoration: 'none',
               fontSize: '14px',
               fontWeight: '500',
               display: 'flex',
               alignItems: 'center'
             }}>
               My Profile <ChevronRight size={14} />
             </Link>
        </div>
      </section>

      {/* Summary Cards - Shein Style */}
      <section style={{
        padding: '30px 20px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginBottom: '30px'
        }}>
          <div style={{
            background: 'white',
            padding: '24px',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            textAlign: 'center',
            border: '1px solid #f1f1f1'
          }}>
                         <div style={{ fontSize: '24px', marginBottom: '12px' }}>
               <Package size={24} color="#ff4757" />
             </div>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#333', marginBottom: '4px' }}>0</div>
            <div style={{ fontSize: '14px', color: '#666' }}>Active Listings</div>
          </div>
          <div style={{
            background: 'white',
            padding: '24px',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            textAlign: 'center',
            border: '1px solid #f1f1f1'
          }}>
                         <div style={{ fontSize: '24px', marginBottom: '12px' }}>
               <MessageCircle size={24} color="#ff4757" />
             </div>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#333', marginBottom: '4px' }}>0</div>
            <div style={{ fontSize: '14px', color: '#666' }}>New Messages</div>
          </div>
          <div style={{
            background: 'white',
            padding: '24px',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            textAlign: 'center',
            border: '1px solid #f1f1f1'
          }}>
                         <div style={{ fontSize: '24px', marginBottom: '12px' }}>
               <Eye size={24} color="#ff4757" />
             </div>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#333', marginBottom: '4px' }}>0</div>
            <div style={{ fontSize: '14px', color: '#666' }}>Profile Views</div>
          </div>
          <div style={{
            background: 'white',
            padding: '24px',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            textAlign: 'center',
            border: '1px solid #f1f1f1'
          }}>
                         <div style={{ fontSize: '24px', marginBottom: '12px' }}>
               <Heart size={24} color="#ff4757" />
             </div>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#333', marginBottom: '4px' }}>0</div>
            <div style={{ fontSize: '14px', color: '#666' }}>Saved Items</div>
          </div>
        </div>
      </section>

      {/* Promotional Banners - Shein Style */}
      <section style={{
        padding: '0 20px 30px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px'
        }}>
          {/* Local Seller Program */}
          <div style={{
            background: 'linear-gradient(135deg, #ff6b9d, #ff8fab)',
            padding: '24px',
            borderRadius: '8px',
            color: 'white',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: '-20px',
              right: '-20px',
              fontSize: '60px',
              opacity: '0.2'
            }}>
              🛍️
            </div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: 'bold',
              marginBottom: '8px'
            }}>
              Become a Local Seller
            </h3>
            <p style={{
              fontSize: '14px',
              opacity: '0.9',
              marginBottom: '16px'
            }}>
              Start selling your fashion items locally. Reach buyers in Lapu-Lapu City and Mandaue City.
            </p>
            <Link to="/sell" style={{
              background: 'white',
              color: '#ff4757',
              padding: '8px 16px',
              borderRadius: '4px',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: 'bold',
              display: 'inline-block'
            }}>
              Start Selling {'>'}
            </Link>
          </div>

          {/* Local Discovery */}
          <div style={{
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            padding: '24px',
            borderRadius: '8px',
            color: 'white',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: '-20px',
              right: '-20px',
              fontSize: '60px',
              opacity: '0.2'
            }}>
              🔍
            </div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: 'bold',
              marginBottom: '8px'
            }}>
              Discover Local Fashion
            </h3>
            <p style={{
              fontSize: '14px',
              opacity: '0.9',
              marginBottom: '16px'
            }}>
              Find amazing deals from sellers in your area. Quality fashion at great prices.
            </p>
            <Link to="/browse" style={{
              background: 'white',
              color: '#667eea',
              padding: '8px 16px',
              borderRadius: '4px',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: 'bold',
              display: 'inline-block'
            }}>
              Browse Local {'>'}
            </Link>
          </div>
        </div>
      </section>

      {/* My Orders Section - Shein Style */}
      <section style={{
        padding: '0 20px 30px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          border: '1px solid #f1f1f1',
          overflow: 'hidden'
        }}>
          <div style={{
            padding: '20px 24px',
            borderBottom: '1px solid #f1f1f1',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <h2 style={{
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#333',
              margin: 0
            }}>
              My Orders
            </h2>
                         <Link to="/orders" style={{
               color: '#ff4757',
               textDecoration: 'none',
               fontSize: '14px',
               display: 'flex',
               alignItems: 'center'
             }}>
               View All <ChevronRight size={14} />
             </Link>
          </div>
          
          <div style={{
            padding: '20px 24px'
          }}>
            <div style={{
              display: 'flex',
              gap: '20px',
              marginBottom: '20px'
            }}>
              {['Unpaid', 'Processing', 'Shipped', 'Review', 'Returns'].map((status, index) => (
                <div key={index} style={{
                  textAlign: 'center',
                  flex: 1
                }}>
                                     <div style={{
                     fontSize: '20px',
                     marginBottom: '8px',
                     color: '#666'
                   }}>
                     {[<ShoppingBag size={20} />, <Clock size={20} />, <Truck size={20} />, <Star size={20} />, <RotateCcw size={20} />][index]}
                   </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#666'
                  }}>
                    {status}
                  </div>
                </div>
              ))}
            </div>
            
            <div style={{
              textAlign: 'center',
              padding: '40px 20px',
              color: '#999'
            }}>
              <div style={{
                fontSize: '48px',
                marginBottom: '12px',
                opacity: '0.5'
              }}>
                🛍️
              </div>
              <p style={{
                fontSize: '14px',
                margin: 0
              }}>
                No orders yet. Start shopping!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions Grid - Shein Style */}
      <section style={{
        padding: '0 20px 30px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <h2 style={{
          fontSize: '18px',
          fontWeight: 'bold',
          color: '#333',
          marginBottom: '20px'
        }}>
          Quick Actions
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px'
        }}>
          <Link to="/my-listings" style={{
            background: 'white',
            padding: '24px',
            borderRadius: '8px',
            textDecoration: 'none',
            color: '#333',
            textAlign: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            border: '1px solid #f1f1f1',
            transition: 'transform 0.2s, box-shadow 0.2s'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.12)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
          }}
          >
                         <div style={{ fontSize: '32px', marginBottom: '12px' }}>
               <Package size={32} color="#ff4757" />
             </div>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>My Listings</h3>
            <p style={{ fontSize: '14px', color: '#666' }}>Manage your items</p>
          </Link>
          
          <Link to="/messages" style={{
            background: 'white',
            padding: '24px',
            borderRadius: '8px',
            textDecoration: 'none',
            color: '#333',
            textAlign: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            border: '1px solid #f1f1f1',
            transition: 'transform 0.2s, box-shadow 0.2s'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.12)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
          }}
          >
                         <div style={{ fontSize: '32px', marginBottom: '12px' }}>
               <MessageCircle size={32} color="#ff4757" />
             </div>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>Messages</h3>
            <p style={{ fontSize: '14px', color: '#666' }}>Chat with buyers/sellers</p>
          </Link>
          
          <Link to="/saved" style={{
            background: 'white',
            padding: '24px',
            borderRadius: '8px',
            textDecoration: 'none',
            color: '#333',
            textAlign: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            border: '1px solid #f1f1f1',
            transition: 'transform 0.2s, box-shadow 0.2s'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.12)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
          }}
          >
                         <div style={{ fontSize: '32px', marginBottom: '12px' }}>
               <Heart size={32} color="#ff4757" />
             </div>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>Saved Items</h3>
            <p style={{ fontSize: '14px', color: '#666' }}>Your wishlist</p>
          </Link>
          
          <Link to="/orders" style={{
            background: 'white',
            padding: '24px',
            borderRadius: '8px',
            textDecoration: 'none',
            color: '#333',
            textAlign: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            border: '1px solid #f1f1f1',
            transition: 'transform 0.2s, box-shadow 0.2s'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.12)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
          }}
          >
                         <div style={{ fontSize: '32px', marginBottom: '12px' }}>
               <ShoppingBag size={32} color="#ff4757" />
             </div>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>Orders</h3>
            <p style={{ fontSize: '14px', color: '#666' }}>Track your purchases</p>
          </Link>
        </div>
      </section>

      {/* Recently Viewed - Shein Style */}
      <section style={{
        padding: '0 20px 30px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          border: '1px solid #f1f1f1',
          overflow: 'hidden'
        }}>
          <div style={{
            padding: '20px 24px',
            borderBottom: '1px solid #f1f1f1',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <h2 style={{
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#333',
              margin: 0
            }}>
              Recently Viewed
            </h2>
                         <Link to="/recent" style={{
               color: '#ff4757',
               textDecoration: 'none',
               fontSize: '14px',
               display: 'flex',
               alignItems: 'center'
             }}>
               More <ChevronRight size={14} />
             </Link>
          </div>
          
          <div style={{
            padding: '20px 24px',
            textAlign: 'center',
            color: '#999'
          }}>
            <div style={{
              fontSize: '48px',
              marginBottom: '12px',
              opacity: '0.5'
            }}>
              👀
            </div>
            <p style={{
              fontSize: '14px',
              margin: 0
            }}>
              No recently viewed items
            </p>
          </div>
        </div>
      </section>
    </div>
  );
} 