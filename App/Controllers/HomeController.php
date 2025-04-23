<?php

namespace App\Controllers;

use BugQuest\Framework\Models\Response;
use BugQuest\Framework\Services\View;

class HomeController
{
    public static function index(): Response
    {
        return Response::view('@app/home.twig');
    }
}