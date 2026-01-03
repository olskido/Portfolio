import { useState, useRef, useEffect } from 'react';
import "./Projects.css";

const Projects = () => {
  const projects = [
    { name: 'DeFi Dashboard', desc: 'Real-time crypto portfolio tracker', link: '#', color: '#26a641' },
    { name: 'Task Manager Pro', desc: 'Collaborative productivity tool', link: '#', color: '#0ea5e9' },
    { name: 'Code Snippet Library', desc: 'Developer resource platform', link: '#', color: '#8b5cf6' },
    { name: 'NFT Marketplace', desc: 'Solana-based NFT platform', link: '#', color: '#f59e0b' },
    { name: 'Analytics Engine', desc: 'Custom data visualization tool', link: '#', color: '#ec4899' }
  ];

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const carouselRef = useRef(null);
  const trackRef = useRef(null);
  const animationRef = useRef(null);
  const scrollPositionRef = useRef(0);
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  // Check if device is mobile
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      
      // Reset carousel position on mobile/desktop switch
      if (trackRef.current) {
        trackRef.current.style.transform = 'translateX(0)';
        scrollPositionRef.current = 0;
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-scroll animation for desktop only
  useEffect(() => {
    if (isMobile || isDragging) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      return;
    }

    const animate = () => {
      if (!trackRef.current || isMobile || isDragging) return;
      
      scrollPositionRef.current += 0.3;
      const track = trackRef.current;
      const maxScroll = track.scrollWidth - track.offsetWidth;
      
      if (scrollPositionRef.current >= maxScroll) {
        scrollPositionRef.current = 0;
      }
      
      track.style.transform = `translateX(-${scrollPositionRef.current}px)`;
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isMobile, isDragging]);

  // Touch start handler for both mouse and touch
  const handleStart = (clientX) => {
    setIsDragging(true);
    setStartX(clientX);
    if (trackRef.current) {
      const transform = trackRef.current.style.transform;
      const match = transform.match(/translateX\(-?(\d+\.?\d*)px\)/);
      scrollPositionRef.current = match ? parseFloat(match[1]) : 0;
      setScrollLeft(scrollPositionRef.current);
    }
  };

  // Move handler for both mouse and touch
  const handleMove = (clientX) => {
    if (!isDragging) return;
    
    const deltaX = clientX - startX;
    const newPosition = scrollLeft - deltaX;
    const track = trackRef.current;
    
    if (track) {
      if (isMobile) {
        // On mobile, allow dragging but don't wrap around
        const maxScroll = track.scrollWidth - track.offsetWidth;
        const boundedPosition = Math.max(0, Math.min(newPosition, maxScroll));
        track.style.transform = `translateX(-${boundedPosition}px)`;
      } else {
        // On desktop, keep the original wrapping behavior
        const maxScroll = track.scrollWidth - track.offsetWidth;
        let boundedPosition;
        
        if (newPosition < 0) {
          boundedPosition = maxScroll + newPosition;
        } else if (newPosition > maxScroll) {
          boundedPosition = newPosition - maxScroll;
        } else {
          boundedPosition = newPosition;
        }
        
        track.style.transform = `translateX(-${boundedPosition}px)`;
      }
    }
  };

  // End drag handler
  const handleEnd = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    
    if (isMobile && trackRef.current) {
      // On mobile, snap to the nearest card
      const track = trackRef.current;
      const cardWidth = track.firstChild?.offsetWidth || 300;
      const gap = 24; // Same as gap in CSS
      const scrollPosition = parseInt(track.style.transform.replace(/[^0-9-]/g, '') || '0');
      const itemWidth = cardWidth + gap;
      const itemIndex = Math.round(scrollPosition / itemWidth);
      const maxItems = track.children.length;
      const maxScroll = track.scrollWidth - track.offsetWidth;
      const newPosition = Math.min(itemIndex * itemWidth, maxScroll);
      
      track.style.transition = 'transform 0.3s cubic-bezier(0.2, 0, 0.2, 1)';
      track.style.transform = `translateX(-${newPosition}px)`;
      scrollPositionRef.current = newPosition;
      
      // Reset transition after animation completes
      setTimeout(() => {
        if (track) {
          track.style.transition = '';
        }
      }, 300);
    }
  };

  // Mouse event handlers
  const handleMouseDown = (e) => {
    if (isMobile) return;
    handleStart(e.pageX);
  };

  const handleMouseMove = (e) => {
    if (isMobile) return;
    handleMove(e.pageX);
  };

  const handleMouseUp = () => {
    if (isMobile) return;
    handleEnd();
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleEnd();
    }
  };

  // Touch event handlers
  const handleTouchStart = (e) => {
    if (!isMobile) return;
    handleStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (!isMobile) return;
    e.preventDefault();
    handleMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!isMobile) return;
    handleEnd();
  };

  return (
    <section className="projects" id="projects">
      <h2 className="projects-heading">Projects</h2>
      <div 
        ref={carouselRef}
        className={`projects-carousel ${isMobile ? 'mobile' : ''}`}
        onMouseEnter={() => !isMobile && setIsPaused(true)}
        onMouseLeave={() => {
          if (!isMobile && !isDragging) setIsPaused(false);
          handleMouseLeave();
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ 
          cursor: isMobile ? 'grab' : isDragging ? 'grabbing' : 'grab',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        <div 
          ref={trackRef}
          className="projects-track"
          style={{
            touchAction: isMobile ? 'pan-y' : 'none',
            cursor: isMobile ? 'grab' : isDragging ? 'grabbing' : 'grab',
          }}
        >
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <div className="project-preview" style={{backgroundColor: project.color}} />
              <h3 className="project-name">{project.name}</h3>
              <p className="project-desc">{project.desc}</p>
              <a 
                href={project.link} 
                className="project-link"
                onClick={(e) => isDragging && e.preventDefault()}
              >
                View Project →
              </a>
            </div>
          ))}
        </div>
      </div>
      {isMobile && (
        <div className="mobile-scroll-indicator">
          <span>← Swipe to view more →</span>
        </div>
      )}
    </section>
  );
};

export default Projects;
