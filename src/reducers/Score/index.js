import commonConstant from '../../common/commonConstant';

export const getScore = (state = {}, action) => {
  switch (action.type) {
    case commonConstant.GET_SCORE_SUCCESS:
      return { ...state, ...action };
    case commonConstant.GET_SCORE_FAILURE:
      return { ...state, ...action };
    default:
      return state;
  }
};

export const postScore = (state = {}, action) => {
  switch (action.type) {
    case commonConstant.POST_CREATE_SCORE_SUCCESS:
      return { ...state, ...action };
    case commonConstant.POST_CREATE_SCORE_FAILURE:
      return { ...state, ...action };
    default:
      return state;
  }
};
