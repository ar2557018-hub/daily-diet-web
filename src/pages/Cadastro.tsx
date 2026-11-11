import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../lib/axios';

export function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);
  let navigate = useNavigate();

  async function handleCadastro(e: React.FormEvent) {
    e.preventDefault();
    setCarregando(true);

    try {
      // console.log(nome, email, senha)
      
      await api.post('/users', {
        name: nome,
        email: email,
        password: senha,
      });

      alert('Conta criada com sucesso! Faz o login ai.');
      navigate('/login');
    } catch (err) {
      console.log(err);
      alert('Erro ao criar conta. Verifica se esse email já não tá sendo usado.');
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-md p-8 border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-950 tracking-tight">Criar Conta 🥗</h1>
          <p className="text-sm text-gray-500 mt-2">Comece a controlar sua rotina alimentar</p>
        </div>

        <form onSubmit={handleCadastro} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
            <input 
              type="text" 
              value={nome} 
              onChange={(e) => setNome(e.target.value)} 
              placeholder="Seu nome completo"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="seu@email.com"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
            <input 
              type="password" 
              value={senha} 
              onChange={(e) => setSenha(e.target.value)} 
              placeholder="••••••••"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              required
            />
          </div>

          <button 
            type="submit"
            disabled={carregando}
            className="w-full bg-green-600 text-white py-2.5 px-4 rounded-lg hover:bg-green-700 active:bg-green-800 transition font-medium cursor-pointer shadow-sm disabled:opacity-50"
          >
            {carregando ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          Já tem uma conta?{' '}
          <Link to="/login" className="text-green-600 hover:text-green-700 font-medium">
            Faça login
          </Link>
        </div>
      </div>
    </div>
  );
}