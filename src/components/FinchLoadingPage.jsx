export default function FinchLoadingPage({ fullscreen = true }) {
  return (
    <div
      style={{
        position: fullscreen ? 'fixed' : 'relative',
        inset: fullscreen ? 0 : 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg)',
        minHeight: fullscreen ? '100vh' : '340px',
        borderRadius: fullscreen ? 0 : '20px',
        zIndex: fullscreen ? 999 : 'auto',
      }}
    >
      <div style={{ width: '320px' }}>
        <svg viewBox="0 0 680 360" width="100%" xmlns="http://www.w3.org/2000/svg" aria-label="Finch loading">
          <defs>
            <style>{`
              @keyframes spin1 {
                from { transform: rotate(0deg); }
                to   { transform: rotate(360deg); }
              }
              @keyframes spin1r {
                from { transform: rotate(0deg); }
                to   { transform: rotate(-360deg); }
              }
              @keyframes spin2 {
                from { transform: rotate(120deg); }
                to   { transform: rotate(480deg); }
              }
              @keyframes fade-text {
                0%, 100% { opacity: 0.45; }
                50%       { opacity: 1; }
              }
              .orbit-arm-1 {
                transform-origin: 340px 160px;
                animation: spin1 1.6s linear infinite;
              }
              .orbit-arm-2 {
                transform-origin: 340px 160px;
                animation: spin1r 2.4s linear infinite;
              }
              .orbit-arm-3 {
                transform-origin: 340px 160px;
                animation: spin2 1.9s linear infinite;
              }
              .thinking-text {
                animation: fade-text 2s ease-in-out infinite;
              }
            `}</style>
          </defs>

          {/* Orbit rings */}
          <circle cx="340" cy="160" r="110" fill="none" stroke="#E8552A" strokeWidth="0.5" opacity="0.15" />
          <circle cx="340" cy="160" r="72" fill="none" stroke="#E8552A" strokeWidth="0.5" opacity="0.12" />

          {/* Orbiting dots */}
          <g className="orbit-arm-1">
            <circle cx="340" cy="50" r="8" fill="#E8552A" opacity="0.85" />
          </g>
          <g className="orbit-arm-2">
            <circle cx="340" cy="50" r="5" fill="#E8552A" opacity="0.25" />
          </g>
          <g className="orbit-arm-3">
            <circle cx="340" cy="88" r="6" fill="#E8552A" opacity="0.85" />
          </g>

          {/* Thinking dots */}
          <circle cx="320" cy="248" r="4" fill="#E8552A">
            <animate attributeName="opacity" values="0.9;0.2;0.9" dur="1.2s" begin="0s" repeatCount="indefinite" />
          </circle>
          <circle cx="340" cy="248" r="4" fill="#E8552A">
            <animate attributeName="opacity" values="0.9;0.2;0.9" dur="1.2s" begin="0.3s" repeatCount="indefinite" />
          </circle>
          <circle cx="360" cy="248" r="4" fill="#E8552A">
            <animate attributeName="opacity" values="0.9;0.2;0.9" dur="1.2s" begin="0.6s" repeatCount="indefinite" />
          </circle>

          {/* "Finch is thinking…" label */}
          <text
            x="340"
            y="310"
            textAnchor="middle"
            fontFamily="Nunito, sans-serif"
            fontSize="13"
            fontWeight="600"
            fill="#E8552A"
            letterSpacing="0.5"
            className="thinking-text"
          >Finch is thinking…</text>
        </svg>
      </div>
    </div>
  );
}
