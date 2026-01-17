import { useState, useEffect } from 'react';
import "./GitHubGraph.css";

const GitHubGraph = () => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [showPreviousYears, setShowPreviousYears] = useState(false);
  const [contributions, setContributions] = useState([]);
  const [months, setMonths] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const START_YEAR = 2020;
  const USERNAME = 'olskido';

  const availableYears = [];
  for (let year = START_YEAR; year <= currentYear; year++) {
    availableYears.push(year);
  }

  const visibleYears = showPreviousYears ? availableYears : [currentYear];

  useEffect(() => {
    const fetchGitHubData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=${selectedYear}`);

        if (!response.ok) {
          throw new Error('Failed to fetch GitHub data');
        }

        const data = await response.json();

        // Process the API data into our grid format
        const processedData = processContributionData(data, selectedYear);
        setContributions(processedData.data);
        setMonths(processedData.monthLabels);
      } catch (err) {
        console.error('Error fetching GitHub contributions:', err);
        setError(err.message);
        // Fallback to empty data on error
        const fallback = generateEmptyData(selectedYear);
        setContributions(fallback.data);
        setMonths(fallback.monthLabels);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, [selectedYear]);

  const processContributionData = (apiData, year) => {
    const data = [];
    const monthLabels = [];

    const startDate = new Date(year, 0, 1);
    const startDay = startDate.getDay();
    const daysToSubtract = startDay;
    startDate.setDate(startDate.getDate() - daysToSubtract);

    const endDate = new Date(year, 11, 31);
    const endDay = endDate.getDay();
    const daysToAdd = 6 - endDay;
    endDate.setDate(endDate.getDate() + daysToAdd);

    const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.ceil(totalDays / 7);

    // Create a map of dates to contribution counts from API data
    const contributionMap = new Map();
    if (apiData && apiData.contributions) {
      apiData.contributions.forEach(contrib => {
        contributionMap.set(contrib.date, contrib.count);
      });
    }

    let currentDate = new Date(startDate);
    let currentMonth = -1;

    for (let week = 0; week < totalWeeks; week++) {
      const weekData = [];
      for (let day = 0; day < 7; day++) {
        const month = currentDate.getMonth();
        if (month !== currentMonth && currentDate.getFullYear() === year) {
          currentMonth = month;
          const monthName = currentDate.toLocaleDateString('en-US', { month: 'short' });
          monthLabels.push({ week, month: monthName });
        }

        if (currentDate.getFullYear() === year) {
          const dateStr = currentDate.toISOString().split('T')[0];
          const count = contributionMap.get(dateStr) || 0;
          // Convert count to level (0-4)
          const level = count === 0 ? 0 : Math.min(Math.ceil(count / 3), 4);
          weekData.push(level);
        } else {
          weekData.push(0);
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }
      data.push(weekData);
    }

    return { data, monthLabels };
  };

  const generateEmptyData = (year) => {
    const data = [];
    const monthLabels = [];

    const startDate = new Date(year, 0, 1);
    const startDay = startDate.getDay();
    const daysToSubtract = startDay;
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
          monthLabels.push({ week, month: monthName });
        }

        if (currentDate.getFullYear() === year) {
          weekData.push(0);
        } else {
          weekData.push(0);
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }
      data.push(weekData);
    }

    return { data, monthLabels };
  };

  const getColor = (level) => {
    const colors = ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'];
    return colors[level] || colors[0];
  };

  return (
    <div className="github-container">
      <div className="github-header">
        <h3 className="github-section-title">GitHub Activity</h3>
        <a href="https://github.com/olskido" target="_blank" rel="noopener noreferrer" className="github-link-btn">
          View Profile →
        </a>
      </div>

      <div className={`github-year-selector ${showPreviousYears ? 'expanded' : ''}`}>
        {visibleYears.map(year => (
          <button
            key={year}
            className={`year-btn ${selectedYear === year ? 'active' : ''}`}
            onClick={() => setSelectedYear(year)}
          >
            {year}
          </button>
        ))}
        {availableYears.length > 1 && (
          <button className="year-toggle-btn" onClick={() => setShowPreviousYears(!showPreviousYears)}>
            {showPreviousYears ? '−' : '+'}
          </button>
        )}
      </div>

      {loading && (
        <div className="github-loading">
          <p>Loading contributions...</p>
        </div>
      )}

      {error && (
        <div className="github-error">
          <p>Unable to load GitHub data. Displaying empty graph.</p>
        </div>
      )}

      {!loading && (
        <div className="github-graph-scroll-container">
          <div className="github-graph-outer">
            {/* Month Labels row */}
            <div className="github-month-row">
              <div className="day-label-gutter"></div> {/* Offset for day labels */}
              <div className="months-container">
                {months.map((month, index) => (
                  <span key={index} className="month-label" style={{ gridColumnStart: month.week + 1 }}>
                    {month.month}
                  </span>
                ))}
              </div>
            </div>

            <div className="github-graph-main">
              {/* Day of week labels on the left */}
              <div className="github-day-labels">
                <span></span>
                <span>Mon</span>
                <span></span>
                <span>Wed</span>
                <span></span>
                <span>Fri</span>
                <span></span>
              </div>

              {/* The Actual Grid */}
              <div className="github-graph-grid">
                {contributions.map((week, weekIndex) => (
                  <div key={weekIndex} className="github-week">
                    {week.map((day, dayIndex) => (
                      <div
                        key={dayIndex}
                        className="github-day"
                        style={{ backgroundColor: getColor(day) }}
                        title={`${day > 0 ? 'Contributions' : 'No contributions'}`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GitHubGraph;