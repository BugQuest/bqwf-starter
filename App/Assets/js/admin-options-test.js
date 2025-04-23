import {TestOptionsPage} from './admin/TestOptionsPage.js';

document.addEventListener('DOMContentLoaded', async () => {
    await new TestOptionsPage()?.init();
    console.log('[Admin Options Test] Page initialized successfully');
});
