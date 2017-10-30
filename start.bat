@ECHO off

PUSHD
CALL activate_env.bat
electron main.js
CALL deactivate_env.bat
POPD
