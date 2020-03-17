import React from 'react';
import { Image } from 'react-native';
import { format } from 'date-fns';
import styled from 'styled-components/native';
import {  MaterialCommunityIcons } from '@expo/vector-icons';

import { PicturePost } from './types';
import { Caption, Title, Subtitle } from './typography';

const Wrapper = styled.View`
    background-color: #f9f9f9;
    flex: 1;
    flex-direction: row;
`;

const ThumbnailContainer = styled.View`
    width: 150px;
    height: 150px;
`;

const DetailsContainer = styled.View`
    flex: 1;
    flex-direction: column;
    padding: 10px;
    justify-content: space-between;
`;

const DetailsHeader= styled.View``;
const DetailsFooter= styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

const DetailsItem = styled.View`
    flex-direction: row;
`;

const DateText = styled(Caption)`
    align-self: flex-end;
`;

const TitleText = styled(Title)`
    margin: 10px 0;
`;

const DetailsText = styled(Subtitle)`
    margin-left: 5px;
`

const Icon = styled(MaterialCommunityIcons).attrs({
    size: 14,
    color: "#555",
  })``;

export const PicRow: React.FunctionComponent<{
  post: PicturePost;
}> = ({ post }) => {
  return (
    <Wrapper>
        <ThumbnailContainer>
            <Image 
                style={{ 
                    width: undefined, 
                    height: undefined,
                    flex: 1,
                }} 
                
                resizeMode="cover"
                source={{ uri: post.thumbnail }} 
            />
        </ThumbnailContainer>

        <DetailsContainer>
            <DetailsHeader>
                <DateText>{format(new Date(post.created * 1000), "Pp")}</DateText>

                <TitleText>{post.title}</TitleText>
            </DetailsHeader>

            <DetailsFooter> 
                <DetailsItem>
                    <Icon name="account" /> 
                    <DetailsText>{post.author}</DetailsText>
                </DetailsItem>

                <DetailsItem>
                    <Icon name="star" /> 
                    <DetailsText>{post.score}</DetailsText>
                </DetailsItem>

                <DetailsItem>
                    <Icon name="comment-text" /> 
                    <DetailsText>{post.num_comments}</DetailsText>
                </DetailsItem>
            </DetailsFooter>
        </DetailsContainer>
    </Wrapper>
  );
};
