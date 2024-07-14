import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: '50%',
    aspectRatio: '4/3',
  },
  button: {
    flex: 1,
    margin: 8,
  },
  buttonContent: {
    flex: 1,
    borderRadius: 16,
    elevation: 5,
    // overflow: 'hidden',
  },
  content: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 16,
    overflow: 'hidden',
    justifyContent: 'center',
  },

  buttonOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    zIndex: 100,
  },

  background: {
    marginHorizontal: 16,
    marginVertical: 16,
  },
  logoBackground: {
    height: '70%',
    top: '38%',
    left: '53%',
    opacity: 0.3,
    aspectRatio: 1,
  },
  logoBackgroundLight: {
    opacity: 0.05,
  },

  image: {
    height: '70%',
    top: '28%',
    left: '48%',
    aspectRatio: 1,
  },
  imageUndiscovered: {
    tintColor: '#000',
  },

  body: {
    height: 84,
    marginHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
    height: 22,
  },
  centerHeader: {
    justifyContent: 'center',
    transform: [{translateY: -8}],
  },
  name: {
    // flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  text: {
    fontSize: 12,
    fontWeight: '500',
    color: 'white',
  },

  capturedIndicator: {
    position: 'absolute',
    width: 12,
    height: 12,
    right: 8,
    bottom: 8,
    opacity: 0.8,
  },
  newBadge: {
    position: 'absolute',
    width: 16,
    height: 16,
    right: 8,
    top: -6,
    borderRadius: 8,
    backgroundColor: '#ff4036',
    borderColor: '#fff',
    borderWidth: 1,
    elevation: 1,
  },
});
