/* eslint-disable linebreak-style */
import createQuery from './queryService';

const getResponse = async (query) => {
  const response = await fetch(query);

  return response.json();
};

const extractIds = (response) => response.items.map((item) => item.id.videoId);

const parse = ({
  id,
  snippet: {
    publishedAt: date,
    description,
    title,
    thumbnails: {
      medium: { url: thumbnail },
    },
    channelTitle: channel,
  },
  statistics: { viewCount: views },
}) => ({
  id,
  thumbnail,
  title,
  channel,
  date,
  views,
  description,
});

const getData = async (response) => {
  const ids = extractIds(response);
  const query = createQuery({
    queryType: 'videos',
    options: {
      part: 'snippet%2CcontentDetails%2Cstatistics',
      id: `${ids.join('%2C')}`,
    },
  });
  const { items: data } = await getResponse(query);

  return data.map((item) => parse(item));
};

const process = async (keyword, pageToken = '') => {
  const query = createQuery({
    queryType: 'search',
    options: {
      part: 'snippet',
      maxResults: '15',
      pageToken: `${pageToken}`,
      q: `${keyword}`,
      type: 'video',
    },
  });
  const response = await getResponse(query);

  return {
    data: await getData(response),
    nextChunkToken: response.nextPageToken,
  };
};

export default process;
