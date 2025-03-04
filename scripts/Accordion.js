import ProxyComponent from "./utils/ProxyComponent.js";

const root = '[data-js-accordion]';

class Accordion extends ProxyComponent {
  selectors = {
    button: '[data-js-accordion-button]',
    content: '[data-js-accordion-content]'
  };

  stateClasses = {
    isExpanded: 'is-expanded'
  };

  stateAttributes = {
    ariaExpanded: 'aria-expanded'
  };

  constructor(rootElement) {
    super()
    this.rootElement = rootElement;
    this.buttonElements = rootElement.querySelectorAll(this.selectors.button);
    this.contentElements = rootElement.querySelectorAll(this.selectors.content);
    this.state = this.getProxyState({
      expandedTabIndex: [...this.buttonElements].findIndex(buttonElement => 
        buttonElement.classList.contains(this.stateClasses.isExpanded)
      )
    });

    this.bindEvents();
  }

  updateUI() {
    const { expandedTabIndex } = this.state;

    this.buttonElements.forEach((buttonElement, index) => {
      const isExpanded = expandedTabIndex === index;

      buttonElement.classList.toggle(this.stateClasses.isExpanded, isExpanded);
      buttonElement.setAttribute(this.stateAttributes.ariaExpanded, isExpanded.toString());
    });

    this.contentElements.forEach((contentElement, index) => {
      const isExpanded = expandedTabIndex === index;

      contentElement.classList.toggle(this.stateClasses.isExpanded, isExpanded);
    });
  }

  onButtonClick(index) {
    this.state.expandedTabIndex = index;
  }

  bindEvents() {
    this.buttonElements.forEach((buttonElement, index) => {
      buttonElement.addEventListener('click', () => this.onButtonClick(index))
    })
  }
}

class AccordionCollection {
  constructor() {
    document.querySelectorAll(root).forEach(element => {
      new Accordion(element);
    });
  }
}

export default AccordionCollection;