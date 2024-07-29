import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useYoutubeAPi } from '../context/YoutubeApiContext';

export default function ChannelBanner({ id, title }) {
  const youtube = useYoutubeAPi();
  const { data: url } = useQuery({
    queryKey: ['bannerUrl', id],
    queryFn: () => youtube.bannerUrl(id),
  });
  return <img className='rounded-full w-10' src={url} alt={title} />;
}
