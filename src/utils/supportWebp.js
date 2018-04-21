let support

export default function supportsWebp(cb) {
  if (support !== undefined) { cb(support) }

  const webp = new Image()

  webp.src = 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA='
  // eslint-disable-next-line
  webp.onload = webp.onerror = () => {
    support = webp.height === 1
    cb(support)
  }
}

