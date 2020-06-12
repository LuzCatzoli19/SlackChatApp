import React from 'react';
import {TouchableOpacity, View, Text, Image, StyleSheet} from 'react-native';
import iconSearch from '../images/icon-search.png';
import iconThreeDots from '../images/icon-3-dots.png';
import styled from 'styled-components';

export const ChannelHeader = ({navigation, channel, client}) => {
  let channelTitle = '#channel_name';

  // For normal group channel/conversation, its channel name as display title.
  if (channel && channel.data && channel.data.name) {
    channelTitle = '# ' + channel.data.name.toLowerCase().replace(' ', '_');
  }

  const memberIds =
    channel && channel.state ? Object.keys(channel.state.members) : [];

  // Check if its oneOneOneConversation.
  if (channel && memberIds.length === 2) {
    // If yes, then use name of other user in conversation as channel display title.
    const otherUserId =
      memberIds[0] === client.user.id ? memberIds[1] : memberIds[0];

    channelTitle = channel.state.members[otherUserId].user.name;
  }

  return (
    <Container>
      <View style={styles.leftContent}>
        <TouchableOpacity
          onPress={() => {
            navigation.openDrawer();
          }}>
          <Text style={styles.hamburgerIcon}>☰</Text>
        </TouchableOpacity>
        <ChannelTitle>{channelTitle}</ChannelTitle>
      </View>
      <View style={styles.rightContent}>
        <TouchableOpacity style={styles.searchIconContainer}>
          <Image source={iconSearch} style={styles.searchIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuIconContainer}>
          <Image source={iconThreeDots} style={styles.menuIcon} />
        </TouchableOpacity>
      </View>
    </Container>
  );
};
const Container = styled.View`
  padding: 15px;
  flex-direction: row;
  background-color: white;
  justify-content: space-between;
  border-bottom-width: 0.5px;
  border-bottom-color: grey;
`;

const ChannelTitle = styled.Text`
  color: black;
  margin-left: 10px;
  font-weight: 900;
  font-size: 17px;
  font-family: Lato-Regular;
`;

export const styles = StyleSheet.create({
  /* container: {
    padding: 15,
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
  },*/
  leftContent: {
    flexDirection: 'row',
  },
  hamburgerIcon: {
    fontSize: 27,
  },
  /*channelTitle: {
    color: 'black',
    marginLeft: 10,
    fontWeight: '900',
    fontSize: 17,
    fontFamily: 'Lato-Regular',
  },*/
  rightContent: {
    flexDirection: 'row',
    marginRight: 10,
  },
  searchIconContainer: {marginRight: 15, alignSelf: 'center'},
  searchIcon: {
    height: 18,
    width: 18,
  },
  menuIcon: {
    height: 18,
    width: 18,
  },
  menuIconContainer: {alignSelf: 'center'},
});
