<template>
  <transition name="fade">
    <div class="modal__overlay">
      <div class="modal" >
        <div  class="modal__title">
          <slot name="title">
            Title
          </slot>
        </div>

        <div class="modal__body">
          <slot name="body">
            Body
          </slot>
        </div>

        <div class="modal__close-btn" @click="$emit('close')">
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  </transition>

</template>

<script>
import ButtonComponent from './ButtonComponent.vue'
export default {
  name: 'ModalComponent',
  components: { ButtonComponent }
}
</script>

<style lang="scss">
.modal {
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  width: 500px;
  display: flex;
  flex-direction: column;
  position: relative;

  &__overlay {
    height: 100vh;
    width: 100vw;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, .5);
  }

  &__title {
    font-size: 24px;
    padding-bottom: 20px;
    border-bottom: 1px solid #000;
  }

  &__body {
    font-size: 18px;
  }

  &__close-btn {
    position: absolute;
    right: 10px;
    top: 10px;
    cursor: pointer;
    width: 20px;
    height: 20px;

    & > div {
      height: 20px;
      width: 1px;
      background-color: #000;
      position: absolute;
      top: 0;
      left: 10px;

      &:first-child {
        transform: rotate(45deg);
      }
      &:last-child {
        transform: rotate(-45deg);
      }
    }
  }
}
</style>
