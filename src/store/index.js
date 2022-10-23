import Vue from 'vue'
import Vuex from 'vuex'
import { saveInLocalStorage } from './storageService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    contacts: [
      {
        id: 0,
        name: 'Марина',
        phone: '9411232323',
        children: [],
        chief: true
      },
      {
        id: 1,
        name: 'Петя',
        phone: '9411232323',
        children: [],
        chief: true
      }
    ]
  },

  mutations: {
    saveNewContact(state, data) {
      let contact = data.contactData
      contact.children = []
      state.contacts.push(contact)

      const contactId = data.contactData.id
      const chiefId = data.chief

      if (chiefId !== undefined) {
        let chiefIndex = state.contacts.findIndex(item => item.id === chiefId)
        state.contacts[chiefIndex].children.push(contactId)
      }
      saveInLocalStorage('contacts', state.contacts)
    },

    writeContactsFromLocalStorage(state, data) {
      state.contacts = data
    }
  },

  getters: {
    getChiefs(state) {
      return state.contacts.map(item => {
        return {
          id: item.id,
          name: item.name
        }
      })
    },

    getNewId(state) {
      let ids = state.contacts.map(item => item.id)
      return Math.max(...ids) + 1
    }
  }

})
