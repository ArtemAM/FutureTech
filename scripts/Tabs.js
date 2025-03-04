import ProxyComponent from "./utils/ProxyComponent.js"

const root = '[data-js-tabs]'

class Tabs extends ProxyComponent {
  selectors = {
    button: '[data-js-tabs-button]',
    content: '[data-js-tabs-content]'
  }

  stateClasses = {
    isActive: 'is-active'
  }

  stateAttributes = {
    ariaSelected: 'aria-selected',
    tabIndex: 'tabindex'
  }

  constructor(rootElement) {
    super()
    this.rootElement = rootElement
    this.buttonElements = this.rootElement.querySelectorAll(this.selectors.button)
    this.contentElements = this.rootElement.querySelectorAll(this.selectors.content)
    this.state = this.getProxyState({
      activeTabIndex: [...this.buttonElements].findIndex((buttonElement) => 
        buttonElement.classList.contains(this.stateClasses.isActive)
      )
    })
    this.limitTabsIndex = this.buttonElements.length - 1

    this.bindEvents()
  }

  updateUI() {
    const { activeTabIndex } = this.state
    this.buttonElements.forEach((buttonElement, index) => {
      const isActive = activeTabIndex === index
      buttonElement.classList.toggle(this.stateClasses.isActive, isActive)
      buttonElement.setAttribute(this.stateAttributes.ariaSelected, isActive.toString())
      buttonElement.setAttribute(this.stateAttributes.tabIndex, isActive ? '0': '-1')
    })

    this.contentElements.forEach((contentElement, index) => {
      const isActive = activeTabIndex === index
      contentElement.classList.toggle(this.stateClasses.isActive, isActive)
    })
  }

  onButtonClick(buttonIndex) {
    this.state.activeTabIndex = buttonIndex
  }

  activateTab(newTabIndex) {
    this.state.activeTabIndex = newTabIndex
    this.buttonElements[newTabIndex].focus()
  }

  previousTab = () => {
    const newTabIndex = this.state.activeTabIndex === 0
      ? this.limitTabsIndex
      : this.state.activeTabIndex - 1

    this.activateTab(newTabIndex)
  }

  nextTab = () => {
    const newTabIndex = this.state.activeTabIndex === this.limitTabsIndex
      ? 0
      : this.state.activeTabIndex + 1

    this.activateTab(newTabIndex)
  }
  
  firstTab = () => {
    this.activateTab(0)
  }

  lastTab = () => {
    this.activateTab(this.limitTabsIndex)
  }

  onKeyDown = (event) => {
    const { code, metaKey } = event

    const action = {
      ArrowLeft: this.previousTab,
      ArrowRight: this.nextTab,
      Home: this.firstTab,
      End: this.lastTab,
    }[code]

    const isMacHomeKey = metaKey && code === 'ArrowLeft'
    if(isMacHomeKey) {
      this.firstTab()
      return
    }

    const isMacEndKey = metaKey && code === 'ArrowRight'
    if(isMacEndKey) {
      this.lastTab()
      return
    }

    action?.()
  }

  bindEvents() {
    this.buttonElements.forEach((buttonElement, index) => {
      buttonElement.addEventListener('click', () => this.onButtonClick(index))
    })
    this.rootElement.addEventListener('keydown', this.onKeyDown)
  }
}

class TabsCollection {
  constructor() {
    document.querySelectorAll(root).forEach((element) => {
      new Tabs(element)
    })
  }
}

export default TabsCollection