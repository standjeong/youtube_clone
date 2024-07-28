import React from 'react';
import { useLocation } from 'react-router-dom';
import ChannelBanner from '../components/ChannelBanner';
import RelatedVideos from '../components/RelatedVideos';
import decode from '../utils/decode';

export default function VideoDetail() {
  const { state: video } = useLocation();
  const { title, channelTitle, channelId, description } = video.snippet;

  return (
    <section className='mx-4 lg:flex gap-4'>
      <article className='lg:w-2/3 mb-6'>
        <iframe
          className='w-full aspect-video rounded-lg'
          src={`https://www.youtube.com/embed/${video.id}`}
          title={title}
        ></iframe>
        <h1 className='text-xl font-bold my-2'>{decode(title)}</h1>
        <div className='flex items-center gap-1 my-3'>
          <ChannelBanner id={channelId} title={channelTitle} />
          <p className='font-medium'>{channelTitle}</p>
        </div>
        <pre className='whitespace-pre-wrap bg-neutral-100 rounded-lg p-4'>
          {description}
        </pre>
      </article>

      <aside className='lg:w-1/3'>
        <RelatedVideos id={channelId} />
      </aside>
    </section>
  );
}
