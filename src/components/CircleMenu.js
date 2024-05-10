class CircleMenu extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      :host {
        --size: 125px;

        font-size: 2rem;
        color: #fff;
      }

      .container {
        --canvas-size: 600px;

        width: var(--canvas-size);
        height: var(--canvas-size);
        position: relative;
        background: indigo;
        display: grid;
        place-items: center;
      }

      .menu.circle {
        background: #fff;
        width: var(--size);
        height: var(--size);
        border-radius: 50%;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        box-shadow: 6px 3px 0 #0004;
        transition: scale 0.5s;
        position: absolute;
        z-index: 5;

        :host([open]) & {
          scale: 0.6;
        }

        & .icon {
          --size: 75px;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;

          width: var(--size);
          height: var(--size);
        }

        & .path {
          width: 100%;
          height: 6px;
          background: #888;
          transition: transform 1s;
          transform: scale(1);
          opacity: 1;

          &.start { transform-origin: 0% 50%; }
          &.end { transform-origin: 0% 50%; }
          &.middle { transform-origin: 50% 50%; }
        }

        :host([open]) & {
          & .start.path {
            transform: translateX(22%) rotate(45deg) translateX(-11%);
          }
          & .middle.path {
            transform: scale(0, 1);
          }
          & .end.path {
            transform: translateX(22%) rotate(-45deg) translateX(-11%);
          }
        }
      }

      ::slotted(a) {
        --distance: 150px;
        --angle: calc((var(--item) / var(--max-items)) * (2 * 3.14));
        --x: calc(cos(var(--angle)) * var(--distance));
        --y: calc(sin(var(--angle)) * var(--distance));
        --delay: calc(var(--item) * 0.3s);
        --timing: cubic-bezier(0,0,0.9,-1.5);

        display: block;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background: #888;
        color: transparent;
        position: absolute;
        transform: translate(0, 0);
        transition: transform 0.5s var(--timing) var(--delay);
        pointer-events: none;
      }

      :host([open]) ::slotted(a) {
        pointer-events: all;
        transform: translate(var(--x), var(--y));
      }
    `;
  }

  connectedCallback() {
    this.render();
    this.setVars();
    const menuCircle = this.shadowRoot.querySelector(".menu.circle");
    menuCircle.addEventListener("click", () => this.toggleAttribute("open"));
  }

  setVars() {
    this.style.setProperty("--max-items", this.childElementCount);
    const links = [...this.childNodes].filter(el => el.nodeName === "A");
    links.forEach((link, index) => link.style.setProperty("--item", index));
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${CircleMenu.styles}</style>
    <div class="container">
      <div class="menu circle">
        <div class="icon">
          <div class="start path"></div>
          <div class="middle path"></div>
          <div class="end path"></div>
        </div>
      </div>
      <slot></slot>
    </div>`;
  }
}

customElements.define("circle-menu", CircleMenu);
