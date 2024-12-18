import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RAGIE_API_BASE_URL = 'https://api.ragie.ai';

serve(async (req) => {
  try {
    const ragieApiKey = Deno.env.get('VITE_RAGIE_API_KEY');
    if (!ragieApiKey) {
      return new Response(
        JSON.stringify({ error: 'Ragie API key not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const url = new URL(req.url);
    const endpoint = url.pathname.replace('/ragie/', '');
    const targetUrl = `${RAGIE_API_BASE_URL}/${endpoint}`;

    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ragieApiKey}`
      },
      body: req.method !== 'GET' ? await req.text() : undefined
    });

    const data = await response.json();
    
    return new Response(
      JSON.stringify(data),
      { 
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        } 
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        } 
      }
    );
  }
});