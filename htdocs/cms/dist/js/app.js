/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../vendor/bugquest/web-framework/Assets/js/components/Accordion.js":
/*!**************************************************************************!*\
  !*** ../vendor/bugquest/web-framework/Assets/js/components/Accordion.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Accordion: () => (/* binding */ Accordion)
/* harmony export */ });
class Accordion {
  static setup(selector = '.accordeon') {
    document.addEventListener('click', e => {
      const title = e.target.closest(`${selector} .accordeon-title`);
      if (!title) return;
      const accordeon = title.closest(selector);
      const content = accordeon.querySelector('.accordeon-content');
      if (!content) return;
      Accordion.toggle(accordeon, content);
    });
  }
  static toggle(accordeon, content) {
    const isOpen = accordeon.classList.contains('active');
    if (isOpen) {
      // Active animation en mesurant la hauteur actuelle
      content.style.maxHeight = content.scrollHeight + 'px';

      // Forcer un reflow pour garantir la transition
      void content.offsetHeight;
      content.style.maxHeight = '0';
      accordeon.classList.remove('active');
    } else {
      content.style.maxHeight = content.scrollHeight + 'px';
      accordeon.classList.add('active');

      // Nettoyage après animation
      const onTransitionEnd = () => {
        if (accordeon.classList.contains('active')) {
          content.style.maxHeight = 'none';
        }
        content.removeEventListener('transitionend', onTransitionEnd);
      };
      content.addEventListener('transitionend', onTransitionEnd);
    }
  }
}

/***/ }),

/***/ "../vendor/bugquest/web-framework/Assets/js/components/BuildHelper.js":
/*!****************************************************************************!*\
  !*** ../vendor/bugquest/web-framework/Assets/js/components/BuildHelper.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ BuildHelper)
/* harmony export */ });
class BuildHelper {
  static accordion(title, subclass) {
    let accordeon = document.createElement('div');
    accordeon.className = '__accordeon accordeon';
    if (subclass) accordeon.classList.add(subclass);
    let accordeon_title = document.createElement('div');
    accordeon_title.className = '__accordeon_title accordeon-title';
    accordeon_title.textContent = title;
    accordeon.appendChild(accordeon_title);
    let accordeon_content = document.createElement('div');
    accordeon_content.className = 'accordeon-content';
    accordeon.appendChild(accordeon_content);
    return {
      accordeon,
      accordeon_content
    };
  }
  static glow_stick() {
    let glow_stick = document.createElement('div');
    glow_stick.className = 'glow-bar';
    return glow_stick;
  }
  static input_text(placeholder = '', value = '', className = '') {
    let input = document.createElement('input');
    input.type = 'text';
    input.placeholder = placeholder;
    input.value = value;
    input.className = className;
    return input;
  }
  static button_submit(text = 'Envoyer', className = 'button button-primary') {
    let button = document.createElement('button');
    button.type = 'submit';
    button.className = className;
    button.textContent = text;
    return button;
  }
  static button(text = 'Button', className = 'button', onClick = null) {
    let button = document.createElement('div');
    button.className = className;
    button.textContent = text;
    if (onClick) button.addEventListener('click', onClick);
    return button;
  }
  static div(className = '') {
    let div = document.createElement('div');
    div.className = className;
    return div;
  }
  static modal(title = '', onClose = null) {
    let modal = this.div('modal');
    let wrapper = this.div('modal-wrapper');
    let close = this.div('modal-close');
    let content = this.div('modal-content');
    if (title) {
      let titleElement = this.div('modal-title');
      titleElement.textContent = title;
      modal.appendChild('titleElement');
    }
    wrapper.appendChild(close);
    wrapper.appendChild(content);
    modal.appendChild(wrapper);
    close.addEventListener('click', () => {
      modal.classList.remove('active');
      if (onClose) onClose();
    });
    modal.addEventListener('click', e => {
      // Close the modal if the user clicks outside of the content area, check children
      if (e.target === modal) {
        modal.classList.remove('active');
        if (onClose) onClose();
      }
    });
    return {
      modal,
      content,
      close
    };
  }
  static h2(content, className = '') {
    let h2 = document.createElement('h2');
    h2.className = className;
    h2.textContent = content;
    return h2;
  }
  static h3(content, className = '') {
    let h3 = document.createElement('h3');
    h3.className = className;
    h3.textContent = content;
    return h3;
  }
  static img(src, alt = '', className = '') {
    let img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    if (className) img.className = className;
    return img;
  }
  static list(items = [], className = '') {
    let ul = document.createElement('ul');
    ul.className = className;
    items.forEach(item => {
      let li = document.createElement('li');
      li.innerHTML = item;
      ul.appendChild(li);
    });
    return ul;
  }
  static search(placeholder = 'Rechercher...', onSearch = null, onClickItem = null, searchMinLength = 2, openBottom = false) {
    let searchContainer = this.div('search-container');
    let input = this.input_text(placeholder);
    input.type = 'search';
    let results = this.div('search-results ' + (openBottom ? ' open-bottom' : 'open-top'));
    searchContainer.appendChild(input);
    searchContainer.appendChild(results);
    if (onSearch) input.addEventListener('input', () => {
      let value = input.value;
      if (value.length >= searchMinLength) onSearch(value, results);else results.innerHTML = '';
    });
    if (onClickItem) results.addEventListener('click', e => {
      let item = e.target.closest('.result-item');
      if (item) onClickItem(item);
    });

    //add custom event to close the search results
    searchContainer.addEventListener('close', () => {
      results.innerHTML = '';
      input.value = '';
    });
    return {
      searchContainer,
      results
    };
  }
  static input_search(placeholder = '', className = '', onSearch = null, onEmpty = null, searchMinLength = 2) {
    let input = this.input_text(placeholder, '', className);
    input.type = 'search';
    input.addEventListener('input', () => {
      let value = input.value;
      if (value.length >= searchMinLength) onSearch(value);else onEmpty();
    });
    return input;
  }
}

/***/ }),

/***/ "../vendor/bugquest/web-framework/Assets/js/components/DebugPanel.js":
/*!***************************************************************************!*\
  !*** ../vendor/bugquest/web-framework/Assets/js/components/DebugPanel.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DebugPanel: () => (/* binding */ DebugPanel)
/* harmony export */ });
/* harmony import */ var _framework_js_components_BuildHelper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @framework/js/components/BuildHelper.js */ "../vendor/bugquest/web-framework/Assets/js/components/BuildHelper.js");

class DebugPanel {
  static panel = null;
  static isDragging = false;
  static offset = {
    x: 0,
    y: 0
  };
  static async init() {
    this.panel = _framework_js_components_BuildHelper_js__WEBPACK_IMPORTED_MODULE_0__["default"].div('debug-panel');
    const title = _framework_js_components_BuildHelper_js__WEBPACK_IMPORTED_MODULE_0__["default"].h3('Debug Panel');
    const close_el = _framework_js_components_BuildHelper_js__WEBPACK_IMPORTED_MODULE_0__["default"].div('close-btn');
    close_el.textContent = 'x';
    this.panel.append(title, close_el);
    document.body.appendChild(this.panel);
    if (!this.panel) return;

    // Restore position
    this.restoreFromStorage();

    // Toggle via touche ² (Backquote)
    document.addEventListener('keypress', e => {
      if (e.which === 178 || e.which === 64) {
        this.panel.classList.toggle('active');
        localStorage.setItem('debugPanelActive', this.panel.classList.contains('active'));
      }
    });

    // Bouton de fermeture
    const close = this.panel.querySelector('.close-btn');
    if (close) {
      close.addEventListener('click', () => {
        this.panel.classList.remove('active');
      });
    }

    // Dragging
    this.panel.addEventListener('mousedown', this.startDrag.bind(this));
    document.addEventListener('mousemove', this.onDrag.bind(this));
    document.addEventListener('mouseup', this.stopDrag.bind(this));
    await this.loadMetrics();
  }
  static startDrag(e) {
    if (!this.panel.classList.contains('active')) return;
    this.isDragging = true;
    this.offset.x = e.clientX - this.panel.offsetLeft;
    this.offset.y = e.clientY - this.panel.offsetTop;
    this.panel.classList.add('dragging');
    this.panel.style.transition = 'none';
  }
  static onDrag(e) {
    if (!this.isDragging) return;
    const x = e.clientX - this.offset.x;
    const y = e.clientY - this.offset.y;
    this.panel.style.left = `${x}px`;
    this.panel.style.top = `${y}px`;
    this.panel.style.bottom = 'auto';
    this.panel.style.right = 'auto';

    // Sauvegarde position en direct
    localStorage.setItem('debugPanelPosition', JSON.stringify({
      x,
      y
    }));
  }
  static stopDrag() {
    if (this.isDragging) {
      this.isDragging = false;
      this.panel.classList.remove('dragging');
      this.panel.style.transition = '';
    }
  }
  static restoreFromStorage() {
    const isActive = localStorage.getItem('debugPanelActive');
    this.panel.classList.toggle('active', isActive === 'true');
    const pos = localStorage.getItem('debugPanelPosition');
    if (!pos) return;
    try {
      const {
        x,
        y
      } = JSON.parse(pos);
      this.panel.style.left = `${x}px`;
      this.panel.style.top = `${y}px`;
      this.panel.style.bottom = 'auto';
      this.panel.style.right = 'auto';
    } catch (e) {
      //set center of the screen
      const width = window.innerWidth;
      const height = window.innerHeight;
      const panelWidth = this.panel.offsetWidth;
      const panelHeight = this.panel.offsetHeight;
      const x = (width - panelWidth) / 2;
      const y = (height - panelHeight) / 2;
      this.panel.style.left = `${x}px`;
      this.panel.style.top = `${y}px`;
      this.panel.style.bottom = 'auto';
      this.panel.style.right = 'auto';
    }
  }
  static async loadMetrics() {
    await fetch('/admin/api/debug/metrics').then(r => r.json()).then(data => {
      for (const group_key in data) {
        const {
          accordeon,
          accordeon_content
        } = _framework_js_components_BuildHelper_js__WEBPACK_IMPORTED_MODULE_0__["default"].accordion(group_key);
        const wrap = _framework_js_components_BuildHelper_js__WEBPACK_IMPORTED_MODULE_0__["default"].div('wrap');
        accordeon_content.appendChild(wrap);
        const items = data[group_key];
        for (const item_key in items) {
          const item = items[item_key];
          const item_div = _framework_js_components_BuildHelper_js__WEBPACK_IMPORTED_MODULE_0__["default"].div('debug-line');
          item_div.innerHTML = `${item_key}: ${item}`;
          wrap.appendChild(item_div);
        }
        this.panel.appendChild(accordeon);
      }
    });
  }
}

/***/ }),

/***/ "../vendor/bugquest/web-framework/Assets/js/components/language-switcher.js":
/*!**********************************************************************************!*\
  !*** ../vendor/bugquest/web-framework/Assets/js/components/language-switcher.js ***!
  \**********************************************************************************/
/***/ (() => {

document.addEventListener('DOMContentLoaded', () => {
  const langSelect = document.getElementById('langSelect');
  if (langSelect) {
    langSelect.addEventListener('change', () => {
      const locale = langSelect.value;
      document.cookie = `bq_locale=${locale};path=/;max-age=31536000;SameSite=Lax`;
      location.reload();
    });
  }
});

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!**************************!*\
  !*** ./Assets/js/app.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _framework_js_components_Accordion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @framework/js/components/Accordion */ "../vendor/bugquest/web-framework/Assets/js/components/Accordion.js");
/* harmony import */ var _framework_js_components_language_switcher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @framework/js/components/language-switcher */ "../vendor/bugquest/web-framework/Assets/js/components/language-switcher.js");
/* harmony import */ var _framework_js_components_language_switcher__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_framework_js_components_language_switcher__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _framework_js_components_DebugPanel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @framework/js/components/DebugPanel */ "../vendor/bugquest/web-framework/Assets/js/components/DebugPanel.js");



document.addEventListener('DOMContentLoaded', async () => {
  await _framework_js_components_DebugPanel__WEBPACK_IMPORTED_MODULE_2__.DebugPanel.init();
  _framework_js_components_Accordion__WEBPACK_IMPORTED_MODULE_0__.Accordion.setup();
});
})();

/******/ })()
;
//# sourceMappingURL=app.js.map