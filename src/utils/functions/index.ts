/* global functions */

export async function getUsers(getToken: any) {
  if (typeof getToken === 'function') {
    const token = await getToken();
    console.log('🚀 ~ getUsers ~ token:', token);

    const data = await fetch('http://localhost:4000/user', {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const JSONdata = await data.json();
    return JSONdata;
  }
}

export async function createUser(getToken: any, info: any) {
  if (typeof getToken === 'function') {
    const token = await getToken();

    const data = await fetch('http://localhost:4000/user', {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(info),
    });
    const dataJSON = await data.json();
    return dataJSON.data;
  }
}

export async function updateFavorites(getToken: any, info: any, id: string) {
  if (typeof getToken === 'function') {
    const token = await getToken();

    const data = await fetch(`http://localhost:4000/user/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        myFavorites: info,
      }),
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    const dataJSON = await data.json();
    return dataJSON.data;
  }
}

export async function getTracks(getToken: any) {
  if (typeof getToken === 'function') {
    const token = await getToken();

    const data = await fetch('http://localhost:4000/track', {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const JSONdata = await data.json();
    return JSONdata;
  }
}

export async function getArtist(getToken: any) {
  if (typeof getToken === 'function') {
    const token = await getToken();

    const data = await fetch('http://localhost:4000/artist', {
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
    return '0:00';
  } else {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60)
      .toString()
      .padStart(2, '0');

    return `${min}:${sec}`;
  }
}
