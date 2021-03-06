import React from 'react';
import { Text, ActivityIndicator, Button, SafeAreaView } from 'react-native';
import styles from 'styled-components/native';

import { PostsList } from './PostsList';
import { usePosts } from './usePosts';
import { PicturePost, Sort } from './types';
import { PostModal } from './PostModal';

const FeedBackWrapper = styles.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const PostsScreen: React.FunctionComponent<{ sort: Sort }> = ({ sort }) => {
  const { data, status, refetch } = usePosts(sort);
  const [modalPost, setModalPost] = React.useState<PicturePost>();
  
  if (status === 'loading' && !data) {
    return (
      <FeedBackWrapper>
        <ActivityIndicator color="#222" size="large" />
      </FeedBackWrapper>
    );
  }

  if (status === 'error') {
    return (
      <FeedBackWrapper>
        <Text>An error ocurred</Text>
        <Button
          onPress={() => {
            refetch();
          }}
          title="Retry"
        />
      </FeedBackWrapper>
    );
  }

  return (
    <SafeAreaView>
      {modalPost !== undefined && (
        <PostModal
          modalPost={modalPost}
          onPresClose={() => {
            setModalPost(undefined);
          }}
        />
      )}
      
      <PostsList
        refreshing={status === 'loading'}
        posts={data}
        onRefresh={refetch}
        onPressPost={(post) => {
            setModalPost(post);
        }}
      />
    </SafeAreaView>
  );
};
