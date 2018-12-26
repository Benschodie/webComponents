// HTMLElement Muss immer extendet werden

class Tooltip extends HTMLElement {
  // Element Created -> Basics
  constructor() {
    super();
    this._tootipContainer;
    this._tooltipText = 'Some dummy tooltip text.';

    // enable shadow Dom
    this.attachShadow({ mode: 'open' });
  }

  // Element attached to dom -> Dom initialisations
  connectedCallback() {
    // get the attribute to set a text
    if (this.hasAttribute('text')) {
      this._tooltipText = this.getAttribute('text');
    }
    const tooltipIcon = document.createElement('span');
    tooltipIcon.textContent = ' (?)';
    tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
    tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this));
    this.shadowRoot.appendChild(tooltipIcon);
    this.style.position = 'relative';
  }

  // Convention to create a method only called in that class
  _showTooltip() {
    this._tooltipContainer = document.createElement('div');
    this._tooltipContainer.textContent = this._tooltipText;
    this.shadowRoot.appendChild(this._tooltipContainer);
  }

  _hideTooltip() {
    this.shadowRoot.removeChild(this._tooltipContainer);
  }
}

// Custom Elements müssen immer ein - beinhalten
customElements.define('biotope-tooltip', Tooltip);
