import {OptionsPage} from '@framework/js/options/OptionsPage';
import {OptionGroup} from '@framework/js/options/OptionGroup';
import Builder from '@framework/js/services/Builder';
import {__} from '@framework/js/services/Translator';

export class TestOptionsPage extends OptionsPage {
    constructor() {
        super('test');
    }

    render() {
        const wrapper = Builder.div('options-wrapper');

        const intBlock = this.createBlock(
            'int',
            'test_int_value',
            __('Valeur entière', 'admin'),
            null,
            {
                description: __('Un nombre entier à saisir', 'admin'),
            }
        );

        const floatBlock = this.createBlock(
            'float',
            'test_float_value',
            __('Valeur décimale', 'admin'),
            null,
            {
                description: __('Un nombre à virgule pour les tests', 'admin'),
            }
        );

        const stringBlock = this.createBlock(
            'string',
            'test_string_value',
            __('Texte simple', 'admin'),
            null,
            {
                description: __('Une chaîne de texte modifiable', 'admin'),
                placeholder: __('Entrez du texte...', 'admin'),
            }
        );

        const passwordBlock = this.createBlock(
            'string',
            'test_password_value',
            __('Mot de passe', 'admin'),
            null,
            {
                isPassword: true,
                description: __('Un mot de passe sécurisé', 'admin'),
                placeholder: __('Entrez votre mot de passe...', 'admin'),
            }
        );

        const boolBlock = this.createBlock(
            'bool',
            'test_bool_value',
            __('Activer la fonctionnalité ?', 'admin'),
            null,
            {
                description: __('Active ou désactive la fonctionnalité de test', 'admin'),
            }
        );

        const selectBlock = this.createBlock(
            'select',
            'test_select_value',
            __('Type de choix', 'admin'),
            null,
            {
                description: __('Choisissez une des options', 'admin'),
                options: [
                    {value: 'alpha', label: 'Alpha'},
                    {value: 'beta', label: 'Bêta'},
                    {value: 'gamma', label: 'Gamma'},
                ]
            }
        );

        const urlBlock = this.createBlock(
            'url',
            'test_url_value',
            __('Sélectionner une URL', 'admin'),
            {
                url: '',
                title: '',
                blank: false
            },
            {
                description: __('Choisissez une URL', 'admin'),
            }
        );

        const mediaBlock = this.createBlock(
            'media',
            'test_media_value',
            __('Fichier média', 'admin'),
            null,
            {
                description: __('Sélectionnez un média pour le test', 'admin'),
                mimeTypes: [],
                label: __('Choisir un média', 'admin')
            }
        );

        const mediaBlockImg = this.createBlock(
            'media',
            'test_media_image_value',
            __('Fichier Image', 'admin'),
            null,
            {
                description: __('Sélectionnez une image pour le test', 'admin'),
                mimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
                label: __('Choisir un média', 'admin')
            }
        );

        const mediaBlockVideo = this.createBlock(
            'media',
            'test_media_video_value',
            __('Fichier Vidéo', 'admin'),
            null,
            {
                description: __('Sélectionnez une vidéo pour le test', 'admin'),
                mimeTypes: ['video/mp4', 'video/webm'],
                label: __('Choisir un média', 'admin')
            }
        );

        const mediaBlockSvg = this.createBlock(
            'media',
            'test_media_svg_value',
            __('Fichier SVG', 'admin'),
            null,
            {
                description: __('Sélectionnez un fichier SVG pour le test', 'admin'),
                mimeTypes: ['image/svg+xml'],
                label: __('Choisir un média', 'admin')
            }
        );

        const mediaBlockAudio = this.createBlock(
            'media',
            'test_media_audio_value',
            __('Fichier Audio', 'admin'),
            null,
            {
                description: __('Sélectionnez un fichier audio pour le test', 'admin'),
                mimeTypes: ['audio/mpeg', 'audio/wav'],
                label: __('Choisir un média', 'admin')
            }
        );

        const textareaBlock = this.createBlock(
            'textarea',
            'test_textarea_value',
            __('Zone de texte', 'admin'),
            null,
            {
                description: __('Une zone de texte pour des entrées longues', 'admin'),
                placeholder: __('Entrez votre texte ici...', 'admin'),
            }
        );

        const wysiwygBlock = this.createBlock(
            'wysiwig',
            'test_wysiwyg_value',
            __('Éditeur de texte enrichi', 'admin'),
            null,
            {
                description: __('Un éditeur de texte enrichi pour le contenu', 'admin'),
                placeholder: __('Commencez à écrire...', 'admin'),
                // theme: 'snow',
                // toolbar: [
                //     ['bold', 'italic', 'underline'],
                //     [{'list': 'bullet'}, {'list': 'ordered'}],
                //     ['link', 'clean']
                // ]
            }
        );

        // WIP : RepeaterBlock - Pas encore fonctionnel
        // const faq = this.createBlock('repeater', 'faq', 'Questions fréquentes', [
        //     {question: 'Titre ?', answer: 'Réponse ici.'}
        // ], {
        //     blocks: [
        //         {type: 'string', key: 'question', label: 'Question'},
        //         {type: 'wysiwig', key: 'answer', label: 'Réponse'},
        //     ]
        // });


        new OptionGroup(__('Group 1', 'admin'),
            [
                intBlock,
                floatBlock,
                stringBlock,
                passwordBlock
            ]
        ).render(this.container);

        new OptionGroup(__('Group 2', 'admin'),
            [
                boolBlock,
                selectBlock,
                urlBlock
            ]
        ).render(this.container);

        new OptionGroup(__('Group 3', 'admin'),
            [
                mediaBlock,
                mediaBlockImg,
                mediaBlockVideo,
                mediaBlockAudio,
                mediaBlockSvg
            ]
        ).render(this.container);

        new OptionGroup(__('Group 4', 'admin'),
            [
                textareaBlock
            ]
        ).render(this.container);

        new OptionGroup(__('Group 5', 'admin'),
            [
                wysiwygBlock
            ]
        ).render(this.container);

        // new OptionGroup(__('Group 6', 'admin'),
        //     [
        //         faq
        //     ]
        // ).render(this.container);
    }
}
