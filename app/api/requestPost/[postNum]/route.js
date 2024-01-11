import { postDB } from '@/DB/postData';
import { NextResponse } from 'next/server';

export function GET(req, res) {
  console.log(req.url);
  const { postNum } = res.params;
  return NextResponse.json({ result: postDB[parseInt(postNum)] });
}
