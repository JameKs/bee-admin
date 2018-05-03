import { SET_LAYOUTS_STATE, REPLACE_LAYOUTS_STATE } from 'constants/reducers';

export default function (state = {}, action) {
  switch (action.type) {
    case SET_LAYOUTS_STATE:
      return { ...state, ...action.payload };
    case REPLACE_LAYOUTS_STATE:
      return action.payload;
    default:
      return state;
  }
}
