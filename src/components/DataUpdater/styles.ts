import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  smallOverlay: {
    position: 'absolute',
    left: 8,
    bottom: 8 + 24,
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 16,
  },
  text: {
    color: '#FFF',
  },
  progress: {
    marginBottom: 4,
  },
});
