import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '50%',
    marginHorizontal: 24,
    zIndex: 1,
  },
  content: {
    flex: 1,
  },

  containerLogo: {
    position: 'absolute',
    width: '100%',
    height: '70%',
    bottom: '-15%',
  },
  contentLogo: {
    height: '100%',
    aspectRatio: 1,
    alignSelf: 'center',
  },
  logoBackground: {
    width: '100%',
    height: '100%',
    opacity: 0.2,
  },

  modeContainer: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    padding: 8,
    zIndex: 10,
  },
  mode2DIcon: {
    opacity: 0.35,
  },
  mode3DIcon: {
    opacity: 0.8,
  },

  capturedIndicatorContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
  },
  capturedIndicator: {
    position: 'absolute',
    width: 12,
    height: 12,
    right: 8,
    bottom: 8,
    opacity: 0.8,
  },
});
