import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  MapPin, 
  Heart, 
  MessageCircle, 
  Eye,
  Star,
  Clock,
  Truck,
  Shield,
  ChevronDown,
  Grid,
  List,
  Sliders
} from 'lucide-react';

export default function MarketplacePage() {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [sortBy, setSortBy] = useState('recent');
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [showFilters, setShowFilters] = useState(false);

  // Fetch marketplace items from other users
  useEffect(() => {
    const fetchMarketplaceItems = async () => {
      try {
        console.log('Fetching marketplace items...');
        console.log('User authentication status:', user);
        
        if (!user) {
          console.log('User not authenticated, redirecting to login...');
          // You might want to redirect to login or show a message
          setItems([]);
          setLoading(false);
          return;
        }
        
        const response = await fetch('/api/marketplace', {
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
            'Accept': 'application/json',
          },
          credentials: 'same-origin',
        });

        console.log('Response status:', response.status);
        
        if (response.ok) {
          const data = await response.json();
          console.log('Marketplace data:', data);
          console.log('Number of items received:', data.items ? data.items.length : 0);
          setItems(data.items || []);
        } else {
          const errorText = await response.text();
          console.error('Error fetching marketplace items. Status:', response.status);
          console.error('Error response:', errorText);
          setItems([]);
        }
      } catch (error) {
        console.error('Error fetching marketplace items:', error);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMarketplaceItems();
  }, [user]);

  const categories = [
    { id: 'all', name: 'All Categories', icon: '🛍️' },
    { id: 'tops', name: 'Tops', icon: '👚' },
    { id: 'dresses', name: 'Dresses', icon: '👗' },
    { id: 'jackets', name: 'Jackets', icon: '🧥' },
    { id: 'shoes', name: 'Shoes', icon: '👠' },
    { id: 'bags', name: 'Bags', icon: '👜' },
    { id: 'accessories', name: 'Accessories', icon: '👒' }
  ];

  const locations = [
    { id: 'all', name: 'All Locations' },
    { id: 'lapu-lapu', name: 'Lapu-Lapu City' },
    { id: 'mandaue', name: 'Mandaue City' }
  ];

  const sortOptions = [
    { id: 'recent', name: 'Most Recent' },
    { id: 'price-low', name: 'Price: Low to High' },
    { id: 'price-high', name: 'Price: High to Low' },
    { id: 'distance', name: 'Nearest First' },
    { id: 'rating', name: 'Highest Rated' }
  ];

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (item.seller?.name && item.seller.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesLocation = selectedLocation === 'all' || 
                           (selectedLocation === 'lapu-lapu' && item.seller?.location === 'Lapu-Lapu City') ||
                           (selectedLocation === 'mandaue' && item.seller?.location === 'Mandaue City');
    const matchesPrice = (!priceRange.min || item.price >= parseInt(priceRange.min)) &&
                        (!priceRange.max || item.price <= parseInt(priceRange.max));
    
    return matchesSearch && matchesCategory && matchesLocation && matchesPrice;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'distance':
        return parseFloat(a.distance) - parseFloat(b.distance);
      case 'rating':
        return b.rating - a.rating;
      default:
        return b.id - a.id; // Most recent
    }
  });

  const toggleLike = (itemId) => {
    setItems(items.map(item => 
      item.id === itemId ? { ...item, isLiked: !item.isLiked } : item
    ));
  };

  const formatPrice = (price) => {
    if (price == null) return ''; // or return '₱0.00'
    return price.toLocaleString('en-PH', { style: 'currency', currency: 'PHP' });
};

  const getDiscountPercentage = (original, current) => {
    return Math.round(((original - current) / original) * 100);
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '50vh',
        fontSize: '18px',
        color: '#666'
      }}>
        Loading marketplace...
      </div>
    );
  }

  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh' }}>
      {/* Header Section */}
      <section style={{
        background: 'white',
        padding: '20px',
        borderBottom: '1px solid #e9ecef',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {/* Search Bar */}
          <div style={{
            display: 'flex',
            gap: '12px',
            marginBottom: '20px'
          }}>
            <div style={{
              flex: 1,
              position: 'relative'
            }}>
              <Search size={20} style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#666'
              }} />
              <input
                type="text"
                placeholder="Search for clothes, accessories, sellers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 12px 12px 40px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              style={{
                padding: '12px 16px',
                background: showFilters ? '#ff4757' : 'white',
                color: showFilters ? 'white' : '#333',
                border: '1px solid #ddd',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '14px'
              }}
            >
              <Filter size={16} />
              Filters
            </button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div style={{
              background: '#f8f9fa',
              padding: '20px',
              borderRadius: '8px',
              marginBottom: '20px'
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '20px'
              }}>
                {/* Category Filter */}
                <div>
                  <label style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px', display: 'block' }}>
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      fontSize: '14px'
                    }}
                  >
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.icon} {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Location Filter */}
                <div>
                  <label style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px', display: 'block' }}>
                    Location
                  </label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      fontSize: '14px'
                    }}
                  >
                    {locations.map(location => (
                      <option key={location.id} value={location.id}>
                        {location.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px', display: 'block' }}>
                    Price Range
                  </label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                      type="number"
                      placeholder="Min"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                      style={{
                        flex: 1,
                        padding: '8px 12px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        fontSize: '14px'
                      }}
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                      style={{
                        flex: 1,
                        padding: '8px 12px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        fontSize: '14px'
                      }}
                    />
                  </div>
                </div>

                {/* Sort By */}
                <div>
                  <label style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px', display: 'block' }}>
                    Sort By
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      fontSize: '14px'
                    }}
                  >
                    {sortOptions.map(option => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Results Info */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '14px',
            color: '#666'
          }}>
            <span>{sortedItems.length} items found</span>
            {sortedItems.length > 0 && (
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => setViewMode('grid')}
                  style={{
                    padding: '8px',
                    background: viewMode === 'grid' ? '#ff4757' : 'white',
                    color: viewMode === 'grid' ? 'white' : '#333',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  <Grid size={16} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  style={{
                    padding: '8px',
                    background: viewMode === 'list' ? '#ff4757' : 'white',
                    color: viewMode === 'list' ? 'white' : '#333',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  <List size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Items Grid */}
      <section style={{
        padding: '20px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {sortedItems.length === 0 ? (
          // Empty State
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            color: '#666'
          }}>
            <div style={{
              fontSize: '64px',
              marginBottom: '20px',
              opacity: '0.6'
            }}>
              🛍️
            </div>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#333',
              marginBottom: '12px'
            }}>
              No items available yet
            </h2>
            <p style={{
              fontSize: '16px',
              color: '#666',
              marginBottom: '24px',
              maxWidth: '500px',
              margin: '0 auto 24px'
            }}>
              Be the first to list your fashion items for sale! Other users will be able to discover and purchase your items.
            </p>
            <Link to="/wardrobe/add" style={{
              background: '#ff4757',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '500',
              display: 'inline-block'
            }}>
              List Your First Item
            </Link>
          </div>
        ) : viewMode === 'grid' ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '20px'
          }}>
            {sortedItems.map(item => (
              <div key={item.id} style={{
                background: 'white',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                border: '1px solid #f1f1f1',
                transition: 'transform 0.2s, box-shadow 0.2s',
                cursor: 'pointer'
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
                {/* Image */}
                <div style={{
                  position: 'relative',
                  height: '200px',
                  overflow: 'hidden'
                }}>
                                     <img
                     src={item.image_path ? `/storage/${item.image_path}` : '/placeholder-image.jpg'}
                     alt={item.name}
                     style={{
                       width: '100%',
                       height: '100%',
                       objectFit: 'cover'
                     }}
                   />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(item.id);
                    }}
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      background: 'white',
                      border: 'none',
                      borderRadius: '50%',
                      width: '32px',
                      height: '32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}
                  >
                    <Heart size={16} fill={item.isLiked ? '#ff4757' : 'none'} color={item.isLiked ? '#ff4757' : '#666'} />
                  </button>
                  {item.originalPrice > item.price && (
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      background: '#ff4757',
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}>
                      -{getDiscountPercentage(item.originalPrice, item.price)}%
                    </div>
                  )}
                </div>

                {/* Content */}
                <div style={{ padding: '16px' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '8px'
                  }}>
                    <h3 style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#333',
                      margin: 0,
                      lineHeight: '1.3'
                    }}>
                      {item.name}
                    </h3>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '12px'
                  }}>
                                         <div style={{
                       display: 'flex',
                       alignItems: 'center',
                       gap: '4px'
                     }}>
                       <Star size={14} fill="#ffd700" color="#ffd700" />
                       <span style={{ fontSize: '12px', color: '#666' }}>
                         {item.seller?.rating || 4.8} ({item.seller?.reviews || 0})
                       </span>
                     </div>
                    <span style={{ fontSize: '12px', color: '#666' }}>•</span>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <Eye size={14} color="#666" />
                                           <span style={{ fontSize: '12px', color: '#666' }}>
                       {item.views || 0}
                     </span>
                    </div>
                  </div>

                                     <div style={{
                     display: 'flex',
                     alignItems: 'center',
                     gap: '8px',
                     marginBottom: '12px'
                   }}>
                     <MapPin size={14} color="#666" />
                     <span style={{ fontSize: '12px', color: '#666' }}>
                       {item.seller?.location || 'Lapu-Lapu City'} • {item.seller?.distance || '2.3 km'}
                     </span>
                   </div>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <div style={{
                        fontSize: '18px',
                        fontWeight: 'bold',
                        color: '#ff4757'
                      }}>
                        {formatPrice(item.price)}
                      </div>
                      {item.originalPrice > item.price && (
                        <div style={{
                          fontSize: '12px',
                          color: '#999',
                          textDecoration: 'line-through'
                        }}>
                          {formatPrice(item.originalPrice)}
                        </div>
                      )}
                    </div>
                    <button style={{
                      background: '#ff4757',
                      color: 'white',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '500',
                      cursor: 'pointer'
                    }}>
                      Contact Seller
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // List View
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {sortedItems.map(item => (
              <div key={item.id} style={{
                background: 'white',
                borderRadius: '8px',
                padding: '16px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                border: '1px solid #f1f1f1',
                display: 'flex',
                gap: '16px',
                cursor: 'pointer',
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
                                 <img
                   src={item.image_path ? `/storage/${item.image_path}` : '/placeholder-image.jpg'}
                   alt={item.name}
                   style={{
                     width: '120px',
                     height: '120px',
                     objectFit: 'cover',
                     borderRadius: '8px'
                   }}
                 />
                <div style={{ flex: 1 }}>
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#333',
                    margin: '0 0 8px 0'
                  }}>
                    {item.name}
                  </h3>
                                     <div style={{
                     display: 'flex',
                     alignItems: 'center',
                     gap: '8px',
                     marginBottom: '8px'
                   }}>
                     <MapPin size={14} color="#666" />
                     <span style={{ fontSize: '12px', color: '#666' }}>
                       {item.seller?.location || 'Lapu-Lapu City'} • {item.seller?.distance || '2.3 km'}
                     </span>
                   </div>
                                     <div style={{
                     display: 'flex',
                     alignItems: 'center',
                     gap: '8px',
                     marginBottom: '12px'
                   }}>
                     <Star size={14} fill="#ffd700" color="#ffd700" />
                     <span style={{ fontSize: '12px', color: '#666' }}>
                       {item.seller?.rating || 4.8} ({item.seller?.reviews || 0} reviews)
                     </span>
                   </div>
                </div>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  gap: '8px'
                }}>
                  <div style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: '#ff4757'
                  }}>
                    {formatPrice(item.price)}
                  </div>
                  {item.originalPrice > item.price && (
                    <div style={{
                      fontSize: '12px',
                      color: '#999',
                      textDecoration: 'line-through'
                    }}>
                      {formatPrice(item.originalPrice)}
                    </div>
                  )}
                  <button style={{
                    background: '#ff4757',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}>
                    Contact Seller
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
} 