import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {ArticleResponse} from '../generated-api';
import {useTopicsState} from '../contexts/TopicProvider';
import {useArticles} from '../queries/useArticles';
import {DateTime, Duration} from 'luxon';
import HorizontalTabs from './HorizontalTabs';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation';
import {SafeAreaView} from 'react-native-safe-area-context';

const ArticleList = () => {
  const {selectedId} = useTopicsState();
  const {data} = useArticles(selectedId);
  const nav =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, 'ArticleList'>
    >();

  const renderItem = ({item}: {item: ArticleResponse}) => {
    const diff = DateTime.fromISO(item.pub_date).diffNow();
    const absDiff = diff.toMillis() >= 0 ? diff : diff.negate();
    const duration = Duration.fromMillis(absDiff.toMillis()).shiftTo(
      'days',
      'hours',
      'minutes',
    );
    let formattedDiff = '';
    if (duration.days >= 1) {
      formattedDiff = `${duration.days} day${duration.days > 1 ? 's' : ''}, ${
        duration.hours
      } hour${duration.hours > 1 ? 's' : ''} ago`;
    } else {
      formattedDiff = `${duration.hours} hour${
        duration.hours > 1 ? 's' : ''
      }, ${duration.minutes.toFixed(0)} min${
        duration.minutes > 1 ? 's' : ''
      } ago`;
    }

    return (
      <TouchableOpacity
        onPress={() => nav.navigate('ArticleContent', {articleId: item.id})}>
        <View style={styles.articleContainer}>
          <Image
            style={styles.articleImage}
            source={{uri: item.image}} // Replace with your image URI
          />
          <View style={styles.articleTextContainer}>
            <Text style={styles.articleTitle}>{item.title}</Text>
            <Text style={styles.articleDate}>{formattedDiff}</Text>
            <Text>{item.authors.join(', ')}</Text>
            <Text>{item.publisher}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView>
      <HorizontalTabs />

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.title + index}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  articleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  articleImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  articleTextContainer: {
    flex: 1,
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  articleDate: {
    fontSize: 12,
    color: '#888',
  },
});

export default ArticleList;
