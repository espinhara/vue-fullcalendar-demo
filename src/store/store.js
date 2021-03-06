import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)


export const store = new Vuex.Store({
    state:{
        events:[]
    },
    getters:{
        EVENTS: state => state.events
    },
    mutations:{
        ADD_EVENT: (state, event)=>{
            state.events.push(event)
        },
        UPDATE_EVENT: (state, {id, title, start, end, description})=>{
            let index = state.events.findIndex(_event => _event.id == id)
            state.events[index].end = end
            state.events[index].start = start
            state.events[index].title = title
            state.events[index].description = description
        },
        DELETE_EVENT: (state, event)=>{
            let index = state.events.findIndex(_event => _event.id == event.id)
            state.events.splice(index, 1)
        },
        REMOVE_ALL_EVENT: (state)=>{
            for (let i = 0; i < state.events.length; i++) {
                state.events.splice(i);
            }
        }
    },
})