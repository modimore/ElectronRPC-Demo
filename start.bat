@ECHO off

PUSHD
CALL activate_env.bat
electron .
CALL deactivate_env.bat
POPD
