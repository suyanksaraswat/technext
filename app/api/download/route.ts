import { NextRequest, NextResponse } from 'next/server';
import { connect } from 'src/utils/db';

export async function GET(request: NextRequest) {
  try {
    const conn = await connect();

    const data: any = await conn.query(
      `SELECT 
          date,
          COUNT(id) AS total_records,
          COUNT(DISTINCT idx) AS distinct_idx_count,
          COUNT(DISTINCT idx_2) AS distinct_idx_2_count,
          COUNT(DISTINCT patent_id) AS distinct_patent_id_count,
          COUNT(DISTINCT phase) AS distinct_phase_count
      FROM 
          patent
      GROUP BY 
          date;`
    );

    let json_response = {
      status: 'success',
      data: data?.[0],
      count: data?.[0]?.length
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
