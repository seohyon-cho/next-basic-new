import { postDB } from '@/app/DB/postData';
import { NextResponse } from 'next/server';
import fs from 'fs';

export async function GET(req, res) {
	const { postNum } = await res.params;
	return NextResponse.json({ result: postDB[parseInt(postNum)] });
}

// 순서 (3) - 삭제 라우터 요청이 들어오면, 전달받은 글 고유번호를 가지고 기존의 배열에서 해당 순번의 객체만 제거한 뒤 (filter), 새롭게 바뀐 내용으로 기존의 파일을 서버 쪽에서 덮어쓰기 처리.
export async function DELETE(req, res) {
	const { postNum } = await res.params;
	const deletedData = postDB.filter((post) => post.id != postNum);
	const resultData = JSON.stringify(deletedData);

	fs.writeFileSync('./app/DB/postData.js', `export const postDB=${resultData};`, 'utf-8');
	return NextResponse.json({ result: 'data deleted' }, { status: 200 });
}
