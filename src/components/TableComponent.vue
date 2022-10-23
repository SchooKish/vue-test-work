<template>
  <div class="table">
    <div class="table__head-row">
      <div class="table__cell table__head-cell table__head-btn" @click="switchSorting">
        Имя
      </div>
      <div class="table__cell table__head-cell">
        Номер
      </div>
    </div>
      <TableItemComponent :contacts="getSortingContacts" :width="200"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import getContactsStructure from './getContactsStructure'
import TableItemComponent from './TableItemComponent.vue'

export default {
  name: 'TableComponent',

  components: { TableItemComponent },

  data() {
    return {
      sorting: null
    }
  },

  methods: {
    switchSorting() {
      if (this.sorting === null) {
        this.sorting = 'up'
      } else if (this.sorting === 'up') {
        this.sorting = 'down'
      } else if (this.sorting === 'down') {
        this.sorting = null
      }
    }
  },

  computed: {
    ...mapState(['contacts']),

    getSortingFunc() {
      let sortFunc

      if (this.sorting === 'up') {
        sortFunc = function(d1, d2) { return (d1.name.toLowerCase() > d2.name.toLowerCase()) ? 1 : -1 }
      } else if (this.sorting === 'down') {
        sortFunc = function(d1, d2) { return (d1.name.toLowerCase() < d2.name.toLowerCase()) ? 1 : -1 }
      }

      return sortFunc
    },

    getContacts() {
      return getContactsStructure(this.contacts)
    },

    sortContacts() {
      let sortingFunc = this.getSortingFunc

      let contacts = this.getContacts
      contacts.forEach(item => {
        item.children = sortChildren(item.children)
      })
      contacts.sort(sortingFunc)

      function sortChildren(children) {
        children.forEach(item => {
          item.children = sortChildren(item.children)
        })
        return children.sort(sortingFunc)
      }

      return contacts
    },

    getSortingContacts() {
      if (this.sorting === null) {
        return this.getContacts
      } else {
        return this.sortContacts
      }
    }
  }
}
</script>

<style lang="scss">
.table {
  width: fit-content;
  color: #fff;

  &__head-row {
    display: flex;
    justify-content: space-between;
  }

  &__head-row > &__head-cell{
    &:first-child {
      border-top-left-radius: 10px;
    }

    &:last-child {
      border-top-right-radius: 10px;
    }
  }

  &__head-cell {
    background-color: rgb(55, 33, 175);
    width: 200px;
    display: flex;
    justify-content: center;
  }

  &__body-cell {
    background-color:#4af1c7;
    color: #000;
  }

  &__cell {
    border: 1px solid #fff;
    padding: 10px;
  }

  &__item {
    display: flex;
    justify-content: end;
  }

  &__body-row-item {
    display: flex;
  }

  &__head-btn {
    cursor: pointer;
  }
}
</style>
