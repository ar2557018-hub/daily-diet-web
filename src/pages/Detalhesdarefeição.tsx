import { useState } from "react";
import { ArrowLeft, Pencil, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function MealDetails() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const isOnDiet = true; 

  return (
    <div className={`min-h-screen flex flex-col items-center relative ${isOnDiet ? 'bg-green-200' : 'bg-red-200'}`}>
      <main className="w-full max-w-md h-screen flex flex-col bg-white overflow-hidden shadow-lg relative">
        
        <header className={`pt-12 pb-6 px-6 relative flex items-center justify-center ${isOnDiet ? 'bg-green-200' : 'bg-red-200'}`}>
          <button onClick={() => navigate("/")} className="absolute left-6 text-gray-800 hover:text-gray-900">
            <ArrowLeft size={24} />
          </button>
          <h1 className="font-bold text-lg text-gray-900">Refeição</h1>
        </header>

        <div className="flex-1 bg-white -mt-4 rounded-t-3xl p-6 flex flex-col shadow-[0_-8px_10px_-5px_rgba(0,0,0,0.1)]">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Jantar saudável</h2>
          <p className="text-gray-700 text-base mb-6">Salada de folhas verdes com frango grelhado e um fio de azeite.</p>
          <h3 className="text-sm font-bold text-gray-900 mb-1">Data e hora</h3>
          <p className="text-gray-700 text-base mb-6">12/08/2026 às 20:00</p>

          <div className="flex items-center gap-2 bg-gray-100 w-fit px-4 py-2 rounded-full mt-2">
            <div className={`w-2 h-2 rounded-full ${isOnDiet ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-sm text-gray-800">{isOnDiet ? 'dentro da dieta' : 'fora da dieta'}</span>
          </div>

          <div className="mt-auto pt-6 flex flex-col gap-3">
            <button className="w-full bg-gray-900 text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-800 hover:-translate-y-1 transition-all duration-200">
              <Pencil size={18} /> Editar refeição
            </button>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-transparent border border-gray-900 text-gray-900 font-bold py-4 rounded-lg flex items-center justify-center gap-2 hover:bg-red-50 hover:border-red-500 hover:text-red-600 transition-colors"
            >
              <Trash size={18} /> Excluir refeição
            </button>
          </div>
        </div>

        {/* MODAL DE CONFIRMAÇÃO FLUTUANTE */}
        {isModalOpen && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-6 z-50 backdrop-blur-sm transition-opacity">
            <div className="bg-white rounded-xl p-6 w-full flex flex-col gap-6 shadow-2xl scale-100 transform transition-transform">
              <h3 className="font-bold text-lg text-gray-900 text-center px-4">
                Deseja realmente excluir o registro da refeição?
              </h3>
              <div className="flex gap-3">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 border border-gray-300 font-bold text-gray-900 py-3 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  onClick={() => navigate("/")}
                  className="flex-1 bg-gray-900 font-bold text-white py-3 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Sim, excluir
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}