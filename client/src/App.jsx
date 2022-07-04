import CodeInput from './components/CodeInput';
import ForceKeyboardOpen from './components/ForceKeyboardOpen';
import KeyboardController from './components/KeyboardController';

const App = () => {
  return (
    <div>
      <CodeInput />
      <KeyboardController />
      <ForceKeyboardOpen />
    </div>
  );
}

export default App;
