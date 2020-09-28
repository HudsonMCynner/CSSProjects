let inactivityInterval = 30
let inactivityTime = 0
let tokenTime = 20
let inactivityTimeOut = false

startTokenTimer = function () {
  self['tokenTimer'] = setInterval(function () {
    if (tokenTime <= 10) {
      postMessage({ type: 'renewToken' })
      tokenTime = 20
      clearInterval(self['tokenTimer'])
    }
    postMessage({ type: 'tokenTimerUpdate', data: `TokenTime -> ${tokenTime} seconds`})
    // console.log('TokenTime', tokenTime)
    tokenTime--
  }, 1000)
}

startInactivityTimer = function () {
  self['intervalHandle'] = setInterval(function () {
    if (inactivityTime >= inactivityInterval) {
      inactivityTimeOut = true
      inactivityTime = 0
      postMessage({ type: 'inactivityTimeOut' })
      clearInterval(self['intervalHandle'])
      clearInterval(self['tokenTimer'])
    }
    // console.log('inactivityTime ->', inactivityTime, ' seconds', inactivityInterval)
    postMessage({ type: 'inactivityTimerUpdate', data: `inactivityTime -> ${inactivityTime} seconds`})
    inactivityTime++
  }, 1000)
}

reset = function () {
  clearInterval(self['intervalHandle'])
  clearInterval(self['tokenTimer'])
  tokenTime = 20
  inactivityTimeOut = false
  inactivityTime = 0
  this['startTokenTimer'].call(this)
  this['startInactivityTimer'].call(this)
}

self.onmessage = (event) => {
  self[event.data].call(this)
}
