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

    public static function images(): Response
    {
        return Response::view('@app/doc/images.twig', [
            'sizes' => \BugQuest\Framework\Services\Image::getSizes(),
            'compression_method' => OptionService::get('images', 'compression_method'),
            'test_image' => OptionService::get('test', 'test_media_value')
        ]);
    }
}