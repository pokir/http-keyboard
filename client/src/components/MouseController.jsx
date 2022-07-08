import { useEffect, useRef, useState } from 'react';

const MouseController = () => {
  const [ pos, setPos ] = useState({x: null, y: null});
  const ref = useRef();

  useEffect(() => {
    if (pos.x && pos.y) {
      const rect = ref.current.getBoundingClientRect();

      // center of the div
      const centerX = rect.x + rect.width / 2;
      const centerY = rect.y + rect.height / 2;

      // vector from center of div to click position
      const vecX = pos.x - centerX;
      const vecY = pos.y - centerY;

      // vector with magnitude relative to circle size (not a unit vector)
      // assuming a perfect circle shape (width = height)
      const radius = rect.width / 2;
      const normX = vecX / radius;
      const normY = vecY / radius;

      // change in mouse position in pixels
      const changeX = Math.round(normX * 15);
      const changeY = Math.round(normY * 15);

      fetch(`${process.env.REACT_APP_API}/api/movemouse?xy=${changeX},${changeY}&code=${localStorage.getItem('code')}`);
    }
  }, [pos]);

  const positionUpdateEventCallback = event => {
    event.preventDefault();
    setPos({x: event.clientX, y: event.clientY});
  };

  return (
    <div>
      <div
        ref={ref}

        style={{
          borderRadius: '50%',
          width: '200px',
          height: '200px',
          backgroundColor: '#dddddd',
        }}

        onMouseDown={positionUpdateEventCallback}
        onMouseMove={positionUpdateEventCallback}

        onTouchStart={positionUpdateEventCallback}
        onTouchMove={positionUpdateEventCallback}
      >
      </div>
    </div>
  );
};

export default MouseController;
