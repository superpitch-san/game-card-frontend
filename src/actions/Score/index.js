import commonConstant from '../../common/commonConstant';

export const fetchGetScore = () => (
  async dispatch => {
    try {
      const res = await fetch(`${commonConstant.REACT_APP_DOMAIN_BACKEND_API}/api/score/`);
      const data = await res.json();
          if (res.status === 200) {
            const groupScore = [];
            if (data.objects && data.objects.length > 0) {
              await data.objects.forEach(score => {
                groupScore.push(score.top_score);
              });
              return dispatch({
                'type': commonConstant.GET_SCORE_SUCCESS,
                'data': Math.min(...groupScore),
                'status': res.status,
                'errorMessage': null,
              });
            } else {
              return dispatch({
                'type': commonConstant.GET_SCORE_SUCCESS,
                'data': 0,
                'status': res.status,
                'errorMessage': null,
              });
            }
          } else if (res.status === 401) {
            return dispatch({
              'type': commonConstant.GET_SCORE_FAILURE,
              'data': null,
              'status': res.status ? res.status : null,
              'errorMessage': data.detail ? data.detail : null,
            });
          } else if (res.status === 500 || res.status === 502) {
            return dispatch({
              'type': commonConstant.GET_SCORE_FAILURE,
              'data': null,
              'status': res.status ? res.status : null,
              'errorMessage': data.detail ? data.detail : null,
            });
          }
          return dispatch({
            'type': commonConstant.GET_SCORE_FAILURE,
            'data': null,
            'status': res.status ? res.status : null,
            'errorMessage': data.detail ? data.detail : null,
          });
    } catch (err) {
      return dispatch({
        'type': commonConstant.GET_SCORE_FAILURE,
        'data': null,
        'status': err.status ? err.status : err,
        'errorMessage': null,
      });
    }
  }
);

export const fetchCreateScore = (topScore) => (
  async dispatch => {
    try {
      const res = await fetch(`${commonConstant.REACT_APP_DOMAIN_BACKEND_API}/api/score/`,{
        'headers': new Headers({
          'Content-Type': 'application/json',
        }),
        'method': 'POST',
        'body': JSON.stringify({
          'top_score': topScore
        }),
      });
      const data = await res.json();
      if (res.status === 200) {
        return dispatch({
          'type': commonConstant.POST_CREATE_SCORE_SUCCESS,
          data,
          'status': res.status,
        });
      }
      return dispatch({
        'type': commonConstant.POST_CREATE_SCORE_FAILURE,
        'data': data ? data : null,
        'status': res.status ? res.status : res,
      });
    } catch (err) {
      return dispatch({
        'type': commonConstant.POST_CREATE_SCORE_FAILURE,
        'data': null,
        'status': err.status ? err.status : err,
      });
    }
  }
);
