
import axios from 'axios';

const GITHUB_API_DOMAIN = 'https://api.github.com';

async function fetchGithubApi(url) {
  try {
    const { data } = await axios({
      method: 'GET',
      url: `${GITHUB_API_DOMAIN}${url}`,
    });

    return data;
  } catch (e) {
    throw new Error('API Failed');
  }
}

export default fetchGithubApi;
