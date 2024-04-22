

/* global functions */

export async function getUsers() {
  const data = await fetch('http://localhost:3000/user');
  const JSONdata = await data.json();
  return JSONdata;
}

export async function getTracks() {
  const data = await fetch('http://localhost:3000/tracks');
  const JSONdata = await data.json();
  return JSONdata;
}

export async function getArtist() {
  const data = await fetch('http://localhost:3000/artists');
  const JSONdata = await data.json();
  return JSONdata;
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
