import React from 'react';
import { Text, ActivityIndicator, Button } from 'react-native';
import styles from 'styled-components/native';

import { PostsList } from './PostsList';
import { usePosts } from './usePosts';
import { PicturePost } from './types';
import { ModalPost } from './ModalPost';

const FeedBackWrapper = styles.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const PostsScreen: React.FunctionComponent = () => {
  const { data, status, refetch } = usePosts();
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
    <>
      {!!modalPost && (
        <ModalPost
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
    </>
  );
};
