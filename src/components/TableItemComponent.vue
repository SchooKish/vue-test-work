<template>
  <div>
    <div class="table__body-row" v-for="contact in contacts" :key="contact.id">
      <div class="table__body-row-item">
        <div class="table__cell table__body-cell" :style="`width: ${width}px`">{{ contact.name }}</div>
        <div class="table__cell table__body-cell" style="width: 200px">{{ formatedNumber(contact.phone) }}</div>
      </div>
      <div v-if="contact.children.length > 0" class="table__item">
        <TableItemComponent  :contacts="contact.children" :width="width - 5"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TableItemComponent',
  props: {
    contacts: [Object, Array],
    width: Number
  },

  methods: {
    formatedNumber(number) {
      return number.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/g, '+7 $1 $2 $3 $4')
    }
  }
}
</script>
