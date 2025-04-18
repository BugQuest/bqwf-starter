<?php

use PHPUnit\Framework\TestCase;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\Attributes\CoversClass;
use BugQuest\Framework\Router;
use BugQuest\Framework\Models\Route;

#[CoversClass(Route::class)]
#[CoversClass(Router::class)]
final class RouteTest extends TestCase
{
    public static function setUpBeforeClass(): void
    {
        Router::add(new Route('home', '/', fn() => 'Bienvenue à l’accueil !'));
        Router::add(new Route('simple-param', '/hello/{name}', fn($name) => "Bonjour $name !"));
        Router::add(new Route('int-id', '/user/{id:int}', fn(int $id) => "Profil utilisateur #$id"));
        Router::add(new Route('optional-param', '/search/{query?}', fn($query = 'aucun') => "Recherche : $query"));
        Router::add(new Route('int-optional', '/page/{num:int?}', fn($num = 1) => "Page numéro $num"));
        Router::add(new Route('multiple-params', '/blog/{slug:alphanumeric}/comment/{id:int}', fn($slug, int $id) => "Commentaire $id sur $slug"));
        Router::add(new Route('mix-optional', '/article/{slug:alphanumeric}/{page:int?}', fn($slug, $page = 1) => "Article $slug – Page $page"));
        Router::add(new Route('uuid-test', '/api/user/{uuid:uuid}', fn($uuid) => "Utilisateur UUID : $uuid"));
        Router::add(new Route('multi-optional', '/data/{year:int?}/{month:int?}/{day:int?}', fn($year = null, $month = null, $day = null) => "Date : $year-$month-$day"));
        Router::add(new Route('alpha-type', '/alpha/{code:alpha}', fn($code) => "Code alpha : $code"));
        Router::add(new Route('alphanumeric-type', '/post/{slug:alphanumeric}', fn($slug) => "Slug : $slug"));
        Router::add(new Route('weird-order', '/combo/{a:int}/{b}/{c:int?}/{d?}', fn($a, $b, $c = null, $d = null) => "a=$a, b=$b, c=$c, d=$d"));
        Router::add(new Route('malformed', '/test/{slug]/testouille/{id}', fn($slug, $id) => 'Ceci ne devrait pas matcher'));
    }

    #[DataProvider('routeProvider')]
    public function testDispatchRoutes(string $uri, string $expected): void
    {
        $uri = rtrim($uri, '/') . '/'; // Normalisation automatique
        $result = Router::dispatch($uri);
        $this->assertSame($expected, $result, "URI [$uri] ne donne pas le résultat attendu.");
    }

    public static function routeProvider(): array
    {
        return [
            'home' => ['/', 'Bienvenue à l’accueil !'],
            'simple-param' => ['/hello/Jean', 'Bonjour Jean !'],
            'int-id' => ['/user/42', 'Profil utilisateur #42'],
            'optional-empty' => ['/search', 'Recherche : aucun'],
            'optional-filled' => ['/search/loup', 'Recherche : loup'],
            'int-optional-empty' => ['/page', 'Page numéro 1'],
            'int-optional-filled' => ['/page/3', 'Page numéro 3'],
            'multiple-params' => ['/blog/magie/comment/12', 'Commentaire 12 sur magie'],
            'mix-optional-empty' => ['/article/alchimie', 'Article alchimie – Page 1'],
            'mix-optional-filled' => ['/article/alchimie/2', 'Article alchimie – Page 2'],
            'uuid-test' => ['/api/user/123e4567-e89b-12d3-a456-426614174000', 'Utilisateur UUID : 123e4567-e89b-12d3-a456-426614174000'],
            'multi-optional-0' => ['/data', 'Date : --'],
            'multi-optional-1' => ['/data/2025', 'Date : 2025--'],
            'multi-optional-2' => ['/data/2025/04', 'Date : 2025-4-'],
            'multi-optional-3' => ['/data/2025/04/13', 'Date : 2025-4-13'],
            'alpha' => ['/alpha/ABC', 'Code alpha : ABC'],
            'alphanumeric' => ['/post/article123', 'Slug : article123'],
            'combo-2' => ['/combo/1/foo', 'a=1, b=foo, c=, d='],
            'combo-3' => ['/combo/1/foo/2', 'a=1, b=foo, c=2, d='],
            'combo-4' => ['/combo/1/foo/2/bar', 'a=1, b=foo, c=2, d=bar'],
        ];
    }
}
