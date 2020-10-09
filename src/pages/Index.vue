<template>
  <div class="container main q-px-lg">

    <div class="main__content">
      <img src="../../public/icons/githubIcon.svg" alt="github icon">
      <h2>GitSearch</h2>

      <div class="main__input">
        <q-input class="" outlined v-model="search" label="Pesquisar..." />
      </div>

      <div class="main__buttons">
        <q-btn
          no-caps
          class="btn btn-primary"
          :loading="loading2"
          label="Ver Todos"
          @click="verTodos"
           />

        <q-btn
          no-caps
          class="btn btn-secundary"
          :loading="loading1"
          @click="searchUser"
          label="Buscar" />

      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      search: '',
      loading1: false,
      loading2: false,
      users: '',
      linkUsers: '',
      teste: ''
    }
  },
  methods: {
    searchUser () {
      if (this.search !== '') {
        this.loading1 = true
        this.$axios.get(`https://api.github.com/search/users?q=${this.search}&page=1`)
          .then(response => {
            this.loading1 = false
            this.users = response.data.items
            localStorage.userslist = JSON.stringify(this.users)
            localStorage.search = this.search
            // console.log(this.users)
            // if (response.headers.link) {
            //   this.linkUser = response.headers.link.split(',')
            //   this.linkUserNext = this.linkUser.map(a => {
            //     return {
            //       url: a.split(';')[0].replace('>', '').replace('<', ''),
            //       title: a.split(';')[1]
            //     }
            //   })
            // this.linkUserNext = this.linkUserNext[0].url
            // localStorage.linkUserNext = this.linkUserNext
            // }
            this.$router.push({
              name: 'listusers',
              params: { user: this.users, linkNext: this.linkUserNext }
            })
          })
      }
    },
    verTodos () {
      this.loading2 = true
      this.$axios.get('https://api.github.com/users?since=0')
        .then(response => {
          this.loading1 = false
          this.users = response.data
          console.log(this.users)
          localStorage.userslist = JSON.stringify(this.users)
          localStorage.search = ''
          if (response.headers.link) {
            this.linkUser = response.headers.link.split(',')
            this.linkUserNext = this.linkUser.map(a => {
              return {
                url: a.split(';')[0].replace('>', '').replace('<', ''),
                title: a.split(';')[1]
              }
            })
            this.linkUserNext = this.linkUserNext[0].url
            localStorage.linkUserNext = this.linkUserNext
          }
          this.$router.push({
            name: 'listusers',
            params: { user: this.users, linkNext: this.linkUserNext }
          })
        })
    }
  }
}
</script>
<style lang="scss">
  .main {
    margin-top: 200px;
    text-align: center;
    max-width: 768px;
    img {
      width: 140px;
    }

    h2 {
      margin: 10px 0;
    }

    &__input {
      margin: 40px 0 5px 0;
    }

    &__buttons {
      display: flex;
      justify-content: space-between;
      padding: 14px 0;
    }
  }

</style>
