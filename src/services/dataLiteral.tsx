import { httpGet } from "./httpClient";

async function OriginService() {
    var uri = "ODataService/ma_literal?$filter=cd_type eq '002'"
    return httpGet(uri);
}

async function UnitService() {
    var uri = "ODataService/ma_literal?$filter=cd_type eq '001'"
    return httpGet(uri);
}

export { OriginService, UnitService }