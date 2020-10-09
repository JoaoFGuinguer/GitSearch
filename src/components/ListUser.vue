<template>
  <!-- <div></div> -->
  <q-item
    clickable
    v-ripple
    class="userlist q-py-md"
    @click="toPerfilPage"
  >
    <q-item-section avatar class="userlist__item">
        <img :src="img" class="avatar"/>
    </q-item-section>

    <q-item-section>
      <p class="userlist__name">{{ name }}</p>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: 'ListUser',
  data () {
    return {
    }
  },
  props: {
    id: {
      type: Number,
      required: true
    },
    img: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  methods: {
    toPerfilPage () {
      this.$router.push(`/user/${this.name}`)
    }
  }
}
</script>

<style lang="scss">
  .userlist {
    border-bottom: 0.5px solid rgba(0, 0, 0, 0.5);
    &:last-child {
    border: none;
    }
    @media screen and (min-width: 768px) {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 40px 1px;
      width: 20%;
      border: 0.5px solid #DEDEDE;
      &:last-child {
        border: 0.5px solid #DEDEDE;
      }
    }
  }

  .avatar {
    max-width: 5em;
    border-radius: 50%;
    @media screen and (min-width: 768px) {
      max-width: 7.5em;
      margin-bottom: 15px;
    }
  }
  .userlist__name {
    font-size: 18px;
    color: #162668;
    font-weight: 600;
    padding-left: 15px;
    @media screen and (min-width: 768px) {
      padding-left: 0;
      font-size: 1rem;
      padding-top: 5px;
    }
  }
  .userlist__item {
    padding-right: 0;
  }
</style>
