import { FETCH_USER } from '../actions/types';
//一開始進入畫面時 沒有任何state 所以填null
export default function(state = null, action) {
  console.log(action);
  switch (action.type) {
    case FETCH_USER:
      //有值填action.payload, 沒值(empty string)填false
      return action.payload || false;
    default:
      return state;
  }
}
