import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home/home'
import one from '@/components/home/one'
import three from '@/components/home/three'
import four from '@/components/home/four'
import five from '@/components/home/five'
import login from '@/components/login/login'
import registered from '@/components/login/registered'
import reset from '@/components/login/reset'
import resetpwd from '@/components/login/resetpwd'
import resetway from '@/components/login/resetway'
import verifyPwdSafe from '@/components/login/verifyPwdSafe'
import winning from '@/components/page-four/winning'
import profit from '@/components/page-four/profit'
import pop from '@/components/page-four/pop'
import bet from '@/components/page-five/money/bet'
import service from '@/components/page-five/service'
import recharge from '@/components/page-five/money/recharge'
import rechargeserch from '@/components/page-five/money/rechargeserch'
import cashOut from '@/components/page-five/money/cashOut'
import trade from '@/components/page-five/money/trade'
import agency from '@/components/page-five/agency'
import agentBetRecord from '@/components/page-five/agency/agentBetRecord'
import agentBillRecord from '@/components/page-five/agency/agentBillRecord'
import agentIntro from '@/components/page-five/agency/agentIntro'
import agentMember from '@/components/page-five/agency/agentMember'
import agentReport from '@/components/page-five/agency/agentReport'
import lowerReport from '@/components/page-five/agency/lowerReport'
import manageInvite from '@/components/page-five/agency/manageInvite'
import mIcode from '@/components/page-five/agency/manageInvite/mIcode'
import mInvite from '@/components/page-five/agency/manageInvite/mInvite'
import detail from '@/components/page-five/detail'
import datum from '@/components/page-five/details/datum'
import setmobile from '@/components/page-five/details/setmobile'
import setemail from '@/components/page-five/details/setemail'
import title from '@/components/page-five/details/title'
import mymsg from '@/components/page-five/mymsg'
import letter from '@/components/page-five/mymsg/letter'
import notice from '@/components/page-five/mymsg/notice'
import profits from '@/components/page-five/profit'
import safety from '@/components/page-five/safety'
import verifyPwd from '@/components/page-five/safety/verifyPwd'
import setPwd from '@/components/page-five/safety/setPwd'
import getCards from '@/components/page-five/safety/getCards'
import newCard from '@/components/page-five/safety/newCard'
import verifySafePwd from '@/components/page-five/safety/verifySafePwd'
import changeSafePwd from '@/components/page-five/safety/changeSafePwd'
import safeMobile from '@/components/page-five/safety/safeMobile'
import safeEmail from '@/components/page-five/safety/safeEmail'
import setSafePwd from '@/components/page-five/safety/setSafePwd'
import resetWay from '@/components/page-five/safety/resetWay'
import setQuestion from '@/components/page-five/safety/setQuestion'
import safeQuestion from '@/components/page-five/safety/safeQuestion'
import ErrorPage from '@/components/public/ErrorPage'
import lotterList from '@/components/lotter-all/lotterList'
import lotterAll from '@/components/lotter-all/lotterAll'
import k3s from '@/components/lotter-all/k3'
import sscs from '@/components/lotter-all/ssc'
import klcs from '@/components/lotter-all/klc'
import etfs from '@/components/lotter-all/etf'
import betbj10 from '@/components/lotter-all/lotterbet/betbj10'
import betbjkl8 from '@/components/lotter-all/lotterbet/betbjkl8'
import betetf from '@/components/lotter-all/lotterbet/betetf'
import betk3 from '@/components/lotter-all/lotterbet/betk3'
import betlhc from '@/components/lotter-all/lotterbet/betlhc'
import betssc from '@/components/lotter-all/lotterbet/betssc'


Vue.use(Router)
export default new Router({
    mode: 'history',
    routes: [{
            path: '/ErrorPage',
            name: 'ErrorPage',
            component: ErrorPage,
            meta: {
                title: '操作失败'
            }
        },
        {
            path: "/login",
            name: 'login',
            component: resolve => require(['@/components/login/login.vue'], resolve),
            meta: {
                title: '登陆',
                keepAlive: false
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
                keepAlive: false
            },
            children: [{
                    path: 'lotterAll',
                    name: 'lotterAll',
                    component: lotterAll,
                    meta: {
                        keepAlive: false
                    }
                },
                {
                    path: 'k3s',
                    name: 'k3s',
                    component: resolve => require(['@/components/lotter-all/k3.vue'], resolve),
                    meta: {
                        keepAlive: false
                    },
                },
                {
                    path: 'sscs',
                    name: 'sscs',
                    component: resolve => require(['@/components/lotter-all/ssc.vue'], resolve),
                    meta: {
                        keepAlive: false
                    },
                },
                {
                    path: 'klcs',
                    name: 'klcs',
                    component: resolve => require(['@/components/lotter-all/klc.vue'], resolve),
                    meta: {
                        keepAlive: false
                    },
                },
                {
                    path: 'etfs',
                    name: 'etfs',
                    component: resolve => require(['@/components/lotter-all/etf.vue'], resolve),
                    meta: {
                        keepAlive: false
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
            path: '/recharge',
            name: 'recharge',
            component: recharge,
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
          path: '/service',
          name: 'service',
          component: service,
          meta: {
              keepAlive: false
          },
      },
    ]
})