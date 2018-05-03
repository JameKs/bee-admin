import { SET_FRAMES_STATE, REPLACE_FRAMES_STATE } from 'constants/reducers';

const initialState = {
  cmenu: { data: [], loading: false },
  croute: { data: [] },
  cbread: { data: [] },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_FRAMES_STATE:
      return { ...state, ...action.payload };
    case REPLACE_FRAMES_STATE:
      return action.payload;
    default:
      return state;
  }
}
