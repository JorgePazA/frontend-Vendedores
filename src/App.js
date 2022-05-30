import {BrowserRouter as Router, Route} from 'react-router-dom'
import './App.css';
import Barra from './components/Barra'
import RegistrarVendedor from './components/RegistrarVendedor'
import RegistrarSucursal from './components/RegistrarSucursal'
import VerVendedores from './components/VerVendedores'
import Login from './components/Login'
import Index from './components/Index'

function App() {
  return (
    <Router>
      <Barra />
      <Route path='/' exact component = {Login} />
      <Route path='/index' exact component = {Index} />
      <Route path='/registrarVendedor' exact component = {RegistrarVendedor} />
      <Route path='/registrarSucursal' exact component = {RegistrarSucursal} />
      <Route path='/verVendedores' exact component = {VerVendedores} />
    </Router>
    
  );
}

export default App;
