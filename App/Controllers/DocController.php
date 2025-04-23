<?php

namespace App\Controllers;

use BugQuest\Framework\Models\Response;
use BugQuest\Framework\Services\OptionService;
use BugQuest\Framework\Services\View;

class DocController
{
    public static function cache(): Response
    {
        return Response::view('@app/doc/cache.twig');
    }
}