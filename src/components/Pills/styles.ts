import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    gap: 4,
  },
  containerLarge: {
    gap: 8,
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  pill: {
    width: 'auto',
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: 'rgba(255, 255, 255, .3)',
    borderRadius: 50,
    textAlign: 'center',
    fontSize: 12,
    textTransform: 'capitalize',
    fontWeight: '500',
    color: 'white',
  },
  animatedPill: {
    paddingBottom: 0,
    lineHeight: 20,
  },
  pillLarge: {
    fontSize: 14,
    paddingHorizontal: 16,
  },
});
