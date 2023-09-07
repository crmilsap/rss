import React from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useTopicsState} from '../contexts/TopicProvider';
import {useTopics} from '../queries/useTopics';
import {Topic} from '../generated-api';

const HorizontalTabs = () => {
  const {data} = useTopics();
  const {setSelectedId, selectedId} = useTopicsState();

  const handleTabPress = (newTopic: Topic) => {
    // Handle tab press actions here
    setSelectedId(newTopic.id);
  };

  return (
    <ScrollView
      // showsVerticalScrollIndicator={false}
      // alwaysBounceVertical={false}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.horizontalTabs}>
      {data?.map((x, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleTabPress(x)}
          style={[styles.tab, x.id === selectedId ? styles.selectedTab : {}]}>
          <Text style={styles.tabText}>{x.category}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  horizontalTabs: {
    flexDirection: 'row',
    alignItems: 'center', // Center the tabs vertically
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginLeft: 5,
    marginRight: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10, // Rounded borders
  },
  tabText: {
    fontSize: 16,
  },
  selectedTab: {
    backgroundColor: '#ddd',
  },
});

export default HorizontalTabs;
