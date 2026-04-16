import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'NameVerse - Baby Names & Meanings';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #F97316 100%)',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Background Pattern */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.1,
            background: 'radial-gradient(circle at 20% 50%, white 0%, transparent 50%), radial-gradient(circle at 80% 80%, white 0%, transparent 50%)',
          }}
        />

        {/* Logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            marginBottom: 40,
          }}
        >
          <div
            style={{
              width: 100,
              height: 100,
              background: 'white',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 56,
              fontWeight: 'bold',
              color: '#667eea',
              boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
            }}
          >
            N
          </div>
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: 82,
            fontWeight: 'bold',
            color: 'white',
            margin: 0,
            marginBottom: 20,
            textShadow: '0 4px 20px rgba(0,0,0,0.3)',
            textAlign: 'center',
          }}
        >
          NameVerse
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 36,
            color: 'rgba(255, 255, 255, 0.95)',
            margin: 0,
            marginBottom: 40,
            textAlign: 'center',
            maxWidth: 900,
            lineHeight: 1.3,
          }}
        >
          Discover Perfect Baby Names & Meanings
        </p>

        {/* Religion Tags */}
        <div
          style={{
            display: 'flex',
            gap: '16px',
            marginBottom: 40,
          }}
        >
          {['Islamic', 'Hindu', 'Christian'].map((religion, i) => (
            <div
              key={religion}
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                padding: '12px 28px',
                borderRadius: '50px',
                color: 'white',
                fontSize: 24,
                fontWeight: '600',
                backdropFilter: 'blur(10px)',
              }}
            >
              {religion}
            </div>
          ))}
        </div>

        {/* Stats */}
        <div
          style={{
            display: 'flex',
            gap: '60px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontSize: 48, fontWeight: 'bold', color: 'white' }}>65,000+</div>
            <div style={{ fontSize: 20, color: 'rgba(255, 255, 255, 0.8)' }}>Baby Names</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontSize: 48, fontWeight: 'bold', color: 'white' }}>9+</div>
            <div style={{ fontSize: 20, color: 'rgba(255, 255, 255, 0.8)' }}>Languages</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontSize: 48, fontWeight: 'bold', color: 'white' }}>3</div>
            <div style={{ fontSize: 20, color: 'rgba(255, 255, 255, 0.8)' }}>Religions</div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
