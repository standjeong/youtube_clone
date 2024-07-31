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
}
