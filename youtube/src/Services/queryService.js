/* eslint-disable linebreak-style */
const stringify = (options) => Object.entries(options)
  .map(([name, value]) => `${name}=${value}&`)
  .join('');
global.console.log('stringify', stringify);
const createQuery = ({ queryType, options }) => {
  const baseLink = 'https://www.googleapis.com/youtube/v3';
  const stringifiedOptions = stringify(options);
  const apiKey = 'AIzaSyCMD2sTOsZfIUASyRcnF9A_3MyWNQW05w8';
  global.console.log('stringifiedOptions', stringifiedOptions);
  global.console.log('queryType', queryType);
  return `${baseLink}/${queryType}?${stringifiedOptions}key=${apiKey}`;
};
global.console.log('createQuery', createQuery);
export default createQuery;
