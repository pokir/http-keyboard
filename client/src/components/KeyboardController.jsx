import { useEffect } from 'react';

const KeyboardController = () => {
  useEffect(() => {
    window.addEventListener('keydown', e => {
      fetch(`${process.env.REACT_APP_API}/api/keydown?key=${e.key.toLowerCase()}&code=${localStorage.getItem('code')}`);
    });

    window.addEventListener('keyup', e => {
      fetch(`${process.env.REACT_APP_API}/api/keyup?key=${e.key.toLowerCase()}&code=${localStorage.getItem('code')}`);
    });
  }, []);

  return null;
};

export default KeyboardController;
