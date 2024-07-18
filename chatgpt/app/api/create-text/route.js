import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  if (!openai.apiKey) {
    return NextResponse.error(new Error('API key not provided'), {
      status: 500,
    });
  }
  const body = await req.json();

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      prompt: body.prompt,
      temperature: 0.5,
    });

    const theResponse = completion.choices[0].text;

    return NextResponse.json({ output: theResponse }, { status: 200 });
  } catch (error) {
    if (error.response.status == 401) {
      return NextResponse.json({ error: 'Invalid API key' }, { status: 401 });
    }  else {
    console.error(error.response.status);
    }
  }
}
