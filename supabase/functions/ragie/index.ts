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

    const ragieApiKey = Deno.env.get('VITE_RAGIE_API_KEY');
    if (!ragieApiKey) {
      console.error('Ragie API key not found in environment variables');
      throw new Error('Ragie API key not configured');
    }

    const url = new URL(req.url);
    const endpoint = url.pathname.replace('/ragie/', '');
    const targetUrl = `${RAGIE_API_BASE_URL}/${endpoint}`;

    console.log(`Forwarding request to Ragie API: ${targetUrl}`);

    let body;
    if (req.method !== 'GET') {
      const contentType = req.headers.get('content-type');
      if (contentType?.includes('multipart/form-data')) {
        body = await req.formData();
      } else {
        body = await req.json();
      }
    }

    // Forward the request to Ragie API
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        'Authorization': `Bearer ${ragieApiKey}`,
        'Content-Type': req.headers.get('content-type') || 'application/json',
      },
      body: body instanceof FormData ? body : JSON.stringify(body),
    });

    if (!response.ok) {
      console.error('Ragie API error:', {
        status: response.status,
        statusText: response.statusText,
      });
      throw new Error(`Ragie API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    return new Response(JSON.stringify(data), { 
      headers: { 
        ...corsHeaders,
        'Content-Type': 'application/json'
      } 
    });
  } catch (error) {
    console.error('Edge function error:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Internal server error',
        details: error.toString()
      }),
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