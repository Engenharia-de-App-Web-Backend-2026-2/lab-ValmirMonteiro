## Algoritmos Estáticos - Load balancer nginx

### Round Robin
Distribuição aleatória dos servidores
Utilizado na configuração básica, sem diretivas.

### Round Robin com peso
Distribuição segue o peso definido para cada servidor
```
    server backend1:80 weight=8;
    server backend2:80 weight=1;
    server backend3:80 weight=1;
```

### IP Hash
Requisições de um mesmo IP são direcionadas para o mesmo servidor, a menos que ele esteja fora do ar.
```
    ip_hash;
    server backend1:80;
    server backend2:80;
    server backend3:80;
```

## Algoritmos Dinâmicos - Load balancer nginx

## Least conn
Envia a requisição para o servidor com menos conexões ativas no momento
```
    least_conn;
    server backend1:80;
    server backend2:80;
    server backend3:80;
```

## Limite de conexões
nginx permite limitar o numero de conexões feitas a partir de um IP.
```
    # Define o limite de requisições por IP
    limit_req_zone $binary_remote_addr
        zone=limite_api:10m
        rate=1r/s;
```
limite_api é a memória que usa para armazenar os endereços 
rate é o limite de conexões definidos

## Preservar o IP do cliente utilizando Load Balancer
O fluxo usual da conexão utilizando um balanceador em configuração Full Proxy é:
- O cliente se conecta ao balanceador.
- O balanceador se conecta ao servidor escolhido.
- O servidor responde ao balanceador.
- O balanceador entrega a resposta ao cliente.

Dessa forma, o servidor da  aplicação sempre registra o IP do balanceador de carga como cliente.
Para preservar o IP do cliente original, utiliza-se a diretiva:
```
    #Preserva o IP real do cliente
    proxy_set_header X-Real-IP $remote_addr;
```