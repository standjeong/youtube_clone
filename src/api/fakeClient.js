import axios from 'axios';

export default class FakeClient {
  constructor() {
    this.httpClient = axios.create({
      baseURL: 'https://youtube.googleapis.com/youtube/v3/',
      params: { key: process.env.REACT_APP_YOUTUBE_API_KEY },
    });
  }
  async search(keyword, pageToken) {
    console.log('search함수에서 pageToken', pageToken);
    return keyword
      ? this.#searchByKeyword(keyword, pageToken)
      : this.#popularVideos(pageToken);
  }

  // async #searchByKeyword() {
  //   return axios
  //     .get('/mockdata/search.json')
  //     .then((res) =>
  //       res.data.items.map((item) => ({ ...item, id: item.id.videoId }))
  //     );
  // }

  async #searchByKeyword(keyword, pageToken) {
    const data = await this.httpClient
      .get('search', {
        params: {
          part: 'snippet',
          q: keyword,
          maxResults: 6,
          type: 'video',
          pageToken: pageToken,
        },
      })
      .then((res) => res.data);
    return {
      items: data.items.map((item) => ({ ...item, id: item.id.videoId })),
      nextPageToken: data.nextPageToken,
    };
  }

  async #popularVideos(pageToken) {
    console.log(
      '클라이언트 popularVideos함수 안. pageToken 매개변수받았니?',
      pageToken
    );
    const data = await this.httpClient
      .get('videos', {
        params: {
          part: 'snippet',
          chart: 'mostPopular',
          regionCode: 'KR',
          maxResults: 6,
          pageToken: pageToken,
        },
      })
      .then((res) => res.data);
    console.log('클라이언트 popularVideos의 리턴문 직전(API응답데이터)', data);
    return {
      items: data.items,
      nextPageToken: data.nextPageToken,
    };
  }

  // async #popularVideos() {
  //   // return axios.get('/mockdata/popular.json').then((res) => res.data.items);
  //   //로딩스핀테스트
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       axios
  //         .get('/mockdata/popular.json')
  //         .then((res) => resolve(res.data.items))
  //         .catch((error) => reject(error));
  //     }, 5000);
  //   });
  // }

  async searchChannelVideos() {
    return axios
      .get('/mockdata/channel.json')
      .then((res) =>
        res.data.items.map((item) => ({ ...item, id: item.id.videoId }))
      );
  }

  async bannerUrl() {
    return;
  }
}
