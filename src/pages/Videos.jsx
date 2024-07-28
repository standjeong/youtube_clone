import { useQuery } from '@tanstack/react-query';
import youtube from '../api/youtube';

export default function Videos() {
  const { data: videos } = useQuery({
    queryKey: ['videos'],
    queryFn: youtube,
  });

  // console.log(videos);
  return (
    <div>
      비디오목록
      {videos && (
        <ul>
          {videos.map((video) => (
            <li>{video.snippet.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
