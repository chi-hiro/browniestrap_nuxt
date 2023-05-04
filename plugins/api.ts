import * as openapi from '../openapi'

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig()

  const config = () => {
    return new openapi.Configuration({
      basePath: runtimeConfig.public.apiBaseUrl,
    })
  }

  const apiService = {
    PetApi: new openapi.PetApi(config()),
    StoreApi: new openapi.StoreApi(config()),
    UserApi: new openapi.UserApi(config()),
  }

  return {
    provide: {
      api: apiService,
    },
  }
})
