import React from 'react';
import { useLocation } from 'react-router-dom';
import ChannelBanner from '../components/ChannelBanner';

export default function VideoDetail() {
  const { state: video } = useLocation();
  const { title, channelTitle, channelId, description } = video.snippet;

  return (
    <section className='mx-4 lg:flex'>
      <article>
        <iframe
          className='w-full aspect-video rounded-lg'
          src={`https://www.youtube.com/embed/${video.id}`}
          title={title}
        ></iframe>
        <h1 className='text-xl font-bold my-2'>{title}</h1>
        <div className='flex'>
          {channelId}
          <ChannelBanner id={channelId} />
          <p>{channelTitle}</p>
        </div>
        <pre className='whitespace-pre-wrap bg-neutral-100 rounded-lg p-4'>
          {description}
        </pre>
      </article>

      <aside>관련영상</aside>
    </section>
  );
}
