import ProxyComponent from "./utils/ProxyComponent.js"

const root = '[data-js-select]'

class Select extends ProxyComponent {
  selectors = {
    button: '[data-js-select-button]',
    dropdown: '[data-js-select-dropdown]',
    option: '[data-js-select-option]'
  }

  stateClasses = {
    isExpanded: 'is-expanded'
  }

  stateAttributes = {
    ariaSelected: 'aria-selected',
    ariaExpanded: 'aria-expanded'
  }

  constructor(rootElement) {
    super()
    this.rootElement = rootElement
    this.buttonElement = this.rootElement.querySelector(this.selectors.button)
    this.dropdownElement = this.rootElement.querySelector(this.selectors.dropdown)
    this.optionElements = this.dropdownElement.querySelectorAll(this.selectors.option)
    this.initialState = {
      isExpanded: false,
      selectedOptionElement: this.optionElements[0] || null
    }
    this.state = this.getProxyState(this.initialState)

    this.bindEvents()
  }

  updateUI() {
    const { 
      isExpanded,
      selectedOptionElement
    } = this.state

    const newSelectedOptionValue = selectedOptionElement
      ? selectedOptionElement.textContent.trim()
      : this.buttonElement.textContent;

    const updateButton = () => {
      this.buttonElement.textContent = newSelectedOptionValue
      this.buttonElement.classList.toggle(this.stateClasses.isExpanded, isExpanded)
      this.buttonElement.setAttribute(this.stateAttributes.ariaExpanded, isExpanded)
    }

    const updateDropdown = () => {
      this.dropdownElement.classList.toggle(this.stateClasses.isExpanded, isExpanded)
    }

    const updateOption = () => {
      this.optionElements.forEach((optionElement) => {
        const isSelected = optionElement === selectedOptionElement

        optionElement.setAttribute(this.stateAttributes.ariaSelected, isSelected)
      })
    }

    updateButton()
    updateDropdown()
    updateOption()
  }

  toggleExpandedState() {
    this.state.isExpanded = !this.state.isExpanded
  }

  onClickButton = () => {
    this.toggleExpandedState()
  }

  collapse() {
    this.state.isExpanded = false
  }

  expand() {
    this.state.isExpanded = true
  }

  onClick = (event) => {
    const { target } = event
    const isButtonClick = target === this.buttonElement
    const isOutsideDropdownClick = target.closest(this.selectors.dropdown) !== this.dropdownElement
    const isOptionClick = target.matches(this.selectors.option)

    if(!isButtonClick && isOutsideDropdownClick) {
      this.collapse()
      return
    }

    if(isOptionClick) {
      this.state.selectedOptionElement = target
      this.collapse()
    }
  }

  bindEvents() {
    this.buttonElement.addEventListener('click', this.onClickButton)
    document.addEventListener('click', this.onClick)
  }
}

class SelectCollection {
  constructor () {
    document.querySelectorAll(root).forEach(element => {
      new Select(element)
    })
  }
}

export default SelectCollection