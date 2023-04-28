const AppReducer = (state, action) => {
	switch (action.type) {
		case 'UPDATE_INFO':
			return { ...state, fileData: action.payload };
		case 'CLEAR':
			return { ...state, fileData: null };
		default:
			return state;
	}
};

export default AppReducer;
