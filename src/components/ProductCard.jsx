import { ExperimentOutlined} from "@ant-design/icons";

export default function ProductCard() {
  return (
<>
<div className="relative w-full min-h-52 rounded-[28px] glass
bg-gradient-to-br from-[#03122b] to-[#020617] 
p-5 overflow-hidden flex flex-col justify-between">

  {/* Top */}
  <div className="flex items-start justify-between">

    {/* Icon */}
    <div className="w-14 h-14 rounded-2xl 
    bg-emerald-500/10 
    border border-emerald-400/20
    flex items-center justify-center
    shadow-[0_0_25px_rgba(16,185,129,0.12)]">

      <ExperimentOutlined className="text-2xl text-emerald-300" />
    </div>

    {/* Badge */}
    <div className="px-3 py-1 rounded-full 
    border border-emerald-400/20
    bg-emerald-500/10">

      <span className="text-[11px] text-emerald-300 font-medium">
        Best Seller
      </span>
    </div>
  </div>

  {/* Middle Content */}
  <div className="mt-3">

    <h2 className="text-white text-2xl font-semibold tracking-tight">
      Classic Still
    </h2>

    <p className="text-slate-400 text-base mt-1">
      RO + UV · 1 Litre
    </p>

    {/* Price */}
    <div className="mt-4">

      <h3 className="text-white text-3xl font-bold leading-none">
        ₹8
      </h3>

      <p className="text-slate-500 text-sm mt-1">
        per litre
      </p>
    </div>
  </div>

  {/* Add Button */}
  <button className="absolute bottom-5 right-5
  w-12 h-12 rounded-2xl
  border border-emerald-400/20
  bg-emerald-500/10
  text-emerald-300 text-3xl
  flex items-center justify-center
  shadow-[0_0_20px_rgba(16,185,129,0.15)]
  hover:scale-105 transition-all">

    +
  </button>

</div>

</> 
 )
}
