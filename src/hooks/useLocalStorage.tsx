import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  const [value, setValue] = useState<T>(() => {
    let jsonValue = window.localStorage.getItem(key);
    if (jsonValue != null) {
      try {
        return JSON.parse(jsonValue);
      } catch (error) {
        console.error(error);
        return initialValue;
      }
    }

    if (typeof initialValue === "function") {
      return (initialValue as () => T)();
    } else {
      return initialValue;
    }
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as [T, typeof setValue];
}
