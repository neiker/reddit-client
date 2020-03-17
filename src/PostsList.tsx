import React from 'react';
import { SafeAreaView, RefreshControl } from 'react-native';

// Import FlatList and Touchable* from react-native-gesture-handler
// This fixes an annoying but that fires the "press" animation 
// on a touchable item while scrolling
import { FlatList } from 'react-native-gesture-handler';

import styled from 'styled-components/native';

import { PostRow } from './PostRow';
import { PicturePost } from './types';

const Separator = styled.View`
  height: 15px;
  width: 100%;
  background-color: #fff;
`;

export const PostsList: React.FunctionComponent<{
  posts: PicturePost[];
  onRefresh: () => void;
  refreshing: boolean;
  onPressPost: (post: PicturePost) => void;
}> = ({ posts, onRefresh, refreshing, onPressPost }) => (
  <SafeAreaView>
    <FlatList
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      ItemSeparatorComponent={Separator}
      data={posts}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <PostRow 
          post={item} 
          onPress={() => {
            onPressPost(item);
          }} 
        />
      )}
    />
  </SafeAreaView>
);
