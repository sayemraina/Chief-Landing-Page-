export function ConfirmScreen() {
  return (
    <div className="relative w-full h-full bg-[#0d1117] flex flex-col items-center justify-center px-6">
      {/* Success state */}
      <div className="flex flex-col items-center text-center">
        {/* Checkmark */}
        <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mb-6">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gold"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h3 className="text-lg font-semibold text-text-primary">
          Sent to your team
        </h3>

        <p className="text-sm text-text-secondary mt-2 max-w-[200px]">
          3 observations distributed to 3 team members
        </p>

        {/* Distribution list */}
        <div className="mt-6 w-full space-y-2">
          <div className="flex items-center gap-3 bg-navy-light border border-border rounded-lg px-3 py-2.5">
            <div className="w-7 h-7 rounded-full bg-blue-500/20 flex items-center justify-center text-[10px] font-medium text-blue-400">
              AN
            </div>
            <div className="text-left">
              <p className="text-xs font-medium text-text-primary">Analyst</p>
              <p className="text-[10px] text-text-muted">CapEx-mapped observations</p>
            </div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-500 ml-auto">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <div className="flex items-center gap-3 bg-navy-light border border-border rounded-lg px-3 py-2.5">
            <div className="w-7 h-7 rounded-full bg-purple-500/20 flex items-center justify-center text-[10px] font-medium text-purple-400">
              VP
            </div>
            <div className="text-left">
              <p className="text-xs font-medium text-text-primary">VP / Director</p>
              <p className="text-[10px] text-text-muted">Full site visit memo</p>
            </div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-500 ml-auto">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <div className="flex items-center gap-3 bg-navy-light border border-border rounded-lg px-3 py-2.5">
            <div className="w-7 h-7 rounded-full bg-amber-500/20 flex items-center justify-center text-[10px] font-medium text-amber-400">
              AM
            </div>
            <div className="text-left">
              <p className="text-xs font-medium text-text-primary">Asset Manager</p>
              <p className="text-[10px] text-text-muted">Condition baseline</p>
            </div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-500 ml-auto">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
