'use client';
import styles from './post.module.scss';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import clsx from 'clsx';

export default function Post() {
	const [Post, setPost] = useState([]);

	// 순서 (4) - 목록 페이지에서 삭제된 게시글까지 갱신된 정보값으로 목록 데이터 재출력.
	useEffect(() => {
		fetch('/api/requestPost')
			.then((data) => data.json())
			.then((json) => setPost(json.result));
	}, []);

	return (
		<div className={clsx(styles.post)}>
			<h1>Post List</h1>
			<nav>
				<button>
					<Link href='/post/write'>Write Post</Link>
				</button>
			</nav>
			{Post.map((post) => {
				return (
					<article key={post.id}>
						<h2>
							<Link href={`/post/${post.id}`}>{post.title}</Link>
						</h2>
					</article>
				);
			})}
		</div>
	);
}
