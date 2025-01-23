import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import {terser} from 'rollup-plugin-terser';
import json from '@rollup/plugin-json';
import replace from '@rollup/plugin-replace'
// import polyfillNode from 'rollup-plugin-polyfill-node'; // provoque des erreurs de mémoire
import {visualizer} from 'rollup-plugin-visualizer';

export default [
    // Config pour @flowable/work-views
    {
        input: 'node_modules/@flowable/work-views/dist/index.js', // Point d'entrée de Flowable
        output: {
            file: 'dist/flowable-work-views.esm.js', // Fichier de sortie compatible ESM
            format: 'esm', // Génère un module ES
            sourcemap: true, // Génération de la source map pour le débogage
        },
        external: [],
        plugins: [
            replace({
                'process.env.NODE_ENV': JSON.stringify('production'),
                preventAssignment: true
            }),
            resolve({
                    browser: true, // Indique que nous ciblons un environnement navigateur
                    preferBuiltins: false // Désactiver les modules Node.js natifs, requiert les polyfills
                }
            ), // Résout les dépendances dans `node_modules`
            commonjs({
                include: 'node_modules/**', // Inclut les modules Node.js
                transformMixedEsModules: true // Support pour modules mixtes (CJS et ES)
            }),
            // polyfillNode(), // Ajoute les polyfills nécessaires pour Node.js dans le navigateur
            terser(), // Minifie le code pour un meilleur déploiement
            json(),  // Lit-écrit les fichiers json
            visualizer({filename: 'work-views-bundle-analysis.html'}) // Génère un fichier HTML pour analyse
        ]
    },

    // Config pour portal-b2c-mockup-client.js et pour portal-b2c-mockup-config.js
    {
        input: 'public/portal-b2c-mockup-client.js',
        output: {
                file: 'dist/portal-b2c-mockup-client.esm.js', // Fichier de sortie compatible ESM
                format: 'esm', // Génère un module ES
                sourcemap: true // Génération de la source map pour le débogage
        },
        external: ['dist/flowable-work-views.esm.js','../dist/flowable-work-views.esm.js', '@flowable/work-views'], // Marque ce module comme "externe" car transpilé séparément au-dessus
        plugins: [
            resolve({
                browser: true, // Cible un environnement navigateur
                preferBuiltins: false // Désactive les modules natifs de Node.js
            }),
            commonjs(), // Convertit les modules CommonJS en modules ES
            // polyfillNode(), // Ajoute les polyfills nécessaires pour un environnement navigateur
            terser(), // Minifie le code pour la production
            json(), // Interprète les fichiers JSON
            visualizer({filename: 'portal-b2c-mockup-bundle-analysis.html'}) // Génère un rapport d'analyse distinct pour ce bundle
        ]
    }
];
