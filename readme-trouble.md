# Fix Port in use

How to fix: Web server failed to start. Port 8080 was already in use.

> % lsof -i tcp:8080

```
COMMAND   PID USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
java    93874  jan  103u  IPv6 0x2c7ecea73234db15      0t0  TCP *:http-alt (LISTEN)
```

> kill -9 <PID>