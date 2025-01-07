import  { useEffect, useState, useMemo } from 'react';

const RandomIcon = () => {
    const icons = useMemo(() => ['🍔', '🥗', '🍕', '🍣', '🍜', '🍩', '🥪'], []);
    const [currentIcon, setCurrentIcon] = useState(icons[0]);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentIcon(() => {
          const randomIndex = Math.floor(Math.random() * icons.length);
          return icons[randomIndex];
        });
      }, 1000);
  
      return () => clearInterval(interval);
    }, [icons]);
  
    return <div className="random-icon" style={{ fontSize: '4rem' }}>{currentIcon}</div>;
  };
  
  export default RandomIcon;
  