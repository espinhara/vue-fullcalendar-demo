<template>
  <v-container app-data="true" fluid class="pt-0 grid-list-xl">
    <Fullcalendar :options="{
      ...calendarOptions,
      events:this.$store.state.events

    }"  />
    <template>
      <div>
        <v-dialog
          v-model="scheduleModal"
          persistent
          scrollable
          max-width="600px"
        >
          <v-card>
            <v-card-title class="text-uppercase flex-column align-start">
              <h2> Anotações #{{model.id}} </h2>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <div>
                <v-label>Título</v-label>
                <v-text-field
                  v-model="model.title"
                  class="mt-3"
                  dense
                  outlined
                ></v-text-field>
              </div>
              <div>
                <v-label>Inicio</v-label>
                <v-text-field
                  v-model="model.start"
                  class="mt-3"
                  dense
                  outlined
                ></v-text-field>
              </div>
              <div>
                <v-label>Fim</v-label>
                <v-text-field
                  v-model="model.end"
                  class="mt-3"
                  dense
                  outlined
                ></v-text-field>
              </div>
              <div>
                <v-label>Observações</v-label>
                <v-textarea
                  v-model="model.description"
                  class="mt-3"
                  dense
                  outlined
                ></v-textarea>
              </div>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions class="justify-space-between">
              <v-btn color="grey" class="white--text" @click="close">
                Voltar
              </v-btn>
              <v-btn v-if="model.id" @click="deleteNote(model)">
                Deletar
              </v-btn>
              <v-btn v-if="model.id" @click="updateModal({...model})">
                Atualizar
              </v-btn>
              <v-btn v-else color="primary" @click="save">
                Finalizar Anotação
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
      <v-snackbar
      v-model="snackbar"
      absolute
      right
      shaped
      top
    >
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="success"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
    </template>
  </v-container>
</template>

<script>
import Fullcalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
const path = require('path')
// import fs from 'fs'

// import moment from "moment";

import { mapGetters } from "vuex";
export default {
  data() {
    return {
      text: 'sample sanack',
      snackbar:false,
      scheduleModal: false,
      model: {
        title: "",
        description: "",
        start: null,
        end: null,
        allDay:false,
      },
      calendarOptions: {
        plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
        initialView: "listYear",
        headerToolbar: {
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth listYear",
        },
        weekends: true,
        selectable: true,
        editable: true,
        locale: "br",
        buttonText: {
          today: "Hoje",
          month: "Mês",
          day: "Dia",
          week: "Semana",
          list: "Lista",
        },
        // events: EVENT,
        select: this.handleDateSelect,
        eventClick: this.handleDateClick,
        eventResize: this.update,
        eventDrop: this.update,
        eventRender: this.render
      },
    };
  },
  computed: {
    ...mapGetters(["EVENTS"]),
  },
  components: { Fullcalendar },
  methods: {
    load() {
      var pathTest = path.resolve(__dirname, 'docs')
    },
    close() {
      this.scheduleModal = false;
      this.model = {}
    },
    render(arg){
      console.log(arg)
    },
    save() {
      this.$store.commit("ADD_EVENT",{
        id:(new Date()).getTime(),
        title:this.model.title,
        start:this.model.start,
        end:this.model.end,
        description:this.model.description,
        allDay:this.model.allDay,
      })
      this.scheduleModal = false;
      this.load()
      this.snackbar = true
      this.text =  'Anotação finalizada com sucesso.'
    },
    update(arg){
      let args= arg
      if(arg.event){
        this.model.title = args.event.title
        this.model.id= args.event.id?args.event.id:null
        this.model.allDay = args.event.allDay
        this.model.description = args.event.extendedProps.description
        this.model.start = args.event.startStr
        this.model.end = args.event.endStr
        this.$store.commit('UPDATE_EVENT',this.model)
        this.load()
        this.snackbar = true
        this.text =  'Anotação atualizada com sucesso.'
      }
    },
    updateModal(model){
      this.$store.commit('UPDATE_EVENT',model)
      this.scheduleModal = false;
      this.model ={}
      this.load()
      this.snackbar = true
      this.text =  'Anotação atualizada com sucesso.'
    },
    handleDateSelect(arg) {
      if(arg.event){
        let args = arg
        this.model.title = args.event.title
        this.model.id= args.event.id?args.event.id:null
        this.model.allDay = args.event.allDay
        this.model.description = args.event.extendedProps.description
        this.model.start = args.event.startStr
        this.model.end = args.event.endStr
        this.scheduleModal = true;
      }else{
        this.model.title = "Something"
        this.model.allDay = arg.allDay
        this.model.description = "Something"
        this.model.start = arg.start
        this.model.end = arg.end
        this.scheduleModal = true
      }
    },
    deleteNote(event){
      this.$store.commit('DELETE_EVENT', event)
      this.close()
      this.load()
    },
    handleDateClick(arg) {
      if(arg.event){
        let args = arg
        this.model.title = args.event.title
        this.model.id= args.event.id?args.event.id:null
        this.model.allDay = args.event.allDay
        this.model.description = args.event.extendedProps.description
        this.model.start = args.event.startStr
        this.model.end = args.event.endStr
        this.scheduleModal = true;
      }else{
        this.model.title = "Something"
        this.model.allDay = arg.allDay
        this.model.description = "Something"
        this.model.start = arg.start
        this.model.end = arg.end
        this.scheduleModal = true
      }
    }
  },
  mounted() {
    this.load();
  },
};
</script>
