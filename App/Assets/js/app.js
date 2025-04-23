import {Accordion} from '@framework/js/components/Accordion';
import '@framework/js/components/language-switcher';
import {DebugPanel} from '@framework/js/services/DebugPanel';

document.addEventListener('DOMContentLoaded', async () => {
    await DebugPanel.init();
    Accordion.setup();

    //sleep 100ms
    await new Promise(resolve => setTimeout(resolve, 100));
    //call event app_loaded
    document.dispatchEvent(new CustomEvent('bqAppLoaded'));

    console.log('%c[App] JS chargé avec succès 🛠️', 'color: cyan; font-weight: bold');
});