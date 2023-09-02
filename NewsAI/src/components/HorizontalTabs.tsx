import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useTopics} from '../queries/useTopics';

const HorizontalTabs = () => {
  const tabs = ['Tab 1', 'Tab 2', 'Tab 3', 'Tab 4', 'Tab 5'];

  const {data} = useTopics();
  const handleTabPress = tab => {
    // Handle tab press actions here
    console.log(`Pressed ${tab}`);
  };

  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.horizontalTabs}>
      {data?.map((x, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleTabPress(x)}
          style={styles.tab}>
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
    height: 50,
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
});

export default HorizontalTabs;
