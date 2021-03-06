import {GET_CLASSES} from '../actions/classAction';

const initialState = {
  _classList: [],
  _class: {},
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CLASSES:
      return {
        ...state,
        _classList: action.payload,
      };
    default:
      return state;
  }
}
