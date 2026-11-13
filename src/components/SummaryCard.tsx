import { useNavigate } from "react-router-dom";

interface SummaryCardProps {
  percentage: string;
}

export function SummaryCard({ percentage }: SummaryCardProps) {
  const navigate = useNavigate();

  return (
    <section 
      onClick={() => navigate('/statistics')}
      className="bg-green-100 rounded-2xl p-5 flex flex-col items-center justify-center mb-10 relative cursor-pointer hover:bg-green-200 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
    >
      <span className="text-3xl font-bold text-gray-900">{percentage}%</span>
      <p className="text-sm text-gray-600 mt-1">das refeições dentro da dieta</p>
      <button className="absolute top-4 right-4 text-green-700 font-bold">
        ↗
      </button>
    </section>
  )
}