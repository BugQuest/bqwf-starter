import {TestOptionsPage} from '@/js/admin/TestOptionsPage.js';

document.addEventListener('bqAdminLoaded', async () => {
    await new TestOptionsPage()?.init();

    console.log('%c[Admin] TestOptionsPage initialisé avec succès 🖼️', 'color: cyan; font-weight: bold');
});