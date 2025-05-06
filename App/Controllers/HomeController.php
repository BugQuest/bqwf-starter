<?php

namespace App\Controllers;

use BugQuest\Framework\Models\Response;
use BugQuest\Framework\Services\Hooks;
use BugQuest\Framework\Services\PageService;
use BugQuest\Framework\Services\View;

class HomeController
{
    public static function index(): Response
    {
        $homepage = PageService::getCurrent();
        if ($homepage) {
            $page = PageService::getCurrent();
            $page->seo?->checkRedirect();
            $style = PageService::getStyle();
            $body = $page?->parseBlocks();
            $title = $page?->title;
            $breadcrumbs = $page?->breadcrumbs();

            Hooks::addAction('meta', function () use ($page) {
                if ($page->seo && $metas = $page->seo->generateMetaTags())
                    echo $metas;
            });

            return Response::view('@app/page.twig', [
                'page' => $page,
                'body' => $body,
                'style' => $style,
                'title' => $title,
                'breadcrumbs' => $breadcrumbs,
            ]);
        }
        return Response::view('@app/doc/cache.twig');
    }
}