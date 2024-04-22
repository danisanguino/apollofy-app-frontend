/* global functions */

// export async function getUsers(getToken: any) {
//   const token = await getToken();
//   const data = await fetch("http://localhost:4000/user", {
//     headers: {
//       authorization: `Bearer ${token}`,
//     },
//   });
//   const JSONdata = await data.json();
//   return JSONdata;
// }

export async function getUsers() {
  const data = await fetch("http://localhost:3000/user");
  const JSONdata = await data.json();
  return JSONdata;
}

export async function getTracks(getToken: any) {
  console.log(` Hola qué es esto ${typeof getToken}`);
  const token = await getToken();
  console.log(token);
  const data = await fetch("http://localhost:4000/track", {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const JSONdata = await data.json();
  console.log(JSONdata);
  return JSONdata;
}

export async function getArtist(getToken: any) {
  const token = await getToken();
  const data = await fetch("http://localhost:4000/artist", {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const JSONdata = await data.json();
  return JSONdata;
}

export function formatTime(time: number) {
  if (!time) {
    return "0:00";
  } else {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");

    return `${min}:${sec}`;
  }
}
