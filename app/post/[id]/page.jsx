'use client';
import { useState, useEffect } from 'react';

export default function PostDetail({ params }) {
  const { id } = params;
  const [PostEl, setPostEl] = useState(null);

  useEffect(() => {
    fetch(`/api/requestPost/${id}`)
      .then((data) => data.json())
      .then((json) => {
        console.log(json);
      });
  }, [id]);

  return (
    <div>
      <h2>{id}번째 게시글 상세페이지</h2>
    </div>
  );
}
