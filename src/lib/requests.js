import { get } from "svelte/store";
import { backendUri } from "./store";

const backendBaseUrl = `${get(backendUri)}/notification`;

export async function getServers() {
  return await fetch(`${backendBaseUrl}/allServers`).then((res) => res.json());
}

export async function getAllObjectsForServer(server) {
  return await fetch(`${backendBaseUrl}/allObjects/${server}`).then((res) =>
    res.json()
  );
}
