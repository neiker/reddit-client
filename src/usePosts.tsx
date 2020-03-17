import React from 'react';

import { PicturePost } from './types';

type QueryStatus = 'loading' | 'error' | 'success';

interface QueryState {
  data: PicturePost[] | undefined;
  status: QueryStatus;
}

interface QueryResult extends QueryState {
  refetch: () => void;
}

async function getPosts() {
  const res = await fetch('https://api.reddit.com/r/pics/new.json');

  const body = await res.json();

  return body.data.children.map(child => child.data);
}

export function usePosts(): QueryResult {
  const [status, setStatus] = React.useState<QueryStatus>('loading');
  const [data, setData] = React.useState<PicturePost[]>();

  const fetchPosts = React.useCallback(() => {
    setStatus('loading');

    getPosts()
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

  React.useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return {
    data,
    status,
    refetch: fetchPosts,
  };
}
