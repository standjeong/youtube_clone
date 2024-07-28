import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import youtube from '../api/youtube';
import VideoCard from '../components/VideoCard';

export default function Videos() {
  const { keyword } = useParams();
  const { data: videos } = useQuery({
    queryKey: ['videos', keyword],
    queryFn: () => youtube(keyword),
  });

  return (
    <section className='mx-4'>
      {videos && (
        <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3'>
          {videos.map((video) => (
            <VideoCard video={video} />
          ))}
        </ul>
      )}
    </section>
  );
}
