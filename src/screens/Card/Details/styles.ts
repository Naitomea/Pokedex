import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  panel: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  show: {
    top: 0,
  },
  hide: {
    top: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 25,
    overflow: 'hidden',
    elevation: 1,
    paddingTop: '10%',
    paddingHorizontal: 20,
  },
  tabSceneContainer: {
    backgroundColor: 'transparent',
  },
  tabBar: {
    elevation: 0,
  },
  tabBarContentContainer: {
    justifyContent: 'space-between',
  },
  tabBarItem: {
    width: 'auto',
  },
  tabBarLabel: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  tabBarIndicatorContainer: {
    width: '100%',
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(0, 0, 0, .05)',
  },
  tabBarIndicator: {
    top: '100%',
    height: 2,
  },
});
