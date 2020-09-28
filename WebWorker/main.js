window['app'] = {}
window['app']['worker'] = undefined

function createInstance () {
  window['app']['worker'] = new Worker('worker.js')
  window['app']['worker'].onmessage = (event) => {
    eventReceiver(event)
  }
}

function eventReceiver (event) {
  if (event.data.type === 'renewToken' || event.data.type === 'inactivityTimeOut') {
    window['app']['worker'].terminate()
  }
  if (event.data.type === 'inactivityTimerUpdate') {
    document.querySelector('#inactivityTimer').innerHTML = event.data.data
  }
  if (event.data.type === 'tokenTimerUpdate') {
    document.querySelector('#tokenTimer').innerHTML = event.data.data
  }
}

function reset () {
  if (window['app']['worker']) {
    window['app']['worker'].terminate()
  }
  createInstance()
  window['app']['worker'].postMessage('reset')
}
