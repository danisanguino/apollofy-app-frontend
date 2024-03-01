/* global functions */

export async function getUsers() {
  const data = await fetch('http://localhost:3000/user');
  const JSONdata = await data.json();
  return JSONdata;
}
