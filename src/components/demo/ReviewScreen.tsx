export function ReviewScreen() {
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

      {/* Header */}
      <div className="px-5 py-3 border-b border-border">
        <p className="text-xs text-gold uppercase tracking-wider font-medium">Visit Complete</p>
        <p className="text-sm font-medium text-text-primary mt-0.5">2320 Wayne St</p>
        <p className="text-xs text-text-secondary">3 observations &middot; 3 photos</p>
      </div>

      {/* Add judgment input */}
      <div className="mx-4 mt-3 bg-gold/5 border border-gold/20 rounded-xl p-3">
        <p className="text-[10px] text-gold uppercase tracking-wider font-medium mb-2">
          Your judgment
        </p>
        <p className="text-xs text-text-primary leading-relaxed">
          The staining near the dock door looks like it could be an active leak.
          Worth getting a roofer to check the flashing above.
        </p>
      </div>

      {/* Observation list */}
      <div className="flex-1 overflow-hidden px-4 mt-3 space-y-2">
        {/* Observation 1 */}
        <div className="bg-navy-light border border-border rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-mono text-gold bg-gold/10 px-1.5 py-0.5 rounded">
              Interior Elements
            </span>
            <span className="text-[10px] font-mono text-text-muted">Fair</span>
          </div>
          <p className="text-[11px] text-text-secondary leading-relaxed line-clamp-2">
            Vacant warehouse bay. Sealed grey concrete floor, exposed CMU block walls.
          </p>
        </div>

        {/* Observation 2 */}
        <div className="bg-navy-light border border-border rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-mono text-gold bg-gold/10 px-1.5 py-0.5 rounded">
              Building Envelope
            </span>
            <span className="text-[10px] font-mono text-text-muted">Fair</span>
          </div>
          <p className="text-[11px] text-text-secondary leading-relaxed line-clamp-2">
            Brick veneer and glass storefront entrance. Surface staining and minor cracking.
          </p>
        </div>

        {/* Observation 3 */}
        <div className="bg-navy-light border border-border rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-mono text-gold bg-gold/10 px-1.5 py-0.5 rounded">
              Site Improvements
            </span>
            <span className="text-[10px] font-mono text-text-muted">Fair</span>
          </div>
          <p className="text-[11px] text-text-secondary leading-relaxed line-clamp-2">
            Loading dock with surface cracking. Possible structural concern.
          </p>
        </div>
      </div>

      {/* Confirm button */}
      <div className="px-5 pb-8 pt-3">
        <button className="w-full py-3 bg-gold text-navy font-semibold text-sm rounded-xl">
          Send to team
        </button>
      </div>
    </div>
  );
}
