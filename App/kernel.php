<?php

use BugQuest\Framework\Services\Assets;
use BugQuest\Framework\Services\View;

const BQ_APP = __DIR__;

View::addPath(BQ_ROOT . DS . 'App' . DS . 'Views', 'app');

if (is_dir(BQ_APP . '/inc'))
    foreach (glob(BQ_APP . '/inc/*.php') as $file)
        require_once $file;
