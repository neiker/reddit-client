import React from 'react';
import { View, SafeAreaView, FlatList, RefreshControl } from 'react-native';
import styled from 'styled-components/native';

import { PicRow } from './PicRow';
import { PicturePost } from './types';

const Separator = styled.View`
  height: 15px;
  width: 100%;
  background-color: #fff;
`;

export const List: React.FunctionComponent<{
  pics: PicturePost[];
  onRefresh: () => {};
  refreshing: boolean;
}> = ({ pics, onRefresh, refreshing }) => {
  return (
    <SafeAreaView>
      <FlatList 
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ItemSeparatorComponent={Separator} 
        data={pics} 
        keyExtractor={item => item.id} 
        renderItem={({ item }) => <PicRow post={item} />} 
      />
    </SafeAreaView>
  );
};
