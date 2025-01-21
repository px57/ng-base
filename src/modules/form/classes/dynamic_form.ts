
import { ConfigInput } from "src/modules/form/types";

export class DynamicFormManager {
    /**
     * @description:  
     */
    public inputList: Array<ConfigInput>;

    constructor(
        inputList: Array<ConfigInput>,
    ) {
        this.inputList = inputList;
    }

    /**
     * @description:
     */
    public getInput(input_name: string): ConfigInput {
        for (let input of this.inputList) {
            if (input.name === input_name) {
                return input;
            }
        }
        throw new Error(`Input ${input_name} not found`);
    }

    /**
     * @description:
     */
    public placeholder(input_name: string): string {
        const input = this.getInput(input_name);
        if (input.placeholder === undefined) {
            throw new Error(`Placeholder of ${input_name} is undefined`);
        }
        return input.placeholder;
    }

    /**
     * @description:
     */
    public required(input_name: string): boolean {
        const input = this.getInput(input_name);
        if (input.required === undefined) {
            throw new Error(`Required of ${input_name} is undefined`);
        }
        return input.required;
    }

    /**
     * @description: 
     */
    public hasLabel(input_name: string): boolean {
        const input = this.getInput(input_name);
        return input.label !== undefined;
    }

    /**
     * @description:
     */
    public label(input_name: string): string {
        const input = this.getInput(input_name);
        if (input.label === undefined) {
            throw new Error(`Label of ${input_name} is undefined`);
        }
        return input.label;
    }
}