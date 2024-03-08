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
