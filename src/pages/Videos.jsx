import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import youtube from '../api/youtube';

export default function Videos() {
  const { keyword } = useParams();
  const { data: videos } = useQuery({
    queryKey: ['videos', keyword],
    queryFn: () => youtube(keyword),
  });

  return (
    <div>
      비디오목록 {keyword}
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
