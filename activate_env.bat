:: Activates the ElectronRPC environment
@ECHO off

PUSHD
CALL api-server\venv\Scripts\activate.bat
SET PATH=%CD%\node_modules\.bin;%PATH%
POPD
