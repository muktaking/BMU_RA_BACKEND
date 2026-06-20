// //a very interesting small func to manage async-await error handling

// export function to(promise) {
//   return promise
//     .then((data) => {
//       return [null, data];
//     })
//     .catch((err) => [err]);
// }

export function to<T, E = Error>(
  promise: Promise<T>,
): Promise<[E, undefined] | [null, T]> {
  return promise
    .then((data: T): [null, T] => [null, data])
    .catch((err: E): [E, undefined] => [err, undefined]);
}
