#! /bin/bash

rm -rf html5ify.zip
crxmake --pack-extension=./ --ignore-dir=.git --ignore-file=html5ify.* --mode=zip

