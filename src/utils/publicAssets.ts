export function publicAsset(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`
}

export function publicAssetSrcSet(srcSet: string): string {
  return srcSet
    .split(',')
    .map((candidate) => {
      const [path, descriptor] = candidate.trim().split(/\s+/, 2)
      return `${publicAsset(path)}${descriptor ? ` ${descriptor}` : ''}`
    })
    .join(', ')
}
