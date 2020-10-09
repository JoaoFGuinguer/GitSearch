<template>
  <div>
    <nav-bar-component :pageName="pageName" :pageReturn="pageReturn"/>
    <div class="bg-template q-pa-sm">

      <div class="container list-users q-pa-md">

        <div class="list-users__title">
          <h3>Search Results</h3>
        </div>

        <div class="list-users__card q-px-md" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="itensToShow">
          <list-user
            v-for="user in usersToShow"
            :key="user.id"
            :id="user.id"
            :img="user.avatar_url"
            :name="user.login"
            class=""
            />

        </div>
        <div v-if="!search" style="text-align: center; padding-top: 1px">
          <q-btn
            :loading="loading"
            color="primary"
            label="Carregar Mais"
            @click="searchAll"
            />
        </div>
        <div v-if="usersToShow.length > 1 && search" style="text-align: center; padding-top: 10px">
            <p>fim da lista</p>
        </div>
        <div v-if="usersToShow.length < 1" style="text-align: center; padding-top: 1px">
          <h4>Não foi encontrado nenhum resultado</h4>
        </div>

      </div>
    </div>
  </div>

</template>

<script>
import NavBarComponent from '../components/NavBarComponent'
import ListUser from '../components/ListUser'
import infiniteScroll from 'vue-infinite-scroll'

export default {
  name: 'listusers',
  data () {
    return {
      pageName: 'Lista de Usuários',
      pageReturn: '/',
      search: '',
      users: [],
      usersSave: [],
      linkNext: '',
      projectsToShow: [],
      itensToShow: 10,
      usersToShow: [],
      busy: false,
      loading: false
    }
  },
  methods: {
    getUsersToShow () {
      this.usersToShow = this.users.slice(0, this.itensToShow)
    },
    loadMore () {
      this.itensToShow += 10
      this.getUsersToShow()
      // console.log(this.usersToShow.length)
    },
    searchAll () {
      this.loading = true
      this.$axios.get(`${this.linkNext}`)
        .then(response => {
          this.loading = false
          this.users = response.data
          console.log(this.users)
          if (response.headers.link) {
            this.linkUser = response.headers.link.split(',')
            this.linkUserNext = this.linkUser.map(a => {
              return {
                url: a.split(';')[0].replace('>', '').replace('<', ''),
                title: a.split(';')[1]
              }
            })
            this.linkUserNext = this.linkUserNext[0].url
            this.linkNext = this.linkUserNext
          }
          this.getUsersToShow()
          window.scrollTo(0, 0)
        })
    }
  },
  mounted () {
    if (localStorage.userslist) {
      this.users = JSON.parse(localStorage.userslist)
      this.getUsersToShow()
    }
    if (localStorage.search) {
      this.search = localStorage.search
    }
    if (localStorage.linkUserNext) {
      this.linkNext = localStorage.linkUserNext
    }
  },
  components: {
    NavBarComponent,
    ListUser
  },
  directives: {
    infiniteScroll
  }
}
</script>

<style lang="scss">
  .list-users {
    background-color: #fff;

    &__title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 20px;
      border: none;
      @media screen and (min-width: 768px){
        border-bottom: 1px solid #EDEDED;
        padding: 0 40px;
      }
      h3 {
        display: none;
        font-size: 40px;
        font-weight: 600;
        @media screen and (min-width: 768px){
          display: block;
        }
      }
    }
    @media screen and (min-width: 768px) {
      margin-top: 30px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.2), 0 1px 2px rgba(0,0,0,0.2);

    }
  }
  .list-users__card {
    @media screen and (min-width: 768px) {
      display: flex;
      flex-wrap: wrap;
      padding: 50px 100px;
    }
  }
</style>
