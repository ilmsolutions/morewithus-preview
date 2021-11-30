export class baseManager {
    protected configureCommon(app?):any {};
    protected configureDevelopmentEnv(app?): any {};
    protected configureProductionEnv(app?): any {};

    constructor(){

    }

    handle(app){
        this.configureCommon(app);
        //console.log(nconf.get('development'));
        if(process.env.NODE_ENV == 'development'){
            this.configureDevelopmentEnv(app);
        }
        else{
            this.configureProductionEnv(app);
        }
    }
};
