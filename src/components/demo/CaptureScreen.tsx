export function CaptureScreen() {
  return (
    <div className="relative w-full h-full bg-[#0d1117] flex flex-col">
      {/* Status bar */}
      <div className="flex items-center justify-between px-6 pt-14 pb-2">
        <span className="text-xs text-text-muted">9:41</span>
        <span className="text-xs text-text-muted font-medium">Chief<span className="text-gold">.</span></span>
        <div className="flex gap-1">
          <div className="w-4 h-2 rounded-sm border border-white/30" />
        </div>
      </div>

      {/* Property info */}
      <div className="px-5 py-3 border-b border-border">
        <p className="text-xs text-text-muted uppercase tracking-wider">Active Visit</p>
        <p className="text-sm font-medium text-text-primary mt-0.5">2320 Wayne St, Columbia SC</p>
        <p className="text-xs text-text-secondary">Industrial/Flex &middot; 1975-built</p>
      </div>

      {/* Camera viewfinder area */}
      <div className="flex-1 relative bg-[#1a1f2e] mx-4 my-3 rounded-xl overflow-hidden">
        {/* Property image */}
        <img
          src="/images/warehouse-interior.jpg"
          alt="Warehouse interior during site visit"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Viewfinder overlay */}
        <div className="absolute inset-0 bg-black/10" />

        {/* Corner brackets */}
        <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-white/40 rounded-tl" />
        <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-white/40 rounded-tr" />
        <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-white/40 rounded-bl" />
        <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-white/40 rounded-br" />

        {/* Photo count badge */}
        <div className="absolute top-3 right-12 bg-gold/90 text-navy text-xs font-mono font-bold px-2.5 py-1 rounded-full">
          3 photos
        </div>
      </div>

      {/* End Visit button */}
      <div className="px-5 pb-8 pt-2">
        <button className="w-full py-3 bg-white/5 border border-white/10 rounded-xl text-sm font-medium text-text-secondary">
          End Visit
        </button>
      </div>
    </div>
  );
}
