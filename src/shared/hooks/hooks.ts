import { useCallback, useRef } from "react";

export function useDebounce<T extends (...arg: any[]) => void>(
  fn: T,
  time: number,
) {
  const timeotId = useRef<number | null>(null);

  const deboncedFn = (...arg: Parameters<T>) => {
    if (timeotId.current) {
      clearTimeout(timeotId.current);
    }

    setTimeout(() => {
      fn(...arg);
    }, time);
  };

  return deboncedFn;
}

//  useDebounce => expect to parameter = [fn, time] => return a fn
