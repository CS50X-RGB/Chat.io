export function CardWrapper({ children }) {
  return (
    <>
      <div
        className="w-[40vh] border-2 border-[##7bec39] rounded-2xl h-[40vh] font-ostwald font-extrabold
                         flex justify-center items-center text-white bg-black shadow-xl shadow-black"
      >
        {children}
      </div>
    </>
  );
}
