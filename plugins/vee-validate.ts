import { configure, defineRule, Form, Field, ErrorMessage } from 'vee-validate'
import { localize, setLocale } from '@vee-validate/i18n'
import ja from '@vee-validate/i18n/dist/locale/ja.json'
import AllRules from '@vee-validate/rules'

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    ValidationForm: typeof Form
    ValidationField: typeof Field
    ValidationErrorMessage: typeof ErrorMessage
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  Object.entries(AllRules).forEach(([id, validator]) => {
    defineRule(id, validator)
  })

  // カスタムルール
  defineRule('file', (value: FileList) => {
    if (!value || value.length === 0) return false
    return true
  })

  defineRule('halfwidth', (value: string) => {
    if (!value) return true
    const reg = new RegExp(/^[a-zA-Z0-9!-~]+$/)
    return reg.test(value)
  })

  defineRule('minusNumber', (value: string) => {
    if (!value) return true
    if (value === '-') return true
    const reg = new RegExp('^-?[0-9]+$')
    return reg.test(value)
  })

  nuxtApp.vueApp.component('ValidationForm', Form)
  nuxtApp.vueApp.component('ValidationField', Field)
  nuxtApp.vueApp.component('ValidationErrorMessage', ErrorMessage)

  configure({
    generateMessage: localize('ja', {
      ...ja,
      messages: {
        required: '{field}を入力してください',
        email: '{field}の形式が正しくありません',
        numeric: '{field}は半角数字で入力してください',
        file: '{field}を指定してください',
        halfwidth: '{field}は半角で入力してください',
        minusNumber: '{field}は半角数字で入力してください',
      },
    }),
  })

  setLocale('ja')
})
