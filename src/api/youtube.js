export default class Youtube {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  async search(keyword, pageToken) {
    return keyword
      ? this.#searchByKeyword(keyword, pageToken)
      : this.#popularVideos(pageToken);
  }

  async searchChannelVideos(id) {
    try {
      const { videoIds } = await this.apiClient.videoIdsFromSearch({
        params: {
          channelId: id,
          maxResults: 25,
          order: 'date',
          type: 'video',
        },
      });
      const data = await this.apiClient
        .videos({
          params: {
            part: 'snippet',
            id: videoIds,
          },
        })
        .then((res) => res.data);
      return {
        items: data.items,
      };
    } catch (error) {
      const mockData = '/mockdata/channel.json';
      return await this.apiClient.handleError(error, mockData, 'search');
    }
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

  async #searchByKeyword(keyword, pageToken) {
    try {
      const { videoIds, nextPageToken } =
        await this.apiClient.videoIdsFromSearch({
          params: {
            q: keyword,
            maxResults: 25,
            type: 'video',
            pageToken: pageToken,
          },
        });
      const data = await this.apiClient
        .videos({
          params: {
            part: 'snippet',
            id: videoIds,
          },
        })
        .then((res) => res.data);
      return {
        items: data.items,
        nextPageToken: nextPageToken,
      };
    } catch (error) {
      const mockData = '/mockdata/search.json';
      return await this.apiClient.handleError(error, mockData, 'search');
    }
  }

  async #popularVideos(pageToken) {
    try {
      const data = await this.apiClient
        .videos({
          params: {
            part: 'snippet',
            chart: 'mostPopular',
            regionCode: 'KR',
            maxResults: 25,
            pageToken: pageToken,
          },
        })
        .then((res) => res.data);
      return {
        items: data.items,
        nextPageToken: data.nextPageToken,
      };
    } catch (error) {
      const mockData = '/mockdata/popular.json';
      return await this.apiClient.handleError(error, mockData, '최신 영상');
    }
  }
}
