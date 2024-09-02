'use client';

import { Dispatch, SetStateAction, useEffect } from 'react';

export type useLoadDataParams = {
  onDataLoaded: (data: any) => void;
  apiEndpoint: string;
  setIsLoading?: Dispatch<SetStateAction<boolean>>;
  delay?: number;
};

export async function useLoadData(params: useLoadDataParams) {
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (params.setIsLoading) params.setIsLoading(true);
        const res = await fetch(params.apiEndpoint, { method: 'GET' });
        const data = await res.json();
        params.onDataLoaded(data);
      } catch (err) {
        console.error('Error:', err);
      } finally {
        setTimeout(() => {
          if (params.setIsLoading) params.setIsLoading(false);
        }, params.delay ?? 0);
      }
    };
    fetchData();
  }, []);
}
