<?php

use App\Controllers\Admin\TestController;
use BugQuest\Framework\Services\Admin;
use BugQuest\Framework\Services\Hooks;

Hooks::addAction('kernel.after.admin.register.pages', function () {
    Admin::addSubmenu(
        parent: 'config',
        name: 'Test',
        icon: '🧪',
        route: Admin::addPage('Config - Test', TestController::class . '::index')
    );
});