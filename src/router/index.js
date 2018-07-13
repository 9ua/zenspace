import Vue from 'vue'
import Router from 'vue-router'
const home = () => import('@/components/home/home')
const one = () => import('@/components/home/one')
const second = () => import('@/components/home/second')
const past = () => import('@/components/page-second/past')
const three = () => import('@/components/home/three')
const four = () => import('@/components/home/four')
const five = () => import('@/components/home/five')
const login = () => import('@/components/login/login')
const registered = () => import('@/components/login/registered')
const reset = () => import('@/components/login/reset')
const resetpwd = () => import('@/components/login/resetpwd')
const resetway = () => import('@/components/login/resetway')
const verifyPwdSafe = () => import('@/components/login/verifyPwdSafe')
const winning = () => import('@/components/page-four/winning')
const profit = () => import('@/components/page-four/profit')
const pop = () => import('@/components/page-four/pop')
const bet = () => import('@/components/page-five/money/bet')
const service = () => import('@/components/page-five/service')
const bankcharge = () => import('@/components/page-five/money/bankcharge')
const weixincharge = () => import('@/components/page-five/money/weixincharge')
const creditccharge = () => import('@/components/page-five/money/creditccharge')
const huabeicharge = () => import('@/components/page-five/money/huabeicharge')
const alipaycharge = () => import('@/components/page-five/money/alipaycharge')
const rechargeserch = () => import('@/components/page-five/money/rechargeserch')
const cashOut = () => import('@/components/page-five/money/cashOut')
const agencyOut = () => import('@/components/page-five/money/agencyOut')
const agencyOuts = () => import('@/components/page-five/money/agencyOuts')
const trade = () => import('@/components/page-five/money/trade')
const agency = () => import('@/components/page-five/agency')
const agentBetRecord = () => import('@/components/page-five/agency/agentBetRecord')
const agentBillRecord = () => import('@/components/page-five/agency/agentBillRecord')
const agentIntro = () => import('@/components/page-five/agency/agentIntro')
const agentMember = () => import('@/components/page-five/agency/agentMember')
const agentReport = () => import('@/components/page-five/agency/agentReport')
const lowerReport = () => import('@/components/page-five/agency/lowerReport')
const manageInvite = () => import('@/components/page-five/agency/manageInvite')
const mIcode = () => import('@/components/page-five/agency/manageInvite/mIcode')
const mInvite = () => import('@/components/page-five/agency/manageInvite/mInvite')
const payway = () => import('@/components/page-five/money/payway')
const detail = () => import('@/components/page-five/detail')
const datum = () => import('@/components/page-five/details/datum')
const setmobile = () => import('@/components/page-five/details/setmobile')
const setemail = () => import('@/components/page-five/details/setemail')
const title = () => import('@/components/page-five/details/title')
const mymsg = () => import('@/components/page-five/mymsg')
const letter = () => import('@/components/page-five/mymsg/letter')
const notice = () => import('@/components/page-five/mymsg/notice')
const profits = () => import('@/components/page-five/profit')
const safety = () => import('@/components/page-five/safety')
const verifyPwd = () => import('@/components/page-five/safety/verifyPwd')
const setPwd = () => import('@/components/page-five/safety/setPwd')
const getCards = () => import('@/components/page-five/safety/getCards')
const newCard = () => import('@/components/page-five/safety/newCard')
const verifySafePwd = () => import('@/components/page-five/safety/verifySafePwd')
const changeSafePwd = () => import('@/components/page-five/safety/changeSafePwd')
const safeMobile = () => import('@/components/page-five/safety/safeMobile')
const safeEmail = () => import('@/components/page-five/safety/safeEmail')
const setSafePwd = () => import('@/components/page-five/safety/setSafePwd')
const resetWay = () => import('@/components/page-five/safety/resetWay')
const setQuestion = () => import('@/components/page-five/safety/setQuestion')
const safeQuestion = () => import('@/components/page-five/safety/safeQuestion')
const ErrorPage = () => import('@/components/public/ErrorPage')
const AppDown = () => import('@/components/public/AppDown')
const lotterList = () => import('@/components/lotter-all/lotterList')
const lotterAll = () => import('@/components/lotter-all/lotterAll')
const k3s = () => import('@/components/lotter-all/k3')
const sscs = () => import('@/components/lotter-all/ssc')
const klcs = () => import('@/components/lotter-all/klc')
const etfs = () => import('@/components/lotter-all/etf')
const betbj10 = () => import('@/components/lotter-all/lotterbet/betbj10')
const betbjkl8 = () => import('@/components/lotter-all/lotterbet/betbjkl8')
const betetf = () => import('@/components/lotter-all/lotterbet/betetf')
const betk3 = () => import('@/components/lotter-all/lotterbet/betk3')
const betlhc = () => import('@/components/lotter-all/lotterbet/betlhc')
const betssc = () => import('@/components/lotter-all/lotterbet/betssc')
Vue.use(Router)
export default new Router({
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [{
      path: '/ErrorPage',
      name: 'ErrorPage',
      component: ErrorPage,
      meta: {
        title: '操作失败'
      }
    },
    {
      path: "/AppDown",
      name: 'AppDown',
      component: resolve => require(['@/components/public/AppDown.vue'], resolve),
      meta: {
        title: '空白',
      }
    },
    {
      path: "/login",
      name: 'login',
      component: resolve => require(['@/components/login/login.vue'], resolve),
      meta: {
        title: '登陆',
        keepAlive: false,
        index:1
      }
    },
    {
      path: "/registered",
      name: 'registered',
      component: resolve => require(['@/components/login/registered.vue'], resolve),
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/reset",
      name: 'reset',
      component: resolve => require(['@/components/login/reset.vue'], resolve),
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/resetpwd",
      name: 'resetpwd',
      component: resolve => require(['@/components/login/resetpwd.vue'], resolve),
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/resetway",
      name: 'resetway',
      component: resolve => require(['@/components/login/resetway.vue'], resolve),
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/verifyPwdSafe",
      name: 'verifyPwdSafe',
      component: resolve => require(['@/components/login/verifyPwdSafe.vue'], resolve),
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/pk10",
      name: 'betbj10',
      component: resolve => require(['@/components/lotter-all/lotterbet/betbj10.vue'], resolve),
      meta: {
        keepAlive: true
      }
    },
    {
      path: "/betbjkl8",
      name: 'betbjkl8',
      component: resolve => require(['@/components/lotter-all/lotterbet/betbjkl8.vue'], resolve),
      meta: {
        keepAlive: true
      }
    },
    {
      path: "/x11x5",
      name: 'betetf',
      component: resolve => require(['@/components/lotter-all/lotterbet/betetf.vue'], resolve),
      meta: {
        keepAlive: true
      }
    },
    {
      path: "/k3",
      name: 'betk3',
      component: resolve => require(['@/components/lotter-all/lotterbet/betk3.vue'], resolve),
      meta: {
        keepAlive: true
      }
    },
    {
      path: "/betlhc",
      name: 'betlhc',
      component: resolve => require(['@/components/lotter-all/lotterbet/betlhc.vue'], resolve),
      meta: {
        keepAlive: true
      }
    },
    {
      path: "/ssc",
      name: 'betssc',
      component: resolve => require(['@/components/lotter-all/lotterbet/betssc.vue'], resolve),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/lotterList',
      name: 'lotterList',
      redirect: 'lotterList/lotterAll',
      component: resolve => require(['@/components/lotter-all/lotterList.vue'], resolve),
      meta: {
        keepAlive: true
      },
      children: [{
          path: 'lotterAll',
          name: 'lotterAll',
          component: lotterAll,
          meta: {
            keepAlive: true
          }
        },
        {
          path: 'k3s',
          name: 'k3s',
          component: resolve => require(['@/components/lotter-all/k3.vue'], resolve),
          meta: {
            keepAlive: true
          },
        },
        {
          path: 'sscs',
          name: 'sscs',
          component: resolve => require(['@/components/lotter-all/ssc.vue'], resolve),
          meta: {
            keepAlive: true
          },
        },
        {
          path: 'klcs',
          name: 'klcs',
          component: resolve => require(['@/components/lotter-all/klc.vue'], resolve),
          meta: {
            keepAlive: true
          },
        },
        {
          path: 'etfs',
          name: 'etfs',
          component: resolve => require(['@/components/lotter-all/etf.vue'], resolve),
          meta: {
            keepAlive: true
          },
        }
      ]
    },
    {
      path: '/',
      name: 'home',
      redirect: 'one',
      component: home,
      meta: {
        keepAlive: true
      },
      children: [{
          path: 'one',
          name: 'one',
          component: resolve => require(['@/components/home/one.vue'], resolve),
          meta: {
            keepAlive: true
          },
        },
        {
          path: 'second',
          name: 'second',
          component: resolve => require(['@/components/home/second.vue'], resolve),
          meta: {
            keepAlive: true
          },
        },
        {
          path: 'second/past',
          name: 'past',
          component: resolve => require(['@/components/page-second/past.vue'], resolve),
          meta: {
            keepAlive: true
          },
        },
        {
          path: 'three',
          name: 'three',
          component: resolve => require(['@/components/home/three.vue'], resolve),
          meta: {
            keepAlive: true
          }
        },
        {
          path: 'four',
          name: 'four',
          redirect: 'four/winning',
          component: resolve => require(['@/components/home/four.vue'], resolve),
          meta: {
            keepAlive: false
          },
          children: [{
              path: 'winning',
              name: 'winning',
              component: winning,
              meta: {
                keepAlive: true
              }
            },
            {
              path: 'profit',
              name: 'profit',
              component: profit,
              meta: {
                keepAlive: true
              }
            }
          ]
        },
        {
          path: 'five',
          name: 'five',
          component: resolve => require(['@/components/home/five.vue'], resolve),
          meta: {
            keepAlive: false
          }
        },
      ]
    },
    {
      path: '/pop',
      name: 'pop',
      component: resolve => require(['@/components/page-four/pop.vue'], resolve),
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/safety',
      name: 'safety',
      component: safety,
      // component: resolve => require(['@/components/page-five/safety.vue'], resolve),
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/verifyPwd',
      name: 'verifyPwd',
      component: verifyPwd,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/setPwd',
      name: 'setPwd',
      component: setPwd,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/verifySafePwd',
      name: 'verifySafePwd',
      component: verifySafePwd,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/changeSafePwd',
      name: 'changeSafePwd',
      component: changeSafePwd,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/safeMobile',
      name: 'safeMobile',
      component: safeMobile,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/safeEmail',
      name: 'safeEmail',
      component: safeEmail,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/setSafePwd',
      name: 'setSafePwd',
      component: setSafePwd,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/resetWay',
      name: 'resetWay',
      component: resetWay,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/setQuestion',
      name: 'setQuestion',
      component: setQuestion,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/safeQuestion',
      name: 'safeQuestion',
      component: safeQuestion,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/profits',
      name: 'profits',
      component: profits,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/mymsg',
      name: 'mymsg',
      redirect: 'mymsg/notice',
      component: mymsg,
      meta: {
        keepAlive: false
      },
      children: [{
          path: 'notice',
          name: 'notice',
          component: notice,
          meta: {
            keepAlive: false
          }
        },
        {
          path: 'letter',
          name: 'letter',
          component: letter,
          meta: {
            keepAlive: false
          }
        }
      ]
    },
    {
      path: '/detail',
      name: 'detail',
      redirect: 'detail/datum',
      component: detail,
      meta: {
        keepAlive: false
      },
      children: [{
          path: 'datum',
          name: 'datum',
          component: resolve => require(['@/components//page-five/details/datum.vue'], resolve),
          meta: {
            keepAlive: false
          }
        },
        {
          path: 'title',
          name: 'title',
          component: title,
          meta: {
            keepAlive: false
          }
        },

      ]
    },
    {
      path: '/agency',
      name: 'agency',
      component: agency,
      meta: {
        keepAlive: false
      },
    },
    {
      path: '/agentIntro',
      name: 'agentIntro',
      component: agentIntro,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/agentReport',
      name: 'agentReport',
      component: agentReport,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/lowerReport',
      name: 'lowerReport',
      component: lowerReport,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/manageInvite',
      name: 'manageInvite',
      component: manageInvite,
      meta: {
        keepAlive: false
      },
      redirect: 'manageInvite/mInvite',
      children: [{
          path: 'mInvite',
          name: 'mInvite',
          component: mInvite,
          meta: {
            keepAlive: false
          }
        },
        {
          path: 'mIcode',
          name: 'mIcode',
          component: mIcode,
          meta: {
            keepAlive: false
          }
        }
      ]
    },
    {
      path: '/agentMember',
      name: 'agentMember',
      component: agentMember,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/agentBetRecord',
      name: 'agentBetRecord',
      component: agentBetRecord,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/agentBillRecord',
      name: 'agentBillRecord',
      component: agentBillRecord,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/detail/setmobile',
      name: 'setmobile',
      component: resolve => require(['@/components//page-five/details/setmobile.vue'], resolve),
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/detail/setemail',
      name: 'setemail',
      component: resolve => require(['@/components//page-five/details/setemail.vue'], resolve),
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/detail/setmobile',
      name: 'setmobile',
      component: resolve => require(['@/components//page-five/details/setmobile.vue'], resolve),
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/detail/setemail',
      name: 'setemail',
      component: resolve => require(['@/components//page-five/details/setemail.vue'], resolve),
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/bet',
      name: 'bet',
      component: bet,
      meta: {
        keepAlive: true
      },
    },
    {
      path: '/trade',
      name: 'trade',
      component: trade,
      meta: {
        keepAlive: false
      },
    },
    {
      path: '/bankcharge',
      name: 'bankcharge',
      component: bankcharge,
      meta: {
        keepAlive: false
      },
    },
    {
      path: '/weixincharge',
      name: 'weixincharge',
      component: weixincharge,
      meta: {
        keepAlive: false
      },
    },
    {
      path: '/creditccharge',
      name: 'creditccharge',
      component: creditccharge,
      meta: {
        keepAlive: false
      },
    },
    {
      path: '/huabeicharge',
      name: 'huabeicharge',
      component: huabeicharge,
      meta: {
        keepAlive: false
      },
    },
    {
      path: '/alipaycharge',
      name: 'alipaycharge',
      component: alipaycharge,
      meta: {
        keepAlive: false
      },
    },
    {
      path: '/rechargeserch',
      name: 'rechargeserch',
      component: rechargeserch,
      meta: {
        keepAlive: false
      },
    },
    {
      path: '/getCards',
      name: 'getCards',
      component: getCards,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/newCard',
      name: 'newCard',
      component: newCard,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/cashOut',
      name: 'cashOut',
      component: cashOut,
      meta: {
        keepAlive: false
      },
    },
    {
      path: '/agencyOut',
      name: 'agencyOut',
      component: agencyOut,
      meta: {
        keepAlive: false
      },
    },{
      path: '/agencyOuts',
      name: 'agencyOuts',
      component: agencyOuts,
      meta: {
        keepAlive: false
      },
    },
    {
      path: '/service',
      name: 'service',
      component: service,
      meta: {
        keepAlive: false
      },
    },
    {
      path: '/payway',
      name: 'payway',
      component: payway,
      meta: {
        keepAlive: false
      },
    },
  ]
})
