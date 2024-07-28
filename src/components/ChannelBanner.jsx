import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { bannerUrl } from '../api/youtube';

export default function ChannelBanner({ id, title }) {
  const { data: url } = useQuery({
    queryKey: ['bannerUrl', id],
    queryFn: () => bannerUrl(id),
  });
  return <img className='rounded-full w-10' src={url} alt={title} />;
}
