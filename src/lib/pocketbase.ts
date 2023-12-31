import PocketBase from "pocketbase";

const url =
    process.env.NODE_ENV === "production"
        ? "https://serve-spotter.fly.dev"
        : "http://localhost:8090";

export const pb = new PocketBase(url);
