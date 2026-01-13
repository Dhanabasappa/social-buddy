import { useState } from 'react';
import { useTheme } from '../context/ThemeContext.jsx';
const Post = ({ post, onLike, onSave, isLiked, isSaved }) => {
  const { theme } = useTheme();
  const [showComments, setShowComments] = useState(false);

  return (
    <article style={{
      background: 'rgba(255, 255, 255, 0.12)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderRadius: '24px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      marginBottom: '24px',
      overflow: 'hidden',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease'
    }}>
      {/* Post Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '16px',
        gap: '12px'
      }}>
        {/* Avatar */}
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: theme.gradient,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '20px',
          flexShrink: 0
        }}>
          {post.avatar}
        </div>

        {/* User Info */}
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ 
              fontWeight: 'bold', 
              fontSize: '14px',
              color: theme.text 
            }}>
              {post.username}
            </span>
            {post.verified && (
              <span style={{ 
                color: theme.primary, 
                fontSize: '16px',
                display: 'flex',
                alignItems: 'center'
              }}>✓</span>
            )}
          </div>
          <span style={{ 
            fontSize: '12px', 
            color: theme.textSecondary 
          }}>
            {post.location}
          </span>
        </div>

        {/* More Options */}
        <button style={{
          background: 'none',
          border: 'none',
          fontSize: '20px',
          cursor: 'pointer',
          padding: '8px',
          color: theme.textSecondary
        }}>
          ⋯
        </button>
      </div>

      {/* Post Image */}
      <div style={{ 
        width: '100%', 
        aspectRatio: '1/1',
        overflow: 'hidden',
        background: '#f0f0f0',
        borderRadius: '16px',
        margin: '12px'
      }}>
        <img 
          src={post.image} 
          alt={post.caption}
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover',
            borderRadius: '12px'
          }}
        />
      </div>

      {/* Post Actions */}
      <div style={{ padding: '16px' }}>
        {/* Action Buttons */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          marginBottom: '12px'
        }}>
          <div style={{ display: 'flex', gap: '16px' }}>
            {/* Heart/Like */}
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill={isLiked ? theme.primary : 'none'}
              stroke={isLiked ? theme.primary : theme.text}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ 
                cursor: 'pointer', 
                transition: 'all 0.2s ease',
                transform: isLiked ? 'scale(1.1)' : 'scale(1)'
              }}
              onClick={() => onLike(post.id)}
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>

            {/* Comment */}
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke={theme.text}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ cursor: 'pointer' }}
              onClick={() => setShowComments(!showComments)}
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>

            {/* Share */}
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke={theme.text}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ cursor: 'pointer' }}
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </div>

          {/* Bookmark */}
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill={isSaved ? theme.text : 'none'}
            stroke={theme.text}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ cursor: 'pointer' }}
            onClick={() => onSave(post.id)}
          >
            <path d="m19 21-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
        </div>

        {/* Likes Count */}
        <div style={{ 
          fontWeight: 'bold', 
          fontSize: '14px',
          marginBottom: '8px',
          color: theme.text
        }}>
          {post.likes + (isLiked ? 1 : 0)} likes
        </div>

        {/* Caption */}
        <div style={{ fontSize: '14px', color: theme.text }}>
          <span style={{ fontWeight: 'bold', marginRight: '8px' }}>
            {post.username}
          </span>
          <span style={{ color: theme.text }}>{post.caption}</span>
        </div>

        {/* View Comments */}
        <div 
          onClick={() => setShowComments(!showComments)}
          style={{ 
            color: theme.textSecondary, 
            fontSize: '14px',
            marginTop: '8px',
            cursor: 'pointer'
          }}
        >
          View all {post.comments} comments
        </div>

        {/* Comments Section (Expandable) */}
        {showComments && (
          <div style={{
            marginTop: '12px',
            padding: '12px',
            background: theme.background,
            borderRadius: '12px'
          }}>
            <div style={{
              fontSize: '14px',
              color: theme.textSecondary,
              textAlign: 'center'
            }}>
              Comments feature coming soon! 💬
            </div>
          </div>
        )}

        {/* Timestamp */}
        <div style={{ 
          color: theme.textSecondary, 
          fontSize: '12px',
          marginTop: '4px'
        }}>
          {post.timestamp}
        </div>
      </div>
    </article>
  );
};

export default Post;


