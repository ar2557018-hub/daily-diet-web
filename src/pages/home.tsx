import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/axios';

// os campos que vem do backend
interface Refeicao {
  id: string;
  name: string;
  description: string;
  date: string;
  time: string;
  isOnDiet: boolean;
}

export function Registros() {
  const [refeicoes, setRefeicoes] = useState<Refeicao[]>([]);
  let navegar = useNavigate();

  useEffect(() => {
    let idDoCara = localStorage.getItem('@daily-diet:userId');

    if (!idDoCara) {
      navegar('/login');
      return;
    }

    api.get(`/meals/user/${idDoCara}`)
      .then(res => {
        // console.log("veio do banco:", res.data);
        setRefeicoes(res.data);
      })
      .catch(erro => {
        console.log(erro);
      });
  }, [navegar]);

  function sair() {
    localStorage.removeItem('@daily-diet:userId');
    // alert('saindo...')
    navegar('/login');
  }

  async function apagarRefeicao(idDaRefeicao: string) {
    let confirmou = window.confirm('Vai apagar mesmo essa refeição?');
    
    if (confirmou) {
      try {
        await api.delete(`/meals/${idDaRefeicao}`);
        
        let novaLista = refeicoes.filter(r => r.id !== idDaRefeicao);
        setRefeicoes(novaLista);
      } catch (err) {
        console.log(err);
        alert('Vish, não deu pra apagar.');
      }
    }
  }

  // matematica do dashboard
  let total = refeicoes.length;
  let naDieta = 0;
  
  for (let i = 0; i < refeicoes.length; i++) {
    if(refeicoes[i].isOnDiet === true) {
      naDieta++;
    }
  }

  let foraDieta = total - naDieta;
  let porcentagem = '0.0';
  
  if (total > 0) {
    porcentagem = ((naDieta / total) * 100).toFixed(1);
  }
  
  let taNaMedia = false;
  if (parseFloat(porcentagem) >= 50) {
    taNaMedia = true;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-950 tracking-tight">Daily Diet 🥗</h1>
            <p className="text-sm text-gray-500">O seu painel de controle alimentar</p>
          </div>
          <button onClick={sair} className="text-sm text-red-600 hover:text-red-800 font-medium cursor-pointer">
            Sair
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className={`col-span-1 md:col-span-3 p-6 rounded-xl shadow-sm text-center border transition-colors ${
            taNaMedia ? 'bg-green-50 border-green-200 text-green-900' : 'bg-red-50 border-red-200 text-red-900'
          }`}>
            <h2 className="text-4xl font-extrabold mb-1">{porcentagem}%</h2>
            <p className="text-sm opacity-80 font-medium">das refeições dentro da dieta</p>
          </div>
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 text-center">
            <h3 className="text-2xl font-bold text-gray-900">{total}</h3>
            <p className="text-xs text-gray-500 font-medium mt-1">refeições registradas</p>
          </div>
          <div className="bg-green-50 p-5 rounded-xl shadow-sm border border-green-100 text-center">
            <h3 className="text-2xl font-bold text-green-900">{naDieta}</h3>
            <p className="text-xs text-green-700 font-medium mt-1">dentro da dieta</p>
          </div>
          <div className="bg-red-50 p-5 rounded-xl shadow-sm border border-red-100 text-center">
            <h3 className="text-2xl font-bold text-red-900">{foraDieta}</h3>
            <p className="text-xs text-red-700 font-medium mt-1">fora da dieta</p>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-700">Histórico de Refeições</h2>
          <button 
            onClick={() => navegar('/nova-refeicao')}
            className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 active:bg-black transition font-medium cursor-pointer shadow-sm"
          >
            + Nova Refeição
          </button>
        </div>

        <div className="space-y-3">
          {total === 0 ? (
            <div className="bg-white p-8 rounded-xl text-center text-gray-500 shadow-sm border border-gray-100">
              Nenhuma refeição cadastrada ainda.
            </div>
          ) : (
            refeicoes.map(item => (
              <div 
                key={item.id} 
                className="bg-white p-5 rounded-xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between border border-gray-100 border-l-4 gap-4"
                style={{ borderLeftColor: item.isOnDiet ? '#16a34a' : '#dc2626' }}
              >
                <div className="flex items-center space-x-4">
                  <span className="font-bold text-gray-700">{item.time}</span>
                  <span className="text-gray-300 hidden sm:block">|</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto space-x-4">
                  <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                    item.isOnDiet ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {item.isOnDiet ? 'Na dieta' : 'Fora da dieta'}
                  </span>
                  
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => navegar(`/editar-refeicao/${item.id}`)}
                      className="p-2 text-gray-400 hover:text-blue-600 transition cursor-pointer"
                    >
                      ✏️
                    </button>
                    <button 
                      onClick={() => apagarRefeicao(item.id)}
                      className="p-2 text-gray-400 hover:text-red-600 transition cursor-pointer"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}