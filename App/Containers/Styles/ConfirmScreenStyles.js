import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles } from '../../Themes'

export default StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },

  inputCountryCode: {
    margin: Metrics.baseMargin,
    color: 'black',
    height: 45,
    width: '18%',
    // backgroundColor:'#99b3ff',
    borderRadius: 3,
    borderWidth: 0.8,
    fontWeight: 'bold',
    fontSize: 18

  },
  input: {
    // margin: Metrics.baseMargin,
    height: 45,
    textAlignVertical: 'center',
    width: '70%',
    // backgroundColor:'grey',
    borderRadius: 3,
    borderWidth: 0.7,
    fontWeight: 'bold',
    fontSize: 18,
    color: 'black'
  },

  inputView: {
    textAlignVertical: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },

  textHeader: {
    paddingLeft: 26,
    width: '100%',
    fontWeight: 'bold',
    color: 'black',
    fontSize: 30,
  },

  text: {
    paddingLeft: 8,
    width: '90%',
    color: '#797f89',
    fontSize: 16,
  },
})
