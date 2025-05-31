import { httpGet } from "./httpClient"

export async function AnnounceServiceGetAnnounce() {
    return httpGet("Announce/GetAllAnnounces");
}