1. kubectl apply -f pv-sc.yaml
2. helm install elastic elastic/elasticsearch -f es-value.yaml -n logging
3. kubectl create -f fluent-bit-role-1.22.yaml -n logging
4. kubectl create -f fluent-bit-role-binding-1.22.yaml -n logging
5. kubectl create -f fluent-bit-service-account.yaml -n logging
6. kubectl create -f fluent-bit-configmap.yaml -n logging
7. kubectl create -f fluent-bit-ds.yaml -n logging
8. helm install kibana elastic/kibana -f kibana-value.yml -n logging
9. kubectl port-forward elasticsearch-master-0 -n logging 9200:9200
10.curl -k https://localhost:9200 -u elastic:akstjd0219
11.192.168.56.100:30305