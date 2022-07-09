import { useEffect, useRef } from 'react';

const ForceKeyboardOpen = () => {
  const ref = useRef(null);

  useEffect(() => {
    ref.current.focus();
  }, []);

  return (
    <div ref={ref} contentEditable={true} style={{
      position: 'fixed',
      width: window.innerWidth,
      height: window.innerHeight,
      opacity: 0,
    }}></div>
  );
};

export default ForceKeyboardOpen;
