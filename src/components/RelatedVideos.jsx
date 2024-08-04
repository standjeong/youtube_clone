import React from 'react';
import { useQuery } from '@tanstack/react-query';
import VideoCard from './VideoCard';
import { useYoutubeAPi } from '../context/YoutubeApiContext';
import LoadingSpinner from './LoadingSpinner';

export default function RelatedVideos({ id }) {
  const youtube = useYoutubeAPi();
  const { data, isLoading } = useQuery({
    queryKey: ['related', id],
    queryFn: () => youtube.searchChannelVideos(id),
    staleTime: 1000 * 60 * 3,
  });
  return (
    <>
      {isLoading && <LoadingSpinner />}
      {data && (
        <ul>
          {data.items.map((video) => (
            <VideoCard key={video.id} video={video} type='related' />
          ))}
        </ul>
      )}
    </>
  );
}
