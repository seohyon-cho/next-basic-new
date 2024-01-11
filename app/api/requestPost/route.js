import { postDB } from '@/app/DB/postData';
import { NextResponse } from 'next/server';
import fs from 'fs';

// 모든 데이터를 가져오는 서버 라우터
export function GET() {
	return NextResponse.json({ result: postDB });
}

// 클라이언트로부터 POST 방식으로 특정 데이터를 전달 받아서 저장해주는 서버 라우터
export async function POST(req, res) {
	const payload = await req.json();
	if (payload) {
		// * 클라이언트에서 전달받은 값에 id값을 새로 생성해서 기존 배열에 추가 *
		// 전달할 payload 값에 id 속성 (순서) 도 추가
		payload.id = postDB.length;
		// push() : postDB 라는 배열에 payload 값 추가
		postDB.push(payload);
		const updatedPostDB = postDB;
		const combinedData = JSON.stringify(updatedPostDB);

		// fs 모듈을 사용해, 기존 postData.js 의 파일 내용을 변경해서 다시 저장.
		// 인수로 전달되는 값 (파일경로, 넣을 내용(쓸 데이터), 사용할 인코딩)
		fs.writeFileSync('./app/DB/postData.js', `export const postDB = ${combinedData};`, 'utf-8');

		// 파일 저장 완료 후 성공 / 실패 응답 객체 전송
		return NextResponse.json({ result: 'data posted' }, { status: 200 });
	} else {
		return NextResponse.json({ result: 'fail to Post' }, { status: 400 });
	}
}
