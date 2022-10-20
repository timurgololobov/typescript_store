export const APIlocal = {
  get: (key: string) => localStorage.getItem(key),
  set: (key: string, value: string) => localStorage.setItem(key, value),
};

export function dateToUnixStamp(date: Date) {
  return date.getTime() / 1000;
}

export function responseToJson(requestPromise) {
  return requestPromise
    .then((response) => {
      return response.text();
    })
    .then((response) => {
      return JSON.parse(response);
    });
}

export function searchPlace(
  checkInDate: Date,
  checkOutDate: Date,
  maxPrice?: number
) {
  let url =
    "http://localhost:3030/places?" +
    `checkInDate=${dateToUnixStamp(checkInDate)}&` +
    `checkOutDate=${dateToUnixStamp(checkOutDate)}&` +
    "coordinates=59.9386,30.3141";

  if (maxPrice != null) {
    url += `&maxPrice=${maxPrice}`;
  }

  return responseToJson(fetch(url));
}

export function bookPlace(
  placeId: number,
  checkInDate: Date,
  checkOutDate: Date
) {
  return responseToJson(
    fetch(
      `http://localhost:3030/places/${placeId}?` +
        `checkInDate=${dateToUnixStamp(checkInDate)}&` +
        `checkOutDate=${dateToUnixStamp(checkOutDate)}&`,
      { method: "PATCH" }
    )
  );
}
