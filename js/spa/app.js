import express from 'express';
import {createProxyMiddleware} from 'http-proxy-middleware';
import url from 'node:url';

const app = express();
const port = 8093;


app.use('/', express.static('public'));
app.use('/vendor/keycloak.js', express.static(resolveDependency('keycloak-js')));
app.use('/node_modules', express.static('node_modules'));
app.use('/dist', express.static('dist'));

// debugging
app.use((req, res, next) => {
    console.log(`[DEBUG] Received Request: ${req.method} ${req.url}`);
    next();
});

app.use('/flowable-work', (req, res, next) => {
    console.log(`[DEBUG] Captured by proxy filter: ${req.method} ${req.url}`);
    next();
});

// Configurer le proxy pour Flowable Work
app.use(
    '/flowable-work', // prefix filtered that is set by baseUrl in index.html
    createProxyMiddleware({
        target: 'https://localhost:8443', // URL de Flowable Work
        changeOrigin: true,               // Adapter l'en-tête Origin
        secure: false,                    // Désactiver la vérification SSL pour les certificats auto-signés
        ws: true,                         // Activer WebSocket si nécessaire
        logLevel: 'debug',                 // Niveau de log pour débogage
        pathRewrite: {
            '^/flowable-work': ''           // Supprime le préfixe pour le serveur cible
        },
        cookiePathRewrite: {
            '*': '/'                        // Réécrit les chemins des cookies
        },
        onProxyReq: (proxyReq, req) => {
            console.log(`[DEBUG] Proxying request to: ${proxyReq.path}`);
        },
        onProxyRes: (proxyRes, req, res) => {
            console.log(`[DEBUG] Backend responded with: ${proxyRes.statusCode}`);
        }
    })
);

app.listen(port, () => {
    console.log(`Listening on port ${port}.`);
});

function resolveDependency(module) {
    return url.fileURLToPath(import.meta.resolve(module));
}
