import {StatusBar, StyleSheet} from 'react-native';

export default StyleSheet.create({
  block: {
    width: 212,
    height: 212,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 24,

    position: 'absolute',
    top: (StatusBar.currentHeight || 0) - 145,
    left: -135,
    transform: [{rotate: '-12deg'}],
  },
});
