import { useEffect, useRef, useState } from 'react';

// Mouse controller (only for touch screen devices)
const MouseController = () => {
  const [ touchPos, setTouchPos ] = useState({x: null, y: null});
  const [ mouseDisplacement, setMouseDisplacement ] = useState({x: null, y: null});

  const ref = useRef();

  const touchEventCallback = event => {
    event.preventDefault();

    setTouchPos({x: event.touches[0].clientX, y: event.touches[0].clientY});
  };

  useEffect(() => {
    if (touchPos.x && touchPos.y) { // check if they are not null (default value)
      const rect = ref.current.getBoundingClientRect();

      // center of the div
      const centerX = rect.x + rect.width / 2;
      const centerY = rect.y + rect.height / 2;

      // vector from center of div to click position
      const vecX = touchPos.x - centerX;
      const vecY = touchPos.y - centerY;

      // vector with magnitude relative to circle size (not a unit vector)
      // assuming a perfect circle shape (width = height)
      const radius = rect.width / 2;
      const normX = vecX / radius;
      const normY = vecY / radius;

      // change in mouse position in pixels
      const changeX = Math.round(normX);
      const changeY = Math.round(normY);

      // update the mouse displacement
      setMouseDisplacement({x: mouseDisplacement.x + changeX, y: mouseDisplacement.y + changeY});

      // reset touchPos so that the change in mouse displacement doesn't update it again
      setTouchPos({x: null, y: null});
    }
  }, [touchPos, mouseDisplacement]);

  useEffect(() => {
    if (mouseDisplacement.x && mouseDisplacement.y) {
      const displacement = Math.sqrt(mouseDisplacement.x ** 2 + mouseDisplacement.y ** 2);

      // only move the mouse if the displacement is big enough
      if (displacement > 10) {
        const changeX = mouseDisplacement.x;
        const changeY = mouseDisplacement.y;
        fetch(`${process.env.REACT_APP_API}/api/movemouse?xy=${changeX},${changeY}&code=${localStorage.getItem('code')}`);
      }
    }
  }, [mouseDisplacement]);

  return (
    <div>
      <div
        ref={ref}

        style={{
          position: 'fixed',
          borderRadius: '50%',
          width: '400px',
          height: '400px',
          backgroundColor: '#dddddd',
        }}

        onTouchStart={touchEventCallback}
        onTouchMove={touchEventCallback}
      >
      </div>
    </div>
  );
};

export default MouseController;
