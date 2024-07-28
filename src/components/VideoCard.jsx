import React from 'react';

export default function VideoCard({ video }) {
  const { title, channelTitle, thumbnails, publishedAt } = video.snippet;
  return (
    <li>
      <img src={thumbnails.medium.url} alt={title} />
      <h2>{title}</h2>
      <p>{channelTitle}</p>
      <p>{publishedAt}</p>
    </li>
  );
}
