<?php

use BugQuest\Framework\Models\OptionBlock;
use BugQuest\Framework\Models\OptionPage;
use BugQuest\Framework\Services\Admin;
use App\Controllers\Admin\TestController;
use BugQuest\Framework\Services\Hooks;


Hooks::addAction('kernel.after.inc', function () {
    $page = new OptionPage(
        title: '🧪 Options - Test',
        group: 'test',
        menuParent: 'config',
        menuIcon: '🧪',
        menuTitle: 'Test',
        submenu: '🧪 Test',
        _header: function () {
            return \BugQuest\Framework\Services\View::render('@app/admin/config/test.twig');
        }
    );

//int
    $page->registerBlock(
        new OptionBlock(
            type: 'int',
            key: 'test_int_value',
            label: __("Valeur entière", 'test', 'fr'),
            options: [
                'description' => __("Un nombre entier à saisir", 'test', 'fr'),
            ],
            group: 'Group 1',
        )
    );
//float
    $page->registerBlock(
        new OptionBlock(
            type: 'float',
            key: 'test_float_value',
            label: __("Valeur décimal", 'test', 'fr'),
            options: [
                'description' => __("Un nombre à virgule à saisir", 'test', 'fr'),
            ],
            group: 'Group 1',
        )
    );
//string
    $page->registerBlock(
        new OptionBlock(
            type: 'string',
            key: 'test_string_value',
            label: __("Texte simple", 'test', 'fr'),
            options: [
                'description' => __("Une chaîne de caractères à saisir", 'test', 'fr'),
                'placeholder' => __("Entrez du texte...", 'test', 'fr'),
            ],
            group: 'Group 1',
        )
    );
//password
    $page->registerBlock(
        new OptionBlock(
            type: 'string',
            key: 'test_password_value',
            label: __("Mot de passe", 'test', 'fr'),
            options: [
                'isPassword' => true,
                'description' => __("Un mot de passe à saisir", 'test', 'fr'),
                'placeholder' => __("Entrez un mot de passe...", 'test', 'fr'),
            ],
            group: 'Group 1',
        )
    );
//bool
    $page->registerBlock(
        new OptionBlock(
            type: 'bool',
            key: 'test_bool_value',
            label: __("Activer la fonctionnalité ?", 'test', 'fr'),
            options: [
                'description' => __("Active ou désactive la fonctionnalité de test", 'test', 'fr'),
            ],
            group: 'Group 2',
        )
    );
//select
    $page->registerBlock(
        new OptionBlock(
            type: 'select',
            key: 'test_select_value',
            label: __("Sélectionnez une option", 'test', 'fr'),
            options: [
                'description' => __("Sélectionnez une option dans la liste", 'test', 'fr'),
                'options' => [
                    ['value' => 'alpha', 'label' => 'Alpha'],
                    ['value' => 'beta', 'label' => 'Beta'],
                    ['value' => 'gamma', 'label' => 'Gamma'],
                ],
            ],
            group: 'Group 2',
        )
    );
//select multiple
    $page->registerBlock(
        new OptionBlock(
            type: 'select_multiple',
            key: 'test_select_multiple_value',
            label: __("Sélectionnez une ou plusieurs options", 'test', 'fr'),
            options: [
                'description' => __("Sélectionnez une ou plusieurs options dans la liste", 'test', 'fr'),
                'options' => [
                    ['value' => 'alpha', 'label' => 'Alpha'],
                    ['value' => 'beta', 'label' => 'Beta'],
                    ['value' => 'gamma', 'label' => 'Gamma'],
                ],
            ],
            group: 'Group 2',
        )
    );
//url
    $page->registerBlock(
        new OptionBlock(
            type: 'url',
            key: 'test_url_value',
            label: __("URL", 'test', 'fr'),
            defaultValue: [
                'url' => null,
                'title' => null,
                'blank' => false,
            ],
            options: [
                'description' => __("Choisissez une URL", 'test', 'fr'),
            ],
            group: 'Group 2',
        )
    );
//media - global
    $page->registerBlock(
        new OptionBlock(
            type: 'media',
            key: 'test_media_value',
            label: __("Média", 'test', 'fr'),
            options: [
                'description' => __("Choisissez un média", 'test', 'fr'),
                'mimeTypes' => [],
                'label' => __("Choisir un média", 'test', 'fr'),
            ],
            group: 'Group 3',
        )
    );
//media - image
    $page->registerBlock(
        new OptionBlock(
            type: 'media',
            key: 'test_image_value',
            label: __("Image", 'test', 'fr'),
            options: [
                'description' => __("Choisissez une image", 'test', 'fr'),
                'mimeTypes' => ['image/jpeg', 'image/png'],
                'label' => __("Choisir une image", 'test', 'fr'),
            ],
            group: 'Group 3',
        )
    );
//media - video
    $page->registerBlock(
        new OptionBlock(
            type: 'media',
            key: 'test_video_value',
            label: __("Vidéo", 'test', 'fr'),
            options: [
                'description' => __("Choisissez une vidéo", 'test', 'fr'),
                'mimeTypes' => ['video/mp4'],
                'label' => __("Choisir une vidéo", 'test', 'fr'),
            ],
            group: 'Group 3',
        )
    );
//media - svg
    $page->registerBlock(
        new OptionBlock(
            type: 'media',
            key: 'test_svg_value',
            label: __("SVG", 'test', 'fr'),
            options: [
                'description' => __("Choisissez un SVG", 'test', 'fr'),
                'mimeTypes' => ['image/svg+xml'],
                'label' => __("Choisir un SVG", 'test', 'fr'),
            ],
            group: 'Group 3',
        )
    );
//media - audio
    $page->registerBlock(
        new OptionBlock(
            type: 'media',
            key: 'test_audio_value',
            label: __("Audio", 'test', 'fr'),
            options: [
                'description' => __("Choisissez un audio", 'test', 'fr'),
                'mimeTypes' => ['audio/mpeg'],
                'label' => __("Choisir un audio", 'test', 'fr'),
            ],
            group: 'Group 3',
        )
    );
//media - pdf
    $page->registerBlock(
        new OptionBlock(
            type: 'media',
            key: 'test_pdf_value',
            label: __("PDF", 'test', 'fr'),
            options: [
                'description' => __("Choisissez un PDF", 'test', 'fr'),
                'mimeTypes' => ['application/pdf'],
                'label' => __("Choisir un PDF", 'test', 'fr'),
            ],
            group: 'Group 3',
        )
    );
//textarea
    $page->registerBlock(
        new OptionBlock(
            type: 'textarea',
            key: 'test_textarea_value',
            label: __("Zone de texte", 'test', 'fr'),
            options: [
                'description' => __("Une zone de texte pour des entrées longues", 'test', 'fr'),
                'placeholder' => __("Entrez votre texte ici...", 'test', 'fr')
            ],
            group: 'Group 4',
        )
    );
//wysiwyg
    $page->registerBlock(
        new OptionBlock(
            type: 'wysiwyg',
            key: 'test_wysiwyg_value',
            label: __("Éditeur WYSIWYG", 'test', 'fr'),
            options: [
                'description' => __("Un éditeur WYSIWYG pour des entrées formatées", 'test', 'fr'),
                'placeholder' => __("Entrez votre contenu ici...", 'test', 'fr')
            ],
            group: 'Group 4',
        )
    );

    Admin::addOptionPage($page);
});