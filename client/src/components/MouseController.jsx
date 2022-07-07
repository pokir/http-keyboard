import { useEffect, useState } from 'react';

const mouseMoveEventListenerCallback = event => {
  const changeX = event.movementX;
  const changeY = event.movementY;
  fetch(`${process.env.REACT_APP_API}/api/movemouse?xy=${changeX},${changeY}&code=${localStorage.getItem('code')}`);
};

const MouseController = () => {
  const [ isDragging, setIsDragging ] = useState(false);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', mouseMoveEventListenerCallback);
    } else {
      window.removeEventListener('mousemove', mouseMoveEventListenerCallback);
    }
  }, [isDragging]);

  return (
    <div
      style={{
        width: '500px',
        height: '350px',
        backgroundColor: '#dddddd',
        borderRadius: '25px',
      }}

      onMouseDown={() => {
        setIsDragging(true);
      }}

      onMouseUp={() => {
        setIsDragging(false);
      }}

      onMouseOut={() => {
        setIsDragging(false);
      }}
    >
    </div>
  );
};

export default MouseController;
