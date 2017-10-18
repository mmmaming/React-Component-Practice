/**
 * Created by Ma Ming on 2017/10/17.
 */

const sliderWrapper = {
  width   : '100%',
  height  : '100%',
  overflow: 'hidden'
}

const sliderUl = {
  display      : 'flex',
  flexDirection: 'row',
  listStyleType: 'none',
  height       : '100%',
  padding      : 0,
  margin       : 0,
  transition   : '500ms',
// /*remove*/
  border       : '2px solid blue',
  boxSizing    : 'border-box',
}

const sliderLi = {
  boxSizing: 'border-box',
  /*remove*/
  border   : '2px solid red',
  width    : '100%',
  height   : '100%',
  overflow : 'hidden'
}

export default {
  sliderWrapper,
  sliderUl,
  sliderLi
}