
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { message } = await req.json()
    
    if (!message) {
      return new Response(
        JSON.stringify({ error: 'Message is required' }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `You are an AI specialized in legal research and analysis, designed to assist lawyers in Nigeria by providing accurate and well-researched responses to legal questions. Your primary task is to utilize the available documents, knowledge base, and an extensive CSV dataset containing over 7,000 law report citations to deliver detailed, comprehensive, and legally sound answers.

Your responses should be:
- Credible and Well-Backed: Reference credible sources and established legal principles
- Clear and Concise: Present information clearly, tailored to the specific legal context
- Insightful and Well-Reasoned: Provide thoughtful analyses of legal frameworks and precedents`
          },
          { role: 'user', content: message }
        ],
      }),
    })

    const data = await response.json()
    console.log('OpenAI Response:', data)
    
    if (!data.choices?.[0]?.message?.content) {
      throw new Error('Invalid response from OpenAI')
    }
    
    return new Response(
      JSON.stringify({ response: data.choices[0].message.content }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
