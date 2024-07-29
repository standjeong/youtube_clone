import React from 'react';
import { useQuery } from '@tanstack/react-query';
import VideoCard from './VideoCard';
import { useYoutubeAPi } from '../context/YoutubeApiContext';

export default function RelatedVideos({ id }) {
  const youtube = useYoutubeAPi();
  const { data: videos } = useQuery({
    queryKey: ['related', id],
    queryFn: () => youtube.searchChannelVideos(id),
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
