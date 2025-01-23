// import { flowableAppController } from '@flowable/work-views';
// import WorkViews from '@flowable/work-views';
(async () => {
    const WorkViews = await import('../dist/flowable-work-views.esm.js');

console.log(WorkViews);
Object.keys(WorkViews).forEach(key => {
    console.log(key, WorkViews[key]);
});
console.log('flowableAppController:', typeof WorkViews.flowableAppController);
console.log('flowableAppController getter:', WorkViews.flowableAppController);

const flowableAppController = WorkViews.default?.flowableAppController || WorkViews.flowableAppController;
console.log(flowableAppController);

const options = {
    flowAppId: 'appCIIViaCIP',
    container: 'flowable-app-view',
    fullScreen: false
};

console.log('Vérification de la validité du conteneur DOM:', document.getElementById(options.container));

const features = {}; // objet vide pour correspondre au snippet de la documentation flowable pour l'initialisation ci-dessous

console.log('appel à flowableAppController avec options: ', options, 'et features: ', features, '');
let flwController = flowableAppController({ ...options, ...features });
console.log('appel à render() de flwcontroller: ', flwController);
flwController.render();
})();

const onUpdate = () => {
    flwController.update({ ...options });
}

const onDestroyClick = () => {
    flwController.destroy();
}