### Hexlet tests and linter status:
[![Actions Status](https://github.com/Lugonue/frontend-project-12/workflows/hexlet-check/badge.svg)](https://github.com/Lugonue/frontend-project-12/actions)





## Project Name
- Hexlet-chat (slack like)

Installation
Usage
Features


### Installation

```
make install    # install deps
make start      # start server and front of app
```

### Docker build
```
docker build -t hexletchat .
docker run --detach --rm --name=hexletchat -p 3000:3000 hexletchat
```

### Usage

Main page looks like :

 <img src="assets/chat.PNG" width="200" height="auto">

Features:

- login chat
- sign-up
- write msg in channel
- add channel
- rename channel
- remove channel
- get notification

Tech steck:
- React
- Redux-toolkit
- websockets
- Formik
- axios
- REST
