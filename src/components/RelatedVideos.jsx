import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchChannelVideos } from '../api/youtube';
import VideoCard from './VideoCard';

export default function RelatedVideos({ id }) {
  const { data: videos } = useQuery({
    queryKey: ['related', id],
    queryFn: () => searchChannelVideos(id),
  });
  //   console.log(videos);
  return (
    <>
      {videos && (
        <ul>
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} type='related' />
          ))}
        </ul>
      )}
    </>
  );
}
