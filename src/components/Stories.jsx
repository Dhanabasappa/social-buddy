
import StoryCircle from './StoryCircle.jsx';
const Stories = ({ stories }) => {
  return (
    <div style={{
      display: 'flex',
      gap: '16px',
      overflowX: 'auto',
      padding: '20px 0',
      scrollbarWidth: 'none',
      msOverflowStyle: 'none'
    }}>
      {stories.map(story => (
        <StoryCircle
          key={story.id}
          avatar={story.avatar}
          username={story.username}
          hasStory={story.hasStory}
          isYou={story.isYou}
          onClick={() => console.log(`Clicked story: ${story.username}`)}
        />
      ))}
      <style>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};
export default Stories;



