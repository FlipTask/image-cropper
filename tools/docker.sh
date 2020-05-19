#!/bin/bash

if getopts "c:" arg; then
  echo "Welcome $OPTARG"
  if [ "$OPTARG" = "build" ] ; then
    echo "[INFO] Building >>>"
	eval sh ./tools/build.sh
  elif [ "$OPTARG" = "deploy" ]; then
	echo "[INFO] Deploying >>>"
	eval sh ./tools/deploy.sh
  else
    echo "[ERROR] Possible options -c [deploy] or [build]"
  fi
fi

