import { NextRequest, NextResponse } from 'next/server';
import { connect } from 'src/utils/db';

export async function GET(request: NextRequest) {
  try {
    const query = request.nextUrl.searchParams.get('query');

    const conn = await connect();

    const data: any = await conn.query(
      `SELECT phase, COUNT(*) AS phase_count FROM patent ${
        query ? `WHERE patent_text LIKE '%${query}%'` : ''
      } GROUP BY phase`
    );

    let json_response = {
      status: 'success',
      data: data?.[0],
    };
    return NextResponse.json(json_response);
  } catch (e) {
    return new NextResponse(JSON.stringify(e), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export const dynamic = 'force-dynamic';
