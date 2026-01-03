import { useState, useEffect } from 'react';
import "./GitHubGraph.css";

const GitHubGraph = () => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [showPreviousYears, setShowPreviousYears] = useState(false);
  const [contributions, setContributions] = useState([]);
  const [months, setMonths] = useState([]);

  const START_YEAR = 2025;
  
  const availableYears = [];
  for (let year = START_YEAR; year <= currentYear; year++) {
    availableYears.push(year);
  }

  const visibleYears = showPreviousYears ? availableYears : [currentYear];

  useEffect(() => {
    const generateMockData = (year) => {
      const data = [];
      const monthLabels = [];
      
      const startDate = new Date(year, 0, 1);
      const startDay = startDate.getDay();
      const daysToSubtract = startDay === 0 ? 0 : startDay;
      startDate.setDate(startDate.getDate() - daysToSubtract);
      
      const endDate = new Date(year, 11, 31);
      const endDay = endDate.getDay();
      const daysToAdd = 6 - endDay;
      endDate.setDate(endDate.getDate() + daysToAdd);
      
      const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
      const totalWeeks = Math.ceil(totalDays / 7);
      
      let currentDate = new Date(startDate);
      let currentMonth = -1;
      
      for (let week = 0; week < totalWeeks; week++) {
        const weekData = [];
        for (let day = 0; day < 7; day++) {
          const month = currentDate.getMonth();
          if (month !== currentMonth && currentDate.getFullYear() === year) {
            currentMonth = month;
            const monthName = currentDate.toLocaleDateString('en-US', { month: 'short' });
            if (!monthLabels.some(m => m.week === week && m.month === monthName)) {
              monthLabels.push({ week, month: monthName });
            }
          }
          
          if (currentDate.getFullYear() === year) {
            weekData.push(Math.floor(Math.random() * 5));
          } else {
            weekData.push(0);
          }
          
          currentDate.setDate(currentDate.getDate() + 1);
        }
        data.push(weekData);
      }
      
      return { data, monthLabels };
    };
    
    const { data, monthLabels } = generateMockData(selectedYear);
    setContributions(data);
    setMonths(monthLabels);
  }, [selectedYear]);

  const getColor = (level) => {
    const colors = ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'];
    return colors[level] || colors[0];
  };

  const handleYearToggle = () => {
    setShowPreviousYears(!showPreviousYears);
  };

  return (
    <div className="github-container">
      <div className="github-header">
        <h3 className="github-section-title">GitHub Activity</h3>
        <a 
          href="https://github.com/yourusername" 
          target="_blank" 
          rel="noopener noreferrer"
          className="github-link-btn"
        >
          View Profile →
        </a>
      </div>
      
      <div className={`github-year-selector ${showPreviousYears ? 'expanded' : ''}`}>
        {visibleYears.map(year => (
          <button
            key={year}
            className={`year-btn ${selectedYear === year ? 'active' : ''}`}
            onClick={() => {
              setSelectedYear(year);
              if (!showPreviousYears && year !== currentYear) {
                setShowPreviousYears(true);
              }
            }}
          >
            {year}
          </button>
        ))}
        {availableYears.length > 1 && (
          <button
            className="year-toggle-btn"
            onClick={handleYearToggle}
            title={showPreviousYears ? 'Hide previous years' : 'Show previous years'}
          >
            {showPreviousYears ? '−' : '+'}
          </button>
        )}
      </div>

      <div className="github-graph-wrapper">
        <div className="github-month-labels">
          {months.map((month, index) => (
            <span 
              key={index} 
              className="month-label"
              style={{ left: `${(month.week / contributions.length) * 100}%` }}
            >
              {month.month}
            </span>
          ))}
        </div>
        <div className="github-graph">
          {contributions.map((week, weekIndex) => (
            <div key={weekIndex} className="github-week">
              {week.map((day, dayIndex) => (
                <div
                  key={dayIndex}
                  className="github-day"
                  style={{
                    backgroundColor: getColor(day)
                  }}
                  title={`${day} contributions`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GitHubGraph;
