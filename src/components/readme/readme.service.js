const getReadme = (username, repo) => {
  const README_URL = `https://raw.githubusercontent.com/${username}/${repo}/master/README.md`
  return fetch(README_URL).then(res => res.text());
}

export { getReadme }