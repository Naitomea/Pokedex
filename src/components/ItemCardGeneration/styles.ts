import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  informations: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  percentage: {
    marginLeft: -4,
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
    // backgroundColor: 'pink',
    letterSpacing: -3,
  },
  count: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
  images: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  image: {
    aspectRatio: 1,
  },
});
