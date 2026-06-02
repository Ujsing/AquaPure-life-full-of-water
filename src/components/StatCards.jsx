import imgg from '../assets/glass bottle.jpg'
export default function StatCards({ level ,onclick}) {
  return (
    <>
   <div className="grid" onClick={onclick}>
     <div className=" w-full h-full min-h-[100px] min-w-0 rounded-2xl text-center flex justify-center items-center bg-white/5 border border-white/8 p-4">
       <img 
        src={imgg} 
        alt="icon" 
        className="w-full h-full object-contain"
      />
      {/* <p className="text-2xl font-bold text-white ">{product.icon}</p> */}
    </div>
    <div className="rounded-2xl text-center  ">
          <p className="text-[11px] text-white/40 mt-3.5 sm:text-[10px] md:text-[14px] xl:text-[16px]">{level}</p>


    </div>
   </div>
    </>
  );
}