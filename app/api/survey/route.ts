import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Insert response into Supabase table 'survey_responses'
    const { error } = await supabase
      .from('survey_responses')
      .insert([
        { 
          responses: data,
          submitted_at: new Date().toISOString()
        }
      ]);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving survey to Supabase:', error);
    return NextResponse.json({ success: false, error: 'Failed to save survey' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('survey_responses')
      .select('*')
      .order('submitted_at', { ascending: false });

    if (error) throw error;

    // Map back to the expected format for the admin dashboard
    const formattedData = data.map((item: any) => ({
      id: item.id.toString(),
      submittedAt: item.submitted_at,
      ...item.responses
    }));

    return NextResponse.json(formattedData);
  } catch (error) {
    console.error('Error fetching survey data:', error);
    return NextResponse.json({ error: 'Failed to read data' }, { status: 500 });
  }
}
