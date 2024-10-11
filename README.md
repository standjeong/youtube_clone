## ▶️Youtube Clone Coding
- 페이지 구조(컴포넌트, 경로)
    - 메인 : `<Videos>`, ‘/videos’
    - 검색 결과 : `<Videos>` , ‘/videos/{keyword}’
    - 클릭한 영상을 재생할 수 있는 상세 페이지 : `<VideoDetail>`, '/vidoes/watch/{videoId}’
- 기능
    - 최신 인기 업로드 영상 목록 제공(한국 콘텐츠)
    - 무한 스크롤 기능
    - 영상 검색 기능
    - 영상 재생
    - 영상 클릭 시 사이드에 해당 채널의 영상 목록 최신 순대로 확인

## 🔨사용 도구
- React
- React Query(TanStack Query)
- React Router
- Axios
- Tailwind CSS
- timeago

## 💧에러 & 어려웠던 점
**- ✅키워드 검색으로 받아온 영상 또는 특정 채널 관련 영상을 클릭 시 해당 영상의 description의 내용이 두 줄로 잘리는 문제**
- 원인 : Youtube API 요청 시 엔드포인트에 따라서 description이 다르게 제공되기 때문. ⇒ 사용자가 검색한 키워드에 해당하는 동영상 또는 채널 관련 동영상을 보여주려면 `search` 리소스를 사용해야 하는데,  `search` 리소스를 통해 가져온 데이터는 각 동영상의 description이 짧은 요약본으로 제공되어서 상세페이지에서 클릭한 영상에 대한 설명을 UI로 표시할 때 내용이 잘려버리는 것.
- 해결 : `videos` 리소스를 통해 받아온 데이터의 경우에는 description의 전체 내용이 제공됨. 따라서 검색 결과에 해당하는 동영상을 받아올 때는 `search` 리소스로 해당 키워드와 관련된 **videoId**만 받아와서 이 videoId를 파라미터로 사용하여 다시 `videos` 리소스를 통해 데이터를 받아오기.
 
      
**- ✅무한 스크롤 구현 중 에러**
    
>무한 스크롤 구현을 위한 기본 조건
> ```
> - 리액트 쿼리 훅인 useInfiniteQuery로 무한 스크롤 데이터를 처리하기.
> - 무한 스크롤 동작을 위하여 마지막 DOM요소를 관찰하기 위해 useRef를 사용하여 참조값 설정.
> - 지정한 DOM 요소를 관찰하면서 해당 DOM요소가 화면에 보일 때 새로운 페이지를 불러오는 역할을 해줄 IntersetctionObserver 사용.
>     ※ `IntersectionObserver`는 DOM 요소를 관찰하는 역할을 하므로, 해당 요소가 렌더링된 이후에 옵저버를 설정해야 함. 렌더링 전에 옵저버 객체를 생성하면 DOM요소와 연결되지 못하므로 동작하지 않음.
> ```
    
→ 에러의 시작 : 옵저버 객체를 useRef에 넣어서 생성하면 컴포넌트가 렌더링될 때마다 불필요하게 매번 새로운 옵저버 객체가 생성되지 않게 할 수 있고, 옵저버 객체 안의 옵션만 ref.current로 읽어올 수 있다고 생각했음. 하지만 `useRef`는 컴포넌트가 처음 렌더링이 된 후 한 번만 실행되기 때문에 최초에 생성된 기존 인스턴스만 참조함.

  ```javaScript
    const observerElem = useRef(null); //렌더링이 끝난 후 리액트가 해당 DOM요소를 ref.current에 자동으로 할당해줌. 따라서 JSX 반환문의 마지막 div요소를 가리킴.
    const observer = useRef(
        new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting && hasNextPage) {
              fetchNextPage();
            }
          },
          { threshold: 0.5 }
        )
      );
      //렌더링이 끝나더라도 처음 초기화될 때 사용된 값을 계속해서 사용하므로 옵저버 객체의 내부의 값이 업데이트되지 않음.
      
      useEffect(() => {
        const currentElem = observerElem.current;
    
        const currentObserver = observer.current;
    
        if (currentElem) {
          currentObserver.observe(currentElem);
        }
    
        return () => {
          if (currentElem) {
            currentObserver.unobserve(currentElem);
          }
        };
      }, [observerElem, hasNextPage]);
  ```
- 원인 : useRef를 사용하는 방식에 대한 오해.
  > useRef는 DOM요소에 직접 접근하기 위해 사용하거나 또는 렌더링에 영향을 주지 않고 값을 저장할 때 사용함.
  > 
  > 
  > 따라서 useRef로 관리되는 DOM요소는 리액트의 렌더링 사이클과 직접 연동이 되어 렌더링이 끝나면 해당 DOM요소가 ref.current에 자동으로 할당되어 업데이트됨. 
  > 
  > ↔ 하지만 IntersectionObserver는 브라우저 API임. 즉, 리액트의 상태나 props와 직접 연동되어 있는 것이 아님! 따라서 한 번 생성이 된 후에는 업데이트되지 않고 초기 상태만 계속 반영함. 그러므로 위의 옵저버 객체 안에 있는 hasNextPage의 경우 값이 변하더라도 useRef에 의해 이 컴포넌트가 처음 렌더링되었을 때의 값으로만 기억됨. 따라서 위 코드에서 옵저버 객체의 콜백함수에 있는 조건문은 의도한 대로 작동할 수 없음.
- 해결 : IntersectionObserver와 같은 비동기 로직을 리액트의 상태 변화에 맞게 업데이트하려면 useEffect를 사용하여 상태 변화 시 옵저버를 재설정하는 방식으로 구현해야 함. 이렇게 하면 `hasNextPage`와 같은 값들이 업데이트될 때 새로운 값을 반영한 로직으로 동작함.

**- ✅Youtube API 사용량 초과로 인한 403 에러 발생 시, mock 데이터를 반환하는 동시에, 컴포넌트에 현재 가져오는 데이터는 mock data임을 알려주는 UI를 넣으려 했으나 에러 발생시 컴포넌트와 쿼리함수 양쪽으로 에러를 받아서 반환하는 게 불가능.**
- 원인 : 403에러 처리할 때 Youtube클래스의 쿼리 함수에서 해당 에러가 발생하면 mock data를 반환하는 방식으로 이미 에러 처리가 되어서, 컴포넌트 안에서는 에러가 발생해도 해당 에러를 읽어와서 그 에러에 따라 UI 요소를 반환하는 건 불가능했음. 하나만 선택해야 하는 상황.
- 해결 : 쿼리 함수에서 에러 확인 후 mock data를 반환해줄 때 해당 데이터에 에러 코드도 넣어서 함께 반환하여 컴포넌트에서 에러 상태 코드를 읽고 그에 맞게 원하는 태그를 넣을 수 있도록 함.

