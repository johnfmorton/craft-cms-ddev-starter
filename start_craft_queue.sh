#!/bin/bash

# Set the PHP_IDE_CONFIG environment variable to tell PHPStorm to use the correct server name
# This is necessary for debugging to work correctly
export PHP_IDE_CONFIG="serverName=craft"

# Start the Craft queue listener
php craft queue/listen &> ./storage/logs/ddev-craft-queue.log &
