<?php
/**
 * Yii Application Config
 *
 * Edit this file at your own risk!
 *
 * The array returned by this file will get merged with
 * vendor/craftcms/cms/src/config/app.php and app.[web|console].php, when
 * Craft's bootstrap script is defining the configuration for the entire
 * application.
 *
 * You can define custom modules and system components, and even override the
 * built-in system components.
 *
 * If you want to modify the application config for *only* web requests or
 * *only* console requests, create an app.web.php or app.console.php file in
 * your config/ folder, alongside this one.
 *
 * Read more about application configuration:
 * https://craftcms.com/docs/4.x/config/app.html
 */

use craft\helpers\App;

return [
  'id' => App::env('CRAFT_APP_ID') ?: 'CraftCMS',
  'components' => [
    'cache' => static function () {
      $config = [
        'class' => yii\redis\Cache::class,
        'keyPrefix' => Craft::$app->id,
        'defaultDuration' => Craft::$app->config->general->cacheDuration,

        // Full Redis connection details:
        'redis' => [
          'hostname' => App::env('REDIS_HOSTNAME') ?: 'localhost',
          'port' => App::env('REDIS_PORT') ?: 6379,
          'password' => App::env('REDIS_PASSWORD') ?: null,
          'database' => App::env('REDIS_DEFAULT_DB') ?: 0,
        ],
      ];
      return Craft::createObject($config);
    },
  ],
];
