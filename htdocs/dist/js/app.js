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

/***/ }),

/***/ "../vendor/bugquest/web-framework/Assets/js/services/Builder.js":
/*!**********************************************************************!*\
  !*** ../vendor/bugquest/web-framework/Assets/js/services/Builder.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Builder)
/* harmony export */ });
/* harmony import */ var _framework_js_services_Translator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @framework/js/services/Translator.js */ "../vendor/bugquest/web-framework/Assets/js/services/Translator.js");

class Builder {
  static createEl = (tag, className, text = '') => {
    const el = document.createElement(tag);
    el.className = className;
    if (text) el.innerText = text;
    return el;
  };
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
  static label(text = '', className = '') {
    let label = document.createElement('label');
    if (className) label.className = className;
    if (text) label.textContent = text;
    return label;
  }
  static input_text(placeholder = '', value = '', className = '') {
    let input = document.createElement('input');
    input.type = 'text';
    if (placeholder) input.placeholder = placeholder;
    if (value) input.value = value;
    if (className) input.className = className;
    return input;
  }
  static textarea(placeholder = '', value = '', className = '') {
    let textarea = document.createElement('textarea');
    if (placeholder) textarea.placeholder = placeholder;
    if (value) textarea.value = value;
    if (className) textarea.className = className;
    return textarea;
  }
  static input_number(placeholder = '', step = 1, value = '', className = '') {
    let input = document.createElement('input');
    input.type = 'number';
    if (step) input.step = step;
    if (placeholder) input.placeholder = placeholder;
    if (value) input.value = value;
    if (className) input.className = className;
    return input;
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
  static input_password(placeholder = '', value = '', className = '') {
    let input = this.input_text(placeholder, value, className);
    input.type = 'password';
    return input;
  }
  static checkbox(label = '', checked = false, className = '', onChange = null) {
    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    if (checked) checkbox.checked = true;
    if (className) checkbox.className = className;
    if (onChange) checkbox.addEventListener('change', onChange);
    let labelElement = this.label(label);
    labelElement.prepend(checkbox);
    return labelElement;
  }
  static switch(checked = false, onChange = null) {
    let switcher = document.createElement('div');
    switcher.className = 'switch';
    switcher.dataset.state = checked ? 'on' : 'off';
    switcher.title = checked ? (0,_framework_js_services_Translator_js__WEBPACK_IMPORTED_MODULE_0__.__)('Activé', 'options') : (0,_framework_js_services_Translator_js__WEBPACK_IMPORTED_MODULE_0__.__)('Désactivé', 'options');
    switcher.addEventListener('click', () => {
      switcher.dataset.state = switcher.dataset.state === 'on' ? 'off' : 'on';
      switcher.title = switcher.dataset.state === 'on' ? (0,_framework_js_services_Translator_js__WEBPACK_IMPORTED_MODULE_0__.__)('Activé', 'options') : (0,_framework_js_services_Translator_js__WEBPACK_IMPORTED_MODULE_0__.__)('Désactivé', 'options');
      if (onChange) onChange(switcher.dataset.state === 'on');
    });
    return {
      element: switcher,
      value: () => {
        return switcher.dataset.state === 'on';
      },
      toggle: enabled => {
        switcher.dataset.state = enabled ? 'on' : 'off';
        switcher.title = enabled ? (0,_framework_js_services_Translator_js__WEBPACK_IMPORTED_MODULE_0__.__)('Activé', 'options') : (0,_framework_js_services_Translator_js__WEBPACK_IMPORTED_MODULE_0__.__)('Désactivé', 'options');
      }
    };
  }
  static button_submit(text = 'Envoyer', className = 'button button-primary') {
    let button = document.createElement('button');
    button.type = 'submit';
    if (className) button.className = className;
    if (text) button.textContent = text;
    return button;
  }
  static button(text = 'Button', className = 'button', onClick = null) {
    let button = document.createElement('div');
    if (className) button.className = className;
    if (text) button.textContent = text;
    if (onClick) button.addEventListener('click', onClick);
    return button;
  }
  static div(className = '') {
    let div = document.createElement('div');
    if (className) div.className = className;
    return div;
  }
  static span(className = '') {
    let span = document.createElement('span');
    if (className) span.className = className;
    return span;
  }
  static modal(title = '', onOpen = null, onClose = null) {
    const modal = this.div('modal');
    const wrapper = this.div('modal-wrapper');
    const close = this.div('modal-close');
    const content = this.div('modal-content');
    let titleElement = null;
    if (title) {
      titleElement = this.div('modal-title');
      titleElement.textContent = title;
      wrapper.appendChild(titleElement);
    }
    wrapper.appendChild(close);
    wrapper.appendChild(content);
    modal.appendChild(wrapper);
    const closeModal = () => {
      modal.classList.remove('active');
      if (onClose) onClose();
    };
    const openModal = () => {
      modal.classList.add('active');
      if (onOpen) onOpen();
    };
    close.addEventListener('click', closeModal);
    modal.addEventListener('click', e => {
      if (e.target === modal) closeModal();
    });
    return {
      element: modal,
      open: openModal,
      close: closeModal,
      title: titleElement ?? '',
      content: content
    };
  }
  static h2(content, className = '') {
    let h2 = document.createElement('h2');
    if (className) h2.className = className;
    h2.textContent = content;
    return h2;
  }
  static h3(content, className = '') {
    let h3 = document.createElement('h3');
    if (className) h3.className = className;
    h3.textContent = content;
    return h3;
  }
  static h4(content, className = '') {
    let h4 = document.createElement('h4');
    if (className) h4.className = className;
    h4.textContent = content;
    return h4;
  }
  static img(src, alt = '', className = '') {
    let img = document.createElement('img');
    img.src = src;
    img.alt = alt ? alt : Math.random().toString(16).slice(2);
    if (className) img.className = className;
    return img;
  }
  static list(items = [], className = '', childClassName = '', onClick = null) {
    let ul = document.createElement('ul');
    if (className) ul.className = className;
    items.forEach(item => {
      let li = document.createElement('li');
      li.innerHTML = item;
      if (childClassName) li.className = childClassName;
      if (onClick) li.addEventListener('click', () => {
        onClick(item);
      });
      ul.appendChild(li);
    });
    return ul;
  }
  static search(placeholder = 'Rechercher...', onSearch = null, onClickItem = null, searchMinLength = 2, openBottom = false) {
    let element = this.div('search-container');
    let input = this.input_text(placeholder);
    input.type = 'search';
    let results = this.div('search-results ' + (openBottom ? ' open-bottom' : 'open-top'));
    element.appendChild(input);
    element.appendChild(results);
    if (onSearch) input.addEventListener('input', () => {
      let value = input.value;
      if (value.length >= searchMinLength) onSearch(value);else results.innerHTML = '';
    });
    if (onClickItem) results.addEventListener('click', e => {
      let item_clicked = e.target.closest('.result-item');
      if (!item_clicked) return;
      let item = JSON.parse(item_clicked.dataset.item);
      if (item) onClickItem(item);
    });
    return {
      close: () => {
        results.innerHTML = '';
        input.value = '';
        results.classList.remove('active');
      },
      clean: () => {
        results.innerHTML = '';
      },
      populate: items => {
        for (const [key, value] of Object.entries(items)) {
          const tagEl = Builder.div('result-item');
          tagEl.textContent = key;
          tagEl.dataset.item = JSON.stringify(value);
          results.appendChild(tagEl);
        }
        results.classList.add('active');
      },
      addItem: (label, item) => {
        const tagEl = Builder.div('result-item');
        tagEl.textContent = label;
        tagEl.dataset.item = JSON.stringify(item);
        results.appendChild(tagEl);
        if (!results.classList.contains('active')) results.classList.add('active');
      },
      element
    };
  }
  static select(label, options, selected = null, onChange = null, openTop = false) {
    let currentValue = selected;
    const wrapper = this.createEl('div', 'select-wrapper');
    const head = this.createEl('div', 'select-head');
    const labelEl = this.createEl('div', 'select-label', label);
    const valueEl = this.createEl('div', 'select-value', selected || '');
    const body = this.createEl('div', 'select-body');
    const isObjectOption = typeof options[0] === 'object';
    const toogle = enabled => {
      if (enabled) {
        body.style.display = 'block'; // Affiche d'abord pour mesurer
        // Force un reflow pour que la transition se déclenche
        void body.offsetHeight;
        body.classList.add('active');
        body.style.top = openTop ? '0' : 'auto';
        body.style.bottom = openTop ? 'auto' : '0';
      } else {
        body.classList.remove('active');
        // Attends la fin de l'animation avant de masquer
        setTimeout(() => {
          if (!body.classList.contains('active')) {
            body.style.display = 'none';
          }
        }, 300); // doit correspondre à la durée CSS
      }
    };
    options.forEach(option => {
      const value = isObjectOption ? option.value : option;
      const label = isObjectOption ? option.label : option;
      const item = this.createEl('div', 'select-item', label);
      item.dataset.value = value;
      if (value === selected) item.classList.add('active');
      body.appendChild(item);
    });
    if (onChange) {
      body.addEventListener('click', e => {
        if (e.target.classList.contains('select-item')) {
          const value = e.target.dataset.value;
          currentValue = value;
          valueEl.innerText = e.target.innerText;
          [...body.children].forEach(child => child.classList.remove('active'));
          e.target.classList.add('active');
          onChange(value);
          toogle(false);
        }
      });
    }
    head.append(labelEl, valueEl);
    wrapper.append(head, body);
    head.addEventListener('click', () => toogle(true));
    document.addEventListener('click', e => {
      if (!wrapper.contains(e.target)) {
        toogle(false);
      }
    });
    return {
      element: wrapper,
      toogle: toogle,
      getValue: () => currentValue,
      setValue: value => {
        currentValue = value;
        const items = [...body.children];
        const targetItem = items.find(item => item.dataset.value === value);
        valueEl.innerText = targetItem ? targetItem.innerText : '';
        items.forEach(item => item.classList.remove('active'));
        if (targetItem) targetItem.classList.add('active');
      }
    };
  }
  static selectMultiple(label, options, selected = [], onChange = null, openTop = false) {
    let currentValues = Array.isArray(selected) ? selected : [];
    const wrapper = this.createEl('div', 'select-wrapper');
    const head = this.createEl('div', 'select-head');
    const labelEl = this.createEl('div', 'select-label', label);
    const valueEl = this.createEl('div', 'select-value', currentValues.join(', '));
    const body = this.createEl('div', 'select-body');
    const isObjectOption = typeof options[0] === 'object';
    const updateDisplay = () => {
      const selectedItems = [...body.children].filter(item => currentValues.includes(item.dataset.value));
      valueEl.innerText = selectedItems.map(item => item.innerText).join(', ') || 'Aucun';
    };
    const toogle = enabled => {
      if (enabled) {
        body.style.display = 'block';
        void body.offsetHeight;
        body.classList.add('active');
        body.style.top = openTop ? '0' : 'auto';
        body.style.bottom = openTop ? 'auto' : '0';
      } else {
        body.classList.remove('active');
        setTimeout(() => {
          if (!body.classList.contains('active')) {
            body.style.display = 'none';
          }
        }, 300);
      }
    };
    options.forEach(option => {
      const value = isObjectOption ? option.value : option;
      const label = isObjectOption ? option.label : option;
      const item = this.createEl('div', 'select-item', label);
      item.dataset.value = value;
      if (currentValues.includes(value)) item.classList.add('active');
      body.appendChild(item);
    });
    if (onChange) {
      body.addEventListener('click', e => {
        if (e.target.classList.contains('select-item')) {
          const value = e.target.dataset.value;
          const index = currentValues.indexOf(value);
          if (index > -1) {
            currentValues.splice(index, 1);
            e.target.classList.remove('active');
          } else {
            currentValues.push(value);
            e.target.classList.add('active');
          }
          updateDisplay();
          onChange([...currentValues]);
        }
      });
    }
    head.append(labelEl, valueEl);
    wrapper.append(head, body);
    head.addEventListener('click', () => toogle(true));
    document.addEventListener('click', e => {
      if (!wrapper.contains(e.target)) {
        toogle(false);
      }
    });
    return {
      element: wrapper,
      toogle: toogle,
      getValue: () => [...currentValues],
      setValue: values => {
        currentValues = Array.isArray(values) ? values : [];
        const items = [...body.children];
        items.forEach(item => {
          if (currentValues.includes(item.dataset.value)) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });
        updateDisplay();
      }
    };
  }
  static table(head = [], body = [], className = '', headClassName = '', bodyClassName = '') {
    let table = document.createElement('table');
    if (className) table.className = className;
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');
    if (head.length > 0) {
      head.forEach(item => {
        let th = document.createElement('th');
        th.textContent = item;
        if (headClassName) th.className = headClassName;
        thead.appendChild(th);
      });
    }
    if (body.length > 0) {
      body.forEach(item => {
        let tr = document.createElement('tr');
        item.forEach(cell => {
          let td = document.createElement('td');
          if (typeof cell === 'object' && cell !== null && 'value' in cell && 'full' in cell) {
            td.textContent = cell.value;
            td.title = cell.full;
            td.classList.add('truncated'); // on l’utilisera pour le CSS
          } else {
            td.textContent = cell;
          }
          if (bodyClassName) td.className = bodyClassName;
          tr.appendChild(td);
        });
        tbody.appendChild(tr);
      });
    }
    table.appendChild(thead);
    table.appendChild(tbody);
    return table;
  }
}

/***/ }),

/***/ "../vendor/bugquest/web-framework/Assets/js/services/DebugPanel.js":
/*!*************************************************************************!*\
  !*** ../vendor/bugquest/web-framework/Assets/js/services/DebugPanel.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DebugPanel: () => (/* binding */ DebugPanel)
/* harmony export */ });
/* harmony import */ var _framework_js_services_Builder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @framework/js/services/Builder */ "../vendor/bugquest/web-framework/Assets/js/services/Builder.js");
/* harmony import */ var _framework_js_services_Toast__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @framework/js/services/Toast */ "../vendor/bugquest/web-framework/Assets/js/services/Toast.js");
/* harmony import */ var _framework_js_services_Translator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @framework/js/services/Translator */ "../vendor/bugquest/web-framework/Assets/js/services/Translator.js");



class DebugPanel {
  static panel = null;
  static isDragging = false;
  static offset = {
    x: 0,
    y: 0
  };
  static async init() {
    this.panel = _framework_js_services_Builder__WEBPACK_IMPORTED_MODULE_0__["default"].div('debug-panel');
    const title = _framework_js_services_Builder__WEBPACK_IMPORTED_MODULE_0__["default"].h3('Debug Panel');
    const close_el = _framework_js_services_Builder__WEBPACK_IMPORTED_MODULE_0__["default"].div('close-btn');
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
        localStorage.setItem('debugPanelActive', false);
      });
    }

    // Dragging
    this.panel.addEventListener('mousedown', this.startDrag.bind(this));
    document.addEventListener('mousemove', this.onDrag.bind(this));
    document.addEventListener('mouseup', this.stopDrag.bind(this));
    await this.loadMetrics();
    this.kvSection = _framework_js_services_Builder__WEBPACK_IMPORTED_MODULE_0__["default"].div('kv-section');
    this.kvWrap = _framework_js_services_Builder__WEBPACK_IMPORTED_MODULE_0__["default"].div('wrap');
    this.panel.appendChild(this.kvSection);
    this.kvValues = {}; // pour stocker les refs HTML des valeurs

    window.debugPanel = this;
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
  static addGroup(group_key, group) {
    const {
      accordeon,
      accordeon_content
    } = _framework_js_services_Builder__WEBPACK_IMPORTED_MODULE_0__["default"].accordion(group_key);
    const wrap = _framework_js_services_Builder__WEBPACK_IMPORTED_MODULE_0__["default"].div('wrap');
    accordeon_content.appendChild(wrap);
    this.panel.appendChild(accordeon);
    if (Array.isArray(group)) {
      // Cas spécial tableau (ex: queries SQL)
      if (group_key === 'queries') {
        const head = ['SQL', 'Bindings', 'Durée'];
        const body = group.map(row => {
          const time = parseFloat(row.time);
          const displayTime = time >= 1000 ? `${(time / 1000).toFixed(3)} s` : `${time.toFixed(2)} ms`;
          return [{
            value: row.query,
            full: row.query
          },
          // pour title
          row.bindings.map(b => `"${b}"`).join(', '), displayTime];
        });
        const totalTime = group.reduce((sum, row) => sum + parseFloat(row.time), 0);
        const displayTotal = totalTime >= 1000 ? `${(totalTime / 1000).toFixed(3)} s` : `${totalTime.toFixed(2)} ms`;

        // Construction du tableau via Builder.table
        const table = _framework_js_services_Builder__WEBPACK_IMPORTED_MODULE_0__["default"].table(head, body, 'debug-table');

        // Ajout du tfoot
        const tfoot = document.createElement('tfoot');
        const tr = document.createElement('tr');
        const tdLabel = document.createElement('td');
        tdLabel.textContent = 'Total';
        tdLabel.colSpan = 2;
        const tdTotal = document.createElement('td');
        tdTotal.textContent = displayTotal;
        tr.append(tdLabel, tdTotal);
        tfoot.appendChild(tr);
        table.appendChild(tfoot);
        wrap.appendChild(table);
        return;
      }

      // Autres tableaux si besoin (logs, appels API, etc.)
      group.forEach((item, index) => {
        const div = _framework_js_services_Builder__WEBPACK_IMPORTED_MODULE_0__["default"].div('debug-line');
        div.textContent = `${index}: ${JSON.stringify(item)}`;
        wrap.appendChild(div);
      });
    } else {
      // Cas classique objet clé: valeur
      for (const item_key in group) {
        const item = group[item_key];
        const item_div = _framework_js_services_Builder__WEBPACK_IMPORTED_MODULE_0__["default"].div('debug-line');
        item_div.innerHTML = `${item_key}: ${item}`;
        wrap.appendChild(item_div);
      }
    }
  }
  static renderQueries() {}
  static async loadMetrics() {
    await fetch('/admin/api/debug/metrics').then(r => r.json()).then(data => {
      if (!data) return;
      if ("success" in data && !data.success) {
        _framework_js_services_Toast__WEBPACK_IMPORTED_MODULE_1__.Toast.show((0,_framework_js_services_Translator__WEBPACK_IMPORTED_MODULE_2__.__)('Erreur lors du chargement des metrics:', 'admin') + ' ' + data?.message, {
          type: 'danger',
          icon: '❌'
        });
        console.error((0,_framework_js_services_Translator__WEBPACK_IMPORTED_MODULE_2__.__)('Erreur lors du chargement des metrics:', 'admin') + ' ' + data?.message);
        return;
      }
      for (const group_key in data) this.addGroup(group_key, data[group_key]);
    });
  }
  static updateValue(key, value) {
    if (!this.kvValues) return;
    if (!this.kvValues[key]) {
      const line = _framework_js_services_Builder__WEBPACK_IMPORTED_MODULE_0__["default"].div('debug-line');
      line.innerHTML = `<strong>${key}</strong>: <span class="debug-value">${value}</span>`;
      this.kvWrap.appendChild(line);
      this.kvValues[key] = line.querySelector('.debug-value');
    } else {
      this.kvValues[key].textContent = value;
    }
  }
}

/***/ }),

/***/ "../vendor/bugquest/web-framework/Assets/js/services/Toast.js":
/*!********************************************************************!*\
  !*** ../vendor/bugquest/web-framework/Assets/js/services/Toast.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Toast: () => (/* binding */ Toast)
/* harmony export */ });
/* harmony import */ var _framework_js_services_Builder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @framework/js/services/Builder */ "../vendor/bugquest/web-framework/Assets/js/services/Builder.js");

class Toast {
  static containers = new Map();
  static show(message, {
    type = 'info',
    position = 'top-right',
    duration = 4000,
    icon = null,
    closable = true
  } = {}) {
    const container = this._getContainer(position);
    const toast_el = _framework_js_services_Builder__WEBPACK_IMPORTED_MODULE_0__["default"].div(`bq-toast ${type}`);
    if (icon) {
      const icon_el = _framework_js_services_Builder__WEBPACK_IMPORTED_MODULE_0__["default"].div('bq-toast-icon');
      icon_el.innerHTML = icon;
      toast_el.appendChild(icon_el);
    }
    const message_el = _framework_js_services_Builder__WEBPACK_IMPORTED_MODULE_0__["default"].div('bq-toast-message');
    message_el.innerHTML = message;
    toast_el.appendChild(message_el);
    if (closable) {
      const close_el = _framework_js_services_Builder__WEBPACK_IMPORTED_MODULE_0__["default"].div('bq-toast-close');
      close_el.innerHTML = '✖';
      close_el.title = 'Fermer';
      close_el.addEventListener('click', () => this._removeToast(toast_el));
      toast_el.appendChild(close_el);
    }
    container.appendChild(toast_el);

    // Animation d’apparition
    requestAnimationFrame(() => {
      toast_el.classList.add('show');
    });
    if (duration > 0) setTimeout(() => this._removeToast(toast_el), duration);
  }
  static _getContainer(position) {
    if (!this.containers.has(position)) {
      const container = _framework_js_services_Builder__WEBPACK_IMPORTED_MODULE_0__["default"].div(`bq-toast-container ${position}`);
      document.body.appendChild(container);
      this.containers.set(position, container);
    }
    return this.containers.get(position);
  }
  static _removeToast(toast) {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }
}

/***/ }),

/***/ "../vendor/bugquest/web-framework/Assets/js/services/Translator.js":
/*!*************************************************************************!*\
  !*** ../vendor/bugquest/web-framework/Assets/js/services/Translator.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Translator: () => (/* binding */ Translator),
/* harmony export */   __: () => (/* binding */ __)
/* harmony export */ });
class Translator {
  static _domains = {};
  static _loaded = {};
  static async load(domain) {
    if (this._loaded[domain]) return;
    try {
      const response = await fetch(`/admin/api/locale/domain/get/${domain}`);
      if (!response.ok) throw new Error(`Error for domain: ${domain}`);
      const data = await response.json();
      this._domains[domain] = data;
      this._loaded[domain] = true;
      return data;
    } catch (error) {
      console.error(`[Translator] ${error.message}`);
    }
    return null;
  }
  static async translate(key, domain = 'bugquest', replacements = {}) {
    domain = domain.trim();
    key = key.trim();
    if (!this._loaded[domain]) await this.load(domain);
    let translation = this._domains[domain]?.[key] ?? key;
    return this._applyReplacements(translation, replacements);
  }
  static t(key, domain = 'bugquest', replacements = {}) {
    let translation = this._domains[domain]?.[key] ?? key;
    return this._applyReplacements(translation, replacements);
  }
  static _applyReplacements(str, replacements) {
    return str.replace(/{(.*?)}/g, (match, token) => {
      return replacements[token] ?? match;
    });
  }
}
function __(key, domain = 'bugquest', replacements = {}) {
  return Translator.t(key, domain, replacements);
}

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
/* harmony import */ var _framework_js_services_DebugPanel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @framework/js/services/DebugPanel */ "../vendor/bugquest/web-framework/Assets/js/services/DebugPanel.js");



document.addEventListener('DOMContentLoaded', async () => {
  await _framework_js_services_DebugPanel__WEBPACK_IMPORTED_MODULE_2__.DebugPanel.init();
  _framework_js_components_Accordion__WEBPACK_IMPORTED_MODULE_0__.Accordion.setup();

  //sleep 100ms
  await new Promise(resolve => setTimeout(resolve, 100));
  //call event app_loaded
  document.dispatchEvent(new CustomEvent('bqAppLoaded'));
  console.log('%c[App] JS chargé avec succès 🛠️', 'color: cyan; font-weight: bold');
});
})();

/******/ })()
;
//# sourceMappingURL=app.js.map