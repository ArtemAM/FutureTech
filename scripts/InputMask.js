const root = '[data-js-input-mask]'

class InputMask {
  constructor(rootElement) {
    this.rootElement = rootElement

    this.init()
  }

  init() {
    const isLibReady = typeof window.IMask !== 'undefined'

    if(isLibReady) {
      const mask = '(000) 000-00-00'
      window.IMask(this.rootElement, {mask: mask})
    } else {
      console.log('Библиотека IMask не подключена!')
    }
  }
}

class InputMaskCollection {
  constructor() {
    document.querySelectorAll(root).forEach((element) => {
      new InputMask(element)
    })
  }
}

export default InputMaskCollection