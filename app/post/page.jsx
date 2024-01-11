'use client';
import styles from './post.module.scss';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import clsx from 'clsx';

export default function Post() {
  const [Post, setPost] = useState([]);

  useEffect(() => {
    fetch('/api/requestPost')
      .then((data) => data.json())
      .then((json) => setPost(json.result));
  }, []);

  return (
    <div className={clsx(styles.post)}>
      {Post.map((post) => {
        return (
          <article key={post.name}>
            <h2>
              <Link href={`/post/${post.id}`}>{post.name}</Link>
            </h2>
          </article>
        );
      })}
    </div>
  );
}
