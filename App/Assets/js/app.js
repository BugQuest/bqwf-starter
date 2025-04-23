import {Accordion} from '@framework/js/components/Accordion';
import '@framework/js/components/language-switcher';
import {DebugPanel} from '@framework/js/components/DebugPanel';

document.addEventListener('DOMContentLoaded', async () => {
    await DebugPanel.init();
    Accordion.setup();
});