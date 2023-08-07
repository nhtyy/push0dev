import Registry from "../../posts/registry.json";

export type PostRegistry = {
  [slug: string]: string;
};

export function posts(): PostRegistry {
  return Registry;
}
