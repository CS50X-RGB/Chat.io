export function CardWrapper({ children }) {
  return (
    <>
      <div
        className="border-2 border-[##7bec39] rounded-2xl w-[50vh] md:w-[60vh] h-[60vh] font-ostwald font-extrabold
                         flex justify-center  text-white bg-black shadow-xl shadow-black"
      >
        {children}
      </div>
    </>
  );
}
