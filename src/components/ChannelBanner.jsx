import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useYoutubeAPi } from '../context/YoutubeApiContext';

export default function ChannelBanner({ id, title }) {
  const youtube = useYoutubeAPi();
  const {
    data: url,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['bannerUrl', id],
    queryFn: () => youtube.bannerUrl(id),
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading || error) {
    const firstChar = title[0];
    return (
      <p className='bg-blue-900 rounded-full p-1 w-10 h-10 font-bold text-xl text-white text-center'>
        {firstChar}
      </p>
    );
  }
  return <img className='rounded-full w-10' src={url} alt={title} />;
}
