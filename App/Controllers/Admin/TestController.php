<?php

namespace App\Controllers\Admin;

use BugQuest\Framework\Models\Response;

abstract class TestController
{
    public static function index(): Response
    {
        return Response::view('@framework/admin/config/test.twig');
    }
}