<template>
  <div class="">
    <div class="">
      <nav-bar-component :pageName="pageName" :pageReturn="pageReturn"/>
    </div>
    <div class="bg-template">

      <div class="container user__profile">
        <div class="profile_mobile">

          <div class="profile bg-img">
            <img :src="userProfileData.avatar_url" class="profile__avatar"/>
          </div>

          <div class="profile__login">
            <h4>{{ userProfileData.name }}</h4>
            <p><q-icon name="person" class="q-mr-xs"/>{{ userProfileData.login }}</p>
          </div>

          <div class="profile__info">

            <div class="profile__following">
              <p><q-icon name="person_pin" class="profile__info-icons q-mr-sm"/>{{ userProfileData.following }}</p>
              <p>Seguindo</p>
            </div>

            <div class="profile__public_repos">
              <p><q-icon name="folder_open" class="profile__info-icons q-mr-sm"/>{{ userProfileData.public_repos }}</p>
              <p>Projetos</p>
            </div>

            <div class="profile__followers">
              <p><q-icon name="groups" class="profile__info-icons q-mr-sm"/>{{ userProfileData.followers }}</p>
              <p>Seguidores</p>
            </div>
          </div>

        </div>

        <div class="profile_desktop bg-img q-mb-lg">

          <div class="profile">
            <img :src="userProfileData.avatar_url" class="profile__avatar"/>
          </div>

          <div class="profile__login">
            <h4>{{ userProfileData.name }}</h4>
            <p><q-icon name="person" class="q-mr-xs"/>{{ userProfileData.login }}</p>
          </div>

          <div class="profile__info">

            <div class="profile__following">
              <p><q-icon name="person_pin" class="profile__info-icons q-mr-sm"/>{{ userProfileData.following }}</p>
              <p>Seguindo</p>
            </div>

            <div class="profile__public_repos">
              <p><q-icon name="folder_open" class="profile__info-icons q-mr-sm"/>{{ userProfileData.public_repos }}</p>
              <p>Projetos</p>
            </div>

            <div class="profile__followers">
              <p><q-icon name="groups" class="profile__info-icons q-mr-sm"/>{{ userProfileData.followers }}</p>
              <p>Seguidores</p>
            </div>
          </div>

        </div>

        <q-tabs
          v-model="tab"
          class="bg-grey-2 text-grey-7 text-text"
          active-color="dark"
          indicator-color="blue"
          no-caps>

          <q-tab name="sobre" label="Sobre" class="q-pa-md"/>
          <q-tab name="projetos" label="Projetos" class="q-pa-md"/>

        </q-tabs>

        <q-tab-panels
            v-model="tab"
            animated
            swipeable
            transition-prev="jump-up"
            transition-next="jump-up"
          >
            <q-tab-panel name="sobre" class="sobre">

              <p class="noinfo" v-if="!userProfileData.bio && !userProfileData.location && !userProfileData.blog">You don't have any information yet.</p>

              <div v-if="userProfileData.bio" class="sobre__bio">
                <h5>Bio</h5>
                <p>{{ userProfileData.bio }}</p>
              </div>

              <div v-if="userProfileData.location" class="sobre__location">
                <h5><q-icon name="home" class="sobre__icon q-mr-sm"/>{{ userProfileData.location }}</h5>
              </div>

              <div v-if="userProfileData.blog" class="sobre__blog">
                <h5><q-icon name="laptop" class="sobre__icon q-mr-sm"/>{{ userProfileData.blog }}</h5>
              </div>

            </q-tab-panel>

            <q-tab-panel name="projetos" >
              <div>

                <lista-projetos
                  v-for="userproject in reposToShow"
                  :key="userproject.id"
                  :id="userproject.id"
                  :name="userproject.name"
                  :description="userproject.description"
                  :language="userproject.language"
                  :link="userproject.html_url"

                  :update="new Date(userproject.updated_at).toLocaleDateString()"

                />
              </div>
              <div v-if="userprojects.length > 10" style="text-align: center; padding-top: 10px">
                <p>fim da lista</p>
              </div>
              <div v-if="userprojects.length < 1" style="text-align: center; padding-top: 1spx">
                <h4>Não foi encontrado nenhum resultado</h4>
              </div>
            </q-tab-panel>

          </q-tab-panels>

      </div>
    </div>
  </div>

</template>

<script>
import NavBarComponent from '../components/NavBarComponent'
import ListaProjetos from '../components/ListaProjetos'
import infiniteScroll from 'vue-infinite-scroll'

export default {
  name: 'Perfil',
  data () {
    return {
      pageName: 'Perfil',
      pageReturn: '/list',
      userProfile: '',
      userProfileData: {},
      userprojects: [],
      tab: 'sobre',
      limitToShow: 8,
      reposToShow: [],
      busy: false
    }
  },
  components: {
    NavBarComponent,
    ListaProjetos
  },
  methods: {
    getReposToShow () {
      this.reposToShow = this.userprojects.slice(0, this.limitToShow)
    },
    loadMore2 () {
      this.limitToShow += 8
      this.getReposToShow()
    },
    scroll () {
      window.onscroll = () => {
        const bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight

        if (bottomOfWindow) {
          this.loadMore2()
        }
      }
    }
  },
  created () {
    this.userProfile = this.$route.params.pathMatch
    this.$axios.get(`https://api.github.com/users/${this.userProfile}`)
      .then(response => {
        this.userProfileData = (response.data)
      })

    this.$axios.get(`https://api.github.com/users/${this.userProfile}/repos`)
      .then(response => {
        this.userprojects = response.data
        // console.log(this.userprojects)
        this.getReposToShow()
      })
    this.scroll()
  },
  directives: {
    infiniteScroll
  }
}
</script>

<style lang="scss">
  .bg-img {
    background-color: #fff;
    background-image: url('../assets/imgProfile.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    @media screen and (min-width: 768px) {
        height: 250px;
    }
  }

  .profile_mobile {
      @media screen and (min-width: 768px) {
        display: none;
      }
  }

  .profile_desktop {
    display: none;
    @media screen and (min-width: 768px) {
      display: flex;
      justify-content: space-around;
      align-items: flex-end;
    }
  }

  .tabs_mobile {
      @media screen and (min-width: 768px) {
        display: none;
      }
  }

  .tabs_desktop {
    @media screen and (max-width: 768px) {
      display: none;
    }
  }

  .user__profile {
    @media screen and (min-width: 768px) {
      box-shadow: 0 1px 3px rgba(0,0,0,0.2), 0 1px 2px rgba(0,0,0,0.2);
    }
  }

  .q-tab__label {
    font-size: 18px;
    font-weight: 600;
  }
  .q-tab {
    width: 100% ;
  }
  .q-tab:last-child{
    border-left: 1px solid #d4d4d4;
  }
  .profile {
    display: flex;
    justify-content: center;
    @media screen and (min-width: 768px) {
      justify-content: flex-start;
      padding-left: 20px;
    }
    &__avatar {
      position: relative;
      margin-top: 25px;
      top: 25px;
      width: 175px;
      border-radius: 50%;
      border: 3px solid white;
    }
    &__login {
      display: flex;
      flex-direction: column;
      margin-top: 40px;
      text-align: center;
      @media screen and (min-width: 768px) {
        padding: 20px 0 5px 0;
      }
      h4 {
        font-size: 24px;
        font-weight: 600;
        color: #162668;
        margin: 0;
        margin-block-start: 0;
        margin-block-end: 0.15em;
        @media screen and (min-width: 768px) {
          margin: 0;
        }
      }
      p {
        font-size: 16px;
        font-weight: 400;
        color: #90A4AE;
      }
    }
    &__info {
      display: flex;
      justify-content: space-around;

      font-size: 18px;
      font-weight: 600;
      color: #162668;
      text-align: center;

      padding: 20px 0;
      @media screen and (min-width: 768px) {
        min-width: 50%;
        padding: 20px 0 5px 0;
      }

      &-icons {
        font-size: 1.3rem;
      }
    }
  }
  .noinfo {
    padding-top: 10px;
    font-size: 18px;
    font-weight: 500;
    text-align: center;
  }
  .sobre {
    &__bio {
      font-size: 16px;
      font-weight: 400;
      color: #263238;
    }
    h5 {
      padding-top: 20px;
      font-size: 18px;
      font-weight: 600;
      color: #162668;
      margin: 0;
      margin-block-start: 0;
      margin-block-end: 0.15em;
    }
    &__icon{
      font-size: 1.3em;
      margin-bottom: 2px;
    }
  }
</style>
