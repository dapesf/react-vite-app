import { isUndefOrStrEmpty } from "./common";

const validation: Record<string, (prop: any, value: any) => boolean | Promise<boolean>> =
{
    isNumeric:
        async function (prop: any, value: any) {
            //await sleep(200);
            if (isNaN(value))
                return false;

            return true;
        }
    , isNull:
        async function (prop: any, value: any) {
            //await sleep(200);
            if (isUndefOrStrEmpty(value))
                return false;

            return true;
        }
    , maxLength:
        async function (prop: any, value: any) {
            //await sleep(200);
            if (isUndefOrStrEmpty(value))
                return true;

            if (value.length > prop)
                return false;

            return true;
        }
    , isMail:
        async function (prop: any, value: any) {
            //await sleep(200);
            if (isUndefOrStrEmpty(value))
                return true;

            const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

            if (!emailPattern.test(value))
                return false;

            return true;
        }
}

const sleep = (ms: any) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}
export { validation };