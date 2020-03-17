import React from 'react';
import { Modal, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';
import styled from 'styled-components/native';

import { PicturePost } from './types';

const Header = styled.View`
  background-color: #fafafa;
  padding: 15px;
  border-bottom-width: 1px;
  border-bottom-color: #ddd;
`;

const CloseButton = styled.Text`
  font-size: 18px;
  font-weight: 500;
  color: #315afb;
  align-self: flex-end;
`;

export const ModalPost: React.FunctionComponent<{
  modalPost: PicturePost;
  onPresClose: () => void;
}> = ({ 
  onPresClose, 
  modalPost,
}) => {
  return (
    <Modal animated>
      <Header>
        <SafeAreaView>
          <CloseButton onPress={onPresClose}>close</CloseButton>
        </SafeAreaView>
      </Header>

      <SafeAreaView style={{ flex: 1 }}>
        <WebView
          source={{ uri: `https://www.reddit.com/${modalPost.permalink}` }}
          style={{ flex: 1 }}
        />
      </SafeAreaView>
    </Modal>
  );
};
