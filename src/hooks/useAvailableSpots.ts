
import { useState, useEffect } from 'react';

export const useAvailableSpots = (initialSpots = 47) => {
  const [availableSpots, setAvailableSpots] = useState(initialSpots);

  useEffect(() => {
    const spotTimer = setInterval(() => {
      setAvailableSpots(prev => prev > 15 ? prev - Math.floor(Math.random() * 2) : prev);
    }, 45000);

    return () => clearInterval(spotTimer);
  }, []);

  return { availableSpots, setAvailableSpots };
};
