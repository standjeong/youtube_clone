import React from 'react';
import timeAgo from '../utils/timeAgo';

export default function VideoCard({ video }) {
  const { title, channelTitle, thumbnails, publishedAt } = video.snippet;
  return (
    <li>
      <img src={thumbnails.medium.url} alt={title} />
      <h2>{title}</h2>
      <p>{channelTitle}</p>
      <p>{timeAgo(publishedAt, 'ko')}</p>
    </li>
  );
}
