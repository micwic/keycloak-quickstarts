import { flowableAppController } from '@flowable/work-views';
import '@flowable/work-views/dist/index.css';

const options = {
    flowAppId: 'aPACSTRDemo1',
    container: 'flowable-app-view',
    fullScreen: false
};

let flwController = flowableAppController({ ...options, ...features });
flwController.render();

const onUpdate = () => {
    flwController.update({ ...options });
}

const onDestroyClick = () => {
    flwController.destroy();
}