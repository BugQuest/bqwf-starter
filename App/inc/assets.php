<?php

use BugQuest\Framework\Services\Assets;

Assets::registerDist(BQ_PUBLIC_DIR . '/dist');

Assets::addCss('app', 'css/app.css');
Assets::addJs('app', 'js/app.js');