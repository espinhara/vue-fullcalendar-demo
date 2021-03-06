import Vue from 'vue'
import Router from 'vue-router'

const Agenda = () => import('../components/Agenda')

Vue.use(Router)

export default new Router({
    routes:[
        {
            path:'/',
            component:Agenda
        }
    ]

})