import he from 'he';

export default function decode(encodedText) {
  return he.decode(encodedText);
}
