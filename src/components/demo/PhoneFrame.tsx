export function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-[220px] h-[460px] sm:w-[280px] sm:h-[560px]">
      {/* Phone bezel */}
      <div className="absolute inset-0 rounded-[3rem] bg-[#1a1a1a] shadow-2xl shadow-black/50 border border-white/10">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[30px] bg-[#1a1a1a] rounded-b-2xl z-10" />

        {/* Screen area */}
        <div className="absolute inset-[3px] rounded-[2.8rem] overflow-hidden bg-navy-light">
          {children}
        </div>

        {/* Home indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[100px] h-[4px] rounded-full bg-white/20" />
      </div>
    </div>
  );
}
