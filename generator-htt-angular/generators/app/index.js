const Generator = require("yeoman-generator");

module.exports = class extends Generator{
    constructor(args, opts) {
        super(args, opts);
        this.argument("model", { type: String, required: true });
      }
    async prompting(){
        const { AppName } = await this.prompt([{name: "AppName", message: "What is the app name?"}]);
        this.AppName = AppName;
        this.rootPath = `${this.AppName.toLowerCase()}-backoffice`
        this.appPath = `${this.rootPath}/src/app`;
    }

    initializing(){
        this.modelFile = JSON.parse(this.fs.read(this.destinationPath(this.options.model)));
        this.entities = this.modelFile.entities;
        this.enumerations = this.modelFile.enumerations;
        this.relationships = this.modelFile.relationships;

        // this.entities.forEach(entity => {
        //     let relations = this.relationships.manytoone.filter(relation => relation.from == entity.name);
        //     if(relations && relations.length){
        //         relations.forEach(relation => {
        //             entity.fields.push({
        //                 "name": relation.to.toLowerCase(),
        //                 "type": relation.to
        //             })
        //         })
        //     }
        // })

    }

    writing(){
        this.fs.copyTpl(
            this.templatePath("src/app/shared/const.ts"),
            this.destinationPath(`${this.appPath}/shared/const.ts`)
        );
        this.fs.copyTpl(
            this.templatePath("src/app/shared/input-only-number.directive.ts"),
            this.destinationPath(`${this.appPath}/shared/input-only-number.directive.ts`)
        );
        this.fs.copyTpl(
            this.templatePath("src/app/shared/input-only-number.directive.ts"),
            this.destinationPath(`${this.appPath}/shared/input-only-number.directive.ts`)
        );
        this.fs.copyTpl(
            this.templatePath("src/app/shared/shared.module.ts"),
            this.destinationPath(`${this.appPath}/shared/shared.module.ts`)
        );
        this.fs.copyTpl(
            this.templatePath("src/app/shared/rbac"),
            this.destinationPath(`${this.appPath}/shared/rbac`)
        );
        this.fs.copyTpl(
            this.templatePath("src/app/shared/utils"),
            this.destinationPath(`${this.appPath}/shared/utils`)
        );
        this.fs.copyTpl(
            this.templatePath("src/app/shared/confirm-dialog"),
            this.destinationPath(`${this.appPath}/shared/confirm-dialog`)
        );


        this.fs.copyTpl(
            this.templatePath("src/app/shared/navigation.ts"),
            this.destinationPath(`${this.appPath}/shared/navigation.ts`),
            {entities: this.entities}
        );
        this.fs.copyTpl(
            this.templatePath("src/app/services/authentication.service.ts"),
            this.destinationPath(`${this.appPath}/services/authentication.service.ts`)
        );
        this.fs.copyTpl(
            this.templatePath("src/app/services/user.service.ts"),
            this.destinationPath(`${this.appPath}/services/user.service.ts`)
        );
        this.fs.copyTpl(
            this.templatePath("src/app/services/ConfirmationDialogService.ts"),
            this.destinationPath(`${this.appPath}/services/ConfirmationDialogService.ts`)
        );
        this.fs.copyTpl(
            this.templatePath("src/app/models/user.ts"),
            this.destinationPath(`${this.appPath}/models/user.ts`)
        );
        this.fs.copyTpl(
            this.templatePath("src/app/models/role-enum.ts"),
            this.destinationPath(`${this.appPath}/models/role-enum.ts`)
        );
        this.fs.copyTpl(
            this.templatePath("src/app/helpers"),
            this.destinationPath(`${this.appPath}/helpers`)
        );
        this.fs.copyTpl(
            this.templatePath("src/app/components"),
            this.destinationPath(`${this.appPath}/components`)
        );
        this.fs.copyTpl(
            this.templatePath("src/app/app.component.*"),
            this.destinationPath(`${this.appPath}`)
        );
        this.fs.copyTpl(
            this.templatePath("src/app/app.module.ts"),
            this.destinationPath(`${this.appPath}/app.module.ts`)
        );
        this.fs.copyTpl(
            this.templatePath("src/app/app.routing.ts"),
            this.destinationPath(`${this.appPath}/app.routing.ts`),
            {entities: this.entities}
        );
        this.fs.copyTpl(
            this.templatePath("src/assets/css"),
            this.destinationPath(`${this.rootPath}/src/assets/css`)
        );
        this.fs.copyTpl(
            this.templatePath("src/assets/images"),
            this.destinationPath(`${this.rootPath}/src/assets/images`)
        );
        this.fs.copyTpl(
            this.templatePath("src/assets/.gitkeep"),
            this.destinationPath(`${this.rootPath}/src/assets/.gitkeep`)
        );
        this.fs.copyTpl(
            this.templatePath("src/assets/i18n/*.json"),
            this.destinationPath(`${this.rootPath}/src/assets/i18n/`),
            {entities: this.entities, enumerations: this.enumerations}
        );
        this.fs.copyTpl(
            this.templatePath("src/environments"),
            this.destinationPath(`${this.rootPath}/src/environments`)
        );
        this.fs.copyTpl(
            this.templatePath("src/*.ts"),
            this.destinationPath(`${this.rootPath}/src/`)
        );
        this.fs.copyTpl(
            this.templatePath("src/*.scss"),
            this.destinationPath(`${this.rootPath}/src/`)
        );
        this.fs.copyTpl(
            this.templatePath("src/*.html"),
            this.destinationPath(`${this.rootPath}/src/`),
            {AppName: this.AppName}
        );
        this.fs.copyTpl(
            this.templatePath("*.json"),
            this.destinationPath(`${this.rootPath}/`),
            {AppName: this.AppName}
        );
        this.fs.copyTpl(
            this.templatePath(".gitignore"),
            this.destinationPath(`${this.rootPath}/.gitignore`)
        );
        this.fs.copyTpl(
            this.templatePath(".editorconfig"),
            this.destinationPath(`${this.rootPath}/.editorconfig`)
        );
        this.fs.copyTpl(
            this.templatePath("browserslist"),
            this.destinationPath(`${this.rootPath}/browserslist`)
        );
        this.fs.copyTpl(
            this.templatePath("*.js"),
            this.destinationPath(`${this.rootPath}/`)
        );
        this.fs.copyTpl(
            this.templatePath("*.md"),
            this.destinationPath(`${this.rootPath}/`),
            {AppName: this.AppName}
        );
        this.fs.copyTpl(
            this.templatePath("src/app/modules/login"),
            this.destinationPath(`${this.appPath}/modules/login`)
        );
        this.fs.copyTpl(
            this.templatePath("src/app/modules/account-setup"),
            this.destinationPath(`${this.appPath}/modules/account-setup`)
        );
        this.fs.copyTpl(
            this.templatePath("src/app/modules/user-management"),
            this.destinationPath(`${this.appPath}/modules/user-management`)
        );













        this.enumerations.forEach(enumeration => {
            const fileName = enumeration.name.replace(/([a-z])([A-Z])/g, "$1_$2").replace(/[\s_]+/g, '-').toLowerCase();
            this.fs.copyTpl(
                this.templatePath("src/app/models/enumeration/enumeration.ts"),
                this.destinationPath(`${this.appPath}/models/enumeration/${fileName}.ts`),
                {enumeration: enumeration}
            );
        });

        this.entities.forEach(entity => {
            const fileName = entity.name.replace(/([a-z])([A-Z])/g, "$1_$2").replace(/[\s_]+/g, '-').toLowerCase();
            const relationships = this.relationships.manytoone.filter(relation => relation.from == entity.name);
            const modulePath = `${this.appPath}/modules/${fileName}`;
            this.fs.copyTpl(
                this.templatePath("src/app/models/dummy.ts"),
                this.destinationPath(`${this.appPath}/models/${fileName}.ts`),
                {entity: entity, relationships: relationships}
            );
            this.fs.copyTpl(
                this.templatePath("src/app/services/dummy.service.ts"),
                this.destinationPath(`${this.appPath}/services/${fileName}.service.ts`),
                {entity: entity, fileName: fileName}
            );

            //Module setup
            //Module file
            this.fs.copyTpl(
                this.templatePath("src/app/modules/dummy/dummy.module.ts"),
                this.destinationPath(`${modulePath}/${fileName}.module.ts`),
                {entity: entity, fileName: fileName}
            );
            //Routing file
            this.fs.copyTpl(
                this.templatePath("src/app/modules/dummy/dummy-routing.module.ts"),
                this.destinationPath(`${modulePath}/${fileName}-routing.module.ts`),
                {entity: entity, fileName: fileName}
            );

            //List component files
            this.fs.copyTpl(
                this.templatePath("src/app/modules/dummy/dummy-list/dummy-list.component.ts"),
                this.destinationPath(`${modulePath}/${fileName}-list/${fileName}-list.component.ts`),
                {entity: entity, fileName: fileName, relationships: relationships}
            );
            this.fs.copyTpl(
                this.templatePath("src/app/modules/dummy/dummy-list/dummy-list.component.html"),
                this.destinationPath(`${modulePath}/${fileName}-list/${fileName}-list.component.html`),
                {entity: entity}
            );
            this.fs.copyTpl(
                this.templatePath("src/app/modules/dummy/dummy-list/dummy-list.component.scss"),
                this.destinationPath(`${modulePath}/${fileName}-list/${fileName}-list.component.scss`),
                {entity: entity}
            );

            //Form component files
            this.fs.copyTpl(
                this.templatePath("src/app/modules/dummy/dummy-form/dummy-form.component.ts"),
                this.destinationPath(`${modulePath}/${fileName}-form/${fileName}-form.component.ts`),
                {entity: entity, fileName: fileName, relationships: relationships}
            );
            this.fs.copyTpl(
                this.templatePath("src/app/modules/dummy/dummy-form/dummy-form.component.html"),
                this.destinationPath(`${modulePath}/${fileName}-form/${fileName}-form.component.html`),
                {entity: entity, fileName: fileName, relationships: relationships}
            );
            this.fs.copyTpl(
                this.templatePath("src/app/modules/dummy/dummy-form/dummy-form.component.scss"),
                this.destinationPath(`${modulePath}/${fileName}-form/${fileName}-form.component.scss`),
                {entity: entity}
            );

            //View component files
            this.fs.copyTpl(
                this.templatePath("src/app/modules/dummy/dummy-view/dummy-view.component.ts"),
                this.destinationPath(`${modulePath}/${fileName}-view/${fileName}-view.component.ts`),
                {entity: entity, fileName: fileName}
            );
            this.fs.copyTpl(
                this.templatePath("src/app/modules/dummy/dummy-view/dummy-view.component.html"),
                this.destinationPath(`${modulePath}/${fileName}-view/${fileName}-view.component.html`),
                {entity: entity}
            );
            this.fs.copyTpl(
                this.templatePath("src/app/modules/dummy/dummy-view/dummy-view.component.scss"),
                this.destinationPath(`${modulePath}/${fileName}-view/${fileName}-view.component.scss`),
                {entity: entity}
            );


    
            // this.fs.copyTpl(
            //     this.templatePath("controller/Controller.java"),
            //     this.destinationPath(`${this.appPath}/controller/${entity.name}Controller.java`),
            //     {BasePackageName: this.BasePackageName, EntityName: entity.name}
            // );
            //
            // this.fs.copyTpl(
            //     this.templatePath("mapper/Mapper.java"),
            //     this.destinationPath(`${this.appPath}/mapper/${entity.name}Mapper.java`),
            //     {BasePackageName: this.BasePackageName, EntityName: entity.name}
            // );
            //
            // this.fs.copyTpl(
            //     this.templatePath("model/Model.java"),
            //     this.destinationPath(`${this.appPath}/model/${entity.name}.java`),
            //     {BasePackageName: this.BasePackageName, entity: entity, enumerations: this.enumerationsNames, relationships: this.relationships}
            // );
            //
            // this.fs.copyTpl(
            //     this.templatePath("model/dto/ModelDTO.java"),
            //     this.destinationPath(`${this.appPath}/model/dto/${entity.name}DTO.java`),
            //     {BasePackageName: this.BasePackageName, entity: entity, enumerations: this.enumerationsNames, relationships: this.relationships}
            // );
            //
            // this.fs.copyTpl(
            //     this.templatePath("repository/Repository.java"),
            //     this.destinationPath(`${this.appPath}/repository/${entity.name}Repository.java`),
            //     {BasePackageName: this.BasePackageName, EntityName: entity.name}
            // );
        });

    }



}
