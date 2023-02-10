<template>
  <div>
    <div v-if="name === 'systeam'" class="systeam">
      <p class="text-xs-center">{{text}}</p>
    </div>
    <div v-else class="wrap">
      <div class="mes" :class="{owner}">
        <small>
          <strong>{{name}}</strong>
        </small>
        <p>{{text}}</p>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    name: String,
    text: String,
    owner: {
      type: Boolean,
      default: false
    }
  }
}
</script>


<style lang="stylus" scoped>
.systeam {
  margin-bottom 2rem
  margin-top 1rem

  p {
    color: rgba(255, 255, 255, 0.5)
  }
}

.wrap {
  display flex
  flex-direction column
}

.mes {
  padding 1rem
  width 60%
  margin 0 1rem
  box-shadow 0 1px 0 0 rgba(50, 50, 50 0.3)
  border-radius 4px
  background-color #1976d2
  position relative
  margin-bottom 1rem

  p {
    margin-bottom 0
  }
}

.owner {
  background-color #fff
  color #000
  font-size 14px
  align-self flex-end
  strong {
    font-size 16px
  }
}

</style>


