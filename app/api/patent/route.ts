import { NextRequest, NextResponse } from 'next/server';
import { connect } from 'src/utils/db';

export async function GET(request: NextRequest) {
  try {
    const query = request.nextUrl.searchParams.get('query');

    const offset = request.nextUrl.searchParams.get('offset');
    const limit = request.nextUrl.searchParams.get('limit');

    if (!offset || !limit) {
      return new NextResponse('Invalid paginated data', {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const conn = await connect();

    const data: any = await conn.query(
      `SELECT * FROM patent ${query ? `WHERE patent_text LIKE '%${query}%'` : ''} ORDER BY patent_id LIMIT ${limit} OFFSET ${offset}`
    );

    const count: any = await conn.query(
      `SELECT COUNT(*) AS total_count FROM patent ${query ? `WHERE patent_text LIKE '%${query}%'` : ''} ORDER BY patent_id`
    );

    let json_response = {
      status: 'success',
      count: count?.[0]?.[0]?.total_count,
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

