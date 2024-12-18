import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RAGIE_API_BASE_URL = 'https://api.ragie.ai';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
}

serve(async (req) => {
  try {
    // Handle CORS preflight requests
    if (req.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // Verify authorization
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      console.error('Missing authorization header');
      return new Response(
        JSON.stringify({ error: 'Missing authorization header' }),
        { 
          status: 401, 
          headers: { 
            ...corsHeaders,
            'Content-Type': 'application/json'
          } 
        }
      );
    }

    const ragieApiKey = Deno.env.get('VITE_RAGIE_API_KEY');
    if (!ragieApiKey) {
      console.error('Ragie API key not found in environment variables');
      return new Response(
        JSON.stringify({ error: 'Ragie API key not configured on the server' }),
        { 
          status: 500, 
          headers: { 
            ...corsHeaders,
            'Content-Type': 'application/json'
          } 
        }
      );
    }

    const url = new URL(req.url);
    const endpoint = url.pathname.replace('/ragie/', '');
    const targetUrl = `${RAGIE_API_BASE_URL}/${endpoint}`;

    console.log(`Forwarding request to: ${targetUrl}`);

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
          ...corsHeaders,
          'Content-Type': 'application/json'
        } 
      }
    );
  } catch (error) {
    console.error('Edge function error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        } 
      }
    );
  }
});