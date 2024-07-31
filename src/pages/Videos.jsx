import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import VideoCard from '../components/VideoCard';
import { useYoutubeAPi } from '../context/YoutubeApiContext';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Videos() {
  const { keyword } = useParams();
  const youtube = useYoutubeAPi();
  const { data: videos, isLoading } = useQuery({
    queryKey: ['videos', keyword],
    queryFn: () => youtube.search(keyword),
    // staleTime: 1000 * 60 * 3,
  });

  return (
    <section className='mx-6'>
      {isLoading && <LoadingSpinner />}
      {videos && (
        <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3'>
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </ul>
      )}
    </section>
  );
}
