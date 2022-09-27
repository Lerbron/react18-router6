import * as actionTypes from '@/actions/actionTypes'

const initState= {
  num: 1
}


export default function test(state = initState, action) {
	switch (action.type) {
		case actionTypes.ADD :
			return Object.assign({}, state, {num: state.num + action.payload});
		default :
			return state;
	}
}