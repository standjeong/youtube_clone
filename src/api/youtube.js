export default class Youtube {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  async search(keyword) {
    return keyword ? this.#searchByKeyword(keyword) : this.#popularVideos();
  }

  async videosByVideoIds(videoIds) {
    return this.apiClient
      .videos({
        params: {
          part: 'snippet',
          id: videoIds,
        },
      })
      .then((res) => res.data.items);
  }

  async searchChannelVideos(id) {
    try {
      const videoIds = await this.apiClient.videoIdsFromSearch({
        params: {
          part: 'snippet',
          channelId: id,
          maxResults: 25,
          order: 'date',
          type: 'video',
        },
      });
      return await this.videosByVideoIds(videoIds);
    } catch (error) {
      console.error(error, 'searchChannelVideos에서 발생');
      return this.apiClient.mockData('/mockdata/channel.json', 'search');
    }
  }

  // async searchChannelVideos(id) {
  //   const url = 'search';
  //   const params = {
  //     params: {
  //       part: 'snippet',
  //       channelId: id,
  //       maxResults: 25,
  //       order: 'date',
  //       type: 'video',
  //     },
  //   };
  //   const mockUrl = '/mockdata/channel.json';
  //   return this.apiClient.getVideosFromSearch(url, params, mockUrl);
  // }

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
    try {
      const videoIds = await this.apiClient.videoIdsFromSearch({
        params: {
          part: 'snippet',
          q: keyword,
          maxResults: 25,
          type: 'video',
        },
      });
      return await this.videosByVideoIds(videoIds);
    } catch (error) {
      console.error(error, 'searchByKeyword에서 발생');
      return this.apiClient.mockData('/mockdata/search.json', 'search');
    }
  }

  // async #searchByKeyword(keyword) {
  //   const url = 'search';
  //   const params = {
  //     params: {
  //       part: 'snippet',
  //       q: keyword,
  //       maxResults: 25,
  //       type: 'video',
  //     },
  //   };
  //   const mockUrl = '/mockdata/search.json';
  //   return this.apiClient.getVideosFromSearch(url, params, mockUrl);
  // }

  async #popularVideos() {
    try {
      return await this.apiClient
        .videos({
          params: {
            part: 'snippet',
            chart: 'mostPopular',
            regionCode: 'KR',
            maxResults: 25,
          },
        })
        .then((res) => res.data.items);
    } catch (error) {
      console.error('인기동영상 가져올때 에러', error);
      return this.apiClient.mockData('/mockdata/popular.json');
    }
  }

  // async #popularVideos() {
  //   return this.apiClient
  //     .videos({
  //       params: {
  //         part: 'snippet',
  //         chart: 'mostPopular',
  //         regionCode: 'KR',
  //         maxResults: 25,
  //       },
  //     })
  //     .then((res) => res.data.items);
  // }
}
