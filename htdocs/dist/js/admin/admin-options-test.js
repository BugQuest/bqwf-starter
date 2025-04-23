/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../vendor/bugquest/web-framework/Assets/js/components/MediaGallery.js":
/*!*****************************************************************************!*\
  !*** ../vendor/bugquest/web-framework/Assets/js/components/MediaGallery.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MediaGallery)
/* harmony export */ });
/* harmony import */ var _framework_js_services_Builder_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @framework/js/services/Builder.js */ "../vendor/bugquest/web-framework/Assets/js/services/Builder.js");
/* harmony import */ var _MediaModalViewer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MediaModalViewer.js */ "../vendor/bugquest/web-framework/Assets/js/components/MediaModalViewer.js");
/* harmony import */ var _framework_js_services_Toast__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @framework/js/services/Toast */ "../vendor/bugquest/web-framework/Assets/js/services/Toast.js");
/* harmony import */ var _framework_js_services_Translator_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @framework/js/services/Translator.js */ "../vendor/bugquest/web-framework/Assets/js/services/Translator.js");
/* harmony import */ var _framework_js_services_ConfirmDialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @framework/js/services/ConfirmDialog */ "../vendor/bugquest/web-framework/Assets/js/services/ConfirmDialog.js");





class MediaGallery {
  constructor(element) {
    this.element = element;
    this.canUpload = false;
    this.canModal = false;
    this.onClickItem = null;
    this.canEditTags = false;
    this.deletionMode = false;
    this.perPage = 12;
    this.selectTags = [];
    this.tags = [];
    this.mimeTypes = [];
    this.forced_mimeTypes = [];
    this.search = '';
    //check if element has data-per-page attribute
    const perPage = this.element.dataset.perPage;
    if (perPage && !isNaN(perPage)) this.perPage = parseInt(perPage, 10);
    const canUpload = this.element.dataset.canUpload;
    if (canUpload && canUpload === 'true') this.canUpload = true;
    const canModal = this.element.dataset.canModal;
    if (canModal && canModal === 'true') this.canModal = true;
    const canEditTags = this.element.dataset.canEditTags;
    if (canEditTags && canEditTags === 'true') this.canEditTags = true;
    const forcedMimeTypes = this.element.dataset.forcedMimeTypes;
    if (forcedMimeTypes && forcedMimeTypes.length > 0) {
      this.forced_mimeTypes = forcedMimeTypes.split(',').map(mime => mime.trim());
    }
    this.apiUrl = '/admin/api/medias';
    this.buildElements();
    this.initEvents();
    this.loadTags();
    this.loadPage();
  }
  buildElements() {
    //====== DROPZONE ======
    if (this.canUpload) {
      this.dropZone = _framework_js_services_Builder_js__WEBPACK_IMPORTED_MODULE_0__["default"].div('media-dropzone');
      this.element.appendChild(this.dropZone);
    }

    //====== TAGS ======
    const tags = _framework_js_services_Builder_js__WEBPACK_IMPORTED_MODULE_0__["default"].div('media-gallery-tags');
    this.element.appendChild(tags);
    if (this.canEditTags) {
      //====== TAGS FORM / ACCORDION ======
      const {
        accordeon,
        accordeon_content
      } = _framework_js_services_Builder_js__WEBPACK_IMPORTED_MODULE_0__["default"].accordion((0,_framework_js_services_Translator_js__WEBPACK_IMPORTED_MODULE_3__.__)('Ajouter des tags', 'admin'), 'small');
      tags.appendChild(accordeon);
      tags.appendChild(_framework_js_services_Builder_js__WEBPACK_IMPORTED_MODULE_0__["default"].glow_stick());
      const tags_form = _framework_js_services_Builder_js__WEBPACK_IMPORTED_MODULE_0__["default"].div('media-gallery-tags-form');
      accordeon_content.appendChild(tags_form);
      this.tag_input = _framework_js_services_Builder_js__WEBPACK_IMPORTED_MODULE_0__["default"].input_text((0,_framework_js_services_Translator_js__WEBPACK_IMPORTED_MODULE_3__.__)('Ajouter un tag', 'admin'), '', 'small full');
      tags_form.appendChild(this.tag_input);
      this.tag_submit = _framework_js_services_Builder_js__WEBPACK_IMPORTED_MODULE_0__["default"].button_submit((0,_framework_js_services_Translator_js__WEBPACK_IMPORTED_MODULE_3__.__)('Ajouter', 'admin'), 'button button-primary');
      this.tag_submit.addEventListener('click', e => {
        e.preventDefault();
        this.deletionMode = false;
        tagDeleteBtn.classList.remove('active');
        this.search = '';
        this.updateTags();
        const tag = this.tag_input.value.trim();
        if (tag) {
          this.addTag(tag);
          this.tag_input.value = '';
        }
      });
      tags_form.appendChild(this.tag_submit);
    }

    //====== TAGS ACTIONS/SEARCH ======
    const tags_actions = _framework_js_services_Builder_js__WEBPACK_IMPORTED_MODULE_0__["default"].div('media-gallery-tags-actions');
    tags.appendChild(tags_actions);
    const search = _framework_js_services_Builder_js__WEBPACK_IMPORTED_MODULE_0__["default"].input_search((0,_framework_js_services_Translator_js__WEBPACK_IMPORTED_MODULE_3__.__)('Rechercher', 'admin') + '...', 'small', value => {
      this.search = value;
      this.updateTags();
    }, () => {
      this.search = '';
      this.updateTags();
    });
    tags_actions.appendChild(search);
    if (this.canEditTags) {
      const tagDeleteBtn = this.buildTagDeleteToggle();
      tags_actions.appendChild(tagDeleteBtn);
    }

    //====== TAGS CONTENT ======
    this.tags_content = _framework_js_services_Builder_js__WEBPACK_IMPORTED_MODULE_0__["default"].div('media-gallery-tags-content');
    tags.appendChild(this.tags_content);

    //====== MEDIA GALLERY ======
    const container = _framework_js_services_Builder_js__WEBPACK_IMPORTED_MODULE_0__["default"].div('fullw');
    this.element.appendChild(container);
    this.grid = _framework_js_services_Builder_js__WEBPACK_IMPORTED_MODULE_0__["default"].div('media-gallery-content');
    container.appendChild(this.grid);
    this.pagination = _framework_js_services_Builder_js__WEBPACK_IMPORTED_MODULE_0__["default"].div('media-gallery-pagination');
    container.appendChild(this.pagination);
    if (this.canModal) this.modal = new _MediaModalViewer_js__WEBPACK_IMPORTED_MODULE_1__["default"](this);
  }
  buildTagDeleteToggle(media) {
    const button = _framework_js_services_Builder_js__WEBPACK_IMPORTED_MODULE_0__["default"].div('icon danger');
    button.innerHTML = '❌';
    button.dataset.tooltip = (0,_framework_js_services_Translator_js__WEBPACK_IMPORTED_MODULE_3__.__)('Mode suppression', 'admin');
    button.dataset.tooltipType = 'danger';
    button.onclick = () => {
      this.deletionMode = !this.deletionMode;
      if (this.deletionMode) {
        this.selectTags = [];
        this.updateTags();
        this.loadPage();
      }
      button.classList.toggle('active', this.deletionMode);
    };
    return button;
  }
  initEvents() {
    this.pagination.addEventListener('click', e => {
      const index = e.target.closest('span[data-page]');
      if (index) {
        e.preventDefault();
        const page = parseInt(index.dataset.page, 10);
        if (!isNaN(page)) this.loadPage(page);
      }
    });
    this.tags_content.addEventListener('click', e => {
      e.preventDefault();
      const tag = e.target.closest('span[data-tag]');
      if (!tag) return;
      const id = tag.dataset.tag;
      if (!id) return;
      if (this.deletionMode) {
        _framework_js_services_ConfirmDialog__WEBPACK_IMPORTED_MODULE_4__["default"].show(async () => {
          const response = await fetch(`${this.apiUrl}/tags/delete/${id}`, {
            method: 'DELETE',
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          });
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          const result = await response.json();
          tag.remove();
          this.loadPage();
          _framework_js_services_Toast__WEBPACK_IMPORTED_MODULE_2__.Toast.show((0,_framework_js_services_Translator_js__WEBPACK_IMPORTED_MODULE_3__.__)('Tag supprimé avec succès', 'admin'), {
            type: 'success',
            icon: '✅',
            duration: 5000,
            position: 'bottom-right',
            closable: true
          });
        }, () => null, {
          title: (0,_framework_js_services_Translator_js__WEBPACK_IMPORTED_MODULE_3__.__)('Supprimer ce tag ?', 'admin'),
          message: (0,_framework_js_services_Translator_js__WEBPACK_IMPORTED_MODULE_3__.__)('Cette action est irréversible. Êtes-vous sûr de vouloir continuer ?', 'admin'),
          confirmText: (0,_framework_js_services_Translator_js__WEBPACK_IMPORTED_MODULE_3__.__)('Supprimer', 'admin'),
          cancelText: (0,_framework_js_services_Translator_js__WEBPACK_IMPORTED_MODULE_3__.__)('Annuler', 'admin'),
          confirmClass: 'button danger',
          cancelClass: 'button info'
        });
        return;
      }
      if (this.selectTags.includes(id)) this.selectTags.splice(this.selectTags.indexOf(id), 1);else this.selectTags.push(id);
      this.updateTags();
      this.loadPage(1);
    });
    if (this.canUpload) {
      this.element.addEventListener('dragover', e => {
        e.preventDefault();
        this.dropZone.classList.add('active');
      });
      this.element.addEventListener('dragleave', e => {
        if (e.relatedTarget === null || !this.dropZone.contains(e.relatedTarget)) {
          this.dropZone.classList.remove('active');
        }
      });
      this.element.addEventListener('drop', e => {
        e.preventDefault();
        this.dropZone.classList.remove('active');
        const files = [...e.dataTransfer.files];
        for (let file of files) this.uploadFile(file);
      });
    }
    this.element.addEventListener('click', e => {
      const card = e.target.closest('.__media_card');
      if (card) {
        try {
          const media = JSON.parse(card.dataset.media);
          if (typeof this.onClickItem === 'function') this.onClickItem(media);
          if (this.canModal) this.modal.open(media);
        } catch (err) {
          _framework_js_services_Toast__WEBPACK_IMPORTED_MODULE_2__.Toast.show((0,_framework_js_services_Translator_js__WEBPACK_IMPORTED_MODULE_3__.__)('Erreur de parsing du média :', 'admin') + ' ' + err.message, {
            type: 'danger',
            icon: '⚠️',
            duration: 5000,
            position: 'bottom-right',
            closable: true
          });
          console.error((0,_framework_js_services_Translator_js__WEBPACK_IMPORTED_MODULE_3__.__)('Erreur de parsing du média :', 'admin'), err);
          return;
        }
      }
    });
  }
  async loadPage(page = 1) {
    try {
      const params = new URLSearchParams();
      params.set('per_page', this.perPage);
      this.selectTags.forEach(tagId => {
        params.append('tags[]', tagId);
      });
      if (this.forced_mimeTypes) this.forced_mimeTypes.forEach(mime => {
        params.append('mime_types[]', mime);
      });
      const response = await fetch(`${this.apiUrl}/all/${page}?${params}`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const result = await response.json();
      this.renderMedia(result.items);
      this.renderPagination(result.current_page, result.last_page);
    } catch (err) {
      _framework_js_services_Toast__WEBPACK_IMPORTED_MODULE_2__.Toast.show('[MediaGalleryLoader] ' + (0,_framework_js_services_Translator_js__WEBPACK_IMPORTED_MODULE_3__.__)('Erreur de chargement des médias :', 'admin') + ' ' + err.message, {
        type: 'danger',
        icon: '⚠️',
        duration: 5000,
        position: 'bottom-right',
        closable: true
      });
      console.error('[MediaGalleryLoader] ' + (0,_framework_js_services_Translator_js__WEBPACK_IMPORTED_MODULE_3__.__)('Erreur de chargement des médias :', 'admin'), err);
    }
  }
  async loadTags() {
    try {
      const response = await fetch(`${this.apiUrl}/tags/all`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const result = await response.json();
      this.tags = result;
      this.renderTags();
    } catch (err) {
      _framework_js_services_Toast__WEBPACK_IMPORTED_MODULE_2__.Toast.show('[MediaGalleryLoader] ' + (0,_framework_js_services_Translator_js__WEBPACK_IMPORTED_MODULE_3__.__)('Erreur de chargement des tags :', 'admin') + ' ' + err.message, {
        type: 'danger',
        icon: '⚠️',
        duration: 5000,
        position: 'bottom-right',
        closable: true
      });
      console.error('[MediaGalleryLoader] ' + (0,_framework_js_services_Translator_js__WEBPACK_IMPORTED_MODULE_3__.__)('Erreur de chargement des tags :', 'admin'), err);
    }
  }
  async addTag(tag) {
    try {
      const response = await fetch(`${this.apiUrl}/tags/add`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: 'name=' + encodeURIComponent(tag)
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const result = await response.json();
      this.loadTags();
    } catch (err) {
      _framework_js_services_Toast__WEBPACK_IMPORTED_MODULE_2__.Toast.show('[MediaGalleryLoader] ' + (0,_framework_js_services_Translator_js__WEBPACK_IMPORTED_MODULE_3__.__)("Erreur d'ajout de tag :", 'admin') + ' ' + err.message, {
        type: 'danger',
        icon: '⚠️',
        duration: 5000,
        position: 'bottom-right',
        closable: true
      });
      console.error('[MediaGalleryLoader] ' + (0,_framework_js_services_Translator_js__WEBPACK_IMPORTED_MODULE_3__.__)("Erreur d'ajout de tag :", 'admin'), err);
    }
  }
  renderMedia(mediaItems = []) {
    this.grid.innerHTML = '';
    mediaItems.forEach(media => {
      const card = this.createMediaCard(media);
      this.grid.appendChild(card);
    });
  }
  renderPagination(currentPage, lastPage) {
    this.pagination.innerHTML = '';
    for (let page = 1; page <= lastPage; page++) {
      const span = document.createElement('span');
      span.dataset.page = page;
      span.textContent = page;
      if (page === currentPage) span.classList.add('active');
      this.pagination.appendChild(span);
    }
  }
  renderTags() {
    this.tags_content.innerHTML = '';
    this.tags.forEach(tag => {
      const span = document.createElement('span');
      span.dataset.tag = tag.id;
      span.textContent = tag.name;
      this.tags_content.appendChild(span);
    });
  }

  /*
      * Met à jour les tags de la galerie de médias. ajouter class active sur les tags sélectionnés
   */
  updateTags() {
    const tags = this.tags_content.querySelectorAll('span[data-tag]');
    tags.forEach(tag => {
      const id = tag.dataset.tag;
      if (!id) return;
      if (this.search) tag.classList.toggle('hidden', !tag.textContent.toLowerCase().includes(this.search.toLowerCase()));
      if (this.selectTags.includes(id)) tag.classList.add('active');else tag.classList.remove('active');
    });
  }
  createMediaCard(media) {
    const div = document.createElement('div');
    div.className = 'media-card __media_card';
    div.dataset.id = media.id;
    const isImage = media.mime_type.startsWith('image/');
    div.innerHTML = `
            <div class="media-card--mime">${media.mime_type}</div>
            <div class="media-card--preview">
                ${isImage ? `<img src="/${media.path}" alt="${media.original_name}">` : `<div class="media-card--icon">${this.getIconForMime(media.mime_type)}</div>`}
            </div>
            <div class="media-card--meta">
                <div class="name">${media.original_name}</div>
                <div class="size">${(media.size / 1024).toFixed(1)} ko</div>
            </div>
        `;
    div.dataset.media = JSON.stringify(media);
    return div;
  }
  replaceCardWithMedia(tempCard, media) {
    const newCard = this.createMediaCard(media);
    tempCard.replaceWith(newCard);
  }
  getIconForMime(mime) {
    if (mime === 'application/pdf') return '📄';
    if (mime === 'text/plain') return '📃';
    if (mime.startsWith('video/')) return '🎥';
    return '📁';
  }
  uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);
    const tempCard_el = _framework_js_services_Builder_js__WEBPACK_IMPORTED_MODULE_0__["default"].div('media-card uploading');
    const preview_el = _framework_js_services_Builder_js__WEBPACK_IMPORTED_MODULE_0__["default"].div('media-card--preview');
    const progressBar_el = _framework_js_services_Builder_js__WEBPACK_IMPORTED_MODULE_0__["default"].div('progress-bar');
    preview_el.appendChild(this.getPreviewHTML(file));
    tempCard_el.appendChild(preview_el);
    tempCard_el.appendChild(progressBar_el);
    this.grid.prepend(tempCard_el);
    const progressBar = tempCard_el.querySelector('.progress-bar');
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${this.apiUrl}/upload`);
    xhr.upload.onprogress = e => {
      const percent = Math.floor(e.loaded / e.total * 100);
      progressBar.style.width = percent + '%';
    };
    xhr.onload = () => {
      if (xhr.status === 200) {
        try {
          const response = JSON.parse(xhr.responseText);
          this.replaceCardWithMedia(tempCard_el, response);
        } catch (err) {
          tempCard_el.innerHTML = `<div class="error">❌ ${(0,_framework_js_services_Translator_js__WEBPACK_IMPORTED_MODULE_3__.__)('Réponse invalide', 'admin')}</div>`;
        }
      } else {
        tempCard_el.innerHTML = `<div class="error">❌ ${(0,_framework_js_services_Translator_js__WEBPACK_IMPORTED_MODULE_3__.__)('Upload échoué', 'admin')}</div>`;
      }
    };
    xhr.onerror = () => {
      tempCard_el.innerHTML = `<div class="error">❌ ${(0,_framework_js_services_Translator_js__WEBPACK_IMPORTED_MODULE_3__.__)('Erreur réseau', 'admin')}</div>`;
    };
    xhr.send(formData);
  }
  getPreviewHTML(file) {
    if (file.type.startsWith('image/svg')) {
      const svg = _framework_js_services_Builder_js__WEBPACK_IMPORTED_MODULE_0__["default"].img(URL.createObjectURL(file), 'preview');
      return svg;
    } else if (file.type.startsWith('image/')) return _framework_js_services_Builder_js__WEBPACK_IMPORTED_MODULE_0__["default"].img(URL.createObjectURL(file), 'preview');
    const div = _framework_js_services_Builder_js__WEBPACK_IMPORTED_MODULE_0__["default"].div('media-card--icon');
    div.innerHTML = this.getIconForMime(file.type);
    return div;
  }
}

/***/ }),

/***/ "../vendor/bugquest/web-framework/Assets/js/components/MediaModalViewer.js":
/*!*********************************************************************************!*\
  !*** ../vendor/bugquest/web-framework/Assets/js/components/MediaModalViewer.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MediaModalViewer)
/* harmony export */ });
/* harmony import */ var _framework_js_services_Builder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @framework/js/services/Builder */ "../vendor/bugquest/web-framework/Assets/js/services/Builder.js");
/* harmony import */ var _framework_js_services_ConfirmDialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @framework/js/services/ConfirmDialog */ "../vendor/bugquest/web-framework/Assets/js/services/ConfirmDialog.js");
/* harmony import */ var _framework_js_services_Toast__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @framework/js/services/Toast */ "../vendor/bugquest/web-framework/Assets/js/services/Toast.js");
/* harmony import */ var _framework_js_services_Translator_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @framework/js/services/Translator.js */ "../vendor/bugquest/web-framework/Assets/js/services/Translator.js");




class MediaModalViewer {
  constructor(gallery) {
    this.gallery = gallery;
    this.waitingTags = [];
    this.deletionMode = false;
    this.new_tag = '';
    this.modal = _framework_js_services_Builder__WEBPACK_IMPORTED_MODULE_0__["default"].modal(null, () => {}, () => {
      this.gallery.loadPage();
      this.waitingTags = [];
      this.deletionMode = false;
      content.innerHTML = '';
    });
    document.body.appendChild(this.modal);
  }
  async open(media) {
    if (!media) return;
    this.waitingTags = media.tags ? JSON.parse(JSON.stringify(media.tags)) : [];
    this.deletionMode = false;
    this.modal.content.innerHTML = '';
    const container = _framework_js_services_Builder__WEBPACK_IMPORTED_MODULE_0__["default"].div('media-modal');
    container.appendChild(this.buildActions(media));
    container.appendChild(this.buildPreview(media));
    const info = _framework_js_services_Builder__WEBPACK_IMPORTED_MODULE_0__["default"].div('media-modal--info');
    const infoContainer = _framework_js_services_Builder__WEBPACK_IMPORTED_MODULE_0__["default"].div('media-modal--info-container');
    const title = _framework_js_services_Builder__WEBPACK_IMPORTED_MODULE_0__["default"].h2(media.original_name);
    const infoSub = _framework_js_services_Builder__WEBPACK_IMPORTED_MODULE_0__["default"].div();
    const list = _framework_js_services_Builder__WEBPACK_IMPORTED_MODULE_0__["default"].list([`<strong>Type :</strong> ${media.mime_type}`, `<strong>Taille :</strong> ${(media.size / 1024).toFixed(1)} ko`, `<strong>Extension :</strong> ${media.extension}`, `<strong>Ajouté le :</strong> ${new Date(media.created_at).toLocaleDateString('fr-FR')}`]);
    infoSub.appendChild(title);
    infoSub.appendChild(list);
    infoContainer.appendChild(infoSub);
    infoContainer.appendChild(this.buildTagEditor(media));
    info.appendChild(infoContainer);
    if (media.exif && typeof media.exif === 'object' && Object.keys(media.exif).length > 0) {
      const {
        accordeon,
        accordeon_content
      } = _framework_js_services_Builder__WEBPACK_IMPORTED_MODULE_0__["default"].accordion('EXIF', 'small');
      const exifList = _framework_js_services_Builder__WEBPACK_IMPORTED_MODULE_0__["default"].list(Object.entries(media.exif).map(([key, value]) => `<strong>${key}:</strong> ${typeof value === 'object' ? JSON.stringify(value) : value}`));
      exifList.classList.add('media-modal--exif');
      accordeon_content.appendChild(exifList);
      info.appendChild(accordeon);
    }
    container.appendChild(info);
    this.modal.content.appendChild(container);
    this.modal.open();
  }
  buildTagUpdateButton(media) {
    const button = _framework_js_services_Builder__WEBPACK_IMPORTED_MODULE_0__["default"].div('icon info hidden');
    button.innerHTML = '💾';
    button.dataset.tooltip = (0,_framework_js_services_Translator_js__WEBPACK_IMPORTED_MODULE_3__.__)('Mettre à jour les tags', 'admin');
    button.dataset.tooltipType = 'info';
    button.onclick = async () => {
      let tagIds = this.waitingTags.map(tag => tag.id);
      const encoded = tagIds.map(id => `tags[]=${encodeURIComponent(id)}`).join('&');
      this.deletionMode = false;
      this.tagDeleteBtn.classList.remove('active');
      try {
        const res = await fetch(`${this.gallery.apiUrl}/tags/set/${media.id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: encoded
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        this.waitingTags.forEach(tag => {
          if ("new" in tag && tag.new) delete tag.new;
        });
        media.tags = JSON.parse(JSON.stringify(this.waitingTags));
        this.updateTagList();
        this.updateTagButtonVisibility();
        _framework_js_services_Toast__WEBPACK_IMPORTED_MODULE_2__.Toast.show((0,_framework_js_services_Translator_js__WEBPACK_IMPORTED_MODULE_3__.__)('Tags mis à jour', 'admin'), {
          type: 'success',
          icon: '✅',
          duration: 2000,
          position: 'bottom-right',
          closable: true
        });
      } catch (err) {
        _framework_js_services_Toast__WEBPACK_IMPORTED_MODULE_2__.Toast.show('[MediaModalViewer] ' + (0,_framework_js_services_Translator_js__WEBPACK_IMPORTED_MODULE_3__.__)('Erreur mise à jour des tags :', 'admin') + ' ' + err.message, {
          type: 'danger',
          icon: '⚠️',
          duration: 5000,
          position: 'bottom-right',
          closable: true
        });
        console.error('[MediaModalViewer] ' + (0,_framework_js_services_Translator_js__WEBPACK_IMPORTED_MODULE_3__.__)('Erreur mise à jour des tags :', 'admin'), err);
      }
    };
    return button;
  }
  buildTagDeleteToggle(media) {
    const button = _framework_js_services_Builder__WEBPACK_IMPORTED_MODULE_0__["default"].div('icon danger');
    button.innerHTML = '❌';
    button.dataset.tooltip = (0,_framework_js_services_Translator_js__WEBPACK_IMPORTED_MODULE_3__.__)('Mode suppression', 'admin');
    button.dataset.tooltipType = 'danger';
    button.onclick = () => {
      this.deletionMode = !this.deletionMode;

      //if close delete mode, reset tags to original and keep new tags at end
      if (!this.deletionMode) {
        const newTags = this.waitingTags.filter(tag => "new" in tag && tag.new);
        this.waitingTags = media.tags ? JSON.parse(JSON.stringify(media.tags)) : [];
        this.waitingTags.push(...newTags);
        this.updateTagList();
        this.updateTagButtonVisibility();
      }
      button.classList.toggle('active', this.deletionMode);
    };
    return button;
  }
  buildAddCategoryButton(media) {
    const button = _framework_js_services_Builder__WEBPACK_IMPORTED_MODULE_0__["default"].div('icon hidden');
    button.innerHTML = '➕';
    button.dataset.tooltip = (0,_framework_js_services_Translator_js__WEBPACK_IMPORTED_MODULE_3__.__)('Ajouter une nouvelle catégorie', 'admin');
    button.dataset.tooltipType = 'info';
    button.onclick = async () => {
      if (!this.new_tag || this.new_tag.length < 3) return;

      //check if tag already exists
      const tagExists = this.gallery.tags.find(tag => tag.name.toLowerCase() === this.new_tag.toLowerCase());
      if (tagExists) return;
      try {
        const response = await fetch(`${this.gallery.apiUrl}/tags/add`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: 'name=' + encodeURIComponent(this.new_tag)
        });
        this.search.dispatchEvent(new Event('close'));
        this.new_tag = '';
        this.tagAddBtn.classList.add('hidden');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const tag = await response.json();
        this.gallery.tags.push(tag);
        this.gallery.renderTags();
        tag.new = true;
        this.waitingTags.push(tag);
        this.updateTagList();
        this.updateTagButtonVisibility();
      } catch (err) {
        _framework_js_services_Toast__WEBPACK_IMPORTED_MODULE_2__.Toast.show('[MediaModalViewer] ' + (0,_framework_js_services_Translator_js__WEBPACK_IMPORTED_MODULE_3__.__)("Erreur d'ajout de tag :", 'admin') + ' ' + err.message, {
          type: 'danger',
          icon: '⚠️',
          duration: 5000,
          position: 'bottom-right',
          closable: true
        });
        console.error('[MediaModalViewer] ' + (0,_framework_js_services_Translator_js__WEBPACK_IMPORTED_MODULE_3__.__)("Erreur d'ajout de tag :", 'admin'), err);
      }
    };
    return button;
  }
  buildTagEditor(media) {
    const tagsContainer = _framework_js_services_Builder__WEBPACK_IMPORTED_MODULE_0__["default"].div('media-modal--tags');
    const tagList = _framework_js_services_Builder__WEBPACK_IMPORTED_MODULE_0__["default"].div('media-modal--tags-list');
    const tagActions = _framework_js_services_Builder__WEBPACK_IMPORTED_MODULE_0__["default"].div('media-modal--tags-actions');
    this.tagUpdateBtn = this.buildTagUpdateButton(media);
    this.tagAddBtn = this.buildAddCategoryButton(media);
    this.tagDeleteBtn = this.buildTagDeleteToggle(media);
    tagActions.append(this.tagUpdateBtn, this.tagDeleteBtn, this.tagAddBtn);
    this.updateTagButtonVisibility = () => {
      //check if waintingTags is different from media.tags, ignore order, check only ids
      const waitingTagIds = this.waitingTags.map(tag => tag.id);
      const mediaTagIds = media.tags.map(tag => tag.id);
      const isDifferent = waitingTagIds.length !== mediaTagIds.length || waitingTagIds.some(id => !mediaTagIds.includes(id));
      if (isDifferent) this.tagUpdateBtn.classList.remove('hidden');else this.tagUpdateBtn.classList.add('hidden');
    };
    this.updateTagList = () => {
      tagList.innerHTML = '';
      this.waitingTags.forEach(tag => {
        const tagEl = _framework_js_services_Builder__WEBPACK_IMPORTED_MODULE_0__["default"].div('tag');
        tagEl.textContent = tag.name;
        tagEl.dataset.tag = tag.id;
        if (tag.new) {
          tagEl.classList.add('new');
          tagEl.dataset.tooltip = (0,_framework_js_services_Translator_js__WEBPACK_IMPORTED_MODULE_3__.__)('Cliquez pour supprimer', 'admin');
          tagEl.dataset.tooltipType = 'info';
        }
        tagEl.onclick = () => {
          if (!this.deletionMode) return;
          this.waitingTags = this.waitingTags.filter(t => t.id !== tag.id);
          tagEl.remove();
          this.updateTagButtonVisibility();
        };
        tagList.appendChild(tagEl);
      });
    };
    this.updateTagList();
    const {
      searchContainer,
      result
    } = _framework_js_services_Builder__WEBPACK_IMPORTED_MODULE_0__["default"].search((0,_framework_js_services_Translator_js__WEBPACK_IMPORTED_MODULE_3__.__)('Ajouter un tag', 'admin') + '...', (value, results_el) => {
      this.new_tag = value;
      results_el.innerHTML = '';
      const filtered = this.gallery.tags.filter(tag => tag.name.toLowerCase().includes(value.toLowerCase()) && !media.tags.some(t => t.id === tag.id) && !this.waitingTags.some(t => t.id === tag.id));
      if (filtered.length) {
        this.tagAddBtn.classList.add('hidden');
        results_el.classList.add('active');
      } else {
        this.tagAddBtn.classList.remove('hidden');
        results_el.classList.remove('active');
      }
      filtered.forEach(tag => {
        const tagEl = _framework_js_services_Builder__WEBPACK_IMPORTED_MODULE_0__["default"].div('result-item');
        tagEl.textContent = tag.name;
        tagEl.dataset.tag = tag.id;
        results_el.appendChild(tagEl);
      });
    }, item => {
      const tagId = parseInt(item.dataset.tag);
      const tag = this.gallery.tags.find(t => t.id === tagId);
      if (!tag) return;
      tag.new = true;
      this.waitingTags.push(tag);
      searchContainer.dispatchEvent(new Event('close'));
      this.updateTagList();
      this.updateTagButtonVisibility();
    }, 2);
    this.search = searchContainer;
    tagsContainer.append(tagActions, tagList, searchContainer);
    return tagsContainer;
  }
  buildActions(media) {
    const actions = _framework_js_services_Builder__WEBPACK_IMPORTED_MODULE_0__["default"].div('flex-actions');
    const dl = _framework_js_services_Builder__WEBPACK_IMPORTED_MODULE_0__["default"].div('icon');
    dl.innerHTML = '📥';
    dl.dataset.tooltip = (0,_framework_js_services_Translator_js__WEBPACK_IMPORTED_MODULE_3__.__)('Télécharger', 'admin');
    dl.dataset.tooltipType = 'info';
    dl.onclick = async () => {
      const blob = await (await fetch('/' + media.path)).blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = media.original_name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
    const open = _framework_js_services_Builder__WEBPACK_IMPORTED_MODULE_0__["default"].div('icon');
    open.innerHTML = '🔗';
    open.dataset.tooltip = (0,_framework_js_services_Translator_js__WEBPACK_IMPORTED_MODULE_3__.__)('Ouvrir', 'admin');
    open.dataset.tooltipType = 'info';
    open.onclick = () => window.open('/' + media.path, '_blank');
    const del = _framework_js_services_Builder__WEBPACK_IMPORTED_MODULE_0__["default"].div('icon danger');
    del.innerHTML = '🗑️';
    del.dataset.tooltip = (0,_framework_js_services_Translator_js__WEBPACK_IMPORTED_MODULE_3__.__)('Supprimer', 'admin');
    del.dataset.tooltipType = 'danger';
    del.onclick = async () => {
      _framework_js_services_ConfirmDialog__WEBPACK_IMPORTED_MODULE_1__["default"].show(async () => {
        try {
          const res = await fetch(`${this.gallery.apiUrl}/delete/${media.id}`, {
            method: 'DELETE'
          });
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          this.gallery.loadPage();
          _framework_js_services_Toast__WEBPACK_IMPORTED_MODULE_2__.Toast.show((0,_framework_js_services_Translator_js__WEBPACK_IMPORTED_MODULE_3__.__)('Média supprimé', 'admin'), {
            type: 'success',
            icon: '✅',
            duration: 2000,
            position: 'bottom-right',
            closable: true
          });
          this.modal.close();
        } catch (e) {
          _framework_js_services_Toast__WEBPACK_IMPORTED_MODULE_2__.Toast.show('[MediaModalViewer] ' + (0,_framework_js_services_Translator_js__WEBPACK_IMPORTED_MODULE_3__.__)('Erreur suppression média :', 'admin') + ' ' + e.message, {
            type: 'danger',
            icon: '⚠️',
            duration: 5000,
            position: 'bottom-right',
            closable: true
          });
          console.error('[MediaModalViewer] ' + (0,_framework_js_services_Translator_js__WEBPACK_IMPORTED_MODULE_3__.__)('Erreur suppression média :', 'admin'), e);
        }
      }, () => null, {
        title: (0,_framework_js_services_Translator_js__WEBPACK_IMPORTED_MODULE_3__.__)('Supprimer ce média ?', 'admin'),
        message: (0,_framework_js_services_Translator_js__WEBPACK_IMPORTED_MODULE_3__.__)('Cette action est irréversible. Êtes-vous sûr de vouloir continuer ?', 'admin'),
        confirmText: (0,_framework_js_services_Translator_js__WEBPACK_IMPORTED_MODULE_3__.__)('Supprimer', 'admin'),
        cancelText: (0,_framework_js_services_Translator_js__WEBPACK_IMPORTED_MODULE_3__.__)('Annuler', 'admin'),
        confirmClass: 'button danger',
        cancelClass: 'button info'
      });
    };
    actions.append(dl, open, del);
    return actions;
  }
  buildPreview(media) {
    const preview = _framework_js_services_Builder__WEBPACK_IMPORTED_MODULE_0__["default"].div('media-modal--preview');
    if (media.mime_type.startsWith('image/')) {
      preview.appendChild(_framework_js_services_Builder__WEBPACK_IMPORTED_MODULE_0__["default"].img('/' + media.path, media.original_name));
    } //svg
    else if (media.mime_type.startsWith('image/svg')) {
      const svg = _framework_js_services_Builder__WEBPACK_IMPORTED_MODULE_0__["default"].img('/' + media.path, media.original_name);
      preview.appendChild(svg);
    } else {
      const icon = _framework_js_services_Builder__WEBPACK_IMPORTED_MODULE_0__["default"].div('media-card--icon');
      icon.innerHTML = this.gallery.getIconForMime(media.mime_type);
      preview.appendChild(icon);
    }
    return preview;
  }
}

/***/ }),

/***/ "../vendor/bugquest/web-framework/Assets/js/options/BlockFactory.js":
/*!**************************************************************************!*\
  !*** ../vendor/bugquest/web-framework/Assets/js/options/BlockFactory.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BlockFactory: () => (/* binding */ BlockFactory)
/* harmony export */ });
/* harmony import */ var _IntBlock_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./IntBlock.js */ "../vendor/bugquest/web-framework/Assets/js/options/IntBlock.js");
/* harmony import */ var _FloatBlock_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FloatBlock.js */ "../vendor/bugquest/web-framework/Assets/js/options/FloatBlock.js");
/* harmony import */ var _StringBlock_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./StringBlock.js */ "../vendor/bugquest/web-framework/Assets/js/options/StringBlock.js");
/* harmony import */ var _MediaBlock_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./MediaBlock.js */ "../vendor/bugquest/web-framework/Assets/js/options/MediaBlock.js");
/* harmony import */ var _SelectBlock_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./SelectBlock.js */ "../vendor/bugquest/web-framework/Assets/js/options/SelectBlock.js");
/* harmony import */ var _BoolBlock_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./BoolBlock.js */ "../vendor/bugquest/web-framework/Assets/js/options/BoolBlock.js");
/* harmony import */ var _TextareaBlock_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./TextareaBlock.js */ "../vendor/bugquest/web-framework/Assets/js/options/TextareaBlock.js");







class BlockFactory {
  static types = {
    int: _IntBlock_js__WEBPACK_IMPORTED_MODULE_0__.IntBlock,
    float: _FloatBlock_js__WEBPACK_IMPORTED_MODULE_1__.FloatBlock,
    string: _StringBlock_js__WEBPACK_IMPORTED_MODULE_2__.StringBlock,
    media: _MediaBlock_js__WEBPACK_IMPORTED_MODULE_3__.MediaBlock,
    select: _SelectBlock_js__WEBPACK_IMPORTED_MODULE_4__.SelectBlock,
    bool: _BoolBlock_js__WEBPACK_IMPORTED_MODULE_5__.BoolBlock,
    textarea: _TextareaBlock_js__WEBPACK_IMPORTED_MODULE_6__.TextareaBlock
  };
  static register(type, clazz) {
    this.types[type] = clazz;
  }
  static create(type, key, label, value = null, options = [], onChange = null, group = 'default') {
    const BlockClass = this.types[type];
    if (!BlockClass) throw new Error(`Type de bloc inconnu : ${type}`);
    return new BlockClass(key, label, value, options, onChange, group);
  }
}

/***/ }),

/***/ "../vendor/bugquest/web-framework/Assets/js/options/BoolBlock.js":
/*!***********************************************************************!*\
  !*** ../vendor/bugquest/web-framework/Assets/js/options/BoolBlock.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BoolBlock: () => (/* binding */ BoolBlock)
/* harmony export */ });
/* harmony import */ var _OptionBlock_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./OptionBlock.js */ "../vendor/bugquest/web-framework/Assets/js/options/OptionBlock.js");
/* harmony import */ var _framework_js_services_Builder_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @framework/js/services/Builder.js */ "../vendor/bugquest/web-framework/Assets/js/services/Builder.js");
/* harmony import */ var _framework_js_services_Translator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @framework/js/services/Translator.js */ "../vendor/bugquest/web-framework/Assets/js/services/Translator.js");



class BoolBlock extends _OptionBlock_js__WEBPACK_IMPORTED_MODULE_0__.OptionBlock {
  constructor(key, label, value = false, options = {}, onChange = null, group = 'default') {
    super(key, label, value, options, onChange, group);
    this.type = 'bool';
  }
  render(container) {
    const wrapper = super.render();
    wrapper.classList.add('bool');
    wrapper.appendChild(_framework_js_services_Builder_js__WEBPACK_IMPORTED_MODULE_1__["default"].label(this.label));
    const switcher = _framework_js_services_Builder_js__WEBPACK_IMPORTED_MODULE_1__["default"].div('bool-switch');
    switcher.dataset.state = this.value ? 'on' : 'off';
    switcher.title = this.value ? (0,_framework_js_services_Translator_js__WEBPACK_IMPORTED_MODULE_2__.__)('Activé', 'options') : (0,_framework_js_services_Translator_js__WEBPACK_IMPORTED_MODULE_2__.__)('Désactivé', 'options');
    switcher.addEventListener('click', () => {
      this.value = !this.value;
      switcher.dataset.state = this.value ? 'on' : 'off';
      switcher.title = this.value ? (0,_framework_js_services_Translator_js__WEBPACK_IMPORTED_MODULE_2__.__)('Activé', 'options') : (0,_framework_js_services_Translator_js__WEBPACK_IMPORTED_MODULE_2__.__)('Désactivé', 'options');
      this.notifyChange();
    });
    wrapper.appendChild(switcher);
    container.appendChild(wrapper);
  }
}

/***/ }),

/***/ "../vendor/bugquest/web-framework/Assets/js/options/FloatBlock.js":
/*!************************************************************************!*\
  !*** ../vendor/bugquest/web-framework/Assets/js/options/FloatBlock.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FloatBlock: () => (/* binding */ FloatBlock)
/* harmony export */ });
/* harmony import */ var _OptionBlock_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./OptionBlock.js */ "../vendor/bugquest/web-framework/Assets/js/options/OptionBlock.js");
/* harmony import */ var _framework_js_services_Builder_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @framework/js/services/Builder.js */ "../vendor/bugquest/web-framework/Assets/js/services/Builder.js");


class FloatBlock extends _OptionBlock_js__WEBPACK_IMPORTED_MODULE_0__.OptionBlock {
  constructor(key, label, value = null, options = {}, onChange = null, group = 'default') {
    super(key, label, value, options, onChange, group);
    this.type = 'float';
    this.debounceTimer = null;
    this.delay = this.options?.delay ?? 2000;
    this.placeholder = this.options?.placeholder ?? '';
  }
  render(container) {
    const wrapper = super.render();
    wrapper.classList.add('float');
    wrapper.appendChild(_framework_js_services_Builder_js__WEBPACK_IMPORTED_MODULE_1__["default"].label(this.label));
    const input = _framework_js_services_Builder_js__WEBPACK_IMPORTED_MODULE_1__["default"].input_number(this.placeholder, 'any', this.value);
    wrapper.appendChild(input);
    const progress = _framework_js_services_Builder_js__WEBPACK_IMPORTED_MODULE_1__["default"].div('save-progress');
    wrapper.appendChild(progress);
    input.addEventListener('input', e => {
      this.value = parseFloat(e.target.value);
      progress.style.transition = 'none';
      progress.style.width = '0';
      requestAnimationFrame(() => {
        progress.style.transition = `width ${this.delay}ms linear`;
        progress.style.width = '100%';
      });
      this.debounce(() => {
        this.notifyChange();
        progress.style.transition = 'none';
        progress.style.width = '0';
      }, this.delay);
    });
    container.appendChild(wrapper);
  }
  debounce(callback, delay) {
    console.log('Debouncing...');
    if (this.debounceTimer) clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(callback, delay);
  }
}

/***/ }),

/***/ "../vendor/bugquest/web-framework/Assets/js/options/IntBlock.js":
/*!**********************************************************************!*\
  !*** ../vendor/bugquest/web-framework/Assets/js/options/IntBlock.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IntBlock: () => (/* binding */ IntBlock)
/* harmony export */ });
/* harmony import */ var _OptionBlock_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./OptionBlock.js */ "../vendor/bugquest/web-framework/Assets/js/options/OptionBlock.js");
/* harmony import */ var _framework_js_services_Builder_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @framework/js/services/Builder.js */ "../vendor/bugquest/web-framework/Assets/js/services/Builder.js");


class IntBlock extends _OptionBlock_js__WEBPACK_IMPORTED_MODULE_0__.OptionBlock {
  constructor(key, label, value = null, options = {}, onChange = null, group = 'default') {
    super(key, label, value, options, onChange, group);
    this.type = 'int';
    this.debounceTimer = null;
    this.delay = this.options?.delay ?? 2000;
    this.placeholder = this.options?.placeholder ?? '';
  }
  render(container) {
    const wrapper = super.render();
    wrapper.classList.add('int');
    wrapper.appendChild(_framework_js_services_Builder_js__WEBPACK_IMPORTED_MODULE_1__["default"].label(this.label));
    const input = _framework_js_services_Builder_js__WEBPACK_IMPORTED_MODULE_1__["default"].input_number(this.placeholder, 1, this.value);
    wrapper.appendChild(input);
    const progress = _framework_js_services_Builder_js__WEBPACK_IMPORTED_MODULE_1__["default"].div('save-progress');
    wrapper.appendChild(progress);
    input.addEventListener('input', e => {
      this.value = parseInt(e.target.value);

      // Réinitialiser progress
      progress.style.transition = 'none';
      progress.style.width = '0';
      requestAnimationFrame(() => {
        progress.style.transition = `width ${this.delay}ms linear`;
        progress.style.width = '100%';
      });
      this.debounce(() => {
        this.notifyChange();
        progress.style.transition = 'none';
        progress.style.width = '0';
      }, this.delay);
    });
    container.appendChild(wrapper);
  }
  debounce(callback, delay) {
    console.log('Debouncing...');
    if (this.debounceTimer) clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(callback, delay);
  }
}

/***/ }),

/***/ "../vendor/bugquest/web-framework/Assets/js/options/MediaBlock.js":
/*!************************************************************************!*\
  !*** ../vendor/bugquest/web-framework/Assets/js/options/MediaBlock.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MediaBlock: () => (/* binding */ MediaBlock)
/* harmony export */ });
/* harmony import */ var _OptionBlock_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./OptionBlock.js */ "../vendor/bugquest/web-framework/Assets/js/options/OptionBlock.js");
/* harmony import */ var _framework_js_services_Builder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @framework/js/services/Builder */ "../vendor/bugquest/web-framework/Assets/js/services/Builder.js");
/* harmony import */ var _framework_js_services_MediaPicker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @framework/js/services/MediaPicker */ "../vendor/bugquest/web-framework/Assets/js/services/MediaPicker.js");
/* harmony import */ var _framework_js_services_Translator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @framework/js/services/Translator */ "../vendor/bugquest/web-framework/Assets/js/services/Translator.js");




class MediaBlock extends _OptionBlock_js__WEBPACK_IMPORTED_MODULE_0__.OptionBlock {
  constructor(key, label, value = null, options = {}, onChange = null, group = 'default') {
    super(key, label, value, options, onChange, group);
    this.type = 'media';
    this.mimeTypes = options.mimeTypes || [];
  }
  render(container) {
    const wrapper = super.render();
    wrapper.classList.add('media');
    const preview = _framework_js_services_Builder__WEBPACK_IMPORTED_MODULE_1__["default"].div('media-preview');
    preview.textContent = this.value || (0,_framework_js_services_Translator__WEBPACK_IMPORTED_MODULE_3__.__)('aucun média sélectionné', 'options');
    preview.dataset.tooltip = (0,_framework_js_services_Translator__WEBPACK_IMPORTED_MODULE_3__.__)('Cliquez pour changer le média', 'options');
    preview.addEventListener('click', () => {
      _framework_js_services_MediaPicker__WEBPACK_IMPORTED_MODULE_2__["default"].open(this.mimeTypes, media => {
        this.value = media.id;
        preview.innerHTML = '';
        preview.appendChild(this.getPreview(media));
        this.notifyChange();
      });
    });
    if (this.value) {
      preview.appendChild(this.getPreview(this.value));
      this.value = this.value.id;
    }
    wrapper.appendChild(preview);
    container.appendChild(wrapper);
  }
  getPreview(media) {
    //return img if media is an image, else return icon (media.mime_type)
    if (media.mime_type.startsWith('image/')) {
      return _framework_js_services_Builder__WEBPACK_IMPORTED_MODULE_1__["default"].img('/' + media.path, media.name, 'media-current');
    } else {
      const icon = this.getIconForMime(media.mime_type);
      let span = _framework_js_services_Builder__WEBPACK_IMPORTED_MODULE_1__["default"].span('media-current');
      span.textContent = icon;
      return span;
    }
  }
  getIconForMime(mime) {
    if (mime === 'application/pdf') return '📄';
    if (mime === 'text/plain') return '📃';
    if (mime.startsWith('video/')) return '🎥';
    return '📁';
  }
}

/***/ }),

/***/ "../vendor/bugquest/web-framework/Assets/js/options/OptionBlock.js":
/*!*************************************************************************!*\
  !*** ../vendor/bugquest/web-framework/Assets/js/options/OptionBlock.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OptionBlock: () => (/* binding */ OptionBlock)
/* harmony export */ });
class OptionBlock {
  constructor(key, label, value = null, options = {}, onChange = null, group = 'default') {
    this.key = key;
    this.label = label;
    this.value = value;
    this.options = options;
    this.type = null;
    this.onChange = onChange;
    this.group = group;
    this.description = this.options?.description || null;
  }
  render() {
    const wrapper = document.createElement('div');
    wrapper.className = 'option-block';
    const descriptionIcon = this.renderDescriptionIcon();
    if (descriptionIcon) wrapper.appendChild(descriptionIcon);
    return wrapper;
  }
  renderDescriptionIcon() {
    if (!this.description) return null;
    const icon = document.createElement('span');
    icon.className = 'option-help';
    icon.textContent = '?';
    icon.dataset.tooltip = this.description;
    return icon;
  }
  notifyChange() {
    if (typeof this.onChange === 'function') this.onChange(this);else throw new Error('onChange is not assigned or is not a function');
  }
}

/***/ }),

/***/ "../vendor/bugquest/web-framework/Assets/js/options/OptionManager.js":
/*!***************************************************************************!*\
  !*** ../vendor/bugquest/web-framework/Assets/js/options/OptionManager.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OptionManager)
/* harmony export */ });
class OptionManager {
  static _cache = new Map(); // Map<string, Map<string, {type, value}>>

  static async getOption(group, key) {
    // Check cache d'abord
    if (this._cache.has(group) && this._cache.get(group).has(key)) {
      return this._cache.get(group).get(key);
    }

    // Sinon fetch
    const res = await fetch(`/admin/api/options/get/${group}/${key}`);
    if (!res.ok) throw new Error(`Erreur chargement de l'option "${key}"`);
    const data = await res.json();

    // Met à jour le cache
    if (!this._cache.has(group)) this._cache.set(group, new Map());
    this._cache.get(group).set(key, data);
    return data;
  }
  static async getOptions(group) {
    if (this._cache.has(group)) {
      return Object.fromEntries(this._cache.get(group));
    }
    const res = await fetch(`/admin/api/options/get/${group}`);
    if (!res.ok) throw new Error(`Erreur chargement des options du groupe "${group}"`);
    const data = await res.json();

    // Stocke en cache sous forme de Map
    const groupMap = new Map(Object.entries(data));
    this._cache.set(group, groupMap);
    return data;
  }
  static async saveOption(option) {
    const group = option.group ?? null;
    const key = option.key ?? null;
    const type = option.type ?? null;
    const value = option.value ?? null;
    if (!group || !key || typeof type !== 'string') throw new Error('Paramètres invalides pour saveOption()');
    const url = `/admin/api/options/set/${group}/${key}`;
    const payload = {
      type,
      value
    };
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    if (!res.ok) {
      throw new Error(`Erreur HTTP ${res.status} : enregistrement de "${key}" échoué`);
    }
    const result = await res.json();

    // Mise à jour du cache
    if (!this._cache.has(group)) this._cache.set(group, new Map());
    this._cache.get(group).set(key, payload);
    return result;
  }
  static async saveOptions(group, options) {
    if (!Array.isArray(options)) throw new Error('Les options doivent être un tableau');
    const filteredOptions = options.filter(opt => typeof opt === 'object' && typeof opt.type === 'string' && 'value' in opt);
    const res = await fetch(`/admin/api/options/set/${group}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(filteredOptions)
    });
    if (!res.ok) throw new Error(`Erreur lors de l'enregistrement des options du groupe "${group}"`);
    const result = await res.json();

    // Mise à jour du cache
    const groupMap = this._cache.get(group) ?? new Map();
    Object.entries(result).forEach(([key, opt]) => {
      groupMap.set(key, opt);
    });
    this._cache.set(group, groupMap);
    return result;
  }
  static async deleteOption(group, key) {
    const res = await fetch(`/admin/api/options/delete/${group}/${key}`, {
      method: 'DELETE'
    });
    if (!res.ok) {
      throw new Error(`Erreur lors de la suppression de l'option "${key}"`);
    }
    const result = await res.json();

    // Retirer du cache
    if (this._cache.has(group)) {
      this._cache.get(group).delete(key);
    }
    return result;
  }
}

/***/ }),

/***/ "../vendor/bugquest/web-framework/Assets/js/options/OptionsPage.js":
/*!*************************************************************************!*\
  !*** ../vendor/bugquest/web-framework/Assets/js/options/OptionsPage.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OptionsPage: () => (/* binding */ OptionsPage)
/* harmony export */ });
/* harmony import */ var _BlockFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BlockFactory */ "../vendor/bugquest/web-framework/Assets/js/options/BlockFactory.js");
/* harmony import */ var _OptionManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OptionManager */ "../vendor/bugquest/web-framework/Assets/js/options/OptionManager.js");
/* harmony import */ var _framework_js_services_Toast__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @framework/js/services/Toast */ "../vendor/bugquest/web-framework/Assets/js/services/Toast.js");
/* harmony import */ var _framework_js_services_Translator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @framework/js/services/Translator */ "../vendor/bugquest/web-framework/Assets/js/services/Translator.js");




class OptionsPage {
  constructor(group, containerSelector = '#options-container') {
    this.group = group;
    this.container = document.querySelector(containerSelector);
    this.options = {};
    this.blocks = [];
  }
  async init() {
    try {
      this.options = await _OptionManager__WEBPACK_IMPORTED_MODULE_1__["default"].getOptions(this.group);
      this.render();
    } catch (err) {
      console.error(`[OptionsPage] Erreur chargement "${this.group}":`, err);
      _framework_js_services_Toast__WEBPACK_IMPORTED_MODULE_2__.Toast.show((0,_framework_js_services_Translator__WEBPACK_IMPORTED_MODULE_3__.__)('Erreur lors du chargement des options', 'admin'), {
        type: 'danger',
        icon: '❌'
      });
    }
  }
  render() {
    throw new Error('La méthode render() doit être implémentée dans la sous-classe');
  }
  createBlock(type, key, label, defaultValue = null, options = {}, group = this.group) {
    const value = key in this.options ? this.options[key] : defaultValue;
    const block = _BlockFactory__WEBPACK_IMPORTED_MODULE_0__.BlockFactory.create(type, key, label, value, options, option => this.handleSaveOption(option), group);
    this.blocks.push(block);
    return block;
  }
  async handleSaveOption(option) {
    try {
      await _OptionManager__WEBPACK_IMPORTED_MODULE_1__["default"].saveOption(option);
      _framework_js_services_Toast__WEBPACK_IMPORTED_MODULE_2__.Toast.show((0,_framework_js_services_Translator__WEBPACK_IMPORTED_MODULE_3__.__)('Option enregistrée avec succès', 'admin'), {
        type: 'success',
        icon: '✅',
        duration: 4000,
        position: 'bottom-right',
        closable: true
      });
    } catch (err) {
      console.error('[OptionsPage] Erreur save option:', err);
      _framework_js_services_Toast__WEBPACK_IMPORTED_MODULE_2__.Toast.show((0,_framework_js_services_Translator__WEBPACK_IMPORTED_MODULE_3__.__)('Erreur lors de l\'enregistrement', 'admin'), {
        type: 'error',
        icon: '❌',
        duration: 4000,
        position: 'bottom-right',
        closable: true
      });
    }
  }
  renderBlocks(...blocks) {
    blocks.forEach(block => block.render(this.container));
  }
}

/***/ }),

/***/ "../vendor/bugquest/web-framework/Assets/js/options/SelectBlock.js":
/*!*************************************************************************!*\
  !*** ../vendor/bugquest/web-framework/Assets/js/options/SelectBlock.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SelectBlock: () => (/* binding */ SelectBlock)
/* harmony export */ });
/* harmony import */ var _OptionBlock_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./OptionBlock.js */ "../vendor/bugquest/web-framework/Assets/js/options/OptionBlock.js");
/* harmony import */ var _framework_js_services_Builder_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @framework/js/services/Builder.js */ "../vendor/bugquest/web-framework/Assets/js/services/Builder.js");


class SelectBlock extends _OptionBlock_js__WEBPACK_IMPORTED_MODULE_0__.OptionBlock {
  constructor(key, label, value = null, options = {}, onChange = null, group = 'default') {
    super(key, label, value, options, onChange, group);
    this.type = 'string';
  }
  render(container) {
    const wrapper = super.render();
    wrapper.classList.add('select');
    const label_el = _framework_js_services_Builder_js__WEBPACK_IMPORTED_MODULE_1__["default"].label(this.label);
    label_el.setAttribute('for', this.key);
    const select = _framework_js_services_Builder_js__WEBPACK_IMPORTED_MODULE_1__["default"].select(this.options?.options || [], this.value, value => {
      this.value = value;
      this.notifyChange();
    });
    select.id = this.key;
    select.name = this.key;
    select.addEventListener('change', () => {
      this.value = select.value;
      this.notifyChange();
    });
    wrapper.appendChild(label_el);
    wrapper.appendChild(select);
    container.appendChild(wrapper);
  }
}

/***/ }),

/***/ "../vendor/bugquest/web-framework/Assets/js/options/StringBlock.js":
/*!*************************************************************************!*\
  !*** ../vendor/bugquest/web-framework/Assets/js/options/StringBlock.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StringBlock: () => (/* binding */ StringBlock)
/* harmony export */ });
/* harmony import */ var _OptionBlock_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./OptionBlock.js */ "../vendor/bugquest/web-framework/Assets/js/options/OptionBlock.js");
/* harmony import */ var _framework_js_services_Builder_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @framework/js/services/Builder.js */ "../vendor/bugquest/web-framework/Assets/js/services/Builder.js");


class StringBlock extends _OptionBlock_js__WEBPACK_IMPORTED_MODULE_0__.OptionBlock {
  constructor(key, label, value = null, options = {}, onChange = null, group = 'default') {
    super(key, label, value, options, onChange, group);
    this.type = 'string';
    this.debounceTimer = null;
    this.delay = this.options?.delay ?? 2000;
    this.placeholder = this.options?.placeholder ?? '';
    this.isPassword = this.options?.isPassword ?? false;
  }
  render(container) {
    const wrapper = super.render();
    wrapper.classList.add('string');
    wrapper.appendChild(_framework_js_services_Builder_js__WEBPACK_IMPORTED_MODULE_1__["default"].label(this.label));
    const input = _framework_js_services_Builder_js__WEBPACK_IMPORTED_MODULE_1__["default"].input_text(this.placeholder, this.value);
    input.type = this.isPassword ? 'password' : 'text';
    wrapper.appendChild(input);

    // Barre de progression
    const progress = _framework_js_services_Builder_js__WEBPACK_IMPORTED_MODULE_1__["default"].div('save-progress');
    wrapper.appendChild(progress);
    input.addEventListener('input', e => {
      this.value = e.target.value;

      // Reset animation de la barre
      progress.style.transition = 'none';
      progress.style.width = '0';

      // Lancer animation
      requestAnimationFrame(() => {
        progress.style.transition = `width ${this.delay}ms linear`;
        progress.style.width = '100%';
      });
      this.debounce(() => {
        this.notifyChange();
        progress.style.transition = 'none';
        progress.style.width = '0';
      }, this.delay);
    });
    container.appendChild(wrapper);
  }
  debounce(callback, delay) {
    console.log('Debouncing...');
    if (this.debounceTimer) clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(callback, delay);
  }
}

/***/ }),

/***/ "../vendor/bugquest/web-framework/Assets/js/options/TextareaBlock.js":
/*!***************************************************************************!*\
  !*** ../vendor/bugquest/web-framework/Assets/js/options/TextareaBlock.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TextareaBlock: () => (/* binding */ TextareaBlock)
/* harmony export */ });
/* harmony import */ var _OptionBlock_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./OptionBlock.js */ "../vendor/bugquest/web-framework/Assets/js/options/OptionBlock.js");
/* harmony import */ var _framework_js_services_Builder_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @framework/js/services/Builder.js */ "../vendor/bugquest/web-framework/Assets/js/services/Builder.js");


class TextareaBlock extends _OptionBlock_js__WEBPACK_IMPORTED_MODULE_0__.OptionBlock {
  constructor(key, label, value = null, options = {}, onChange = null, group = 'default') {
    super(key, label, value, options, onChange, group);
    this.type = 'textarea';
    this.placeholder = this.options?.placeholder ?? '';
  }
  render(container) {
    const wrapper = super.render();
    wrapper.classList.add('textarea');

    // Label
    wrapper.appendChild(_framework_js_services_Builder_js__WEBPACK_IMPORTED_MODULE_1__["default"].label(this.label));

    // Textarea
    const textarea = _framework_js_services_Builder_js__WEBPACK_IMPORTED_MODULE_1__["default"].textarea(this.placeholder, this.value);
    wrapper.appendChild(textarea);

    // Bouton Save
    const saveBtn = _framework_js_services_Builder_js__WEBPACK_IMPORTED_MODULE_1__["default"].button('Save');
    wrapper.appendChild(saveBtn);

    // Sauvegarde manuelle
    saveBtn.addEventListener('click', () => {
      this.value = textarea.value;
      this.notifyChange();
      saveBtn.classList.add('saved');

      // Feedback visuel temporaire
      setTimeout(() => saveBtn.classList.remove('saved'), 1000);
    });
    container.appendChild(wrapper);
  }
}

/***/ }),

/***/ "../vendor/bugquest/web-framework/Assets/js/services/Builder.js":
/*!**********************************************************************!*\
  !*** ../vendor/bugquest/web-framework/Assets/js/services/Builder.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Builder)
/* harmony export */ });
class Builder {
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
  static select(options = [], value = null, className = '', onChange = null) {
    let select = document.createElement('select');
    if (className) select.className = className;

    //if options is an array of objects, use the label and value properties, else if is simple array of values use the value as label
    if (Array.isArray(options) && options.length > 0 && typeof options[0] === 'object') {
      options.forEach(option => {
        let opt = document.createElement('option');
        opt.value = option.value;
        opt.textContent = option.label;
        if (value && value === option.value) opt.selected = true;
        select.appendChild(opt);
      });
    } else if (Array.isArray(options) && options.length > 0) {
      options.forEach(option => {
        let opt = document.createElement('option');
        opt.value = option;
        opt.textContent = option;
        if (value && value === option) opt.selected = true;
        select.appendChild(opt);
      });
    }
    if (onChange) select.addEventListener('change', () => {
      onChange(select.value);
    });
    return select;
  }
}

/***/ }),

/***/ "../vendor/bugquest/web-framework/Assets/js/services/ConfirmDialog.js":
/*!****************************************************************************!*\
  !*** ../vendor/bugquest/web-framework/Assets/js/services/ConfirmDialog.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ConfirmDialog)
/* harmony export */ });
/* harmony import */ var _framework_js_services_Builder_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @framework/js/services/Builder.js */ "../vendor/bugquest/web-framework/Assets/js/services/Builder.js");
/* harmony import */ var _framework_js_services_Translator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @framework/js/services/Translator.js */ "../vendor/bugquest/web-framework/Assets/js/services/Translator.js");


class ConfirmDialog {
  static show(onConfirm = () => {}, onCancel = () => {}, options = {}) {
    const defaults = {
      title: (0,_framework_js_services_Translator_js__WEBPACK_IMPORTED_MODULE_1__.__)('Confirmation', 'admin'),
      message: (0,_framework_js_services_Translator_js__WEBPACK_IMPORTED_MODULE_1__.__)('Êtes-vous sûr de vouloir continuer ?', 'admin'),
      confirmText: (0,_framework_js_services_Translator_js__WEBPACK_IMPORTED_MODULE_1__.__)('Valider', 'admin'),
      cancelText: (0,_framework_js_services_Translator_js__WEBPACK_IMPORTED_MODULE_1__.__)('Annuler', 'admin'),
      confirmClass: 'button success',
      cancelClass: 'button danger'
    };
    const {
      title,
      message,
      confirmText,
      cancelText,
      confirmClass,
      cancelClass
    } = {
      ...defaults,
      ...options
    };
    const title_el = _framework_js_services_Builder_js__WEBPACK_IMPORTED_MODULE_0__["default"].div('confirm-title');
    title_el.textContent = title;
    const overlay_el = _framework_js_services_Builder_js__WEBPACK_IMPORTED_MODULE_0__["default"].div('confirm-overlay');
    const box_el = _framework_js_services_Builder_js__WEBPACK_IMPORTED_MODULE_0__["default"].div('confirm-box');
    const message_el = _framework_js_services_Builder_js__WEBPACK_IMPORTED_MODULE_0__["default"].div('confirm-message');
    message_el.textContent = message;
    const actions_el = _framework_js_services_Builder_js__WEBPACK_IMPORTED_MODULE_0__["default"].div('confirm-actions');
    const confirm_el = _framework_js_services_Builder_js__WEBPACK_IMPORTED_MODULE_0__["default"].button(confirmText, confirmClass, () => {
      onConfirm();
      overlay_el.remove();
    });
    const cancel_el = _framework_js_services_Builder_js__WEBPACK_IMPORTED_MODULE_0__["default"].button(cancelText, cancelClass, () => {
      onCancel();
      overlay_el.remove();
    });
    actions_el.append(confirm_el, cancel_el);
    box_el.append(title_el, message_el, actions_el);
    overlay_el.appendChild(box_el);
    document.body.appendChild(overlay_el);
    setTimeout(() => overlay_el.classList.add('active'), 10);
  }
}

/***/ }),

/***/ "../vendor/bugquest/web-framework/Assets/js/services/MediaPicker.js":
/*!**************************************************************************!*\
  !*** ../vendor/bugquest/web-framework/Assets/js/services/MediaPicker.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MediaPicker)
/* harmony export */ });
/* harmony import */ var _framework_js_services_Builder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @framework/js/services/Builder */ "../vendor/bugquest/web-framework/Assets/js/services/Builder.js");
/* harmony import */ var _framework_js_components_MediaGallery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @framework/js/components/MediaGallery */ "../vendor/bugquest/web-framework/Assets/js/components/MediaGallery.js");


class MediaPicker {
  static modal = null;
  static gallery = null;
  static open(mimeTypes = [], onSelect = null) {
    if (!this.modal) {
      this.modal = _framework_js_services_Builder__WEBPACK_IMPORTED_MODULE_0__["default"].modal(null, () => {}, () => {});
      this.modal.content.dataset.canUpload = 'true';
      document.body.appendChild(this.modal.element);
      this.gallery = new _framework_js_components_MediaGallery__WEBPACK_IMPORTED_MODULE_1__["default"](this.modal.content);
    }
    this.gallery.forced_mimeTypes = mimeTypes;
    this.gallery.onClickItem = media => {
      if (typeof onSelect === 'function') onSelect(media);
      this.modal.close();
    };
    this.modal.open();
    this.gallery.loadTags();
    this.gallery.loadPage();
  }
}

/***/ }),

/***/ "../vendor/bugquest/web-framework/Assets/js/services/Toast.js":
/*!********************************************************************!*\
  !*** ../vendor/bugquest/web-framework/Assets/js/services/Toast.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ }),

/***/ "./Assets/js/admin/TestOptionsPage.js":
/*!********************************************!*\
  !*** ./Assets/js/admin/TestOptionsPage.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TestOptionsPage: () => (/* binding */ TestOptionsPage)
/* harmony export */ });
/* harmony import */ var _framework_js_options_OptionsPage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @framework/js/options/OptionsPage */ "../vendor/bugquest/web-framework/Assets/js/options/OptionsPage.js");
/* harmony import */ var _framework_js_services_Translator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @framework/js/services/Translator */ "../vendor/bugquest/web-framework/Assets/js/services/Translator.js");
/* harmony import */ var _framework_js_services_Builder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @framework/js/services/Builder */ "../vendor/bugquest/web-framework/Assets/js/services/Builder.js");



class TestOptionsPage extends _framework_js_options_OptionsPage__WEBPACK_IMPORTED_MODULE_0__.OptionsPage {
  constructor() {
    super('test');
  }
  render() {
    const wrapper = _framework_js_services_Builder__WEBPACK_IMPORTED_MODULE_2__["default"].div('options-wrapper');
    const intBlock = this.createBlock('int', 'test_int_value', (0,_framework_js_services_Translator__WEBPACK_IMPORTED_MODULE_1__.__)('Valeur entière', 'admin'), null, {
      description: (0,_framework_js_services_Translator__WEBPACK_IMPORTED_MODULE_1__.__)('Un nombre entier à saisir', 'admin')
    }, 'test');
    const floatBlock = this.createBlock('float', 'test_float_value', (0,_framework_js_services_Translator__WEBPACK_IMPORTED_MODULE_1__.__)('Valeur décimale', 'admin'), null, {
      description: (0,_framework_js_services_Translator__WEBPACK_IMPORTED_MODULE_1__.__)('Un nombre à virgule pour les tests', 'admin')
    });
    const stringBlock = this.createBlock('string', 'test_string_value', (0,_framework_js_services_Translator__WEBPACK_IMPORTED_MODULE_1__.__)('Texte simple', 'admin'), null, {
      description: (0,_framework_js_services_Translator__WEBPACK_IMPORTED_MODULE_1__.__)('Une chaîne de texte modifiable', 'admin'),
      placeholder: (0,_framework_js_services_Translator__WEBPACK_IMPORTED_MODULE_1__.__)('Entrez du texte...', 'admin')
    }, 'test');
    const passwordBlock = this.createBlock('string', 'test_password_value', (0,_framework_js_services_Translator__WEBPACK_IMPORTED_MODULE_1__.__)('Mot de passe', 'admin'), null, {
      isPassword: true,
      description: (0,_framework_js_services_Translator__WEBPACK_IMPORTED_MODULE_1__.__)('Un mot de passe sécurisé', 'admin'),
      placeholder: (0,_framework_js_services_Translator__WEBPACK_IMPORTED_MODULE_1__.__)('Entrez votre mot de passe...', 'admin')
    }, 'test');
    const boolBlock = this.createBlock('bool', 'test_bool_value', (0,_framework_js_services_Translator__WEBPACK_IMPORTED_MODULE_1__.__)('Activer la fonctionnalité ?', 'admin'), null, {
      description: (0,_framework_js_services_Translator__WEBPACK_IMPORTED_MODULE_1__.__)('Active ou désactive la fonctionnalité de test', 'admin')
    }, 'test');
    const selectBlock = this.createBlock('select', 'test_select_value', (0,_framework_js_services_Translator__WEBPACK_IMPORTED_MODULE_1__.__)('Type de choix', 'admin'), null, {
      description: (0,_framework_js_services_Translator__WEBPACK_IMPORTED_MODULE_1__.__)('Choisissez une des options', 'admin'),
      options: [{
        value: 'alpha',
        label: 'Alpha'
      }, {
        value: 'beta',
        label: 'Bêta'
      }, {
        value: 'gamma',
        label: 'Gamma'
      }]
    }, 'test');
    const mediaBlock = this.createBlock('media', 'test_media_value', (0,_framework_js_services_Translator__WEBPACK_IMPORTED_MODULE_1__.__)('Fichier média', 'admin'), null, {
      description: (0,_framework_js_services_Translator__WEBPACK_IMPORTED_MODULE_1__.__)('Sélectionnez un média pour le test', 'admin'),
      mimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
      label: (0,_framework_js_services_Translator__WEBPACK_IMPORTED_MODULE_1__.__)('Choisir un média', 'admin')
    }, 'test');
    const textareaBlock = this.createBlock('textarea', 'test_textarea_value', (0,_framework_js_services_Translator__WEBPACK_IMPORTED_MODULE_1__.__)('Zone de texte', 'admin'), null, {
      description: (0,_framework_js_services_Translator__WEBPACK_IMPORTED_MODULE_1__.__)('Une zone de texte pour des entrées longues', 'admin'),
      placeholder: (0,_framework_js_services_Translator__WEBPACK_IMPORTED_MODULE_1__.__)('Entrez votre texte ici...', 'admin')
    }, 'test');

    // Ajout à l'interface
    [intBlock, floatBlock, stringBlock, passwordBlock, boolBlock, selectBlock, mediaBlock, textareaBlock].forEach(block => block.render(wrapper));
    this.container.appendChild(wrapper);
  }
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
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*****************************************!*\
  !*** ./Assets/js/admin-options-test.js ***!
  \*****************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_admin_TestOptionsPage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/js/admin/TestOptionsPage.js */ "./Assets/js/admin/TestOptionsPage.js");

document.addEventListener('bqAdminLoaded', async () => {
  await new _js_admin_TestOptionsPage_js__WEBPACK_IMPORTED_MODULE_0__.TestOptionsPage()?.init();
  console.log('%c[Admin] TestOptionsPage initialisé avec succès 🖼️', 'color: cyan; font-weight: bold');
});
})();

/******/ })()
;
//# sourceMappingURL=admin-options-test.js.map