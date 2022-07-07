import CodeInput from './components/CodeInput';
import ForceKeyboardOpen from './components/ForceKeyboardOpen';
import KeyboardController from './components/KeyboardController';
import MouseController from './components/MouseController';

const App = () => {
  return (
    <div>
      <CodeInput />
      <KeyboardController />
      <ForceKeyboardOpen />
      <MouseController />
    </div>
  );
}

export default App;
