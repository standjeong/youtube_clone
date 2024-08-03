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
        // console.log('getNextPageParam함수 안');
        // console.log('lastPage', lastPage, allPages);
        // console.log('allPages', allPages);
        const nextPage = allPages.length + 1;
        // console.log('nextPage', nextPage);
        // console.log('토큰있나?', lastPage.nextPageToken);
        return nextPage <= 3 ? lastPage.nextPageToken : false;
      },
      staleTime: 1000 * 60 * 3,
    });

  const observerElem = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // console.log('(useEffect실행중)hasNextPage는?', hasNextPage);
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage(); //쿼리함수를 실행시킴
          // console.log('✨다음 페이지 페칭 완료✨');
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

  // const observer = useRef(
  //   new IntersectionObserver(
  //     (entries) => {
  //       console.log('옵저버 entries : ', entries);
  //       console.log('entries[0].isIntersecting', entries[0].isIntersecting);
  //       console.log('hasNextPage 확인', hasNextPage);

  //       if (entries[0].isIntersecting) {
  //         console.log('✨첫번째 다음 페이지 페칭 조건 만족');
  //         fetchNextPage();
  //         console.log('✨다음 페이지 페칭 완료✨');
  //         console.log('fetchNextPage호출 후 hasNextPage는?', hasNextPage);
  //       }
  //     },
  //     { threshold: 0.5 }
  //   )
  // );

  // useEffect(() => {
  //   console.log('useEffect실행중 ');
  //   // console.log('useEffect의 observerElem 확인:', observerElem);
  //   const currentElem = observerElem.current;
  //   // console.log('useEffect의 current observerElem 확인:', currentElem);

  //   const currentObserver = observer.current;
  //   console.log('useEffect의 currentObserver', currentObserver);

  //   if (currentElem) {
  //     currentObserver.observe(currentElem);
  //   }

  //   return () => {
  //     if (currentElem) {
  //       currentObserver.unobserve(currentElem);
  //     }
  //   };
  // }, [observerElem]);

  return (
    <section className='mx-6'>
      {isLoading && <LoadingSpinner />}
      <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3'>
        {console.log('컴포넌트에서 확인하는 쿼리 data', data)}
        {data?.pages.map((page) => {
          return page.items.map((video) => (
            <VideoCard key={video.id} video={video} />
          ));
        })}
      </ul>
      {/* {videos && (
        <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3'>
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </ul>
      )} */}
      <div className='w-1 h-1 bg-orange-500' ref={observerElem}>
        {isFetchingNextPage && <LoadingSpinner />}
      </div>
    </section>
  );
}
