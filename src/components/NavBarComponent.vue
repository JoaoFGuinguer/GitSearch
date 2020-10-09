<template>
  <div class="bg-navbar">

    <div class="container navbar">
      <div class="navbar__mobile">
      <q-icon class="navbar__icon" name="arrow_back" @click="backPage"/>
      <p>{{ pageName }}</p>
      </div>
      <div class="navbar__desktop">
      <img src="../../public/icons/githubIcon.svg" alt="github icon" class="navbar__desktop-icon" @click="backHome">

      <h4>GitSearch</h4>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'NavBarComponent',
  props: {
    pageName: {
      type: String,
      required: true
    },
    pageReturn: {
      type: String,
      required: true
    }
  },
  methods: {
    backPage () {
      this.$router.back()
    },
    backHome () {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss">
  .bg-navbar {
    background-color: #fff;
    box-shadow: 0 1px 3px rgba(0,0,0,0.2), 0 1px 2px rgba(0,0,0,0.2);
  }
  .navbar {
    max-height: 200px;
    padding: 20px 10px 20px 20px;
    border-bottom: 2px solid #90A4AE;

    @media screen and (min-width: 768px) {
      border: none;
    }

    p {
      font-size: 20px;
      font-weight: 600;
      padding-bottom: 2px;
    }
    &__mobile {
      display: flex;
      align-items: center;

      @media screen and (min-width: 768px) {
        display: none;
        border: none;
      }
    }
    &__desktop {
      display: none;
      border-bottom: none;
      h4 {
        font-size: 25px;
        font-weight: 600;
      }
      @media screen and (min-width: 768px) {
        display: flex;
        align-items: center;
      }
      &-icon {
        max-width: 60px;
        margin-right: 10px;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
  .navbar__icon {
    font-size: 2.5em;
    font-weight: 500;
    color: #90A4AE;
    padding-right: 10px;

    &:hover {
      cursor: pointer;
    }
  }
</style>
