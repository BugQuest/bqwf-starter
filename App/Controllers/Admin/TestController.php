<?php

namespace App\Controllers\Admin;

use BugQuest\Framework\Models\Response;
use BugQuest\Framework\Services\Assets;

abstract class TestController
{
    public static function index(): Response
    {
        Assets::add(
            group: 'admin',
            id: 'js:admin:options:test',
            url: '/dist/js/admin/admin-options-test.js',
            type: 'js',
            dependencies: ['js:admin'],
            isLocalUrl: true,
        );

        return Response::view('@app/admin/config/test.twig');
    }
}