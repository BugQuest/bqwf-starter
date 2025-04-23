<?php

use BugQuest\Framework\Services\Assets;

\BugQuest\Framework\Services\PageService::setTheme('/dist/css/app.css');
Assets::registerDist(BQ_PUBLIC_DIR . '/dist');

Assets::addCss('app', 'css/app.css');
Assets::addJs('app', 'js/app.js');