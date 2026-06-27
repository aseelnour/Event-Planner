type props = {
    title: string;
    value: string;
    growth: string;

    
}
const StatsCard = ({ title, value, growth }: props) => {
    return (    
      <div className="bg-white shadow rounded-xl p-5 w-full">
     <div className="flex justify-between items-center">
        <h4 className="text-gray-500">{title}</h4>
        <span className="text-green-500 text-sm">{growth}</span>
      </div>

      <h2 className="text-2xl font-bold mt-2">{value}</h2>
    </div>
    );
}
export { StatsCard };