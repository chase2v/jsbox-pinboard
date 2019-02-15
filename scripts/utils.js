function isSafari() {
  return $app.env === $env.safari
}

function isAction() {
  return $app.env === $env.action
}

function isShare() {
  return isSafari() || isAction()
}

function isUrlValid(url) {
  return /^(http|https):\/\//.test(url)
}

function getSharedInfo() {
  const url = isSafari()
    ? $safari.items.location.href
    : isAction()
      ? $context.link
      : ''
  const title = isSafari() ? $safari.items.title : ''

  return { url, title }
}

module.exports = {
  isSafari,
  isAction,
  isShare,
  isUrlValid,
  getSharedInfo,
}
