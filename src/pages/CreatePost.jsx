import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext.jsx';
import BottomNav from '../components/BottomNav.jsx';

const CreatePost = () => {
  const navigate = useNavigate();
  const { theme, isDarkMode } = useTheme();
  const [step, setStep] = useState('select'); // 'select', 'edit', 'share'
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');
  const [taggedUsers, setTaggedUsers] = useState([]);
  const [showTagInput, setShowTagInput] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const fileInputRef = useRef(null);
  const [filters, setFilters] = useState({
    brightness: 100,
    contrast: 100,
    saturation: 100,
    blur: 0
  });

  const mockUsers = [
    { id: 1, name: 'jessica_bu', avatar: '👩‍🦰' },
    { id: 2, name: 'alex_dev', avatar: '👨‍💻' },
    { id: 3, name: 'sarah_designs', avatar: '👩‍🎨' },
    { id: 4, name: 'mike_photo', avatar: '📸' },
    { id: 5, name: 'emma_travel', avatar: '✈️' },
    { id: 6, name: 'john_fitness', avatar: '💪' }
  ];

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setStep('edit');
    }
  };

  const handleTagUser = (userName) => {
    if (!taggedUsers.includes(userName)) {
      setTaggedUsers([...taggedUsers, userName]);
      setTagInput('');
    }
  };

  const removeTag = (userName) => {
    setTaggedUsers(taggedUsers.filter(u => u !== userName));
  };

  const getFilteredUsers = () => {
    if (!tagInput) return mockUsers;
    return mockUsers.filter(u => 
      u.name.toLowerCase().includes(tagInput.toLowerCase())
    );
  };

  const handlePost = async () => {
    setIsPosting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Reset form
    setStep('select');
    setImage(null);
    setImagePreview(null);
    setCaption('');
    setLocation('');
    setTaggedUsers([]);
    setFilters({ brightness: 100, contrast: 100, saturation: 100, blur: 0 });
    setIsPosting(false);
    
    // Navigate back to home
    navigate('/home');
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const filterStyle = {
    filter: `brightness(${filters.brightness}%) contrast(${filters.contrast}%) saturate(${filters.saturation}%) blur(${filters.blur}px)`
  };

  // Step 1: Select Image
  if (step === 'select') {
    return (
      <div style={{
        background: isDarkMode ? '#1a1a1a' : 'linear-gradient(135deg, #FFF5F5 0%, #FFE5CC 100%)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: '80px',
        color: isDarkMode ? '#fff' : 'inherit'
      }}>
        <div style={{
          background: theme.cardBg,
          borderRadius: '24px',
          padding: '40px',
          textAlign: 'center',
          maxWidth: '400px',
          width: '90%',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            fontSize: '48px',
            marginBottom: '20px'
          }}>📷</div>
          
          <h2 style={{
            color: theme.text,
            marginBottom: '12px',
            fontSize: '24px'
          }}>Create New Post</h2>
          
          <p style={{
            color: theme.textSecondary,
            marginBottom: '24px',
            fontSize: '14px'
          }}>Select a photo or video from your device</p>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            style={{ display: 'none' }}
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            style={{
              background: theme.primary,
              color: '#fff',
              border: 'none',
              borderRadius: '12px',
              padding: '14px 32px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s',
              width: '100%',
              marginBottom: '12px'
            }}
            onMouseEnter={e => e.target.style.opacity = '0.8'}
            onMouseLeave={e => e.target.style.opacity = '1'}
          >
            Select from device
          </button>

          <button
            onClick={() => navigate('/home')}
            style={{
              background: 'transparent',
              color: theme.text,
              border: `2px solid ${theme.border}`,
              borderRadius: '12px',
              padding: '12px 32px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s',
              width: '100%'
            }}
            onMouseEnter={e => e.target.style.opacity = '0.8'}
            onMouseLeave={e => e.target.style.opacity = '1'}
          >
            Cancel
          </button>
        </div>
        <BottomNav />
      </div>
    );
  }

  // Step 2: Edit Image with Filters
  if (step === 'edit') {
    return (
      <div style={{
        background: isDarkMode ? '#1a1a1a' : 'linear-gradient(135deg, #FFF5F5 0%, #FFE5CC 100%)',
        minHeight: '100vh',
        paddingBottom: '80px',
        color: isDarkMode ? '#fff' : 'inherit'
      }}>
        <main style={{
          maxWidth: '600px',
          margin: '0 auto',
          padding: '20px'
        }}>
          <h2 style={{
            color: theme.text,
            marginBottom: '20px',
            textAlign: 'center',
            fontSize: '20px'
          }}>Edit Your Photo</h2>

          {/* Image Preview */}
          <div style={{
            borderRadius: '16px',
            overflow: 'hidden',
            marginBottom: '24px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
            background: theme.cardBg
          }}>
            <img
              src={imagePreview}
              alt="preview"
              style={{
                width: '100%',
                aspectRatio: '1/1',
                objectFit: 'cover',
                ...filterStyle
              }}
            />
          </div>

          {/* Filter Controls */}
          <div style={{
            background: theme.cardBg,
            borderRadius: '16px',
            padding: '20px',
            marginBottom: '20px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
          }}>
            <h3 style={{
              color: theme.text,
              fontSize: '16px',
              marginBottom: '16px',
              fontWeight: '600'
            }}>Filters</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { name: 'brightness', label: 'Brightness', min: 50, max: 150 },
                { name: 'contrast', label: 'Contrast', min: 50, max: 150 },
                { name: 'saturation', label: 'Saturation', min: 0, max: 200 },
                { name: 'blur', label: 'Blur', min: 0, max: 10 }
              ].map(filter => (
                <div key={filter.name}>
                  <label style={{
                    display: 'block',
                    color: theme.textSecondary,
                    fontSize: '13px',
                    marginBottom: '8px',
                    fontWeight: '500'
                  }}>
                    {filter.label}: {filters[filter.name]}
                  </label>
                  <input
                    type="range"
                    min={filter.min}
                    max={filter.max}
                    value={filters[filter.name]}
                    onChange={(e) => handleFilterChange(filter.name, parseInt(e.target.value))}
                    style={{
                      width: '100%',
                      accentColor: theme.primary,
                      cursor: 'pointer'
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => setStep('select')}
              style={{
                flex: 1,
                background: 'transparent',
                color: theme.text,
                border: `2px solid ${theme.border}`,
                borderRadius: '12px',
                padding: '12px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              Back
            </button>
            <button
              onClick={() => setStep('share')}
              style={{
                flex: 1,
                background: theme.primary,
                color: '#fff',
                border: 'none',
                borderRadius: '12px',
                padding: '12px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              Next
            </button>
          </div>
        </main>
        <BottomNav />
      </div>
    );
  }

  // Step 3: Share with Caption and Tags
  if (step === 'share') {
    return (
      <div style={{
        background: isDarkMode ? '#1a1a1a' : 'linear-gradient(135deg, #FFF5F5 0%, #FFE5CC 100%)',
        minHeight: '100vh',
        paddingBottom: '80px',
        color: isDarkMode ? '#fff' : 'inherit'
      }}>
        <main style={{
          maxWidth: '600px',
          margin: '0 auto',
          padding: '20px'
        }}>
          <h2 style={{
            color: theme.text,
            marginBottom: '20px',
            textAlign: 'center',
            fontSize: '20px'
          }}>Share Your Post</h2>

          {/* Image Preview */}
          <div style={{
            borderRadius: '16px',
            overflow: 'hidden',
            marginBottom: '20px',
            height: '300px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            background: '#000'
          }}>
            <img
              src={imagePreview}
              alt="preview"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                ...filterStyle
              }}
            />
          </div>

          {/* Form Container */}
          <div style={{
            background: theme.cardBg,
            borderRadius: '16px',
            padding: '20px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            {/* Caption */}
            <div>
              <label style={{
                display: 'block',
                color: theme.textSecondary,
                fontSize: '13px',
                marginBottom: '8px',
                fontWeight: '500'
              }}>
                Caption (optional)
              </label>
              <textarea
                placeholder="Write a caption..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                maxLength={2200}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: `1px solid ${theme.border}`,
                  borderRadius: '8px',
                  background: isDarkMode ? '#2a2a2a' : '#f5f5f5',
                  color: theme.text,
                  fontSize: '14px',
                  fontFamily: 'inherit',
                  resize: 'vertical',
                  minHeight: '100px',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                onFocus={e => e.target.style.borderColor = theme.primary}
                onBlur={e => e.target.style.borderColor = theme.border}
              />
              <div style={{
                fontSize: '12px',
                color: theme.textSecondary,
                marginTop: '4px',
                textAlign: 'right'
              }}>
                {caption.length}/2200
              </div>
            </div>

            {/* Location */}
            <div>
              <label style={{
                display: 'block',
                color: theme.textSecondary,
                fontSize: '13px',
                marginBottom: '8px',
                fontWeight: '500'
              }}>
                Location (optional)
              </label>
              <input
                type="text"
                placeholder="Add location..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: `1px solid ${theme.border}`,
                  borderRadius: '8px',
                  background: isDarkMode ? '#2a2a2a' : '#f5f5f5',
                  color: theme.text,
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                onFocus={e => e.target.style.borderColor = theme.primary}
                onBlur={e => e.target.style.borderColor = theme.border}
              />
            </div>

            {/* Tag Users */}
            <div>
              <label style={{
                display: 'block',
                color: theme.textSecondary,
                fontSize: '13px',
                marginBottom: '8px',
                fontWeight: '500'
              }}>
                Tag People (optional)
              </label>
              
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                marginBottom: '12px',
                minHeight: '32px'
              }}>
                {taggedUsers.map((user, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: theme.primary,
                      color: '#fff',
                      padding: '6px 12px',
                      borderRadius: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '13px',
                      fontWeight: '500'
                    }}
                  >
                    {user}
                    <button
                      onClick={() => removeTag(user)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#fff',
                        cursor: 'pointer',
                        fontSize: '16px',
                        padding: 0,
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  placeholder="Search people to tag..."
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: `1px solid ${theme.border}`,
                    borderRadius: '8px',
                    background: isDarkMode ? '#2a2a2a' : '#f5f5f5',
                    color: theme.text,
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => {
                    setShowTagInput(true);
                    e.target.style.borderColor = theme.primary;
                  }}
                  onBlur={e => {
                    setTimeout(() => setShowTagInput(false), 200);
                    e.target.style.borderColor = theme.border;
                  }}
                />

                {/* User Dropdown */}
                {showTagInput && tagInput && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    background: theme.cardBg,
                    border: `1px solid ${theme.border}`,
                    borderRadius: '8px',
                    marginTop: '4px',
                    maxHeight: '200px',
                    overflowY: 'auto',
                    zIndex: 10,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }}>
                    {getFilteredUsers().map(user => (
                      <button
                        key={user.id}
                        onClick={() => handleTagUser(user.name)}
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: 'none',
                          background: 'none',
                          textAlign: 'left',
                          cursor: 'pointer',
                          color: theme.text,
                          fontSize: '14px',
                          transition: 'background-color 0.2s',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}
                        onMouseEnter={e => e.target.style.backgroundColor = theme.secondary}
                        onMouseLeave={e => e.target.style.backgroundColor = 'none'}
                      >
                        <span>{user.avatar}</span>
                        <span>{user.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Hashtag Info */}
            <div style={{
              background: isDarkMode ? '#2a2a2a' : '#f5f5f5',
              padding: '12px',
              borderRadius: '8px',
              fontSize: '12px',
              color: theme.textSecondary,
              borderLeft: `3px solid ${theme.primary}`
            }}>
              💡 <strong>Tip:</strong> Use hashtags in your caption to reach more people. Example: #instagram #photography
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setStep('edit')}
                style={{
                  flex: 1,
                  background: 'transparent',
                  color: theme.text,
                  border: `2px solid ${theme.border}`,
                  borderRadius: '12px',
                  padding: '12px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                Back
              </button>
              <button
                onClick={handlePost}
                disabled={isPosting}
                style={{
                  flex: 1,
                  background: isPosting ? theme.textSecondary : theme.primary,
                  color: '#fff',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '12px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: isPosting ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s',
                  opacity: isPosting ? 0.6 : 1
                }}
              >
                {isPosting ? 'Posting... 📤' : 'Share Post'}
              </button>
            </div>
          </div>
        </main>
        <BottomNav />
      </div>
    );
  }
};

export default CreatePost;
