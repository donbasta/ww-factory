// import logo from './logo.svg';
// import './styles/bahan.css';
// import { Switch, Route } from 'react-router-dom';
import BahanSupplier from '../components/Bahan/BahanSupplier';
import BahanPabrik from '../components/Bahan/BahanPabrik';
import BeliBahanSupplier from '../components/Bahan/BeliBahanSupplier';

function BahanPage() {
  return (
    <div>
      <BahanSupplier />
      <BahanPabrik />
      <BeliBahanSupplier />
    </div>
  );
}

export default BahanPage;
