import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {fetchDataSuccess, fetchDataFailure} from './action';
import {url} from './constants';

let i = 0;
let bodyData = [];

function homeScreen({navigation}) {
  const dispatch = useDispatch();
  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => dispatch(fetchDataSuccess(data)))
      .catch(error => dispatch(fetchDataFailure(error)))
      .finally(() => {});
  }, []);
  const data = useSelector(state => state.data);
  const isloading = useSelector(state => state.loading);
  bodyData = data;
  return (
    <View style={styles.container}>
      {isloading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          style={styles.list}
          data={data}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                (i = item.id), navigation.navigate('body');
              }}>
              <Text style={styles.text}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

function bodyScreen() {
  return (
    <View style={styles.bodyContainer}>
      <Text style={styles.bodyText}>{bodyData[i - 1].body}</Text>
    </View>
  );
}

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="home">
        <Stack.Screen
          name="home"
          component={homeScreen}
          screenOptions={{headerShown: false}}
        />
        <Stack.Screen name="body" component={bodyScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001F3D',
  },
  bodyContainer: {
    flex: 1,
    backgroundColor: '#001F3D',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  text: {
    flex: 1,
    color: '#001F3D',
    backgroundColor: '#9CB9CC',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    fontSize: 22,
  },
  bodyText: {
    width: '100%',
    color: '#001F3D',
    backgroundColor: '#9CB9CC',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    fontSize: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    padding: 10,
  },
});
