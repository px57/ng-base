/**
 * @description: Il s'agit ici de permettre des gestions externe des templates. 
 * @descrition: Ont peut indiquer precisement 
 */

import { compileNgModule } from "@angular/compiler";
import { os } from "../classes/os";

interface TemplateConfig {
    src: string;
    components: {
      [componentName: string]: {
        css?: boolean;
        html?: boolean;
      };
    };
};

interface ComponentTemplateDirIndex {
    [componentName: string]: number;
}

class TemplateManager {
    /**
     * @description: 
     */
    public templateDir: Array<TemplateConfig> = [];

    /**
     * @description: The index of templateDir of the componnent
     */
    public componentTemplateDirIndex:ComponentTemplateDirIndex =  {};

    constructor() {
    }

    /**
     * @description:
     * @example:  
        >>>>
        TEMPLATE_MANAGER.setTemplateDir({
            'src': './src/template/profile',
            'components': {
                'app-forgot-password': {
                  css: true,
                  html: true,
                } 
            }
        })
        <<<<
     */
    public setTemplatteDir(config: TemplateConfig): void {
        this.templateDir.push(config);
        let indexTemplateDir = this.templateDir.length;
        for (let components_name of Object.keys(config.components)) {
            this.componentTemplateDirIndex[components_name] = indexTemplateDir; 
        }
    }

    /**
     * @description: 
     */
    private getTemplateConfig(componentName: string): TemplateConfig {
        const indexTemplateDir = this.componentTemplateDirIndex[componentName];
        return this.templateDir[indexTemplateDir];
    }

    /**
     * @description:
     */
    private getComponentConfig(componentName: string) {
        const templateConfig = this.getTemplateConfig(componentName);
        return templateConfig.components[componentName];
    }

    /**
     * @description: 
     */
    public getHtmlSrc(componentName: string, file_path: string): string {
        const templateConfig = this.getTemplateConfig(componentName);
        const componentConfig = this.getComponentConfig(componentName);
        console.log(componentConfig);
        if (componentConfig.html === undefined) {
            return file_path;
        }
        return os.path.join(templateConfig.src, file_path);
    }

    /**
     * @description: 
     */
    public getCssSrc(componentName: string, file_path: string): string {
        const templateConfig = this.getTemplateConfig(componentName);
        const componentConfig = this.getComponentConfig(componentName);
        if (componentConfig.css === undefined) {
            return file_path;
        }
        return os.path.join(templateConfig.src, file_path);
    }
}

export const TEMPLACE_MANAGER = new TemplateManager();