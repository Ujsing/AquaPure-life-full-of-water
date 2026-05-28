
const CapsuleTab = ({ label, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`
        px-6 py-2.5 rounded-full whitespace-nowrap transition-all duration-300 text-sm font-medium
        ${isActive 
          ? 'bg-green-500 text-white shadow-lg' 
          : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
        }
      `}
    >
      {label}
    </button>
  );
};

export default CapsuleTab;