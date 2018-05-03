import { SET_ROUTES_STATE, REPLACE_ROUTES_STATE } from 'constants/reducers';

export default function (state = {}, action) {
  switch (action.type) {
    case SET_ROUTES_STATE:
      return { ...state, ...action.payload };
    case REPLACE_ROUTES_STATE:
      return action.payload;
    default:
      return state;
  }
}
