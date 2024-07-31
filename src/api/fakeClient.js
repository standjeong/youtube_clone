import axios from 'axios';

export default class FakeClient {
  async search(keyword) {
    return keyword ? this.#searchByKeyword() : this.#popularVideos();
  }

  async #searchByKeyword() {
    return axios
      .get('/mockdata/search.json')
      .then((res) =>
        res.data.items.map((item) => ({ ...item, id: item.id.videoId }))
      );
  }

  async #popularVideos() {
    return axios.get('/mockdata/popular.json').then((res) => res.data.items);
  }

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
