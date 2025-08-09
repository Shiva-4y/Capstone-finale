import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function WardrobePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchWardrobeItems();
  }, []);

  const fetchWardrobeItems = async () => {
    try {
      const response = await fetch('/api/wardrobe', {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setItems(data.items);
      }
    } catch (error) {
      console.error('Error fetching wardrobe items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    navigate(`/wardrobe/edit/${item.id}`, { state: { item } });
  };

  const handleDelete = async (itemId) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        const response = await fetch(`/api/wardrobe/${itemId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
          },
        });

        if (response.ok) {
          // Remove the item from the local state
          setItems(items.filter(item => item.id !== itemId));
        } else {
          console.error('Error deleting item');
          alert('Error deleting item. Please try again.');
        }
      } catch (error) {
        console.error('Error deleting item:', error);
        alert('Error deleting item. Please try again.');
      }
    }
  };

  const handleToggleSale = async (itemId, currentSaleStatus) => {
    try {
      const response = await fetch(`/api/wardrobe/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
        },
        body: JSON.stringify({
          name: items.find(item => item.id === itemId)?.name || '',
          description: items.find(item => item.id === itemId)?.description || '',
          category: items.find(item => item.id === itemId)?.category || 'shirts',
          color: items.find(item => item.id === itemId)?.color || '',
          size: items.find(item => item.id === itemId)?.size || '',
          brand: items.find(item => item.id === itemId)?.brand || '',
          condition: items.find(item => item.id === itemId)?.condition || 'good',
          price: items.find(item => item.id === itemId)?.price || '',
          is_for_sale: !currentSaleStatus ? '1' : '0'
        })
      });

      if (response.ok) {
        // Update the item in local state
        setItems(items.map(item => 
          item.id === itemId 
            ? { ...item, is_for_sale: !currentSaleStatus }
            : item
        ));
      } else {
        console.error('Error updating item');
        alert('Error updating item. Please try again.');
      }
    } catch (error) {
      console.error('Error updating item:', error);
      alert('Error updating item. Please try again.');
    }
  };

  // Filter and search items
  const filteredItems = items.filter(item => {
    const matchesFilter = filter === 'all' || 
                         (filter === 'for_sale' && item.is_for_sale) ||
                         (filter === 'not_for_sale' && !item.is_for_sale) ||
                         item.category === filter;
    
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.color.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (item.brand && item.brand.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesFilter && matchesSearch;
  });

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
        Loading your wardrobe...
      </div>
    );
  }

    return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh' }}>
      <style>
        {`
          @keyframes spin {
            0% { transform: translate(-50%, -50%) rotate(0deg); }
            100% { transform: translate(-50%, -50%) rotate(360deg); }
          }
          
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          .wardrobe-card {
            animation: fadeIn 0.6s ease-out;
          }
        `}
      </style>
      {/* Header Section */}
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
              My Wardrobe
            </h1>
            <p style={{
              fontSize: '16px',
              color: '#666',
              margin: 0
            }}>
              Manage your clothes and accessories
            </p>
          </div>
          <div style={{
            display: 'flex',
            gap: '12px',
            alignItems: 'center'
          }}>
            <button 
              onClick={() => navigate('/')}
              style={{
                background: 'transparent',
                color: '#666',
                padding: '12px 24px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#f8f9fa';
                e.target.style.borderColor = '#ccc';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.borderColor = '#ddd';
              }}
            >
              ← Go Back
            </button>
            <Link to="/wardrobe/add" style={{
              background: '#ff4757',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '500'
            }}>
              Add Item
            </Link>
          </div>
        </div>
      </section>

             {/* Content */}
       <section style={{
         padding: '20px',
         maxWidth: '1200px',
         margin: '0 auto'
       }}>
         
         {/* Filters and Search */}
         {items.length > 0 && (
           <div style={{
             background: 'white',
             padding: '20px',
             borderRadius: '12px',
             boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
             marginBottom: '20px'
           }}>
             <div style={{
               display: 'flex',
               gap: '20px',
               alignItems: 'center',
               flexWrap: 'wrap'
             }}>
               {/* Search */}
               <div style={{ flex: '1', minWidth: '200px' }}>
                 <input
                   type="text"
                   placeholder="Search items..."
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                   style={{
                     width: '100%',
                     padding: '12px 16px',
                     border: '2px solid #f1f1f1',
                     borderRadius: '8px',
                     fontSize: '14px',
                     outline: 'none',
                     transition: 'border-color 0.2s ease'
                   }}
                   onFocus={(e) => e.target.style.borderColor = '#ff4757'}
                   onBlur={(e) => e.target.style.borderColor = '#f1f1f1'}
                 />
               </div>
               
               {/* Filter */}
               <div style={{ minWidth: '150px' }}>
                 <select
                   value={filter}
                   onChange={(e) => setFilter(e.target.value)}
                   style={{
                     width: '100%',
                     padding: '12px 16px',
                     border: '2px solid #f1f1f1',
                     borderRadius: '8px',
                     fontSize: '14px',
                     outline: 'none',
                     background: 'white',
                     cursor: 'pointer'
                   }}
                 >
                   <option value="all">All Items</option>
                   <option value="for_sale">For Sale</option>
                   <option value="not_for_sale">Not For Sale</option>
                   <option value="shirts">Shirts</option>
                   <option value="pants">Pants</option>
                   <option value="dresses">Dresses</option>
                   <option value="skirts">Skirts</option>
                 </select>
               </div>
               
               {/* Results Count */}
               <div style={{
                 fontSize: '14px',
                 color: '#666',
                 fontWeight: '500'
               }}>
                 {filteredItems.length} of {items.length} items
               </div>
             </div>
           </div>
         )}
         
         {filteredItems.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '20px'
          }}>
                         {filteredItems.map((item) => (
                               <div 
                  key={item.id} 
                  className="wardrobe-card"
                  style={{
                    background: 'white',
                    borderRadius: '12px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    overflow: 'hidden',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    cursor: 'pointer',
                    position: 'relative'
                  }}
               onMouseEnter={(e) => {
                 e.target.style.transform = 'translateY(-4px)';
                 e.target.style.boxShadow = '0 8px 30px rgba(0,0,0,0.12)';
               }}
               onMouseLeave={(e) => {
                 e.target.style.transform = 'translateY(0)';
                 e.target.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
               }}
               >
                                   {/* Image Container */}
                  <div style={{
                    position: 'relative',
                    overflow: 'hidden',
                    background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                    height: '280px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {/* Image with overlay */}
                    <div style={{
                      position: 'relative',
                      width: '100%',
                      height: '100%',
                      overflow: 'hidden',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <img 
                        src={`/storage/${item.image_path}`}
                        alt={item.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                          filter: 'brightness(0.95) contrast(1.05)',
                          maxWidth: '100%',
                          maxHeight: '100%'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'scale(1.05)';
                          e.target.style.filter = 'brightness(1.05) contrast(1.1)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'scale(1)';
                          e.target.style.filter = 'brightness(0.95) contrast(1.05)';
                        }}
                      />
                      
                      {/* Gradient overlay for better text readability */}
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '60px',
                        background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, transparent 100%)',
                        pointerEvents: 'none'
                      }} />
                      
                      <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '80px',
                        background: 'linear-gradient(0deg, rgba(0,0,0,0.2) 0%, transparent 100%)',
                        pointerEvents: 'none'
                      }} />
                    </div>
                    
                    {/* Category Badge */}
                    <div style={{
                      position: 'absolute',
                      top: '16px',
                      left: '16px',
                      background: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(10px)',
                      padding: '6px 14px',
                      borderRadius: '25px',
                      fontSize: '11px',
                      fontWeight: '700',
                      color: '#ff4757',
                      textTransform: 'uppercase',
                      letterSpacing: '0.8px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                      border: '1px solid rgba(255,255,255,0.2)'
                    }}>
                      {item.category}
                    </div>
                    
                    {/* Sale Badge */}
                    {item.is_for_sale && item.price && (
                      <div style={{
                        position: 'absolute',
                        top: '16px',
                        right: '16px',
                        background: 'linear-gradient(135deg, #ff4757 0%, #ff3742 100%)',
                        color: 'white',
                        padding: '6px 14px',
                        borderRadius: '25px',
                        fontSize: '11px',
                        fontWeight: '700',
                        letterSpacing: '0.8px',
                        boxShadow: '0 4px 12px rgba(255, 71, 87, 0.4)',
                        border: '1px solid rgba(255,255,255,0.2)'
                      }}>
                        FOR SALE
                      </div>
                    )}
                    
                    {/* Price overlay for sale items */}
                    {item.is_for_sale && item.price && (
                      <div style={{
                        position: 'absolute',
                        bottom: '16px',
                        right: '16px',
                        background: 'rgba(0, 0, 0, 0.8)',
                        backdropFilter: 'blur(10px)',
                        color: 'white',
                        padding: '8px 16px',
                        borderRadius: '20px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                      }}>
                        ₱{parseFloat(item.price).toLocaleString()}
                      </div>
                    )}
                    
                    {/* Image loading placeholder */}
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '40px',
                      height: '40px',
                      border: '3px solid #f3f3f3',
                      borderTop: '3px solid #ff4757',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite',
                      display: 'none'
                    }} />
                  </div>
                 
                 {/* Content */}
                 <div style={{ padding: '20px' }}>
                   {/* Title */}
                   <h3 style={{
                     fontSize: '18px',
                     fontWeight: 'bold',
                     color: '#333',
                     marginBottom: '8px',
                     lineHeight: '1.3'
                   }}>
                     {item.name}
                   </h3>
                   
                   {/* Details */}
                   <div style={{
                     display: 'flex',
                     flexDirection: 'column',
                     gap: '6px',
                     marginBottom: '16px'
                   }}>
                     <div style={{
                       display: 'flex',
                       alignItems: 'center',
                       gap: '8px',
                       fontSize: '14px',
                       color: '#666'
                     }}>
                       <span style={{
                         width: '8px',
                         height: '8px',
                         borderRadius: '50%',
                         background: item.color.toLowerCase() === 'black' ? '#333' : 
                                   item.color.toLowerCase() === 'white' ? '#ddd' :
                                   item.color.toLowerCase() === 'red' ? '#ff4757' :
                                   item.color.toLowerCase() === 'blue' ? '#007bff' :
                                   item.color.toLowerCase() === 'green' ? '#28a745' :
                                   item.color.toLowerCase() === 'yellow' ? '#ffc107' :
                                   item.color.toLowerCase() === 'purple' ? '#6f42c1' :
                                   item.color.toLowerCase() === 'pink' ? '#e83e8c' :
                                   '#666'
                       }}></span>
                       <span>{item.color}</span>
                       <span>•</span>
                       <span>{item.size}</span>
                     </div>
                     
                     {item.brand && (
                       <div style={{
                         fontSize: '13px',
                         color: '#888',
                         fontWeight: '500'
                       }}>
                         {item.brand}
                       </div>
                     )}
                     
                     <div style={{
                       fontSize: '12px',
                       color: '#999',
                       textTransform: 'capitalize'
                     }}>
                       Condition: {item.condition.replace('_', ' ')}
                     </div>
                   </div>
                   
                   
                   
                   {/* Action Buttons */}
                   <div style={{
                     display: 'flex',
                     gap: '10px',
                     flexWrap: 'wrap'
                   }}>
                     <button
                       onClick={() => handleToggleSale(item.id, item.is_for_sale)}
                       style={{
                         flex: 1,
                         padding: '10px 16px',
                         border: `2px solid ${item.is_for_sale ? '#28a745' : '#f1f1f1'}`,
                         borderRadius: '8px',
                         background: item.is_for_sale ? '#28a745' : 'white',
                         color: item.is_for_sale ? 'white' : '#666',
                         fontSize: '13px',
                         fontWeight: '600',
                         cursor: 'pointer',
                         transition: 'all 0.2s ease'
                       }}
                       onMouseEnter={(e) => {
                         if (!item.is_for_sale) {
                           e.target.style.borderColor = '#28a745';
                           e.target.style.background = '#f8f9fa';
                         }
                       }}
                       onMouseLeave={(e) => {
                         if (!item.is_for_sale) {
                           e.target.style.borderColor = '#f1f1f1';
                           e.target.style.background = 'white';
                         }
                       }}
                     >
                       {item.is_for_sale ? 'Remove from Sale' : 'Mark for Sale'}
                     </button>
                     <button
                       onClick={() => handleEdit(item)}
                       style={{
                         flex: 1,
                         padding: '10px 16px',
                         border: '2px solid #f1f1f1',
                         borderRadius: '8px',
                         background: 'white',
                         color: '#666',
                         fontSize: '13px',
                         fontWeight: '600',
                         cursor: 'pointer',
                         transition: 'all 0.2s ease'
                       }}
                       onMouseEnter={(e) => {
                         e.target.style.borderColor = '#ddd';
                         e.target.style.background = '#f8f9fa';
                       }}
                       onMouseLeave={(e) => {
                         e.target.style.borderColor = '#f1f1f1';
                         e.target.style.background = 'white';
                       }}
                     >
                       Edit
                     </button>
                     <button
                       onClick={() => handleDelete(item.id)}
                       style={{
                         flex: 1,
                         padding: '10px 16px',
                         border: '2px solid #ff4757',
                         borderRadius: '8px',
                         background: 'white',
                         color: '#ff4757',
                         fontSize: '13px',
                         fontWeight: '600',
                         cursor: 'pointer',
                         transition: 'all 0.2s ease'
                       }}
                       onMouseEnter={(e) => {
                         e.target.style.background = '#ff4757';
                         e.target.style.color = 'white';
                       }}
                       onMouseLeave={(e) => {
                         e.target.style.background = 'white';
                         e.target.style.color = '#ff4757';
                       }}
                     >
                       Delete
                     </button>
                   </div>
                 </div>
               </div>
             ))}
          </div>
                 ) : items.length > 0 ? (
           <div style={{
             background: 'white',
             padding: '40px',
             borderRadius: '12px',
             boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
             textAlign: 'center'
           }}>
             <h3 style={{
               fontSize: '20px',
               fontWeight: 'bold',
               color: '#333',
               marginBottom: '8px'
             }}>
               No items found
             </h3>
             <p style={{
               fontSize: '16px',
               color: '#666',
               marginBottom: '24px'
             }}>
               Try adjusting your search or filter criteria
             </p>
             <button
               onClick={() => {
                 setSearchTerm('');
                 setFilter('all');
               }}
               style={{
                 background: '#ff4757',
                 color: 'white',
                 padding: '12px 24px',
                 borderRadius: '8px',
                 border: 'none',
                 fontSize: '14px',
                 fontWeight: '500',
                 cursor: 'pointer'
               }}
             >
               Clear Filters
             </button>
           </div>
         ) : (
           <div style={{
             background: 'white',
             padding: '40px',
             borderRadius: '12px',
             boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
             textAlign: 'center'
           }}>
             <h3 style={{
               fontSize: '20px',
               fontWeight: 'bold',
               color: '#333',
               marginBottom: '8px'
             }}>
               Your wardrobe is empty
             </h3>
             <p style={{
               fontSize: '16px',
               color: '#666',
               marginBottom: '24px'
             }}>
               Start adding your clothes and accessories to your digital wardrobe
             </p>
             <Link to="/wardrobe/add" style={{
               background: '#ff4757',
               color: 'white',
               padding: '12px 24px',
               borderRadius: '8px',
               textDecoration: 'none',
               fontSize: '14px',
               fontWeight: '500'
             }}>
               Add Your First Item
             </Link>
           </div>
         )}
      </section>
    </div>
  );
} 