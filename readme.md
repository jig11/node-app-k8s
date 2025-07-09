git init

git add .
git commit -m "comment"

git remote add origin <https://github.com/username/proj.git>

git push -u origin main //this will ask for pat token

git branch //to check branch
git log //to chk commits

A) INSTALL WSL + Ubuntu on windows

1) wsl --list --verbose
Windows Subsystem for Linux has no installed distributions.

to fix
1) go to Microsoft store, 
2) search ubuntu lts, click install
3) after install, launch 
 it gave error, WSL 2 requires an update to its kernel
4) > wsl --update in Windows powershell
5) after this try launching ubuntu again, it should work and it will ask to create username & password (unixuser/123#werT)
6) check with cmd: 
	> wsl --list --verbose
	output::
	NAME		STATE		VERSION
	Ubuntu-22.04	running		2

7) If you want to ensure WSL 2 is your default, use wsl --set-default-version 2

8) to shutdown WSL, use wsl --terminate Ubuntu-22.04
	to start, use wsl -d <distribution_name e.g.ubuntu-22.04>

-------------------------------------------------------------------------------------------------------------------------------------------------------

B) Kubernetes Installation

Now will proceed with Installation of Kubernetes(kubectl),on ubuntu (on windows)
Launch ubuntu, create user and run
1) > sudo apt update
2) > sudo apt install docker.io kubectl -y (!unable to locate package kubectl)
	to Fix,
	1) > sudo apt update
	   > sudo apt install -y apt-transport-httpsca-certificates curl (!unable to locate apt-transport-httpsca-certificates)
		to Fix,
		1) > sudo apt-get clean
		2) > sudo apt-get update -o Acquire::ForceIPv4=true
		3) > sudo apt-get install -y ca-certificates
		4) > sudo apt-get install -y curl
	If all good, proceed to add Kubernetes apt repository
	
	//Seems https://packages.cloud.google.com/apt/doc/apt-key.gpg url is not valid anymore 
		sudo mkdir -p /etc/apt/keyrings

	2) > sudo curl -fsSLo /usr/share/keyrings/kubernetes-archive-keyring.gpg https://packages.cloud.google.com/apt/doc/apt-key.gpg
	   > sudo curl -fsSLo /usr/share/keyrings/kubernetes-archive-keyring.gpg https://packages.cloud.google.com/apt/doc/apt-key.gpg
	
	//remove unwated files
	> sudo rm -f /etc/apt/sources.list.d/kubernetes.list	
	> sudo rm -f /usr/share/keyrings/kubernetes-archive-keyring.gpg
	
	// If you want check gpg file in respective folder with (pwd, cd, ls commands) I found file kubernetes-archive-keyring.gpg /usr/share/keyrings/
	
	Instead use this,
	> sudo mkdir -p /etc/apt/keyrings

	//Download the GPG key save as binary gpg format
	> curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.30/deb/Release.key | gpg --dearmor | sudo tee /etc/apt/keyrings/kubernetes-apt-keyring.gpg > /dev/null
	

	//Add Kubernetes REPo with Signed Key
	> echo "deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.30/d
eb/ /" | sudo tee /etc/apt/sources.list.d/kubernetes.list > /dev/null

	//Ensures apt can read the key file
	> sudo chmod 644 /etc/apt/keyrings/kubernetes-apt-keyring.gpg
	
	> sudo apt-get update

	> sudo apt-get install -y kubectl

	> kubectl version --client //final check

-------------------------------------------------------------------------------------------------------------------------------------------------------
C) INSTALL Minikube

 > sudo apt update
 > sudo apt install -y curl wget
 > sudo apt install -y gnupg lsb-release
	
 Install docker
 > sudo apt install -y docker.io
 > sudo usermod -aG docker $USER


  Logout & log In WSL to apply docker group permissions
  In powershell/CMD, logout > wsl --terminate Ubuntu-22.04
		      login > wsl -d Ubuntu-22.04

once Login ubuntu,
To verify docker
> docker version

To check if docker is running,
> docker info
OR 
> docker run hello-world (hello-world docker image)
OR FOR docker daemon
> sudo service docker start



Install Minikube
> curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube_latest_amd64.deb
> sudo dpkg -i minikube_latest_amd64.deb

verify 
> minikube version

> minikube start --driver=docker

output:
😄  minikube v1.36.0 on Ubuntu 22.04 (kvm/amd64)
✨  Using the docker driver based on user configuration
📌  Using Docker driver with root privileges
👍  Starting "minikube" primary control-plane node in "minikube" cluster
🚜  Pulling base image v0.0.47 ...
💾  Downloading Kubernetes v1.33.1 preload ...
    > preloaded-images-k8s-v18-v1...:  347.04 MiB / 347.04 MiB  100.00% 6.95 Mi
    > gcr.io/k8s-minikube/kicbase...:  502.26 MiB / 502.26 MiB  100.00% 6.35 Mi
🔥  Creating docker container (CPUs=2, Memory=2200MB) ...
🌐  Found network options:
    ▪ HTTP_PROXY=http://10.242.191.82:80
❗  You appear to be using a proxy, but your NO_PROXY environment does not include the minikube IP (192.168.49.2).
📘  Please see https://minikube.sigs.k8s.io/docs/handbook/vpn_and_proxy/ for more details
    ▪ HTTP_PROXY=http://10.242.191.82:80
🐳  Preparing Kubernetes v1.33.1 on Docker 28.1.1 ...
    ▪ env HTTP_PROXY=http://10.242.191.82:80
    ▪ Generating certificates and keys ...
    ▪ Booting up control plane ...
    ▪ Configuring RBAC rules ...
🔗  Configuring bridge CNI (Container Networking Interface) ...
🔎  Verifying Kubernetes components...
    ▪ Using image gcr.io/k8s-minikube/storage-provisioner:v5
🌟  Enabled addons: storage-provisioner, default-storageclass

❗  /usr/bin/kubectl is version 1.30.14, which may have incompatibilities with Kubernetes 1.33.1.
    ▪ Want kubectl v1.33.1? Try 'minikube kubectl -- get pods -A'
🏄  Done! kubectl is now configured to use "minikube" cluster and "default" namespace by default

> kubectl get nodes
NAME       STATUS   ROLES           AGE    VERSION
minikube   Ready    control-plane   3m7s   v1.33.1

>  kubectl get pods -A
NAMESPACE     NAME                               READY   STATUS    RESTARTS       AGE
kube-system   coredns-674b8bbfcf-sg8rz           1/1     Running   0              4m34s
kube-system   etcd-minikube                      1/1     Running   0              4m40s
kube-system   kube-apiserver-minikube            1/1     Running   0              4m40s
kube-system   kube-controller-manager-minikube   1/1     Running   0              4m40s
kube-system   kube-proxy-2jn46                   1/1     Running   0              4m35s
kube-system   kube-scheduler-minikube            1/1     Running   0              4m40s
kube-system   storage-provisioner                1/1     Running   1 (4m5s ago)   4m38s

> minikube dashboard
 Enabling dashboard ...
    ▪ Using image docker.io/kubernetesui/metrics-scraper:v1.0.8
    ▪ Using image docker.io/kubernetesui/dashboard:v2.7.0
💡  Some dashboard features require the metrics-server addon. To enable all features please run:

        minikube addons enable metrics-server

🤔  Verifying dashboard health ...
🚀  Launching proxy ...
🤔  Verifying proxy health ...
🎉  Opening http://127.0.0.1:43565/api/v1/namespaces/kubernetes-dashboard/services/http:kubernetes-dashboard:/proxy/ in your default browser...
👉  http://127.0.0.1:43565/api/v1/namespaces/kubernetes-dashboard/services/http:kubernetes-dashboard:/proxy/



-------------------------------------------------------------------------------------------------------------------------------------------------------
Deploy a Node.js App in Minikube

1) create your App, In WSL home directory [i.e. ~/node-app-k8s]
2) create docker file, 
3) > eval $(minikube docker-env) //It Points Docker CLI to Minikube's Docker daemon
   > docker build -t node-app-k8s:latest .  //Builds image inside Minikube — no need to push
   //Not require as of now, just for reference,  > eval $(minikube docker-env -u) //Revert back to system Docker 
   just to verify,
   >  docker images //should see the result of our dockerfile created earlier step 2.
4) Create Kubernetes Deployment & Service
   YAML file for Kubernetes setup needs to be created.
5) Apply YAML to minikube
> kubectl apply -f k8s-deployment.yaml
 To verify, > kubectl get pods (Final output after issue fix)
		NAME                        READY   STATUS    RESTARTS   AGE
		node-app-84fc7455bb-8wzlv   1/1     Running   0          6s
		node-app-84fc7455bb-rsnvt   1/1     Running   0          8s		
            > kubectl get svc (Final output after issue fix)
		NAME           TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)        AGE
		kubernetes     ClusterIP   10.96.0.1       <none>        443/TCP        2d2h
		node-service   NodePort    10.101.65.161   <none>        80:32747/TCP   4m39s
	    > kubectl get deployments (Final output after issue fix)
		NAME       READY   UP-TO-DATE   AVAILABLE   AGE
		node-app   0/2     2            0           51s
	
	 >kubectl get pods output should be, (since replicas:2)
		NAME                         READY   STATUS    RESTARTS   AGE
		node-app-6f7b984975-4qkzn    1/1     Running   0          1m
		node-app-6f7b984975-kmz9d    1/1     Running   0          1m

	//But I was getting READY as ErrImagePull,ImagePullBackOff instead of running
	TO FIX,
	1) Rebuild the Image Inside Minikube's Docker, > eval $(minikube docker-env)
 	2) Rebuild the Image			       > docker build -t node-app-k8s:latest .
	3) Delete existing Pods,		       > kubectl delete pods --all

	Still it didnot work,

	1) Confirm You Are Inside Minikube's Docker Environment > docker info | grep "Docker Root Dir"
	  //If the path includes something like /var/lib/docker within a .minikube path, then you're inside Minikube’s Docker daemon.
	2) Rebuild the Image (Inside Minikube Docker), if unsure re-run, > eval $(minikube docker-env) & confirm > docker images
	  > docker build -t node-app-k8s:latest .
	  > docker images | grep node-app-k8s
	3) Restart Deployment to Use the New Image
	  Delete old pods: > kubectl delete pods --all OR > kubectl rollout restart deployment node-app
	4) monitor pods: > kubectl get pods -w

		Still it didnot work, modify the container section to, Add imagePullPolicy: Never in YAML.
		> kubectl apply -f k8s-deployment.yaml

6) Access the App,
	> minikube service node-service --url //Use this command to get the URL:
	
	Output:
	http://127.0.0.1:38241
	❗  Because you are using a Docker driver on linux, the terminal needs to be open to run it.
	(Final output after issue fix)
	Open the printed URL in your browser, should see "Hello from Node.js running in Kubernetes!"

-------------------------------------------------------------------------------------------------------------------------------------------------------

Add Autoscaling (HPA)
1) Expose resource limits in your deployment (required for HPA)
	1) Add CPU Resource Requests and Limits, k8s-deployments.yaml file add resources in container section. refer code
		
2) Enable metrics server in Minikube 
> minikube addons enable metrics-server // It provides Kubernetes with CPU and memory usage data for each pod. HPA depends on it.

To verify, > kubectl get deployment metrics-server -n kube-system 
	EXPECTED OUTPUT
	NAME             READY   UP-TO-DATE   AVAILABLE   AGE
	metrics-server   1/1     1            1           <time>

Test if Metrics Are Working, > kubectl top pods
	EXPECTED OUTPUT
	NAME                        CPU(cores)   MEMORY(bytes)
	node-app-6cc8f5fc48-vslp5   1m           14Mi
	node-app-6cc8f5fc48-xh6zl   1m           15Mi

3) Apply an HPA object
	1) create HPA.YAML File (refer code)
	2) apply hpa.yaml on kubetl, > kubectl apply -f hpa.yaml
		EXPECTED OUTPUT: horizontalpodautoscaler.autoscaling/node-app-hpa created
	3) TO verify, > kubectl get hpa
		EXPECTED OUTPUT:
		NAME           REFERENCE            TARGETS         MINPODS   MAXPODS   REPLICAS   AGE
		node-app-hpa   Deployment/node-app  3%/50%          2         5         2          1m
		//The TARGETS column shows current vs target CPU utilization.

4) Simulate load to test autoscaling
	1) > sudo apt install hey //Use a Load Testing Tool named Hey
		
		//this also can be used for load testing
		> curl -LO https://github.com/rakyll/hey/releases/download/v0.1.4/hey_linux_amd64
		> chmod +x hey_linux_amd64
		> sudo mv hey_linux_amd64 /usr/local/bin/hey

	
	2) > minikube service node-service --url //get url of the service
	3) > hey -z 1m -c 50 http://127.0.0.1:30001 //Run load test using hey (port can be anything) -z: run for 1 minute -c: concurrent users
	4) > watch kubectl get hpa //In another terminal, 
		expected output:
		NAME           TARGETS   MINPODS   MAXPODS   REPLICAS
		node-app-hpa   63%/50%   2         5         3			
	5) if require open new terminal,
	   > watch kubectl get pods	//should see 5 pods dynamically getting created.
	6) Stop load (ctrl+C) when done, or it will run till 1 minute and after some idle time it will come back to (downscale) 2 pods .

-------------------------------------------------------------------------------------------------------------------------------------------------------
Ingress: 
Access your app at a friendly URL like http://node-app.local
Route traffic to multiple services on different paths (e.g., /api, /admin)
Use port 80 instead of random NodePort ports
Optionally handle SSL (HTTPS) via cert-manager

1) Enable NGINX Ingress Controller in Minikube
	
	> minikube addons enable ingress //output: The 'ingress' addon is enabled
	> kubectl get pods -n ingress-nginx 
		OUTPUT:
		NAME                                        READY   STATUS    RESTARTS   AGE
		ingress-nginx-controller-xxxxxxxxxxxxx      1/1     Running   0          <time>


2) Modify your Service (if needed)
   k8s-deployment.yaml, 
   change your type from "NodePort", change it to "ClusterIP" (Ingress does not require NodePort). & re-apply 
	> kubectl apply -f k8s-deployment.yaml

3) Create an Ingress resource YAML
	Create a new file: node-app-ingress.yaml
	& apply, kubectl apply -f node-app-ingress.yaml 
	EXPECTED output: ingress.networking.k8s.io/node-app-ingress created

4) Add node-app.local to your Windows hosts file [C:\Windows\System32\drivers\etc\hosts]
	Map node-app.local → Minikube IP
	192.168.49.2   node-app.local

5) Test access via browser, http://node-app.local 
	but this didn't	work
To Fix,

check > kubectl get pods -n ingress-nginx
      > minikube ip
       add this IP entry with domain name to hosts file
      > kubectl get ingress
      > curl -I http://node-app.local //it gave 200 OK
      > kubectl logs -n ingress-nginx deployment/ingress-nginx-controller //check logs for ingress controller
      > minikube tunnel //may try starting tunnel for minikube

try port forwarding
> kubectl port-forward service/node-service 8080:80
& now try http://localhost:8080 it worked for me now.

// initialize wsl -d ubuntu-22.04
// chk if WSL docker is runnning 
//  minikube start --driver=docker
// kubectl get nodes
//cd to app folder in wsl
// run code . to open folder in vs code
// eval $(minikube docker-env)
//  docker build -t node-app-k8s:latest .
// docker images

-------------------------------------------------------------------------------------------------------------------------------------------------------
Readiness and Liveness Probes

Readiness Probe
Indicates if the container is ready to accept traffic
Readiness Probe that checks /healthz to decide if the app is ready

Liveness Probe
Indicates if the container is healthy (alive)
A Liveness Probe that checks /healthz periodically to make sure the app hasn’t hung or crashed silently

step 1: Add /healthz endpoint in node.js app (refer code) & then rebuild the docker image
> eval $(minikube docker-env)
> docker build -t node-app-k8s:latest .
> docekr images

step 2: Edit your k8s-deployment.yaml, and add readinessProbe and livenessProbe under the container spec (refer code)
1) initialDelaySeconds	Delay before first check
2) periodSeconds	How often to check
3) failureThreshold	How many failures before action (remove from service / restart container)
4) httpGet.path	URL path to check

step 3: Apply and Restart
> kubectl apply -f k8s-deployment.yaml
> kubectl rollout restart deployment node-app

step 4: verify
kubectl describe pod <pod-name>
we will see, Readiness probe succeeded & Liveness probe succeeded or its configuration

-------------------------------------------------------------------------------------------------------------------------------------------------------

Simulation of Both Probes

step 1 - Update your server.js with healthy flag & /toggle-health endpoint
& rebuild the docker image
> eval $(minikube docker-env)
> docker build -t node-app-k8s:latest .
Then re-apply your deployment,
> kubectl apply -f k8s-deployment.yaml
> kubectl rollout restart deployment node-app

STEP 2 - Access the App and Toggle Health
 > kubectl port-forward service/node-service 8080:80
& check /healthz endpoint //healthy 
then check /toggle-health //unhealthy
then check /healthz //unhealthy

STEP 3 - now check kubernetes reaction
> kubectl get pods -w 
// if readiness probe fails, pod wont recv traffic
// if liveness probe fails (as per threshold), it will restart the pod 

// in our case, if /healthz endpoint is "unhealthy" , it will stop receving traffic.
// &, if /healthz endpoint is "unhealthy" for 3 times, it will restart the pod.

When the probe keeps failing:

You’ll see Restart Count increase

You may see a message like Back-off restarting failed container

we can see same in minikube dashboard as well,
> minikube dashboard
output will be an url for dashboard

we can also have a curl request specific to a POD

OPTION 1 - Port-Forward to a Specific Pod
1) > kubectl get pods
2) > kubectl port-forward pod/<pod_name> 8081:3000 //local port 8080 is connected to port 3000 inside of pod
3) > new terminal, curl http://localhost:8081/healthz

while verifying, if above option step2 didnot work, as fallback we can use pod/service
> kubectl port-forward service/node-service 8080:80 //since its service it can redirect to any pod and if this works means some issue with specific pod.

As best practice, when Use kubectl port-forward service/... use web browser
				  when Use kubectl port-forward pod/... use Curl WSL
				  
OPTION 2 - Exec Into a Pod and Curl Locally
1) > kubectl exec -it <pod_name> -- /bin/sh  //this will open shell inside specific pod
2) > curl localhost:3000/healthz //this time we are inside of the pod, hence accessing port 3000 is accessible.

kubectl port-forward service/<svc> 
//you are forwarding traffic to a Kubernetes Service, not to a specific Pod. The Service acts as a load balancer over a set of Pods.
// Kubernetes uses a round-robin algorithm to distribute requests evenly across them.

When using a Service (ClusterIP or NodePort), traffic is automatically load-balanced across available pods. So direct targeting is only possible using:
we have seen 1) Port-forward to pod , 2) Exec into pod, & not seen 3)Pod IP (less common in practice; internal use only)

verify Round-robin behaviour with service.
In node.js app, refer code for os.hostname()
step 2: rebuild the image
step 3: restart the deployment
step 4: kubectl port-forward service/node-service 8080:80
step 5: curl http://localhost:8080
running curl miltiple times, should change pod name.

if not working,
> kubectl get pods
> kubectl exec -it <pod-name> -- node
  # require('os').hostname() 
  # output: should return "<pod_name>"

wasnot working for port 8080, changed port to 8085, nd started working but all requrests were going to same pod.

> curl -H "Connection: close" http://localhost:8085/ //explicitly closing the connection, but it didnot worked for me

To fix it,
1) check no of pods it should be more than 1 > kubectl get pods -l app=node-app , Or to scale we can use > kubectl scale deployment node-app --replicas=3
2) confirm if service is balancing the pods, > kubectl get endpoints node-service 
	NAME           ENDPOINTS                                   		 AGE
	node-service   172.17.0.3:3000,172.17.0.4:3000,172.17.0.5:3000   10m  		//endpoints should have multiple IPs
3) Confirm Label Selector in Service > kubectl get pods --show-labels
4) check for session affinity > kubectl get svc node-service -o yaml  			// sessionAffinity: None, if it is ClientIP, change it to None.

5) > kubectl run tester --image=ubuntu -- sleep infinity
   > kubectl exec -it tester -- bash
   > apt update
   > apt install -y curl wget
   > curl http://node-service:3000/
   Your container is listening on PORT, but service targets incorrect port
   ports:
  - protocol: TCP
    port: 80
    targetPort: 3000
This means:
→ Service receives requests on port 80,
→ Forwards them to pod's containerPort 3000

So your curl or wget command must use port 80, not 3000, when calling via service:
> curl http://node-service

now verify Round robin load balancing, with multiple requests to  curl http://node-service should see request going to multiple pods.

Update server.js: refer 0.0.0.0 IP in app.listen (refer code)

//Node.js defaults to localhost (127.0.0.1), which means:
//The app is only accessible from inside the container — not from the service IP.
//🛠️ Fix: Change to 0.0.0.0 and rebuild + redeploy.
rebuild image, & restart
To verify app is listning on 0.0.0.0
> curl -s http://localhost:3000/
> kubectl get pod <pod-name> -o wide // refer IP column(i.e. our POD-IP)
> kubectl exec -it <pod-name> -- sh
  # curl -s http://<pod-ip>:3000/


// > wsl --list --verbose
// > wsl -d ubuntu-22.04
// > minikube start --driver=docker
// change directory to App folder where dockerfile
// > eval $(minikube docker-env)
// > docker build -t node-app-k8s:latest .
// > docker images
// > kubectl apply -f k8s-deployment.yaml
// > kubectl rollout restart deployment node-app
// > kubectl describe pod <podname>

// Port-Forward to a Specific Pod,
// > kubectl port-forward pod/<pod_name> 8081:3000 //this cmd sends request to a specific pod useful while debugging, to send a request use curl cmd in different terminals > curl http://localhost:8081/healthz

// To Exec into a pod
> kubectl exec -it <pod_name> -- /bin/sh 
//then from inside the pod
# curl http://localhost:8081/healthz

-------------------------------------------------------------------------------------------------------------------------------------------------------
Create a LoadBalancer Service in Minikube

step 1 : modify k8s-deployment.YAML
update spec.type: LoadBalancer (clusterIP earlier)
apply the changes,
> kubectl apply -f k8s-deployment.yaml

step 2 : start minikube tunnel 
open new terminal, > minikube tunnel
enter password

step 3: check External IP
> kubectl get svc node-service
expected output:
NAME           TYPE           CLUSTER-IP     EXTERNAL-IP     PORT(S)        AGE
node-service   LoadBalancer   10.96.228.73   127.0.0.1       80:xxxx/TCP    2m

I was getting 
NAME           TYPE           CLUSTER-IP     EXTERNAL-IP   PORT(S)        AGE
node-service   LoadBalancer   10.96.153.47   <none>        80:xxxxx/TCP   2m
// That means the LoadBalancer service is waiting for an external IP, but none has been provisioned yet — which is expected unless minikube tunnel is running

To fix this,
1) open minikube tunnel
2) > kubectl get svc node-service
3) > curl http://127.0.0.1/  //if IP is there use that external IP
4) > minikube service node-service --url
	this will return some url, //http://127.0.0.1:34961/
	Open URL in browser //Hello from Node.js running in Kubernetes! pod : node-app-5f85d487c6-zcfd6

minikube service node-service --url


step 4: Access The application using external IP
http://127.0.0.1/




	







