import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'responses.json');

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Ensure directory exists
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR);
    }

    // Read existing data
    let responses = [];
    if (fs.existsSync(DATA_FILE)) {
      const fileData = fs.readFileSync(DATA_FILE, 'utf8');
      responses = JSON.parse(fileData);
    }

    // Add timestamp and ID
    const newResponse = {
      id: Date.now().toString(),
      submittedAt: new Date().toISOString(),
      ...data
    };

    responses.push(newResponse);

    // Write back
    fs.writeFileSync(DATA_FILE, JSON.stringify(responses, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving survey:', error);
    return NextResponse.json({ success: false, error: 'Failed to save survey' }, { status: 500 });
  }
}

export async function GET() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      return NextResponse.json([]);
    }
    const fileData = fs.readFileSync(DATA_FILE, 'utf8');
    const responses = JSON.parse(fileData);
    return NextResponse.json(responses);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read data' }, { status: 500 });
  }
}
