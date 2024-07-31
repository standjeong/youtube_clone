import { createContext, useContext } from 'react';
import Youtube from '../api/youtube';
import YoutubeClient from '../api/youtubeClient';
// import FakeClient from '../api/fakeClient';

const YoutubeApiContext = createContext();

// const youtube = new FakeClient();
const client = new YoutubeClient();
const youtube = new Youtube(client);

export function YoutubeApiProvider({ children }) {
  return (
    <YoutubeApiContext.Provider value={youtube}>
      {children}
    </YoutubeApiContext.Provider>
  );
}

export function useYoutubeAPi() {
  return useContext(YoutubeApiContext);
}
