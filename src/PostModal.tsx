import React from 'react';
import { Modal, SafeAreaView, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import styled from 'styled-components/native';

import { PicturePost } from './types';

const Header = styled.View`
  background-color: #fafafa;
  padding: 15px;
  border-bottom-width: 1px;
  border-bottom-color: #ddd;
`;

const HeaderContent = styled(SafeAreaView)`
  flex-direction: row;
  justify-content: space-between;
`;

const CloseButton = styled.Text`
  font-size: 18px;
  font-weight: 500;
  color: #315afb;
  align-self: flex-end;
`;

const ContentWrapper = styled(SafeAreaView)`
  flex: 1;
`;

export const PostModal: React.FunctionComponent<{
  modalPost: PicturePost;
  onPresClose: () => void;
}> = ({ 
  onPresClose, 
  modalPost,
}) => {
  const [loading, setLoading] = React.useState<boolean>(true);

  return (
    <Modal animated>
      <Header>
        <HeaderContent>
          <ActivityIndicator size="small" animating={loading} color="#111" />
          <CloseButton onPress={onPresClose}>close</CloseButton>
        </HeaderContent>
      </Header>

      <ContentWrapper>
        <WebView
          source={{ uri: `https://www.reddit.com/${modalPost.permalink}` }}
          style={{ flex: 1 }}
          onLoadEnd={() => {
            setLoading(false);
          }}
        />
      </ContentWrapper>
    </Modal>
  );
};
