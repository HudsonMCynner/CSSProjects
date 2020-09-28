import $store from 'src/store'
let inactivityInterval = 3600
let inactivityTime = 0
let tokenTime = 0
let inactivityTimeOut = false

/**
 * @param {String} interval
 */
export const setInactivityInterval = (interval) => {
  if (interval) {
    inactivityInterval = interval * 60
  }
}

/**
 * @param {String} time
 */
export const setTokenTime = (time) => {
  if (time) {
    tokenTime = time * 60
  }
}

/**
 * @param {boolean} value
 */
export const setInactivityTimeOut = (value) => {
  inactivityTimeOut = value
}

/**
 * Timer regressivo para poder renovar o token quando chegar na metade do tempo de expiração
 */
export const tokenTimer = () => {
  clearInterval(window.tokenTimer)
  window.tokenTimer = setInterval(function () {
    if (tokenTime <= 180) {
      window.EventBus.dispatchEvent('renewToken')
      clearInterval(window.tokenTimer)
    }
    // console.log('TokenTime', tokenTime)
    tokenTime--
  }, 1000)
}

/**
 * Timer para contar em segundos a inatividade do usuário
 */
export const inactivityTimer = () => {
  clearInterval(window.intervalHandle)
  window.intervalHandle = setInterval(function () {
    if (inactivityTime >= inactivityInterval) {
      inactivityTimeOut = true
      inactivityTime = 0
      window.EventBus.dispatchEvent('inactivityTimeOut')
      clearInterval(window.intervalHandle)
      clearInterval(window.tokenTimer)
    }
    // console.log('inactivityTime ->', inactivityTime, ' seconds', inactivityInterval)
    inactivityTime++
  }, 1000)
}

/**
 * Reset o timer de inatividade quando há click do mouse
 * Verifica se o objeto usuario possui ID
 * Verifica se ocorreu timeout no timer de inatividade
 * Senão zera o tempo de inatividade e chama função do timer de inatividade
 */

const resetinactivityTimer = () => {
  let user = $store.getters['auth/getUsuarioId']
  if (!user) {
    return
  }
  if (inactivityTimeOut) {
    return
  }
  inactivityTime = 0
  inactivityTimer()
}

/**
 * Funções para monitorar a interatividade do usuário com o sistema nos eventos de clique e movimento do mouse e clique no teclado
 */
document.removeEventListener('click', resetinactivityTimer)
document.removeEventListener('keydown', resetinactivityTimer)
document.removeEventListener('mousemove', resetinactivityTimer)
document.addEventListener('click', resetinactivityTimer)
document.addEventListener('keydown', resetinactivityTimer)
document.addEventListener('mousemove', resetinactivityTimer)
