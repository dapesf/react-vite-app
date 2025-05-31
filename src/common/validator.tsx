import { isUndefOrStrEmpty } from "./common";
import { validation } from "./validation"
import type {
    ComponentMethod
    , ValidationContext
    , Context
    , TaskResult
} from '../interface/IValidate'

class Validator {
    prepare: Record<string, ValidationContext> = {};
    isValid: boolean = true;
    msgErrors: string[] = [];

    constructor(context: Context) {
        if (typeof context !== 'object' || context === null) return;

        for (const [keys, component] of Object.entries(context)) {
            if (!component)
                continue;

            const property = keys;
            const methods: ComponentMethod = {};
            const entries = Object.entries(component.methods as Record<string, ComponentMethod>);

            for (const [key, method] of entries) {
                methods[key] = this.HandlePrepareMethod(key, method);
            }

            this.prepare[property] = {
                name: component["name"],
                element: component["element"],
                methods,
                messages: component["messages"]
            };
        }

        return this;
    }

    FilterElement(filter: string) {
        if (
            isUndefOrStrEmpty(filter) ||
            typeof filter !== "string" ||
            isUndefOrStrEmpty(this.prepare[filter]) ||
            typeof this.prepare[filter] !== "object"
        ) {
            return this;
        }

        const element = this.prepare[filter].element;
        if (element) {
            const bubble = element.parentElement?.getElementsByClassName("bubble")[0] as HTMLElement;
            if (bubble) {
                bubble.innerText = '';
                bubble.style.display = "none";
            }
            element.classList.remove("has-error");
        }

        delete this.prepare[filter];

        return this;
    }

    FilterMethod() {
        return this;
    }

    HandlePrepareMethod(key: string, method: any): any {
        let methods: any = {};

        switch (typeof method) {
            case 'boolean':
            case 'number':
                methods = validation[key];
                Object.defineProperty(methods, "prop", {
                    value: method
                });
                break;
            case 'function':
                methods = method;
                break;
            default:
                break;
        }

        return methods;
    }

    CreateTask(taskId: string, val: any, method: any) {
        return async (): Promise<TaskResult> => {
            if (typeof method !== "function") {
                return { taskId, value: true };
            }

            const prop = isUndefOrStrEmpty(method.prop) ? null : method.prop;

            const result = await Promise.resolve(method(prop, val));
            return { taskId, value: result };
        };
    }

    CreateMessage(name: string, msg: string): string {
        const finalName = isUndefOrStrEmpty(name) ? "" : name;
        const finalMsg = isUndefOrStrEmpty(msg) ? "" : msg;

        const message = `${finalName} : ${finalMsg}`;
        this.msgErrors.push(message);
        return message;
    }

    ResetMessage() {
        this.msgErrors = [];
    }

    ResetElements() {
        this.isValid = true;

        for (const [, props] of Object.entries(this.prepare)) {
            const element = props.element;
            if (!element) continue;

            const bubble = element.parentElement?.getElementsByClassName("bubble")[0] as HTMLElement;
            if (bubble) {
                bubble.innerText = '';
                bubble.style.display = "none";
            }
            element.classList.remove("has-error");
        }
    }

    ValidAction(context: ValidationContext & { methods: TaskResult[] }) {

        if (!context || !context.element || !context.messages) return;

        const bubble = context.element.parentElement?.getElementsByClassName("bubble")[0] as HTMLElement;

        if (bubble) {
            bubble.innerText = '';
            bubble.style.display = "none";
        }

        context.element?.classList.remove("has-error");

        for (const val of context.methods) {
            if (!val.value) {
                context.element.classList.add("has-error");

                const msg = this.CreateMessage(context.name, context.messages[val.taskId]);

                if (bubble) {
                    bubble.innerText = msg;
                    bubble.style.display = "contents";
                }

                this.isValid = false;
            }
        }
    }

    async Excute(): Promise<boolean> {
        this.ResetMessage();
        this.ResetElements();

        if (!this.prepare) return Promise.reject();

        const context: Record<string, ValidationContext> = { ...this.prepare };

        for (const [prop, component] of Object.entries(context)) {
            if (!component.element || !component.methods) continue;

            let val = component.element.value ?? null;

            const tasks: (() => Promise<TaskResult>)[] = [];

            for (const [id, method] of Object.entries(component.methods)) {
                tasks.push(this.CreateTask(id, val, method));
            }

            try {
                const res = await Promise.all(tasks.map(task => task()));
                context[prop].methods = res;
                this.ValidAction(context[prop] as ValidationContext & { methods: TaskResult[] });
            } catch (error) {
                console.error("Có lỗi xảy ra:", error);
            }
        }

        return this.isValid;
    }
}

export { Validator };
