<?php

use App\Controllers\DocController;
use App\Controllers\HomeController;
use BugQuest\Framework\Middleware\PopulateAuthMiddleware;
use BugQuest\Framework\Models\Route;
use BugQuest\Framework\Models\RouteGroup;
use BugQuest\Framework\Services\View;

new Route(
    name: 'home',
    _slug: '/',
    _callback: HomeController::class . '::index',
    _methods: ['GET'],
    _middlewares: [
        PopulateAuthMiddleware::class
    ],
    _cache_key: 'home',
    _cache_group: 'home',
    _cache_ttl: 3600
)->register();

new RouteGroup(
    name: 'doc',
    _prefix: '/doc',
    _routes: [
        new Route(
            name: 'cache',
            _slug: '/cache',
            _callback: DocController::class . '::cache',
            _methods: ['GET'],
            _cache_key: 'doc.cache',
            _cache_group: 'doc',
            _cache_ttl: 3600
        ),
        new Route(
            name: 'images',
            _slug: '/images',
            _callback: DocController::class . '::images',
            _methods: ['GET'],
            _cache_key: 'doc.images',
            _cache_group: 'doc',
            _cache_ttl: 3600
        )
    ],
    _middlewares: [
        PopulateAuthMiddleware::class
    ]
)->register();

//new Route(
//    name: 'simple-param',
//    _slug: '/hello/{name}',
//    _callback: fn($name) => "Bonjour $name !")
//    ->register();
//
//new Route(
//    name: 'int-id',
//    _slug: '/user/{id:int}',
//    _callback: fn(int $id) => "Profil utilisateur #$id")
//    ->register();
//
//new Route(
//    name: 'optional-param',
//    _slug: '/search/{query?}',
//    _callback: fn($query = 'aucun') => "Recherche : $query")
//    ->register();
//
//new Route(
//    name: 'int-optional',
//    _slug: '/page/{num:int?}',
//    _callback: fn($num = 1) => "Page numéro $num")
//    ->register();
//
//new Route(
//    name: 'multiple-params',
//    _slug: '/blog/{slug:alphanumeric}/comment/{id:int}',
//    _callback: fn($slug, int $id) => "Commentaire $id sur $slug")
//    ->register();
//
//new Route(
//    name: 'mix-optional',
//    _slug: '/article/{slug:alphanumeric}/{page:int?}',
//    _callback: fn($slug, $page = 1) => "Article $slug – Page $page")
//    ->register();
//
//new Route(
//    name: 'uuid-test',
//    _slug: '/api/user/{uuid:uuid}',
//    _callback: fn($uuid) => "Utilisateur UUID : $uuid")
//    ->register();
//
//new Route(
//    name: 'multi-optional',
//    _slug: '/data/{year:int?}/{month:int?}/{day:int?}',
//    _callback: fn($year = null, $month = null, $day = null) => "Date : $year-$month-$day")
//    ->register();
//
//new Route(
//    name: 'alpha-type',
//    _slug: '/alpha/{code:alpha}',
//    _callback: fn($code) => "Code alpha : $code")
//    ->register();
//
//new Route(
//    name: 'alphanumeric-type',
//    _slug: '/post/{slug:alphanumeric}',
//    _callback: fn($slug) => "Slug : $slug")
//    ->register();
//
//new Route(
//    name: 'weird-order',
//    _slug: '/combo/{a:int}/{b}/{c:int?}/{d?}',
//    _callback: fn($a, $b, $c = null, $d = null) => "a=$a, b=$b, c=$c, d=$d")
//    ->register();
//
//new Route(
//    name: 'malformed',
//    _slug: '/test/{slug]/testouille/{id}',
//    _callback: fn($slug, $id) => 'Ceci ne devrait pas matcher')
//    ->register();

new Route(
    name: '404',
    _callback: function () {
        http_response_code(404);
        return View::render('@framework/error/404.twig');
    }
)->register();