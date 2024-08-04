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
    return await this.httpClient.get('videos', params);
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
    return { videoIds: videoIds, nextPageToken: responseData.nextPageToken };
  }

  async handleError(error, url, type) {
    const statusCode = error.response.status;

    if (statusCode === 400) {
      console.log('API 요청 횟수를 제한합니다');
      return { items: [] };
    } else if (statusCode === 403) {
      console.log('API 사용량 초과로 mock data를 가져옵니다');
      const data = await axios.get(url).then((res) => res.data);
      if (type === 'search') {
        return {
          items: data.items.map((item) => ({ ...item, id: item.id.videoId })),
        };
      }
      return {
        items: data.items,
      };
    }
  }
}
