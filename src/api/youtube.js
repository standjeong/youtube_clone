export default class Youtube {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  async search(keyword) {
    return keyword ? this.#searchByKeyword(keyword) : this.#popularVideos();
  }

  async searchChannelVideos(id) {
    return this.apiClient
      .search({
        params: {
          part: 'snippet',
          channelId: id,
          maxResults: 25,
          order: 'date',
          type: 'video',
        },
      })
      .then((res) =>
        res.data.items.map((item) => ({ ...item, id: item.id.videoId }))
      );
  }

  async bannerUrl(id) {
    return this.apiClient
      .channel({
        params: {
          part: 'snippet',
          id: id,
        },
      })
      .then((res) => res.data.items[0].snippet.thumbnails.default.url);
  }

  async #searchByKeyword(keyword) {
    return this.apiClient
      .search({
        params: {
          part: 'snippet',
          q: keyword,
          maxResults: 25,
          type: 'video',
        },
      })
      .then((res) =>
        res.data.items.map((item) => ({ ...item, id: item.id.videoId }))
      );
  }

  async #popularVideos() {
    return this.apiClient
      .videos({
        params: {
          part: 'snippet',
          chart: 'mostPopular',
          regionCode: 'KR',
          maxResults: 25,
        },
      })
      .then((res) => res.data.items);
  }
}
