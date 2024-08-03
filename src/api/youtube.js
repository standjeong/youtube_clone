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
      const { videoIds } = await this.apiClient.videoIdsFromSearch({
        params: {
          channelId: id,
          maxResults: 20,
          order: 'date',
          type: 'video',
        },
      });
      return await this.videosByVideoIds(videoIds);
    } catch (error) {
      // console.error(error, 'searchChannelVideos에서 발생');
      return this.apiClient.mockData('/mockdata/channel.json', 'search');
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
            maxResults: 20,
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
      console.log(data);

      return {
        items: data.items,
        nextPageToken: nextPageToken,
      };
      // return await this.videosByVideoIds(videoIds, pageToken);
    } catch (error) {
      // console.error(error, 'searchByKeyword에서 발생');
      return this.apiClient.mockData('/mockdata/search.json', 'search');
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
            maxResults: 20,
            pageToken: pageToken,
          },
        })
        .then((res) => res.data);
      return {
        items: data.items,
        nextPageToken: data.nextPageToken,
      };
    } catch (error) {
      // console.error('인기동영상 가져올때 에러', error);
      return this.apiClient.mockData('/mockdata/popular.json');
    }
  }
}
