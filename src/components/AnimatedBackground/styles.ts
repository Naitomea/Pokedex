import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    // borderRadius: 16,
  },
  content: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
  corner: {
    position: 'absolute',
    width: 16,
    height: 16,
    // backgroundColor: 'white',
  },
  sideVertical: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 16,
    // backgroundColor: 'white',
  },
  sideHorizontal: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 16,
    // backgroundColor: 'white',
  },
  center: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    // backgroundColor: 'white',
  },
  top: {
    top: -16,
  },
  bottom: {
    bottom: -16,
  },
  left: {
    left: -16,
  },
  right: {
    right: -16,
  },
  topLeft: {
    position: 'absolute',
    top: -16,
    left: -16,
    borderTopLeftRadius: 16,
  },
  topRight: {
    position: 'absolute',
    top: -16,
    right: -16,
    borderTopRightRadius: 16,
  },
  bottomRight: {
    position: 'absolute',
    bottom: -16,
    right: -16,
    borderBottomRightRadius: 16,
  },
  bottomLeft: {
    position: 'absolute',
    bottom: -16,
    left: -16,
    borderBottomLeftRadius: 16,
  },
});
