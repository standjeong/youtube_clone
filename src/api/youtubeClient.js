import axios from 'axios';

export default class YoutubeClient {
  constructor() {
    this.httpClient = axios.create({
      baseURL: 'https://youtube.googleapis.com/youtube/v3/',
      params: { key: process.env.REACT_APP_YOUTUBE_API_KEY },
    });
  }

  async search(params) {
    return this.httpClient.get('search', params);
  }

  async videos(params) {
    return this.httpClient.get('videos', params);
  }

  async channel(params) {
    return this.httpClient.get('channels', params);
  }

  async videoIdsFromSearch(params) {
    const responseData = await this.httpClient
      .get('search', params)
      .then((res) => res.data);
    const videoIds = responseData.items
      .map((item) => item.id.videoId)
      .join(',');
    return videoIds;
  }

  async mockData(url, type) {
    if (type === 'search') {
      return fetch(url)
        .then((res) => res.json())
        .then((data) =>
          data.items.map((item) => ({ ...item, id: item.id.videoId }))
        );
    }
    return fetch(url)
      .then((res) => res.json())
      .then((data) => data.items);
  }

  ///////////////////////////////////////////
  //   async getVideosFromSearch(url, params, mockUrl) {
  //     try {
  //       //   throw new Error('테스트');
  //       const responseData = await this.httpClient
  //         .get(url, params)
  //         .then((res) => res.data);
  //       const videoIds = responseData.items
  //         .map((item) => item.id.videoId)
  //         .join(',');

  //       const videosItems = await this.videos({
  //         params: {
  //           part: 'snippet',
  //           id: videoIds,
  //         },
  //       }).then((res) => res.data.items);
  //       return videosItems;
  //     } catch (error) {
  //       console.error('getVideosFromSearch에서 에러발생', error);
  //       return fetch(mockUrl)
  //         .then((res) => res.json())
  //         .then((data) =>
  //           data.items.map((item) => ({ ...item, id: item.id.videoId }))
  //         );
  //     }
  //   }
}
