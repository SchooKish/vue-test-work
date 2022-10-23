<template>
  <button class="button" @click="$emit('click')">{{ text }}</button>
</template>

<script>
export default {
  name: 'ButtonComponent',
  props: {
    text: {
      type: String,
      default: 'кнопка'
    }
  }
}
</script>

<style lang="scss">
.button {
  padding: 5px 10px;
  width: fit-content;
  border: 1px solid #000;
  border-radius: 10px;
  text-transform: uppercase;
  background-color: #4af1c7;
  cursor: pointer;
  transition: .3s;

  &:hover {
    transition: .3s;
    box-shadow: 0 0 5px;
  }
}
</style>
