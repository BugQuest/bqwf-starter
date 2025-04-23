<?php

// bootstrap.php

use Dotenv\Dotenv;

const DS = DIRECTORY_SEPARATOR;
const BQ_ROOT = __DIR__;
const BQ_FRAMEWORK_PATH = BQ_ROOT . DS . 'vendor' . DS . 'bugquest' . DS . 'web-framework';
const BQ_PUBLIC_DIR = BQ_ROOT . DS . 'htdocs';
const BQ_STORAGE_DIR = BQ_ROOT . DS . 'storage';

require_once BQ_ROOT . '/vendor/autoload.php';

if (!file_exists(BQ_ROOT . '/.env'))
    die('Please, add .env at ' . BQ_ROOT);

$dotenv = Dotenv::createImmutable(BQ_ROOT);
$dotenv->load();

function env(string $key, $default = null)
{
    $value = $_ENV[$key] ?? $default;
    return match ($value) {
        'true' => true,
        'false' => false,
        default => $value,
    };
}

/**
 * @param string $path
 * @return string
 * @throws Exception
 * returns the path to the storage directory with the given path appended
 * if path not exists, it will be created
 */
function storage(string $path): string
{
    $storagePath = BQ_STORAGE_DIR . DS . $path;

    if (!file_exists($storagePath))
        if (!mkdir($storagePath, 0777, true) && !is_dir($storagePath))
            throw new \Exception(sprintf('Directory "%s" was not created', $storagePath));

    return $storagePath;
}

require_once BQ_ROOT . DS . 'App' . DS . 'kernel.php';