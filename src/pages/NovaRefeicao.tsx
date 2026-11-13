import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../lib/axios';

export function NovaRefeicao() {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [taNaDieta, setTaNaDieta] = useState(true);
  const [carregando, setCarregando] = useState(false);
  
  let navegar = useNavigate();

  async function salvarRefeicao(e: React.FormEvent) {
    e.preventDefault();
    setCarregando(true);

    let meuUserId = localStorage.getItem('@daily-diet:userId');

    if (!meuUserId) {
      alert('Caiu a sessão, loga de novo');
      navegar('/login');
      return;
    }

    try {
      // console.log("enviando pro bd:", {nome, descricao, data, hora, taNaDieta})
      
      await api.post('/meals', {
        name: nome,
        description: descricao,
        date: data,
        time: hora,
        isOnDiet: taNaDieta,
        userId: meuUserId, 
      });

      navegar('/');
    } catch (err) {
      console.log(err);
      alert('Deu erro ao cadastrar a refeição.');
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-md p-8 border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-extrabold text-gray-950 tracking-tight">Nova Refeição 🥗</h1>
          <Link to="/" className="text-sm text-gray-500 hover:text-gray-700 font-medium">
            Voltar
          </Link>
        </div>

        <form onSubmit={salvarRefeicao} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
            <input 
              type="text" 
              value={nome} 
              onChange={(e) => setNome(e.target.value)} 
              placeholder="Ex: Almoço, Café da manhã..."
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
            <textarea 
              value={descricao} 
              onChange={(e) => setDescricao(e.target.value)} 
              placeholder="O que você comeu?"
              rows={3}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition resize-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Data</label>
              <input 
                type="date" 
                value={data} 
                onChange={(e) => setData(e.target.value)} 
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hora</label>
              <input 
                type="time" 
                value={hora} 
                onChange={(e) => setHora(e.target.value)} 
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Está dentro da dieta?</label>
            <div className="grid grid-cols-2 gap-3 mt-1">
              <button
                type="button"
                onClick={() => setTaNaDieta(true)}
                className={`py-2.5 px-4 rounded-lg font-medium border text-center transition cursor-pointer ${
                  taNaDieta 
                    ? 'bg-green-100 border-green-500 text-green-800' 
                    : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
                }`}
              >
                Sim
              </button>
              <button
                type="button"
                onClick={() => setTaNaDieta(false)}
                className={`py-2.5 px-4 rounded-lg font-medium border text-center transition cursor-pointer ${
                  !taNaDieta 
                    ? 'bg-red-100 border-red-500 text-red-800' 
                    : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
                }`}
              >
                Não
              </button>
            </div>
          </div>

          <button 
            type="submit"
            disabled={carregando}
            className="w-full bg-green-600 text-white py-2.5 px-4 rounded-lg hover:bg-green-700 active:bg-green-800 transition font-medium cursor-pointer shadow-sm disabled:opacity-50 mt-2"
          >
            {carregando ? 'Cadastrando...' : 'Cadastrar Refeição'}
          </button>
        </form>
      </div>
    </div>
  );
}