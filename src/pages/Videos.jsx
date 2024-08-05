import { useInfiniteQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import VideoCard from '../components/VideoCard';
import { useYoutubeAPi } from '../context/YoutubeApiContext';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Videos() {
  const { keyword } = useParams();
  const youtube = useYoutubeAPi();

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['videos', keyword],
      queryFn: ({ pageParam = '' }) => youtube.search(keyword, pageParam),
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        return nextPage <= 4 ? lastPage.nextPageToken : false;
      },
      staleTime: 1000 * 60 * 3,
    });

  const observerElem = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage(); //쿼리함수를 실행시킴
        }
      },
      { threshold: 0.5 }
    );

    const currentElem = observerElem.current;
    if (currentElem) {
      observer.observe(currentElem);
    }
    return () => {
      if (currentElem) {
        observer.unobserve(currentElem);
      }
    };
  }, [fetchNextPage, hasNextPage]);

  const has403Error = data?.pages.some((page) => page.error?.status === 403);

  return (
    <section className='mx-6'>
      {isLoading && <LoadingSpinner />}
      {has403Error && (
        <p className='text-center bg-gray-400 py-1 mb-3 text-white font-semibold mask-image-gradient mask-size-large animate-shine'>
          Youtube API사용량 초과로 Mock Data를 가져옵니다.
        </p>
      )}
      <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3'>
        {data?.pages.map((page) => {
          return page.items.map((video) => (
            <VideoCard key={video.id} video={video} />
          ));
        })}
      </ul>
      <div className='w-1 h-1' ref={observerElem}>
        {isFetchingNextPage && <LoadingSpinner />}
      </div>
    </section>
  );
}
