export function TeamViews() {
  return (
    <div className="space-y-4">
      {/* Analyst View */}
      <div className="bg-navy-light border border-border rounded-xl p-4 shadow-xl shadow-black/20">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-[9px] font-medium text-blue-400">
            AN
          </div>
          <span className="text-xs font-medium text-text-primary">Analyst View</span>
          <span className="text-[10px] text-gold bg-gold/10 px-2 py-0.5 rounded-full ml-auto">
            New
          </span>
        </div>

        <p className="text-xs text-text-muted uppercase tracking-wider mb-3">
          Observations by ASTM System
        </p>

        {/* Observation rows */}
        <div className="space-y-2">
          <div className="flex items-center justify-between py-2 border-b border-border">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-gold">Interior Elements</span>
              <span className="text-[10px] text-text-muted">Fair</span>
            </div>
            <span className="text-[10px] font-mono text-text-secondary">CapEx baseline</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-border">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-gold">Building Envelope</span>
              <span className="text-[10px] text-text-muted">Fair</span>
            </div>
            <span className="text-[10px] font-mono text-text-secondary">Cosmetic reserve</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-gold">Site Improvements</span>
              <span className="text-[10px] text-text-muted">Fair</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-mono text-amber-400">Specialist flagged</span>
              <span className="text-[10px] font-mono text-text-secondary">CapEx reserve</span>
            </div>
          </div>
        </div>

        {/* GP judgment flag */}
        <div className="mt-3 pt-3 border-t border-border">
          <div className="flex items-start gap-2">
            <span className="text-[10px] text-amber-400 mt-0.5">!</span>
            <p className="text-[11px] text-text-secondary">
              GP flagged possible active leak near dock door. Roofer inspection recommended.
            </p>
          </div>
        </div>
      </div>

      {/* VP View */}
      <div className="bg-navy-light border border-border rounded-xl p-4 shadow-xl shadow-black/20">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-[9px] font-medium text-purple-400">
            VP
          </div>
          <span className="text-xs font-medium text-text-primary">Site Visit Memo</span>
          <span className="text-[10px] text-gold bg-gold/10 px-2 py-0.5 rounded-full ml-auto">
            New
          </span>
        </div>

        <div className="space-y-3">
          <div>
            <p className="text-[10px] text-text-muted uppercase tracking-wider">Property</p>
            <p className="text-xs text-text-primary font-medium">
              2320 Wayne St, Columbia SC
            </p>
            <p className="text-[11px] text-text-secondary">
              Industrial/Flex &middot; 1975-built &middot; Visited today
            </p>
          </div>

          <div>
            <p className="text-[10px] text-text-muted uppercase tracking-wider">Summary</p>
            <p className="text-[11px] text-text-secondary leading-relaxed">
              3 observations across Interior Elements, Building Envelope, and Site Improvements. All rated Fair. One specialist referral flagged (structural/concrete at loading dock). GP notes possible active leak at dock door.
            </p>
          </div>

          <div>
            <p className="text-[10px] text-text-muted uppercase tracking-wider">Action Items</p>
            <div className="space-y-1 mt-1">
              <p className="text-[11px] text-text-primary">
                <span className="text-amber-400 mr-1">&bull;</span>
                Schedule roofer for dock door flashing inspection
              </p>
              <p className="text-[11px] text-text-primary">
                <span className="text-text-muted mr-1">&bull;</span>
                Structural specialist for loading dock cracking
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
