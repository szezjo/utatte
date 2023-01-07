import { useEffect, useState } from 'react';

export default function useBlob(url: string) {
  const [blob, setBlob] = useState<Blob>();
  const [error, setError] = useState<Error>();

  useEffect(() => {
    async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Response not OK (${response.status})`);
        setBlob(await response.blob());
      } catch (ex) {
        setError(ex instanceof Error ? ex : new Error(String(ex)));
      }
    };
  }, []);

  return { blob, error };
}
