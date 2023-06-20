const Generator = require("yeoman-generator");

module.exports = class extends Generator{

    constructor(args, opts) {
        super(args, opts);
        //this.argument("model", { type: String, required: true });
        this.argument("model", { type: String, required: true });
      }
    async prompting(){
        const { AppName } = await this.prompt([{name: "AppName", message: "What is the app name?"}]);
        this.AppName = `${AppName}-backend`;

        const { GroupeName } = await this.prompt([{name: "GroupeName", message: "What is the group name?"}]);
        this.GroupeName = GroupeName;

        const searchRegExp = /\./gi;
        const replaceWith = '/';

        this.BasePackageName = `${this.GroupeName.toLowerCase()}.${this.AppName.toLowerCase()}`;
        this.BasePackagePath = this.BasePackageName.replace(searchRegExp, replaceWith);

        this.enumerationsNames = this.enumerations.map(enumeration=> enumeration.name);

        this.appPath = `${this.AppName.toLowerCase()}/src/main/java/${this.BasePackagePath}`;
        this.resourcesPath = `${this.AppName.toLowerCase()}/src/main/resources`;
    }

    initializing(){
        this.modelFile = JSON.parse(this.fs.read(this.destinationPath(this.options.model)));

        this.entities = this.modelFile.entities;
        this.enumerations = this.modelFile.enumerations;
        this.relationships = this.modelFile.relationships;

    }

    writing(){
        this.fs.copyTpl(
            this.templatePath("config/SwaggerConfig.java"),
            this.destinationPath(`${this.appPath}/config/SwaggerConfig.java`),
            {BasePackageName: this.BasePackageName}
        );

        this.fs.copyTpl(
            this.templatePath("controller/UserController.java"),
            this.destinationPath(`${this.appPath}/controller/UserController.java`),
            {BasePackageName: this.BasePackageName}
        );
        
        this.fs.copyTpl(
            this.templatePath("controller/AuthController.java"),
            this.destinationPath(`${this.appPath}/controller/AuthController.java`),
            {BasePackageName: this.BasePackageName}
        );
        
        this.fs.copyTpl(
            this.templatePath("enumeration/UserRole.java"),
            this.destinationPath(`${this.appPath}/enumeration/UserRole.java`),
            {BasePackageName: this.BasePackageName}
        );

        this.fs.copyTpl(
            this.templatePath("exceptions/BadInput.java"),
            this.destinationPath(`${this.appPath}/exceptions/BadInput.java`),
            {BasePackageName: this.BasePackageName}
        );
        this.fs.copyTpl(
            this.templatePath("exceptions/NotFoundException.java"),
            this.destinationPath(`${this.appPath}/exceptions/NotFoundException.java`),
            {BasePackageName: this.BasePackageName}
        );

        this.fs.copyTpl(
            this.templatePath("mapper/BasicMapper.java"),
            this.destinationPath(`${this.appPath}/mapper/BasicMapper.java`),
            {BasePackageName: this.BasePackageName}
        );

        this.fs.copyTpl(
            this.templatePath("mapper/UserMapper.java"),
            this.destinationPath(`${this.appPath}/mapper/UserMapper.java`),
            {BasePackageName: this.BasePackageName}
        );

        this.fs.copyTpl(
            this.templatePath("model/User.java"),
            this.destinationPath(`${this.appPath}/model/User.java`),
            {BasePackageName: this.BasePackageName}
        );

        this.fs.copyTpl(
            this.templatePath("model/dto/UserDTO.java"),
            this.destinationPath(`${this.appPath}/model/dto/UserDTO.java`),
            {BasePackageName: this.BasePackageName}
        );

        this.fs.copyTpl(
            this.templatePath("model/dto/Ack.java"),
            this.destinationPath(`${this.appPath}/model/dto/Ack.java`),
            {BasePackageName: this.BasePackageName}
        );

        this.fs.copyTpl(
            this.templatePath("model/dto/Token.java"),
            this.destinationPath(`${this.appPath}/model/dto/Token.java`),
            {BasePackageName: this.BasePackageName}
        );

        this.fs.copyTpl(
            this.templatePath("model/dto/UserDTO.java"),
            this.destinationPath(`${this.appPath}/model/dto/UserDTO.java`),
            {BasePackageName: this.BasePackageName}
        );

        this.fs.copyTpl(
            this.templatePath("model/dto/UserPass.java"),
            this.destinationPath(`${this.appPath}/model/dto/UserPass.java`),
            {BasePackageName: this.BasePackageName}
        );

        this.fs.copyTpl(
            this.templatePath("repository/UserRepository.java"),
            this.destinationPath(`${this.appPath}/repository/UserRepository.java`),
            {BasePackageName: this.BasePackageName}
        );

        this.fs.copyTpl(
            this.templatePath("service/UserService.java"),
            this.destinationPath(`${this.appPath}/service/UserService.java`),
            {BasePackageName: this.BasePackageName}
        );

        this.fs.copyTpl(
            this.templatePath("service/AuthService.java"),
            this.destinationPath(`${this.appPath}/service/AuthService.java`),
            {BasePackageName: this.BasePackageName}
        );

        this.fs.copyTpl(
            this.templatePath("security/JwtAuthenticationFilter.java"),
            this.destinationPath(`${this.appPath}/security/JwtAuthenticationFilter.java`),
            {BasePackageName: this.BasePackageName}
        );

        this.fs.copyTpl(
            this.templatePath("security/JwtAuthorizationFilter.java"),
            this.destinationPath(`${this.appPath}/security/JwtAuthorizationFilter.java`),
            {BasePackageName: this.BasePackageName}
        );

        this.fs.copyTpl(
            this.templatePath("security/JwtProperties.java"),
            this.destinationPath(`${this.appPath}/security/JwtProperties.java`),
            {BasePackageName: this.BasePackageName, AppName: this.AppName}
        );

        this.fs.copyTpl(
            this.templatePath("security/SecurityConfiguration.java"),
            this.destinationPath(`${this.appPath}/security/SecurityConfiguration.java`),
            {BasePackageName: this.BasePackageName}
        );

        this.fs.copyTpl(
            this.templatePath("security/TokenUser.java"),
            this.destinationPath(`${this.appPath}/security/TokenUser.java`),
            {BasePackageName: this.BasePackageName}
        );

        this.fs.copyTpl(
            this.templatePath("security/UserPrincipal.java"),
            this.destinationPath(`${this.appPath}/security/UserPrincipal.java`),
            {BasePackageName: this.BasePackageName}
        );

        this.fs.copyTpl(
            this.templatePath("security/UserPrincipalDetailsService.java"),
            this.destinationPath(`${this.appPath}/security/UserPrincipalDetailsService.java`),
            {BasePackageName: this.BasePackageName}
        );

        this.fs.copyTpl(
            this.templatePath("Application.java"),
            this.destinationPath(`${this.appPath}/Application.java`),
            {BasePackageName: this.BasePackageName}
        );


        this.fs.copyTpl(
            this.templatePath("build.gradle"),
            this.destinationPath(`${this.AppName}/build.gradle`),
            {GroupeName: this.GroupeName}
        );

        this.fs.copyTpl(
            this.templatePath("settings.gradle"),
            this.destinationPath(`${this.AppName}/settings.gradle`),
            {AppName: this.AppName}
        );

        this.fs.copyTpl(
            this.templatePath("gradlew"),
            this.destinationPath(`${this.AppName}/gradlew`)
        );

        this.fs.copyTpl(
            this.templatePath("gradlew.bat"),
            this.destinationPath(`${this.AppName}/gradlew.bat`)
        );

        this.fs.copyTpl(
            this.templatePath("gradlew.bat"),
            this.destinationPath(`${this.AppName}/gradlew.bat`)
        );

        this.fs.copyTpl(
            this.templatePath("gradle/wrapper/gradle-wrapper.jar"),
            this.destinationPath(`${this.AppName}/gradle/wrapper/gradle-wrapper.jar`)
        );

        this.fs.copyTpl(
            this.templatePath("gradle/wrapper/gradle-wrapper.properties"),
            this.destinationPath(`${this.AppName}/gradle/wrapper/gradle-wrapper.properties`)
        );

        this.fs.copyTpl(
            this.templatePath("gradle/wrapper/gradle-wrapper.properties"),
            this.destinationPath(`${this.AppName}/gradle/wrapper/gradle-wrapper.properties`)
        );

        this.fs.copyTpl(
            this.templatePath("resources/application-local.properties"),
            this.destinationPath(`${this.resourcesPath}/application-local.properties`),
            {AppName: this.AppName}
        );

        this.fs.copyTpl(
            this.templatePath("resources/application-prod.properties"),
            this.destinationPath(`${this.resourcesPath}/application-prod.properties`),
            {AppName: this.AppName}
        );

        this.fs.copyTpl(
            this.templatePath("resources/application.properties"),
            this.destinationPath(`${this.resourcesPath}/application.properties`),
            {AppName: this.AppName}
        );

        this.fs.copyTpl(
            this.templatePath("resources/db/changelog/db.changelog-master.xml"),
            this.destinationPath(`${this.resourcesPath}/db/changelog/db.changelog-master.xml`),
        );

        this.fs.copyTpl(
            this.templatePath("resources/db/changelog/init.sql"),
            this.destinationPath(`${this.resourcesPath}/db/changelog/init.sql`),
            {entities: this.entities, relationships: this.relationships}
        );

        this.fs.copyTpl(
            this.templatePath("resources/db/changelog/init-data.sql"),
            this.destinationPath(`${this.resourcesPath}/db/changelog/init-data.sql`),
            {AppName: this.AppName}
        );


















        this.enumerations.forEach(enumeration => {
            this.fs.copyTpl(
                this.templatePath("enumeration/Enumeration.java"),
                this.destinationPath(`${this.appPath}/enumeration/${enumeration.name}.java`),
                {BasePackageName: this.BasePackageName, enumeration: enumeration}
            );
        });

        this.entities.forEach(entity => {
            this.fs.copyTpl(
                this.templatePath("service/Service.java"),
                this.destinationPath(`${this.appPath}/service/${entity.name}Service.java`),
                {BasePackageName: this.BasePackageName, EntityName: entity.name}
            );
    
            this.fs.copyTpl(
                this.templatePath("controller/Controller.java"),
                this.destinationPath(`${this.appPath}/controller/${entity.name}Controller.java`),
                {BasePackageName: this.BasePackageName, EntityName: entity.name}
            );
    
            this.fs.copyTpl(
                this.templatePath("mapper/Mapper.java"),
                this.destinationPath(`${this.appPath}/mapper/${entity.name}Mapper.java`),
                {BasePackageName: this.BasePackageName, EntityName: entity.name}
            );
    
            this.fs.copyTpl(
                this.templatePath("model/Model.java"),
                this.destinationPath(`${this.appPath}/model/${entity.name}.java`),
                {BasePackageName: this.BasePackageName, entity: entity, enumerations: this.enumerationsNames, relationships: this.relationships}
            );
    
            this.fs.copyTpl(
                this.templatePath("model/dto/ModelDTO.java"),
                this.destinationPath(`${this.appPath}/model/dto/${entity.name}DTO.java`),
                {BasePackageName: this.BasePackageName, entity: entity, enumerations: this.enumerationsNames, relationships: this.relationships}
            );
    
            this.fs.copyTpl(
                this.templatePath("repository/Repository.java"),
                this.destinationPath(`${this.appPath}/repository/${entity.name}Repository.java`),
                {BasePackageName: this.BasePackageName, EntityName: entity.name}
            );
        });

    }



}
