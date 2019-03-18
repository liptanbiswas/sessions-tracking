# Node.js based REST API to store sessions data.

Part of hands-on experience in Node.js

### Development

Run Mongodb server on your local.

```bash
docker run -dt -p 27017:27017 mongo
```

Install Node.js dependencies.

```bash
npm install
```

All endpoints are secured with basic auth. Use the environment variable `AUTH_PASS` to set a password. Username `admin` is fixed.

Run server.

```bash
node server.js
```

API documentation is available at [https://documenter.getpostman.com/view/6977280/S17owpmK](https://documenter.getpostman.com/view/6977280/S17owpmK)
