import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ActivityIndicator,
  Button,
} from 'react-native';
import { useQuery } from 'react-query';
import styles from 'styled-components/native';

import { List } from './src/List';

const FeedBackWrapper = styles.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default function App() {
  const {
    data,
    // type definitions are outdated https://github.com/DefinitelyTyped/DefinitelyTyped/issues/42678
    // @ts-ignore
    status, 
    refetch, 
    isFetching
  } = useQuery('pics', async () => {
    const res = await fetch('https://api.reddit.com/r/pics/new.json');

    const body = await res.json();

    return body.data.children.map(child => child.data);
  });

  

  if (status === 'loading') {
    return (
      <FeedBackWrapper>
        <ActivityIndicator color="#222" size="large" />
      </FeedBackWrapper>
    )
  }

  if (status === 'error') {
    return (
      <FeedBackWrapper>
        <Text>An error ocurred.</Text>
        <Button 
          onPress={() => {
            refetch();
          }} 
          title="Retry"
        />
      </FeedBackWrapper>
    )
  }

  return (
    <List 
      refreshing={isFetching}
      pics={data} 
      onRefresh={refetch} 
    />
  );
}