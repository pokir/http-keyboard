import { useEffect, useState } from 'react';

const MouseController = () => {
  const [ isDragging, setIsDragging ] = useState(false);
  const [ lastTouch, setLastTouch ] = useState(null);

  const mouseMoveEventListenerCallback = event => {
    const changeX = event.movementX;
    const changeY = event.movementY;

    // TODO: events should go to server in the order they were input, not async
    fetch(`${process.env.REACT_APP_API}/api/movemouse?xy=${changeX},${changeY}&code=${localStorage.getItem('code')}`);
  };

  const touchMoveEventListenerCallback = event => {
    event.preventDefault();

    const changeX = event.changedTouches[0].clientX - lastTouch.clientX;
    const changeY = event.changedTouches[0].clientY - lastTouch.clientY;

    setLastTouch(event.changedTouches[0]);

    // TODO: events should go to server in the order they were input, not async
    fetch(`${process.env.REACT_APP_API}/api/movemouse?xy=${changeX},${changeY}&code=${localStorage.getItem('code')}`);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', mouseMoveEventListenerCallback);
      window.addEventListener('touchmove', touchMoveEventListenerCallback);
    } else {
      window.removeEventListener('mousemove', mouseMoveEventListenerCallback);
      window.removeEventListener('touchmove', touchMoveEventListenerCallback);
      setLastTouch(null);
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

      onTouchStart={event => {
        event.preventDefault();
        setLastTouch(event.touches[0]);
        setIsDragging(true);
      }}

      onTouchEnd={event => {
        event.preventDefault();
        setIsDragging(false);
      }}

      onTouchCancel={event => {
        event.preventDefault();
        setIsDragging(false);
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
