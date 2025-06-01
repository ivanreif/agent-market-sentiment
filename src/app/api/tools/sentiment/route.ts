import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Fetch data from the Fear and Greed Index API
    const response = await fetch('https://api.alternative.me/fng/?limit=1');
    
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    
    // Return the result with proper attribution
    return NextResponse.json({
      data: data.data[0],
      attribution: "Data provided by Alternative.me Fear and Greed Index"
    });
  } catch (error) {
    console.error('Error fetching Fear and Greed Index:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Fear and Greed Index data' },
      { status: 500 }
    );
  }
}
