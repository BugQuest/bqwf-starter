<?php

namespace App\Controllers;

use BugQuest\Framework\Models\Response;
use BugQuest\Framework\Services\PageService;
use BugQuest\Framework\Services\View;

class PageController
{
    public static function index(): Response
    {
        if (!PageService::getCurrent())
            Response::error404('Page not found');

        return Response::view('@app/page.twig',[
            'page' => PageService::getCurrent(),
            'body' => PageService::getBodyHtml(),
            'style' => PageService::getStyle(),
            'title' => PageService::getCurrent()?->title,
            'breadcrumbs' => PageService::getCurrent()?->breadcrumbs(),
        ]);
    }
}