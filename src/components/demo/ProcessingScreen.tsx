export function ProcessingScreen() {
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

      {/* Camera area (dimmed, background) */}
      <div className="flex-1 relative mx-4 mt-3 mb-1 rounded-xl overflow-hidden bg-[#1a1f2e]">
        <img
          src="/images/warehouse-interior.jpg"
          alt="Warehouse interior"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-black/30" />

        {/* Photo count badge */}
        <div className="absolute top-3 right-3 bg-gold/90 text-navy text-xs font-mono font-bold px-2.5 py-1 rounded-full">
          3 photos
        </div>
      </div>

      {/* Observation card sliding up */}
      <div className="mx-4 mb-3 bg-navy-light border border-border rounded-xl p-4 shadow-xl shadow-black/30">
        <div className="flex items-center gap-2 mb-3">
          <div className="px-2 py-0.5 bg-gold/15 text-gold text-[10px] font-mono font-medium rounded uppercase tracking-wider">
            Interior Elements
          </div>
          <div className="px-2 py-0.5 bg-white/5 text-text-secondary text-[10px] font-mono rounded uppercase tracking-wider">
            Fair
          </div>
        </div>

        <p className="text-xs text-text-primary leading-relaxed">
          Vacant warehouse bay. Sealed grey concrete floor, exposed CMU block
          walls. Floor shows light staining near the door threshold.
        </p>

        <div className="flex items-center gap-3 mt-3 pt-3 border-t border-border">
          <span className="text-[10px] text-text-muted">Timing: N/A</span>
          <span className="text-[10px] text-text-muted">Severity: None</span>
          <span className="text-[10px] text-text-muted">Specialist: No</span>
        </div>
      </div>

      {/* End Visit button */}
      <div className="px-5 pb-8 pt-1">
        <button className="w-full py-3 bg-white/5 border border-white/10 rounded-xl text-sm font-medium text-text-secondary">
          End Visit
        </button>
      </div>
    </div>
  );
}
