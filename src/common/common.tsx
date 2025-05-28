const Sleep = (ms: any) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const isUndefOrStrEmpty = (str: any) => {
    return (str === "" || str === undefined || str === null)
}

const DataBinding = (data: any, form: any) => {
    var elements = form.querySelectorAll("[data-prop]");
    elements.forEach((element: any) => {
        if (isUndefOrStrEmpty(element.dataset.prop))
            return true;

        switch (element.tagName) {
            case "INPUT":
                element.value = data[element.dataset.prop];
                break;
            default:
                element.innerText = data[element.dataset.prop];
                break;
        }
    });
}

const FormCollection = (form: any) => {
    let dataRtn: Record<string, any> = {};
    var elements = form.querySelectorAll("[data-prop]");

    elements.forEach((element: any) => {
        if (isUndefOrStrEmpty(element.dataset.prop))
            return true;

        const prop = element.getAttribute("data-prop");
        if (!prop || prop.trim() === "") return;

        switch (element.tagName) {
            case "INPUT":
            case "SELECT":
                dataRtn[prop] = element.value;
                break;
            default:
                dataRtn[prop] = element.textContent?.trim() ?? "";
                break;
        }
    });

    return dataRtn;
}

export { Sleep, DataBinding, FormCollection, isUndefOrStrEmpty }