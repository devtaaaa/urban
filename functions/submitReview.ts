// Cloudflare Pages Function: receive review data and respond
// This endpoint will be available at https://<your-project>.pages.dev/submitReview
// It expects a JSON payload with the fields you wish to capture.

export const onRequest = async ({ request }) => {
  try {
    const contentType = request.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      return new Response(JSON.stringify({ error: 'Invalid content type' }), {
        status: 400,
        headers: { 'content-type': 'application/json' },
      });
    }

    const data = await request.json();
    // Example fields you might receive from the frontend:
    //   answers: string[]
    //   generatedReview: string
    //   rating: number
    //   timestamp: string (ISO)

    // In a real project you could store this in a DB, send to a webhook, etc.
    // For now we just echo the payload back with a success flag.
    const responseBody = {
      success: true,
      received: data,
    };
    return new Response(JSON.stringify(responseBody), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return new Response(JSON.stringify({ error: errorMsg }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
  }
};
