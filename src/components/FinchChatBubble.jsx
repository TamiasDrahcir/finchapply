export default function FinchChatBubble({ style = {} }) {
  return (
    <>
      <style>
        {`@keyframes finchBubbleDotFade {
            0%, 100% { opacity: 0.3; transform: skewX(15deg) translateY(0); }
            50% { opacity: 1; transform: skewX(15deg) translateY(-3px); }
          }
          @keyframes finchBubbleLife {
            0% { opacity: 0; transform: skewX(-15deg) scale(0.2); }
            12% { opacity: 1; transform: skewX(-15deg) scale(1.06); }
            20% { transform: skewX(-15deg) scale(0.97); }
            28% { transform: skewX(-15deg) scale(1); }
            72% { transform: skewX(-15deg) scale(1); opacity: 1; }
            88% { transform: skewX(-15deg) scale(0.9); opacity: 0.75; }
            100% { transform: skewX(-15deg) scale(0.2); opacity: 0; }
          }`}
      </style>

      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          width: 'clamp(78px, 7.2vw, 122px)',
          height: 'clamp(60px, 5.6vw, 88px)',
          pointerEvents: 'none',
          ...style,
        }}
      >
        <div
          style={{
            background: 'transparent',
            border: '2px solid #f7941d',
            borderRadius: '18px 18px 18px 4px',
            padding: 'clamp(7px, 0.75vw, 10px) clamp(9px, 0.95vw, 12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'clamp(3px, 0.35vw, 5px)',
            transformOrigin: 'bottom left',
            transform: 'skewX(-10deg)',
            animation: 'finchBubbleLife 3s ease-in-out infinite',
          }}
        >
          {[0, 1, 2].map((dot, index) => (
            <div
              key={dot}
              style={{
                width: 'clamp(5px, 0.48vw, 7px)',
                height: 'clamp(5px, 0.48vw, 7px)',
                borderRadius: '50%',
                background: '#f7941d',
                transform: 'skewX(15deg)',
                animation: 'finchBubbleDotFade 1.2s ease-in-out infinite',
                animationDelay: `${index * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
}
