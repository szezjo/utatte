import { useEffect, useMemo } from 'react';

export default function useObjectUrl(blob: Blob | undefined) {
  if (!blob) return;
  const url = useMemo(() => URL.createObjectURL(blob), [blob]);
  useEffect(() => () => URL.revokeObjectURL(url), [blob]);
  return url;
}
