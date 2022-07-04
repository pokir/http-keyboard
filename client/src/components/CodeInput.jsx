import { useEffect } from 'react';

const CodeInput = () => {
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/api/code`).then(response => {
      if (response.status !== 200) {
        response.text().then(alert);
      } else {
        localStorage.setItem('code', prompt('Code:'))
      }
    });
  }, []);

  return null;
};

export default CodeInput;
