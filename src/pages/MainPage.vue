<template>
  <section class="main-page">
    <TableComponent />

    <div>
      <ButtonComponent text="добавить" @click="openModal = true"/>
      <ButtonComponent text="очистить LS" @click="cleanLS" />
    </div>

    <ModalComponent v-if="openModal" @close="closeModal">
      <template #title>
        Добавление пользователя
      </template>

      <template #body>
        <form class="main-page__form">
          <div v-if="error" >Заполните все поля таблицы</div>

          <div class="main-page__form-row">
            <label for="name">Имя</label>
            <input
              v-model="formData.name"
              type="text"
              id="name"
            >
          </div>

          <div class="main-page__form-row">
            <label for="phone">Телефон</label>
            <input
              v-model="formData.phone"
                type="phone"
                id="phone"
                v-mask="['+7 ### ### ## ##']"
              >
          </div>

          <div class="main-page__form-row">
            <label for="chief">Начальник</label>
            <select v-model="formData.chief" id="chief">
              <option disabled selected :value="undefined">
                Выбирите своего начальника
              </option>
              <option
                v-for="chief in getChiefs"
                :key="chief.id"
                :value="chief.id"
              >
                {{chief.name}}
              </option>
            </select>
          </div>
        </form>

        <ButtonComponent text="сохранить" @click="saveContact"/>
      </template>
    </ModalComponent>
  </section>
</template>

<script>
import TableComponent from '../components/TableComponent.vue'
import ButtonComponent from '../components/ButtonComponent.vue'
import ModalComponent from '../components/ModalComponent.vue'
import { mapGetters, mapMutations } from 'vuex'
import { getFromLocalStorage, cleanLocalStorage } from '../store/storageService'
export default {
  name: 'MainPage',
  components: { TableComponent, ButtonComponent, ModalComponent },
  data() {
    return {
      openModal: false,
      error: false,
      formData: {
        name: '',
        phone: '',
        chief: undefined
      }
    }
  },

  mounted() {
    if (localStorage.contacts !== undefined) {
      let contacts = getFromLocalStorage('contacts')
      this.writeContactsFromLocalStorage(contacts)
    }
  },

  methods: {
    ...mapMutations(['saveNewContact', 'writeContactsFromLocalStorage']),

    saveContact() {
      let valid = !!this.formData.name && !!this.formData.phone
      if (valid) {
        let contactData = {
          id: this.getNewId,
          name: this.formData.name,
          phone: this.formData.phone,
          chief: this.formData.chief === undefined
        }

        this.saveNewContact({
          contactData,
          chief: this.formData.chief
        })

        this.closeModal()
      } else {
        this.error = true
      }
    },

    closeModal() {
      this.formData.name = ''
      this.formData.phone = ''
      this.formData.chief = undefined
      this.openModal = false
    },

    cleanLS() {
      cleanLocalStorage('contacts')
      location.reload()
    }
  },

  computed: {
    ...mapGetters(['getChiefs', 'getNewId'])
  }
}
</script>

<style lang="scss">
.main-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;

  &__form-row {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
  }
}
</style>
