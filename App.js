// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow
//  */

import React from 'react';
import Welcome from './components/Welcome';
import Scanner from './components/Scanner';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import classReducer from './reducers/classReducer';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Home from './components/Home';
import SheetScanning from './components/SheetScanning';
import Icon from 'react-native-vector-icons/FontAwesome5';

const AppNavigator = createStackNavigator(
  {
    ScanCam: {
      screen: Scanner,
      navigationOptions: {
        headerShown: false,
      },
    },
    ScanForm: {
      screen: SheetScanning,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: 'ScanForm',
  },
);

AppNavigator.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

const RootNavigator = createSwitchNavigator(
  {
    App: App,
    Splash: Welcome,
  },
  {
    initialRouteName: 'Splash',
  },
);

const Tabs = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        title: 'Home',
        tabBarIcon: ({tintColor}) => (
          <Icon name="home" size={17} color={tintColor} />
        ),
      },
    },
    TestScanning: {
      screen: AppNavigator,
      navigationOptions: {
        title: 'Scan Sheets',
        tabBarIcon: ({tintColor}) => (
          <Icon name="tasks" size={17} color={tintColor} />
        ),
      },
    },
  },
  {
    order: ['TestScanning', 'Home'],
    animationEnabled: true,
  },
);

const AppContainer = createAppContainer(Tabs);

function App() {
  return (
    <Provider store={createStore(classReducer)}>
      <AppContainer />
    </Provider>
  );
}

export default createAppContainer(RootNavigator);

// import React from 'react';
// import {
//   SafeAreaView,
//   StyleSheet,
//   ScrollView,
//   View,
//   Text,
//   StatusBar,
// } from 'react-native';

// import {
//   Header,
//   LearnMoreLinks,
//   Colors,
//   DebugInstructions,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

// const App: () => React$Node = () => {
//   return (
//     <>
//       <StatusBar barStyle='dark-content' />
//       <SafeAreaView>
//         <ScrollView
//           contentInsetAdjustmentBehavior='automatic'
//           style={styles.scrollView}>
//           <Header />
//           {global.HermesInternal == null ? null : (
//             <View style={styles.engine}>
//               <Text style={styles.footer}>Engine: Hermes</Text>
//             </View>
//           )}
//           <View style={styles.body}>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Step One</Text>
//               <Text style={styles.sectionDescription}>
//                 Edit <Text style={styles.highlight}>App.js</Text> to change this
//                 screen and then come back to see your edits.
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>See Your Changes</Text>
//               <Text style={styles.sectionDescription}>
//                 <ReloadInstructions />
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Debug</Text>
//               <Text style={styles.sectionDescription}>
//                 <DebugInstructions />
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Learn More</Text>
//               <Text style={styles.sectionDescription}>
//                 Read the docs to discover what to do next:
//               </Text>
//             </View>
//             <LearnMoreLinks />
//           </View>
//         </ScrollView>
//       </SafeAreaView>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   scrollView: {
//     backgroundColor: Colors.lighter,
//   },
//   engine: {
//     position: 'absolute',
//     right: 0,
//   },
//   body: {
//     backgroundColor: Colors.white,
//   },
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//     color: Colors.black,
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//     color: Colors.dark,
//   },
//   highlight: {
//     fontWeight: '700',
//   },
//   footer: {
//     color: Colors.dark,
//     fontSize: 12,
//     fontWeight: '600',
//     padding: 4,
//     paddingRight: 12,
//     textAlign: 'right',
//   },
// });

// export default App;
