import React from 'react';

import { PicturePost, Sort } from './types';

type QueryStatus = 'loading' | 'error' | 'success';

interface QueryState {
  data: PicturePost[] | undefined;
  status: QueryStatus;
}

interface QueryResult extends QueryState {
  refetch: () => void;
}

async function getPosts(sort: Sort) {
  const res = await fetch(`https://api.reddit.com/r/pics/${sort}.json`);

  const body = await res.json();

  return body.data.children.map(child => child.data);
}

export function usePosts(sort: Sort): QueryResult {
  const [status, setStatus] = React.useState<QueryStatus>('loading');
  const [data, setData] = React.useState<PicturePost[]>();

  React.useEffect(() => {
    setData(undefined);
    fetchPosts();
  }, [sort])

  const fetchPosts = React.useCallback(() => {
    setStatus('loading');

    getPosts(sort)
      .then(posts => {
        setStatus('success');
        setData(posts);
      })
      .catch(() => {
        setData(undefined);
        // TODO Improve error handling. Now any error is treated equaly.
        setStatus('error');
      });
  }, []);

  return {
    data,
    status,
    refetch: fetchPosts,
  };
}
