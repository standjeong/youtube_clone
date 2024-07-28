import React from 'react';
import { useNavigate } from 'react-router-dom';
import timeAgo from '../utils/timeAgo';

export default function VideoCard({ video, type }) {
  const navigate = useNavigate();
  const { title, channelTitle, thumbnails, publishedAt } = video.snippet;
  const isRelated = type;
  return (
    <li
      className={isRelated ? 'flex cursor-pointer mb-2' : 'mb-4 cursor-pointer'}
      onClick={() => navigate(`/videos/watch/${video.id}`, { state: video })}
    >
      <img
        className={isRelated ? 'w-44 rounded-lg mr-2' : 'w-full rounded-lg'}
        src={thumbnails.medium.url}
        alt={title}
      />
      <div>
        <h2
          className={
            isRelated
              ? 'line-clamp-2 leading-5 text-sm font-medium mb-1'
              : 'font-semibold line-clamp-2 my-1'
          }
        >
          {title}
        </h2>
        <p className='text-xs opacity-80'>{channelTitle}</p>
        <p className='text-xs opacity-80'>{timeAgo(publishedAt, 'ko')}</p>
      </div>
    </li>
  );
}
