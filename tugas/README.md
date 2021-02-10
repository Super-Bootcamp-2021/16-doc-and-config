# Task Manager Service

### Untuk menjalankan service :
Syarat :
- database postgress
  ```json
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '123456',
  database: 'sanbercode2',
  ```
  ganti username dan password sesuai dengan konfigurasi masing-masing
  di
  ```
  service/main.js
  ```
- nats-server
- minio
  ```json
  endPoint: '127.0.0.1',
  port: 9000,
  useSSL: false,
  accessKey: 'minioadmin',
  secretKey: 'minioadmin',
  ```
  ganti sesuai dengan konfigurasi masing-masing
  di
  ```
  service/main.js
  ```
- redis

### Worker
  ```bash
  npm run svc:start worker
  ``` 
### Task
  ```bash
  npm run svc:start task
  ``` 
### Performance
  ```bash
  npm run svc:start performance
  ``` 
### Webapp development
  ```bash
  npm run web:dev
  ``` 

## Changelog Versi 1.2
menambahkan :
- schema task service
- dokumentasi library webapp

## Changelog Versi 1.1
menambahkan :
- schema worker service
- schema performance service
- dokumentasi library service
- config rc untuk service
- config env untuk webapp