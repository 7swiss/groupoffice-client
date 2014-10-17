#!/bin/bash
cd "$(dirname "$0")"
cd ..

grunt docs

#scp -r dist/docs mschering@web1.imfoss.nl:/var/www/intermesh.io/html/angular/docs

rsync -av --delete -e ssh dist/docs/ mschering@web1.imfoss.nl:/var/www/intermesh.io/html/angular/docs/