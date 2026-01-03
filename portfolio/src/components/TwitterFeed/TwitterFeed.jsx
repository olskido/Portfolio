import { useState, useEffect, useRef } from 'react';
import "./TwitterFeed.css";

const TwitterFeed = () => {
  const [tweets, setTweets] = useState([
    { id: 1, user: '@devusername', content: 'Just shipped a new feature with React + Vite. Performance is incredible 🚀', time: '2h ago', url: 'https://twitter.com/devusername/status/123456789' },
    { id: 2, user: '@devusername', content: 'Learning Rust has completely changed how I think about memory and ownership.', time: '5h ago', url: 'https://twitter.com/devusername/status/123456790' },
    { id: 3, user: '@devusername', content: 'Web3 development is challenging but rewarding. Building on Solana today.', time: '1d ago', url: 'https://twitter.com/devusername/status/123456791' },
    { id: 4, user: '@devusername', content: 'Sometimes the best code is the code you delete. Refactoring can be therapeutic.', time: '2d ago', url: 'https://twitter.com/devusername/status/123456792' },
    { id: 5, user: '@devusername', content: 'TypeScript has saved me from so many runtime errors. Type safety is a gift.', time: '3d ago', url: 'https://twitter.com/devusername/status/123456793' }
  ]);

  const containerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setTweets(prev => {
        const newTweets = [...prev];
        const first = newTweets.shift();
        newTweets.push(first);
        return newTweets;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div className="twitter-container">
      <div className="twitter-header">
        <h3 className="twitter-section-title">Live Tweets</h3>
        <a 
          href="https://twitter.com/yourusername" 
          target="_blank" 
          rel="noopener noreferrer"
          className="twitter-link-btn"
        >
          View Profile →
        </a>
      </div>
      <div 
        ref={containerRef}
        className="tweets-wrapper"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {tweets.map((tweet, index) => (
          <a
            key={tweet.id}
            href={tweet.url}
            target="_blank"
            rel="noopener noreferrer"
            className="tweet-link"
          >
            <div 
              className="tweet"
              style={{
                opacity: index === 0 ? 1 : 0.6
              }}
            >
              <div className="tweet-header">
                <span className="tweet-user">{tweet.user}</span>
                <span className="tweet-time">{tweet.time}</span>
              </div>
              <p className="tweet-content">{tweet.content}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default TwitterFeed;
