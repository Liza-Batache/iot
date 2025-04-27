# Assistant de Sécurité IoT - Projet M1 Cyber 2024

Ce projet propose une **application web de cybersécurité dédiée à la détection et l’analyse des appareils IoT** dans un réseau domestique ou bureautique. Il a été réalisé dans le cadre du module **Projet 2024** à l’Université Paris Cité.


## Objectifs pédagogiques

- Démontrer un **déploiement Kubernetes avec microservices**
- Mettre en œuvre un **Service Mesh (Istio)**
- Simuler une **analyse de sécurité des objets connectés**
- Créer une **interface utilisateur simple en HTML**

## Arborescence du projet

```
├── mini-app
│   ├── server.js                  # API Express (prototype initial)
│   ├── Dockerfile                 # Image Docker
│   ├── package.json               # Dépendances
│   ├── public
│   │   ├── html                   # Interface HTML
│   │   ├── css                    # Feuilles de style
│   │   ├── js                     # Scripts pour appels API
│   ├── istio-gateway.yaml         # Gateway Istio
│   ├── istio-virtualservice.yaml  # VirtualService Istio
│
├── assistant-iot-analysis
│   ├── app.js                     # Microservice d’analyse
│   ├── Dockerfile
│   ├── package.json
│   ├── k8s/
│       ├── analysis-deployment.yaml
│       ├── analysis-service.yaml
│
├── k8s
│   ├── iot-deployment.yaml
│   ├── iot-service.yaml
│   ├── mysql-deployment.yaml
│   ├── mysql-service.yaml
│   ├── rbac-test-pod.yaml
│   ├── read-only-role.yaml
│   ├── read-only-rolebinding.yaml
│   ├── read-serviceaccount.yaml
│
├── README.md                      # Présentation (ce fichier)
├── rapport_final_avec_annexes.docx # Rapport officiel avec captures
```

---

## Fonctionnalités

| Fonction                         | État     |
|----------------------------------|----------|
| Détection d’appareils IoT       | ✅ Fait   |
| Analyse des vulnérabilités      | ✅ Fait   |
| Recommandations                 | ✅ Fait   |
| Interface HTML simple           | ✅ Fait   |
| Communication entre services    | ✅ Fait   |
| Docker & Kubernetes             | ✅ Fait   |
| Istio Gateway + VirtualService  | ✅ Fait   |
| Base MySQL + RBAC               | ✅ Fait 

---

## ⚙️ Docker (Exemple mini-app)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY server.js .
COPY public ./public
EXPOSE 3000
CMD ["node", "server.js"]
```

---

## ☁️ Déploiement Kubernetes

```bash
# Appliquer les composants
kubectl apply -f mini-app-deployment.yaml
kubectl apply -f mini-app-service.yaml
kubectl apply -f istio-gateway.yaml
kubectl apply -f istio-virtualservice.yaml

# Activer le tunnel si besoin
minikube tunnel

# Accès à l’app
minikube service mini-app-service
```

---

## 🌐 Routes disponibles

| URL                               | Description                          |
|----------------------------------|--------------------------------------|
| `/`                              | Page d’accueil HTML                  |
| `/ping`                          | Test simple (pong)                   |
| `/call-analysis`                 | Appel vers le microservice d’analyse |
| `/analyze-devices`              | Simulation de failles détectées      |

---

## Membres du groupe

- **Liza Hadjira BATACHE**
- **Melissa LAGAB**

---

## Rapport

> Voir `rapport_final_avec_annexes.docx`  
> Il inclut :
- Explications techniques
- Captures d’écran (Kubernetes, interface)
- Détail des microservices
- Analyse de sécurité simulée

---

## Pour aller plus loin 

- Authentification utilisateurs avec tokens
- Dashboard en React
- CI/CD avec GitHub Actions
- Sécurité réseau avancée (Istio mTLS)

---

## Conclusion

Projet terminé avec succès selon les consignes du module.  
Respect de l’aspect **microservices + Kubernetes + Istio + Sécurité IoT** avec preuve de fonctionnement.

---
