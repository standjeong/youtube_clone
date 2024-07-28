export default function youtube() {
  return fetch('/mockdata/popular.json')
    .then((res) => res.json())
    .then((data) => data.items);
}
