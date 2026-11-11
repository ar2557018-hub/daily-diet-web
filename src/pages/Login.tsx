import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../lib/axios';

export function Login() {
  let [email, setEmail] = useState('');
  let [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);
  
  let navegar = useNavigate();

  async function fazerLogin(e: React.FormEvent) {
    e.preventDefault();
    setCarregando(true);

    try {
      // manda email e senha pro backend
      let resposta = await api.post('/login', { email: email, password: senha });
      
      // console.log("logou vei", resposta.data)
      
      let idDoUsuario = resposta.data.user.id;
      localStorage.setItem('@daily-diet:userId', idDoUsuario);

      navegar('/');
    } catch (erro) {
      console.log("deu ruim no login", erro);
      alert('E-mail ou senha incorretos. Tenta de novo.');
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-md p-8 border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-950 tracking-tight">Daily Diet 🥗</h1>
          <p className="text-sm text-gray-500 mt-2">Entre para acompanhar sua rotina alimentar</p>
        </div>

        <form onSubmit={fazerLogin} className="space-y-5">
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
            {carregando ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          Ainda não tem conta?{' '}
          <Link to="/cadastro" className="text-green-600 hover:text-green-700 font-medium">
            Cadastre-se
          </Link>
        </div>
      </div>
    </div>
  );
}