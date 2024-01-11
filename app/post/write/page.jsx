'use client';
import { useState } from 'react';
import styles from './write.module.scss';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';

export default function Write() {
	const router = useRouter();
	const [Post, setPost] = useState({ title: '', content: '' });

	const handleChange = (e) => {
		const { name, value } = e.target;
		setPost({ ...Post, [name]: value });
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		fetch('/api/requestPost', {
			method: 'POST',
			headers: { 'Content-type': 'application/json' },
			body: JSON.stringify(Post),
		}).then((response) => {
			if (response.ok) {
				response.json().then((data) => {
					console.log(data);
					alert('글 저장에 성공했습니다.');
					router.push('/post');
				});
			} else {
				console.log(response);
				alert('글 저장에 실패했습니다.');
			}
		});
	};

	return (
		<section className={clsx(styles.write)}>
			<h1>Write Post</h1>

			<form onSubmit={handleSubmit}>
				<input type='text' placeholder='title' name='title' value={Post.title} onChange={handleChange} />
				<textarea name='content' cols='30' rows='3' value={Post.content} onChange={handleChange}></textarea>

				<button>Send Post</button>
			</form>
		</section>
	);
}
