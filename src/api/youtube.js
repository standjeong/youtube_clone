export function youtube(keyword) {
  if (keyword) {
    return fetch('/mockdata/search.json')
      .then((res) => res.json())
      .then((data) =>
        data.items.map((item) => ({ ...item, id: item.id.videoId }))
      );
  }
  return fetch('/mockdata/popular.json')
    .then((res) => res.json())
    .then((data) => data.items);
}

export function searchChannelVideos(id) {
  return fetch('/mockdata/channel.json')
    .then((res) => res.json())
    .then((data) =>
      data.items.map((item) => ({ ...item, id: item.id.videoId }))
    );
}
