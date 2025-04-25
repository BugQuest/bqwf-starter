<?php

namespace App\Controllers;

use BugQuest\Framework\Models\Response;
use BugQuest\Framework\Services\PageService;
use BugQuest\Framework\Services\View;

class HomeController
{
    public static function index(): Response
    {
        $homepage = PageService::getCurrent();
        if ($homepage) {
            return Response::view('@app/page.twig',[
                'page' => PageService::getCurrent(),
                'body' => PageService::getCurrent()?->parseBlocks(),
                'style' => PageService::getStyle(),
                'title' => PageService::getCurrent()?->title,
                'breadcrumbs' => PageService::getCurrent()?->breadcrumbs(),
            ]);
        }
        return Response::view('@app/home.twig');
    }
}