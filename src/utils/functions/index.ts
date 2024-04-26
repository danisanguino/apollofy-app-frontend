/* global functions */

const URL = import.meta.env.VITE_AUTH0_AUDIENCE;

export async function getUsers(getToken: any) {
  if (typeof getToken === "function") {
    const token = await getToken();

    const data = await fetch(URL + "/user", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const JSONdata = await data.json();
    return JSONdata;
  }
}

export async function createUser(getToken: any, info: any) {
  if (typeof getToken === "function") {
    const token = await getToken();

    const data = await fetch(URL + "/user", {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    });
    const dataJSON = await data.json();
    return dataJSON.data;
  }
}

export async function updateFavorites(getToken: any, info: any, id: string) {
  if (typeof getToken === "function") {
    const token = await getToken();

    const data = await fetch(URL + `/user/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        myFavorites: info,
      }),
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const dataJSON = await data.json();
    return dataJSON.data;
  }
}

export async function getTracks(getToken: any) {
  if (typeof getToken === "function") {
    const token = await getToken();

    const data = await fetch(URL + "/track", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const JSONdata = await data.json();
    return JSONdata;
  }
}

export async function getArtist(getToken: any) {
  if (typeof getToken === "function") {
    const token = await getToken();

    const data = await fetch(URL + "/artist", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const JSONdata = await data.json();
    return JSONdata;
  }
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
