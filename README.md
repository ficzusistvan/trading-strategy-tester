# Trading Strategy Tester

## Demo

~~The demo application can be found at: http://trading-strategy-tester.eu-central-1.elasticbeanstalk.com/~~

---

## How to deploy in development

---

### Backend part:

1. Enter backend directory
   ```bash
   cd backend
   ```
2. Create config.json from config.example.json, then update it:
   ```bash
   cp config.example.json config.json
   ```
   1. ports.http_server: 5000
   2. ports.socket_io: 3005
3. Install dependencies:
    ```bash 
    npm i 
    ```
4. Run application:
    ```bash
    npm run dev
    ```

---

### Frontend part:

1. Enter frontend directory
   ```bash
   cd frontend
   ```
2. Update .env file. 
   1. Set REACT_APP_IS_SOCKET_IO_IN_DEVELOPMENT_MODE = 1
   2. Set REACT_APP_SOCKET_IO_PORT=3005
3. Install dependencies:
    ```bash
    npm i
    ```
4. Run application:
   ```bash
   npm start
   ```

---

### Access the app in development:

Open http://localhost:3000

---

## How to deploy in production

**_NOTE: In production steps in frontend section must be handled first!_**

---

### Backend part:

1. Enter backend directory
   ```bash
   cd backend
   ```
2. Copy and update config.example.json
   ```bash
   cp config.example.json config.json
   ```
   1. ports.http_server: 5000
   2. ports.socket_io: 3005
3. Install dependencies:
    ```bash 
    npm i 
    ```
4. Run application:
    ```bash
    npm run prod
    ```

---

### Frontend part:

1. Enter frontend directory
   ```bash
   cd frontend
   ```
2. Update .env file. 
   1. Set REACT_APP_IS_SOCKET_IO_IN_DEVELOPMENT_MODE = 0
   2. Set REACT_APP_SOCKET_IO_PORT=3005
3. Install dependencies:
   ```bash
   npm i
   ```
4. Build frontend:
   ```bash
   npm run build
   ```

---

### Configure nginx proxy:

Example configuration file for nginx webserver:
```bash
server {
    listen 80;

    server_name mydomain.com;

    location / {
        proxy_pass http://localhost:5000/;
    }

    location /socket.io/ {
        proxy_pass http://localhost:3005;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

---

### Access the app in production:

Open http://localhost

---

## Data sources used:
- xstation http://developers.xstore.pro/documentation/current
- alphavantage https://www.alphavantage.co/documentation
- **TODO:** finnhub https://finnhub.io/docs/api