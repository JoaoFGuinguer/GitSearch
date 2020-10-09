<template>
  <q-item
    clickable
    v-ripple
    class="projectlist q-py-md"
    @click="gotoProject"
  >
    <q-item-section>
      <div class="project">
        <h5 class="project__name">{{ name }}</h5>
        <p class="project__description">{{ description }}</p>
        <div v-if="language && update" class="project__info">
          <p class=""><q-icon name="brightness_1" :class="colorLang(language)" class="q-mr-sm q-mb-xs"/>{{ language }}</p>
          <p class="">Atualizado em {{ update }}</p>
        </div>
      </div>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: 'listaProjetos',
  data () {
    return {
    }
  },
  props: {
    id: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    language: {
      type: String
    },
    update: {
      type: String,
      required: true
    },
    link: {
      type: String
    }
  },
  methods: {
    gotoProject () {
      window.open(this.link, '_blank')
    },
    colorLang (lang) {
      switch (lang) {
        case 'Ruby': return 'text-red2'
        case 'HTML': return 'text-red2'
        case 'PHP': return 'text-red2'
        case 'Java': return 'text-yellow3'
        case 'JavaScript': return 'text-yellow2'
        case 'TypeScript': return 'text-green2'
        case 'Dart': return 'text-green2'
        case 'CSS': return 'text-blue3'
        case 'Python': return 'text-blue3'
        case 'C': return 'text-red2'
        case 'C#': return 'text-blue2'
        case 'C++': return 'text-blue2'
        default: return 'text-grey2'
      }
    }
  }
}
</script>

<style lang="scss">
  .text-yellow2 {
    color: #B9BD00
  }
  .text-red2 {
    color: #BD0000
  }
  .text-green2 {
    color: #31BD00
  }
  .text-blue2 {
    color: #00B2BD
  }
  .text-yellow3 {
    color: #FAFF0C
  }
  .text-blue3 {
    color: #00103a
  }

  .projectlist {
    border-bottom: 0.5px solid rgba(0, 0, 0, 0.3);;
  }
  .projectlist:last-child {
    border: none;
  }
  .avatar {
    max-width: 5em;
    border-radius: 50%;
  }
  .projectlist__name {
    font-size: 18px;
    color: #162668;
    font-weight: 600;
    padding-left: 15px;
  }
  .project__name {
    font-size: 18px;
    font-weight: 600;
    color: #162668;
    margin: 0;
    margin-block-start: 0;
    margin-block-end: 0.15em;
  }
  .project__description {
    font-size: 16px;
    font-weight: 600;
    color: #586069;
    padding-left: 20px ;
  }
  .project__info {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    p {
      font-size: 14px;
      font-weight: 600;
      color: #586069
    }
  }

</style>
