import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Statistics() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-green-100 flex flex-col items-center">
      <main className="w-full max-w-md h-screen flex flex-col bg-white overflow-hidden shadow-lg">
        
        {/* CABEÇALHO (Métrica Geral) */}
        <header className="bg-green-100 pt-12 pb-10 px-6 relative flex flex-col items-center justify-center">
          <button 
            onClick={() => navigate("/")} 
            className="absolute left-6 top-12 text-green-700 hover:text-green-900"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="font-bold text-3xl text-gray-900">90,86%</h1>
          <p className="text-sm text-gray-600 mt-1">das refeições dentro da dieta</p>
        </header>

        {/* ESTATÍSTICAS DETALHADAS (Os 4 requisitos do professor) */}
        <div className="flex-1 bg-white -mt-4 rounded-t-3xl p-6 flex flex-col gap-4 shadow-[0_-8px_10px_-5px_rgba(0,0,0,0.1)]">
          <h2 className="text-sm font-bold text-gray-900 text-center mb-2">Estatísticas gerais</h2>
          
          {/* Requisito D: Melhor sequência */}
          <div className="bg-gray-100 p-4 rounded-xl flex flex-col items-center justify-center gap-1">
            <span className="text-2xl font-bold text-gray-900">22</span>
            <span className="text-sm text-gray-700 text-center">melhor sequência de pratos dentro da dieta</span>
          </div>

          {/* Requisito A: Total registradas */}
          <div className="bg-gray-100 p-4 rounded-xl flex flex-col items-center justify-center gap-1">
            <span className="text-2xl font-bold text-gray-900">109</span>
            <span className="text-sm text-gray-700 text-center">refeições registradas</span>
          </div>

          <div className="flex gap-4">
            {/* Requisito B: Dentro da dieta */}
            <div className="bg-green-100 p-4 rounded-xl flex flex-col items-center justify-center gap-1 flex-1">
              <span className="text-2xl font-bold text-gray-900">99</span>
              <span className="text-sm text-gray-700 text-center">refeições dentro da dieta</span>
            </div>

            {/* Requisito C: Fora da dieta */}
            <div className="bg-red-100 p-4 rounded-xl flex flex-col items-center justify-center gap-1 flex-1">
              <span className="text-2xl font-bold text-gray-900">10</span>
              <span className="text-sm text-gray-700 text-center">refeições fora da dieta</span>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}