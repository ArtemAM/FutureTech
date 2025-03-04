class ProxyComponent {
  constructor() {
    if(this.constructor === ProxyComponent) {
      throw new Error('Невозможно создать экземпляр абстрактного класса ProxyComponent!')
    }
  }

  getProxyState(initialState) {
    const handler = {
      get: (target, prop) => {
        return target[prop]
      },
      set: (target, prop, value) => {
        const oldValue = target[prop]
        const newValue = value

        if(oldValue !== newValue) {
          target[prop] = value
          this.updateUI()
        }

        return true
      }
    }

    return new Proxy(initialState, handler)
  }

  updateUI() {
    throw new Error('Необходимо реализовать метод updateUI()')
  }
}

export default ProxyComponent