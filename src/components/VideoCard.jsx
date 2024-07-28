import React from 'react';
import timeAgo from '../utils/timeAgo';

export default function VideoCard({ video }) {
  const { title, channelTitle, thumbnails, publishedAt } = video.snippet;
  return (
    <li className='mb-4 cursor-pointer'>
      <img
        className='w-full rounded-lg'
        src={thumbnails.medium.url}
        alt={title}
      />
      <h2 className='font-semibold line-clamp-2 my-1'>{title}</h2>
      <p className='text-sm'>{channelTitle}</p>
      <p className='text-sm'>{timeAgo(publishedAt, 'ko')}</p>
    </li>
  );
}
