'use client';
import styles from './detail.module.scss';
import { useState, useEffect } from 'react';
import clsx from 'clsx';

export default function PostDetail({ params }) {
	const { id } = params;
	const [PostEl, setPostEl] = useState(null);

	useEffect(() => {
		fetch(`/api/requestPost/${id}`)
			.then((data) => data.json())
			.then((json) => {
				console.log(json);
				setPostEl(json.result);
			});
	}, [id]);

	return (
		<section className={clsx(styles.detail)}>
			<article>
				<h2>{PostEl?.title}</h2>
				<p>{PostEl?.content}</p>
			</article>
		</section>
	);
}
