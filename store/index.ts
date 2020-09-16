import axios from 'axios'
import {
  defineComponent,
  SetupContext,
  reactive,
  Ref,
  toRefs,
} from '@vue/composition-api'
//Stateの型を宣言
export default interface State {
  id: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  locations: string
}
//State: 先ほど宣言したState型を使ってます
// export const state = (): State => ({
//   id: '',
//   createdAt: '',
//   updatedAt: '',
//   publishedAt: '',
//   locations: '',
// })
// export const state = () => {
//   return toRefs(
//     reactive<{
//       id: string
//       createdAt: string
//       updatedAt: string
//       publishedAt: string
//       locations: string
//     }>({
//       id: '',
//       createdAt: '',
//       updatedAt: '',
//       publishedAt: '',
//       locations: '',
//     })
//   )
// }
declare type Refs<Data> = {
  //謎のtype
  [K in keyof Data]: Data[K] extends Ref<infer V> ? Ref<V> : Ref<Data[K]>
}
export const state = (): Refs<State> => {
  //Refs<State>が型です
  return toRefs(
    reactive<State>({
      id: '',
      createdAt: '',
      updatedAt: '',
      publishedAt: '',
      locations: '',
    })
  )
}

//Mutation: stateに新しい値をセットするだけ
export const mutations = {
  setId(state: State, id: string) {
    state.id = id
  },
  setCreatedAt(state: State, createdAt: string) {
    state.createdAt = createdAt
  },
  setUpdatedAt(state: State, updatedAt: string) {
    state.updatedAt = updatedAt
  },
  setPublishedAt(state: State, publishedAt: string) {
    state.publishedAt = publishedAt
  },
  setLocations(state: State, locations: string) {
    state.locations = locations
    console.log('locations--------')
    console.log(state.locations)
  },
  //   setStatus(state: State, status: string) {
  //     state.status = status;
  //   },
  //   setVersion(state: State, version: string) {
  //     state.version = version;
  //   },
}
//Action: サーバからステータスなどを取得し、mutation経由で値をセット
//Actionなのでasync awaitな非同期な処理もOK
export const actions = {
  // async fetchServerInfo({ commit }: { commit: any },): Promise<void> {
  async fetchServerInfo(context: any): Promise<void> {
    await axios
      .get('https://h-works.microcms.io/api/v1/locations', {
        headers: { 'X-API-KEY': process.env.API_KEY },
      })
      .then((response) => {
        // context.commit('setId', response.data.contents.id)
        // context.commit('setCreatedAt', response.data.contents.createdAt)
        // context.commit('setUpdatedAt', response.data.contents.updatedAt)
        // context.commit('setPublishedAt', response.data.contents.publishedAt)
        // context.commit('setLocations', response.data.contents.locations)
        context.commit('setId', response.data.contents[0].id)
        context.commit('setCreatedAt', response.data.contents[0].createdAt)
        context.commit('setUpdatedAt', response.data.contents[0].updatedAt)
        context.commit('setPublishedAt', response.data.contents[0].publishedAt)
        context.commit('setLocations', response.data.contents[0].locations)
        // context.commit('setId', '001')
        // context.commit('setCreatedAt', '2020-0901')
        // context.commit('setUpdatedAt', '2020-0901')
        // context.commit('setPublishedAt', '2020-0901')
        // context.commit('setLocations', 'おかやま')

        console.log('action set locations')
        console.log(response.data.contents[0].publishedAt)
        console.log('action*********')
        console.log(response.data.contents)
      })
      .catch((err) => {
        // commit(setStatus, 'error');
        // commit(setVersion, 'error');
        console.log('error: ' + err)
      })
  },
}
//Getter: stateの中身を取り出してreturnする
export const getters = {
  getId(state: State): String {
    // return state.id
    // if (state.id.value === '') {
    if (state.id === '') {
      return ''
    } else {
      return state.id
    }
  },
  getCreatedAt(state: State): String {
    // return state.createdAt
    if (state.createdAt === '') {
      return ''
    } else {
      return state.createdAt
    }
  },
  getUpdatedAt(state: State): String {
    // return state.updatedAt
    if (state.updatedAt === '') {
      return ''
    } else {
      return state.updatedAt
    }
  },
  getPublishedAt(state: State): String {
    // return state.publishedAt
    if (state.publishedAt === '') {
      return ''
    } else {
      return state.publishedAt
    }
  },
  getLocations(state: State): String {
    // return state.locations
    console.log('getLocations')
    if (state.locations === '') {
      return ''
    } else {
      return state.locations
    }
  },
  // getStatus(state: State): string{
  //   return state.status;
  // },
  // getVersion(state: State): string{
  //   return state.version;
  // }
}
