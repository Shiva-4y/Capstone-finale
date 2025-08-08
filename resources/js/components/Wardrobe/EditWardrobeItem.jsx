import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

export default function EditWardrobeItem() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'shirts',
    color: '',
    size: '',
    brand: '',
    condition: 'good',
    price: '',
    is_for_sale: false,
    image: null
  });

  useEffect(() => {
    if (location.state?.item) {
      const item = location.state.item;
      setFormData({
        name: item.name || '',
        description: item.description || '',
        category: item.category || 'shirts',
        color: item.color || '',
        size: item.size || '',
        brand: item.brand || '',
        condition: item.condition || 'good',
        price: item.price || '',
        is_for_sale: item.is_for_sale || false,
        image: null
      });
      setLoading(false);
    } else {
      // Fetch item data if not passed via state
      fetchItemData();
    }
  }, [id, location.state]);

  const fetchItemData = async () => {
    try {
      console.log('Fetching item data for ID:', id);
      console.log('User authentication status:', user);
      
      const response = await fetch(`/api/wardrobe/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
        },
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched item data:', data);
        const item = data.item;
        setFormData({
          name: item.name || '',
          description: item.description || '',
          category: item.category || 'shirts',
          color: item.color || '',
          size: item.size || '',
          brand: item.brand || '',
          condition: item.condition || 'good',
          price: item.price || '',
          is_for_sale: item.is_for_sale || false,
          image: null
        });
      } else {
        const errorText = await response.text();
        console.error('Error fetching item. Status:', response.status);
        console.error('Error response:', errorText);
        alert('Error loading item. You may need to log in again.');
        navigate('/wardrobe');
      }
    } catch (error) {
      console.error('Error fetching item:', error);
      navigate('/wardrobe');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted!');
    console.log('Current formData:', formData);
    console.log('User authentication status:', user);
    
    // Check if user is authenticated
    if (!user) {
      alert('You must be logged in to edit items. Please log in again.');
      navigate('/login');
      return;
    }
    
    // Check if form is still loading
    if (loading) {
      alert('Please wait for the form to load completely before submitting.');
      return;
    }
    
    setIsLoading(true);

    // Validate required fields before submission
    if (!formData.name || !formData.color || !formData.size || !formData.condition || !formData.category) {
      alert('Please fill in all required fields (Name, Color, Size, Condition, Category)');
      setIsLoading(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      
      // Always include all required fields
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description || '');
      formDataToSend.append('category', formData.category);
      formDataToSend.append('subcategory', formData.subcategory || '');
      formDataToSend.append('color', formData.color);
      formDataToSend.append('size', formData.size);
      formDataToSend.append('brand', formData.brand || '');
      formDataToSend.append('condition', formData.condition);
      formDataToSend.append('is_for_sale', formData.is_for_sale ? '1' : '0');
      
      // Only include price if item is for sale
      if (formData.is_for_sale) {
        formDataToSend.append('price', formData.price || '');
      }
      
      // Only include image if a new one is selected
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      console.log('FormData entries:');
      for (let [key, value] of formDataToSend.entries()) {
        console.log(key, value);
      }
      
      // Debug: Check if FormData is empty
      if (formDataToSend.entries().next().done) {
        console.error('FormData is empty!');
        alert('Error: Form data is empty. Please try again.');
        setIsLoading(false);
        return;
      }

      const response = await fetch(`/api/wardrobe/${id}`, {
        method: 'PUT',
        headers: {
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
        },
        body: formDataToSend
      });

      console.log('Response status:', response.status);
      const responseData = await response.text();
      console.log('Response data:', responseData);

      if (response.ok) {
        console.log('Success! Navigating to wardrobe...');
        navigate('/wardrobe');
      } else {
        console.error('Error updating item. Status:', response.status);
        console.error('Response:', responseData);
        alert('Error updating item. Check console for details.');
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Network error. Check console for details.');
    } finally {
      setIsLoading(false);
    }
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
        Loading item...
      </div>
    );
  }

  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh', padding: '20px' }}>
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        padding: '30px'
      }}>
        <h1 style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#333',
          marginBottom: '30px',
          textAlign: 'center'
        }}>
          Edit Item
        </h1>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '500',
              color: '#333'
            }}>
              Item Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '500',
              color: '#333'
            }}>
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            >
              <option value="shirts">Shirts</option>
              <option value="pants">Pants</option>
              <option value="dresses">Dresses</option>
              <option value="skirts">Skirts</option>
            </select>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '500',
              color: '#333'
            }}>
              Color *
            </label>
            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '500',
              color: '#333'
            }}>
              Size *
            </label>
            <input
              type="text"
              name="size"
              value={formData.size}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '500',
              color: '#333'
            }}>
              Brand
            </label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '500',
              color: '#333'
            }}>
              Condition *
            </label>
            <select
              name="condition"
              value={formData.condition}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            >
              <option value="new">New</option>
              <option value="like_new">Like New</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
              <option value="poor">Poor</option>
            </select>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '500',
              color: '#333'
            }}>
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="3"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px',
                resize: 'vertical'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: '500',
              color: '#333'
            }}>
              <input
                type="checkbox"
                name="is_for_sale"
                checked={formData.is_for_sale}
                onChange={handleInputChange}
                style={{ margin: 0 }}
              />
              Available for sale
            </label>
          </div>

          {formData.is_for_sale && (
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '500',
                color: '#333'
              }}>
                Price (PHP)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
              />
            </div>
          )}

          <div style={{ marginBottom: '30px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '500',
              color: '#333'
            }}>
              Image (leave empty to keep current image)
            </label>
            <input
              type="file"
              name="image"
              onChange={handleInputChange}
              accept="image/*"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            />
          </div>

          <div style={{
            display: 'flex',
            gap: '15px',
            justifyContent: 'center'
          }}>
            <button
              type="button"
              onClick={() => navigate('/wardrobe')}
              style={{
                padding: '12px 24px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                background: 'white',
                color: '#666',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              style={{
                padding: '12px 24px',
                border: 'none',
                borderRadius: '4px',
                background: '#ff4757',
                color: 'white',
                fontSize: '14px',
                fontWeight: '500',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                opacity: isLoading ? 0.7 : 1
              }}
            >
              {isLoading ? 'Updating...' : 'Update Item'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 