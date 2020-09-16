<template lang="pug">
div   
  div
    h1 Typscript Micro CMS Blog   
    h1 inspire.vue 
    h3 {{message.hellow}}
  div.mt-4 
    h1 state
    h3 Id:{{ store.getters.getId }}
    //- h3 create  {{ store.getters.getCreateAt }}
    //- h3 Update:{{ store.getters.getUpdateAt }}
    //- h3 Pubulich:{{ store.getters.getPublishAt }}
    h3 location: {{ store.getters.getLocations }}
  //- div.mt-4 
  //-   h1 location data
  //-   h3 {{locations}}
</template>
<script lang="ts">
import {
  defineComponent,
  SetupContext,
  onBeforeMount,
  ref,
  reactive,
  watchEffect,
} from '@vue/composition-api'
// import { Context } from '@nuxt/types'
import axios from 'axios'
export default defineComponent({
  setup({ root }: SetupContext, context: SetupContext) {
    const message = reactive({ hellow: 'vuex component-api with typescript' })
    const locations = ref([])

    //storeをVueインスタンスから取り出す(※1)
    // const store = root.$store
    const store = context.root.$store
    const fetchStatus = async (store) => {
      console.log('setup fetchStatus')
      // store.dispatchでActionを呼び出す
      // setupからstoreを受け取る (※4)
      await store.dispatch('fetchServerInfo')
    }

    //methods
    onBeforeMount(async () => {
      // 当然setup外で設定した関数にもアクセス可能(※4)
      // 関数内でstoreを使うため引数で渡しておく(※2)
      console.log('onBeforeMount fetchStatus')
      await fetchStatus(store)
    })

    // watchEffect(async () => {
    //   try {
    //     const locationsData = await axios.get(
    //       'https://h-works.microcms.io/api/v1/locations',
    //       {
    //         headers: { 'X-API-KEY': process.env.API_KEY },
    //       }
    //     )
    //     locations.value = locationsData.data.contents
    //     // await store.dispatch('fetchServerInfo')
    //     console.log('watch')
    //   } catch (err) {
    //     console.log('error: ' + err)
    //   }
    // })

    return {
      message,
      locations,
      fetchStatus,
      store, //storeをtemplate内で利用するためにreturn(※3)
    }
  },
})
</script>
