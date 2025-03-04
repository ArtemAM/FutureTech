import pxToRem from './utils/pxToRem.js'

const root = '[data-js-expandable-content]'

class ExpandableContent {
  selectors = {
    button: '[data-js-expandable-content-button]'
  }

  stateClasses = {
    isExpanded: 'is-expanded'
  }

  animationParams = {
    duration: 500,
    timingFunction: 'ease'
  }

  constructor(rootElement) {
    this.rootElement = rootElement
    this.buttonElement = this.rootElement.querySelector(this.selectors.button)

    this.bindEvents()
  }

  expand() {
    const { offsetHeight, scrollHeight } = this.rootElement

    this.rootElement.classList.add(this.stateClasses.isExpanded)
    this.rootElement.animate([
      {maxHeight: `${pxToRem(offsetHeight)}rem`},
      {maxHeight: `${pxToRem(scrollHeight)}rem`}
    ], this.animationParams)
  }

  onClickButton = () => {
    this.expand()
  }

  bindEvents() {
    this.buttonElement.addEventListener('click', this.onClickButton)
  }
}

class ExpandableContentCollection {
  constructor() {
    document.querySelectorAll(root).forEach((element) => {
      new ExpandableContent(element)
    })
  }
}

export default ExpandableContentCollection