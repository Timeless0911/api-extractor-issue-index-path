import type { KebabCase } from "type-fest";

export function kebabCase<T extends string>(str: T): KebabCase<T> {
  return str as KebabCase<T>;
}
