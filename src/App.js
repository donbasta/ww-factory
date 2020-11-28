import logo from './logo.svg';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import BahanSupplier from './components/BahanSupplier';
import BahanPabrik from './components/BahanPabrik';
import BeliBahanSupplier from './components/BeliBahanSupplier';

function App() {
  return (
    <div className="App">
      <BahanSupplier/>
      <BahanPabrik/>
      <BeliBahanSupplier/>
    </div>
  );
}

export default App;
