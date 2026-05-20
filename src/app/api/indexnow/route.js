import axios from "axios";

export async function POST(req) {
  try {
    const body = await req.json();
    const urls = body.urls;

    if (!urls || !Array.isArray(urls)) {
      return Response.json(
        { error: "URLs array required" },
        { status: 400 }
      );
    }

    const response = await axios.post(
      "https://api.indexnow.org/indexnow",
      {
        host: "nameverse.vercel.app",
        key: process.env.INDEXNOW_KEY,
        urlList: urls,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return Response.json({ success: true, status: response.status });
  } catch (error) {
    console.error(error);
    return Response.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}