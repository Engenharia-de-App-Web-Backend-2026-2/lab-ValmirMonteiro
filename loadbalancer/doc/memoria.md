## Algoritmos Estáticos - Load balancer nginx
### Round Robin
Distribuição aleatória dos servidores
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