const initialState = {
  loading: false,
}

const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LOADING': {
      return {
        ...state,
        loading: !state.loading,
      }
    }
  
    default: {
      return {
        ...state,
      }
    }
  }
}

export default loadingReducer;