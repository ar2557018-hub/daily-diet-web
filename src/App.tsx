import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Registros } from './pages/Registros';
import { Login } from './pages/Login';
import { Cadastro } from './pages/Cadastro';
import { NovaRefeicao } from './pages/NovaRefeicao';
import { EditarRefeicao } from './pages/EditarRefeicao';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Registros />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/nova-refeicao" element={<NovaRefeicao />} />
        <Route path="/editar-refeicao/:id" element={<EditarRefeicao />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;