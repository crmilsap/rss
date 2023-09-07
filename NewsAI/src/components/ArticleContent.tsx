import {RouteProp} from '@react-navigation/native';
import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {RootStackParamList} from '../navigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useArticle} from '../queries/useArticles';
import {DateTime} from 'luxon';
import Grid from '../layout/Grid';
import Col from '../layout/Column';
import Row from '../layout/Row';
import {ScrollView} from 'react-native-gesture-handler';

type ArticleContentProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ArticleContent'>;
  route: RouteProp<RootStackParamList, 'ArticleContent'>;
};

export const ArticleContent: React.FC<ArticleContentProps> = ({route}) => {
  const {articleId} = route.params;

  const {data: article} = useArticle(articleId);

  if (!article) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Image
        source={{uri: article.image}}
        style={{width: '100%', height: 200}}
      />
      <Grid>
        <Row>
          <Col xs={12}>
            <Text style={styles.title}>{article.title}</Text>
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <Text style={styles.publisher}>{article.publisher}</Text>
            <Text style={styles.authors}>{article.authors}</Text>
          </Col>
          <Col xs={6} alignItems="flex-end">
            <Text style={styles.publishDate}>
              {DateTime.fromISO(article.pub_date).toLocaleString(
                DateTime.DATETIME_MED,
              )}
            </Text>
          </Col>
        </Row>

        <Row>
          <Col xs={12} alignItems="center">
            <ScrollView style={{paddingLeft: 30, paddingRight: 30}}>
              <Text style={styles.content}>{article.content}</Text>
            </ScrollView>
          </Col>
        </Row>
      </Grid>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  authors: {
    fontSize: 18,
    marginBottom: 5,
  },
  publisher: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 5,
  },
  publishDate: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 20,
  },
  content: {
    fontSize: 16,
  },
});
