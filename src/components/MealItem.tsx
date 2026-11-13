import { useNavigate } from "react-router-dom";

interface MealItemProps {
  time: string;
  name: string;
  isOnDiet: boolean;
}

export function MealItem({ time, name, isOnDiet }: MealItemProps) {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate('/meal/1')}
      className="flex items-center justify-between border border-gray-300 p-4 rounded-lg hover:bg-gray-50 cursor-pointer hover:-translate-y-1 hover:shadow-md transition-all duration-200"
    >
      <div className="flex items-center gap-3">
        <span className="text-gray-900 font-bold text-sm border-r border-gray-300 pr-3">{time}</span>
        <span className="text-gray-700 text-base">{name}</span>
      </div>
      <div className={`w-3 h-3 rounded-full ${isOnDiet ? 'bg-green-500' : 'bg-red-500'}`}></div>
    </div>
  )
}