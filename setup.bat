@echo off

PUSHD
npm install
python -m venv api-server\venv
CALL api-server\venv\Scripts\activate.bat
pip install -r requirements.txt
POPD
