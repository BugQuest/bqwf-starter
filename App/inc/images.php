<?php

use BugQuest\Framework\Services\Hooks;

Hooks::addFilter('images:sizes', function (array $sizes) {
    $sizes['test'] = [
        'width' => 100,
        'height' => 100,
        'crop' => true,
    ];

    return $sizes;
});