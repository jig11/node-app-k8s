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










	







