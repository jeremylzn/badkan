#!/usr/bin/env bash
#
# Run start/1st_time.sh at the first time you start the system on a new server (or after reboot).
# Run start/update_backend_frontend.sh after you update the backend and frontend code at github.
# Run start/update_frontend.sh after you update only the frontend code at github.
#

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

if git pull
then
    $DIR/export.sh before-frontend-update
    cp -rf $DIR/../frontend/* /var/www/html/
fi
