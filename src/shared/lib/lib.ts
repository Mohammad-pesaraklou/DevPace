const cn = () => {
  // retur
};

export function debounce<T extends any[]>(
  fn: (...arg: T) => void,
  wait: number,
) {
  let tmo: ReturnType<typeof setTimeout> | undefined;

  return (...arg: T) => {
    if (tmo) clearTimeout(tmo);

    tmo = setTimeout(() => fn(...arg), wait);
  };
}
