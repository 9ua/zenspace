import axios from 'axios';
import md5 from 'js-md5';
import {
  BET_CONTENT_FLAG,
  SHOW_RIGHT,
  CURRENT_PLAYER,
  MONEY,
  ZHU,
  CON,
  BET_SUCCESS,
  BET_GO_SHOW,
  BET_NOT,
  LIST_NAME,
  SEASONID2,
  GET_PAST_OPENS,
  LOOK_ALL_UL,
} from './mutation-types';
export default {
  historyNum(state, path) {
    state.historyNum = path;
  },
  getCaptchaCode(state) {
    this.axios({
      method: 'GET',
      url: state.url + 'checkCode?code=df&account=adfsdf&_=' + state.newDate,
    }).then((response) => {
      state.captchaCodeImg = response.data.content
    })
  },
  [BET_CONTENT_FLAG](state, flag) {
    if (flag === "reverse") {
      state.betContentTopPopFlag = !state.betContentTopPopFlag
    } else {
      state.betContentTopPopFlag = flag
    }
  },
  [SHOW_RIGHT](state, flag) {
    if (flag === "reverse") {
      state.showRight = !state.showRight
    } else {
      state.showRight = flag
    }
  },
  [CURRENT_PLAYER](state, flag) {
    if (flag === "clear") {
      if (state.current_player.numView) {
        state.current_player.numView.forEach((item1, index1) => {
          if (item1.nums) {
            item1.nums.forEach((item2, index2) => {
              if (item2.choose === true) {
                state.current_player.numView[index1].nums[
                  index2
                ].choose = false;
              }
            });
          }
        });
      }
    } else {
      state.current_player = flag
    }
  },
  [MONEY](state, value) {
    state.money = value
  },
  [ZHU](state, flag) {
    if (flag === "add") {
      state.zhu += 1
    } else if (flag === "reduce") {
      state.zhu -= 1
    } else {
      state.zhu = flag
    }
  },
  [CON](state, flag) {
    if (flag === "add") {
      state.con += 1
    } else if (flag === "reduce") {
      state.con -= 1
    } else {
      state.con = flag
    }
  },
  [BET_SUCCESS](state, flag) {
    if (flag === "reverse") {
      state.betsuccess = !state.betsuccess
    } else {
      state.betsuccess = flag
    }
  },
  [BET_GO_SHOW](state, flag) {
    if (flag === "reverse") {
      state.betGoshow = !state.betGoshow
    } else {
      state.betGoshow = flag
    }
  },
  [BET_NOT](state, flag) {
    if (flag === "reverse") {
      state.betnot = !state.betnot
    } else {
      state.betnot = flag
    }
  },
  [LIST_NAME](state, value) {
    state.listname = value
  },
  [SEASONID2](state, value) {
    state.seasonId2 = value
  },
  [GET_PAST_OPENS](state, value) {
    state.getPastOpens = value
  },
  [LOOK_ALL_UL](state, flag) {
    if (flag === "reverse") {
      state.lookAllUl = !state.lookAllUl
    } else {
      state.lookAllUl = flag
    }
  },
}
