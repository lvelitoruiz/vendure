import { useEffect, useState } from "react";

const useStateWithStorage = (key: string, defaultValue: any) => {

  const [oldKey, setOldKey] = useState(key);
  const [value, setValue] = useState<any>(() => {
    const item = localStorage.getItem(key);
    if (item !== null) {
      try {
        return JSON.parse(item);
      } catch {
        return defaultValue;
      }
    }
    return defaultValue;
  });

  useEffect(() => {
    const rawValue = JSON.stringify(value);
    localStorage.setItem(key, rawValue);
    localStorage.removeItem(oldKey);
    setOldKey(key);
  }, [key, value]);

  return [value, setValue] as const;
};

export default useStateWithStorage;