import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { type, step } = await request.json();
    
    // We'll store simple events in a 'survey_analytics' table
    const { error } = await supabase
      .from('survey_analytics')
      .insert([
        { 
          event_type: type,
          step_reached: step || null,
          created_at: new Date().toISOString()
        }
      ]);

    if (error) {
      console.warn('Analytics error (silent):', error);
      // We don't want to break the user experience if analytics fails
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('survey_analytics')
      .select('*');

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read analytics' }, { status: 500 });
  }
}
