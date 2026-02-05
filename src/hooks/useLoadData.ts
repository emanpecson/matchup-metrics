'use client';

import { Dispatch, SetStateAction, useEffect } from 'react';

export type useLoadDataProps<T = unknown> = {
  onDataLoaded: (data: T) => void;
  endpoint: string;
  setIsLoading?: Dispatch<SetStateAction<boolean>>;
  delay?: number;
  halt?: boolean;
};

export async function useLoadData<T = unknown>(props: useLoadDataProps<T>) {
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (props.setIsLoading) props.setIsLoading(true);
        const res = await fetch(props.endpoint, { method: 'GET' });
        const data = await res.json();
        props.onDataLoaded(data);
      } catch (err) {
        console.error('Error:', err);
      } finally {
        setTimeout(() => {
          if (props.setIsLoading) props.setIsLoading(false);
        }, props.delay ?? 0);
      }
    };

    if (props.halt === undefined) fetchData();
    else if (!props.halt) fetchData();
  }, [props.endpoint, props.halt]);
}
