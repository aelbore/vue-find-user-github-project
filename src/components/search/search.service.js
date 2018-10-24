const getProfiles = (username) => {
  return fetch(`https://api.github.com/users/${username}/repos`)
    .then(res => {
      if (!res.ok) {
        return Promise.reject({
          status: res.status,
          message: res.statusText
        })
      }
      return res.json();
    });
}

export { getProfiles }  