import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {DateTime} from 'luxon';
import React, {useState} from 'react';
import {
  Animated,
  Image,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {material} from 'react-native-typography';
import Col from '../layout/Column';
import Grid from '../layout/Grid';
import Row from '../layout/Row';
import {RootStackParamList} from '../navigation';
import {useArticle} from '../queries/useArticles';
import colors from '../styles/colors';
import {marginStyles, paddingStyles} from '../styles/spacing';
import {easeInOutCubic} from '../styles/easing';

type ArticleContentProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ArticleContent'>;
  route: RouteProp<RootStackParamList, 'ArticleContent'>;
};

export const ArticleContent: React.FC<ArticleContentProps> = ({route}) => {
  const {articleId} = route.params;

  const {data: article} = useArticle(articleId);
  const [scrollY, _setScrollY] = useState(new Animated.Value(0));

  if (!article) {
    return <Text>Loading...</Text>;
  }

  const actionStart = [100, 200];
  const headerHeight = scrollY.interpolate({
    inputRange: actionStart,
    outputRange: [200, 0],
    extrapolate: 'clamp',
    easing: easeInOutCubic,
  });

  const scaleDown = scrollY.interpolate({
    inputRange: actionStart,
    outputRange: [100, 0],
    extrapolate: 'clamp',
    easing: easeInOutCubic,
  });

  const detailsFoldUpTranslateY = scrollY.interpolate({
    inputRange: [10, 100],
    outputRange: [0, -200],
    extrapolate: 'clamp',
  });
  const foldingOpacity = scrollY.interpolate({
    inputRange: [10, 20],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const foldingAnimatedStyle: StyleProp<TextStyle> = {
    transform: [{translateY: detailsFoldUpTranslateY}],
    zIndex: 1,
    elevation: 1,
    opacity: foldingOpacity,
  };

  return (
    <View style={styles.container}>
      <ArticleBanner />

      <Animated.View style={{height: headerHeight}}>
        <Image style={styles.image} source={{uri: article.image}} />
      </Animated.View>

      <ScrollView
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}
        scrollEventThrottle={16}
        style={marginStyles['mt-sm']}>
        <Grid>
          <Row>
            <Col xs={12}>
              <Text
                style={[
                  styles.content,
                  material.headline,
                  // colors.bgWhite,
                  {zIndex: 2, elevation: 2},
                ]}>
                {article.title}
              </Text>
            </Col>
          </Row>
          <Row>
            <Col xs={6} styles={[paddingStyles['pb-md'], styles.content]}>
              <Animated.View style={[foldingAnimatedStyle]}>
                <Text style={material.subheading}>{article.publisher}</Text>
                <Text style={material.subheading}>{article.authors}</Text>
              </Animated.View>
            </Col>
            <Col xs={6} alignItems="flex-end" styles={styles.content}>
              <Animated.View style={[foldingAnimatedStyle]}>
                <Text style={material.caption}>
                  {DateTime.fromISO(article.pub_date).toLocaleString(
                    DateTime.DATETIME_MED,
                  )}
                </Text>
              </Animated.View>
            </Col>
          </Row>
          <Row>
            <Col xs={12} alignItems="center">
              <Text style={styles.content}>{article.content}</Text>
            </Col>
          </Row>
        </Grid>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
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
    paddingLeft: 30,
    paddingRight: 30,
  },
  image: {
    height: '100%',
    width: '100%',
  },
});

const ArticleBanner: React.FC = () => {
  const [scrollY, _setScrollY] = useState(new Animated.Value(0));

  // todo refactor animations
  const actionStart = [100, 200];
  const bannerHeight = scrollY.interpolate({
    inputRange: [100, 200],
    outputRange: [20, 200],
    extrapolate: 'clamp',
  });

  const scaleDown = scrollY.interpolate({
    inputRange: actionStart,
    outputRange: [-100, 0],
    extrapolate: 'clamp',
    easing: easeInOutCubic,
  });

  return (
    <Animated.View
      style={{
        // opacity: bannerOpacity,
        height: bannerHeight,
        backgroundColor: colors.bgCoolGray.backgroundColor,
        position: 'absolute',
        top: 0,

        // transform: [{translateY: scaleDown}],
      }}>
      <Grid>
        <Row>
          <Col xs={4}>
            <Image
              style={{width: 60, height: 40}}
              source={require('../../assets/TempLogo.png')}
            />
          </Col>
          <Col>
            <Text style={{color: 'white'}}>Banner</Text>
          </Col>
        </Row>
      </Grid>
    </Animated.View>
  );
};
