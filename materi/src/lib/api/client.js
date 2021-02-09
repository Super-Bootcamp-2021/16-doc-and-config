/** @module httpClient */

/**
 * ### basic client untuk request ke `server`
 * @param {string} endpoint target / url endpoint
 * @param {RequestInit} options tambahan opsi [request](http://localhost)
 * @returns {Promise<any>} hasil request
 */
async function client(endpoint, { method, body, ...customConf } = {}) {
  const headers = { 'Content-Type': 'application/json' };

  const config = {
    method,
    ...customConf,
    headers: {
      ...headers,
      ...customConf.headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  let data;
  try {
    const response = await window.fetch(endpoint, config);
    data = await response.json();
    if (!response.ok) {
      throw new Error(data.statusText);
    }

    return data;
  } catch (err) {
    return Promise.reject(err.message || data);
  }
}

/**
 * request dengan method GET
 * @param {string} endpoint target / url endpoint
 * @param {RequestInit} options tambahan opsi request
 */
client.get = (endpoint, customConf = {}) => {
  return client(endpoint, { method: 'GET', ...customConf });
};

/**
 * request dengan method POST
 * @param {string} endpoint target / url endpoint
 * @param {Object} body konten dari request
 * @param {RequestInit} options tambahan opsi request
 */
client.post = (endpoint, body, customConf = {}) => {
  return client(endpoint, { method: 'POST', body, ...customConf });
};

/**
 * request dengan method PUT
 * @param {string} endpoint target / url endpoint
 * @param {Object} body konten dari request
 * @param {RequestInit} options tambahan opsi request
 */
client.put = (endpoint, body, customConf = {}) => {
  return client(endpoint, { method: 'PUT', body, ...customConf });
};

module.exports = { client };
