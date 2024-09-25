export function externalLinks() {
  const c = document.getElementsByTagName('a')
  let a = 0
  for (;
    a < c.length;
    a++
  ) {
    const b = c[a]
    b.getAttribute('href') &&
    b.hostname !== location.hostname &&
    (b.target = '_blank')
  }
}