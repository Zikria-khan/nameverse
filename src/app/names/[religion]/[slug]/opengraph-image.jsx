import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Name Meaning';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

// Religion theme colors
const religionThemes = {
  islamic: { gradient: ['#10B981', '#0D9488'], text: 'Islamic Name' },
  christian: { gradient: ['#3B82F6', '#6366F1'], text: 'Christian Name' },
  hindu: { gradient: ['#F97316', '#EAB308'], text: 'Hindu Name' },
};

export default async function Image({ params }) {
  const { religion, slug } = await params;

  // Fetch name data
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'https://namverse-api.vercel.app';
  let nameData = null;

  try {
    const response = await fetch(`${API_BASE}/api/v1/names/${religion}/${slug}`, {
      next: { revalidate: 3600 }
    });
    const data = await response.json();
    nameData = data.data;
  } catch (error) {
    console.error('Error fetching name data for OG image:', error);
  }

  const theme = religionThemes[religion] || religionThemes.islamic;
  const name = nameData?.name || slug.replace(/-/g, ' ');
  const meaning = nameData?.short_meaning || nameData?.meaning || 'Meaningful name';
  const nativeName = nameData?.in_arabic?.name || nameData?.in_hebrew?.name || nameData?.in_sanskrit?.name || '';

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
          background: `linear-gradient(135deg, ${theme.gradient[0]} 0%, ${theme.gradient[1]} 100%)`,
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Logo/Badge */}
        <div
          style={{
            position: 'absolute',
            top: 40,
            left: 40,
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            background: 'rgba(255, 255, 255, 0.15)',
            padding: '12px 24px',
            borderRadius: '50px',
            backdropFilter: 'blur(10px)',
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              background: 'white',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 24,
              fontWeight: 'bold',
              color: theme.gradient[0],
            }}
          >
            N
          </div>
          <span style={{ color: 'white', fontSize: 20, fontWeight: '600' }}>
            NameVerse
          </span>
        </div>

        {/* Religion Badge */}
        <div
          style={{
            position: 'absolute',
            top: 40,
            right: 40,
            background: 'rgba(255, 255, 255, 0.2)',
            padding: '12px 24px',
            borderRadius: '50px',
            color: 'white',
            fontSize: 18,
            fontWeight: '600',
            backdropFilter: 'blur(10px)',
            textTransform: 'capitalize',
          }}
        >
          {theme.text}
        </div>

        {/* Main Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 60px',
            textAlign: 'center',
          }}
        >
          {/* Name */}
          <h1
            style={{
              fontSize: 96,
              fontWeight: 'bold',
              color: 'white',
              margin: 0,
              marginBottom: 16,
              textShadow: '0 4px 20px rgba(0,0,0,0.3)',
              lineHeight: 1.1,
            }}
          >
            {name}
          </h1>

          {/* Native Script Name */}
          {nativeName && (
            <div
              style={{
                fontSize: 64,
                color: 'rgba(255, 255, 255, 0.95)',
                marginBottom: 24,
                fontWeight: '500',
              }}
            >
              {nativeName}
            </div>
          )}

          {/* Meaning */}
          <p
            style={{
              fontSize: 32,
              color: 'rgba(255, 255, 255, 0.9)',
              margin: 0,
              maxWidth: 900,
              lineHeight: 1.4,
            }}
          >
            "{meaning}"
          </p>
        </div>

        {/* Bottom Decoration */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 80,
            background: 'rgba(0, 0, 0, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 18,
            color: 'rgba(255, 255, 255, 0.8)',
          }}
        >
          Discover the meaning and origin • nameverse.vercel.app
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
