import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  panel: {},

  text: {
    padding: 0,
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subTitle: {
    color: '#888',
  },

  flavorText: {
    marginTop: 20,
    lineHeight: 20,
  },

  measurementContainer: {
    flexDirection: 'row',
    borderRadius: 16,
    marginTop: 24,
    backgroundColor: 'white',
    padding: 16,

    elevation: 5,
    // shadowColor: '#F00',
    // shadowOffset: {
    //   width: 0,
    //   height: 5,
    // },
    // shadowOpacity: 1,
    // shadowRadius: 5,
  },
  measurementItem: {
    flex: 1,
    flexDirection: 'column',
    gap: 4,
  },

  infoContainer: {
    marginTop: 24,
  },
  infoContent: {
    marginTop: 20,
    gap: 12,
  },
  infoItem: {
    flexDirection: 'row',
  },
  infoSubTitle: {
    width: 96,
  },
  infoValue: {
    flexDirection: 'row',
    gap: 12,
  },
  infoSubValue: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
});
