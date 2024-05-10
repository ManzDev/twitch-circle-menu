(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();class a extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get styles(){return`
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
    `}connectedCallback(){this.render(),this.setVars(),this.shadowRoot.querySelector(".menu.circle").addEventListener("click",()=>this.toggleAttribute("open"))}setVars(){this.style.setProperty("--max-items",this.childElementCount),[...this.childNodes].filter(s=>s.nodeName==="A").forEach((s,i)=>s.style.setProperty("--item",i))}render(){this.shadowRoot.innerHTML=`
    <style>${a.styles}</style>
    <div class="container">
      <div class="menu circle">
        <div class="icon">
          <div class="start path"></div>
          <div class="middle path"></div>
          <div class="end path"></div>
        </div>
      </div>
      <slot></slot>
    </div>`}}customElements.define("circle-menu",a);
