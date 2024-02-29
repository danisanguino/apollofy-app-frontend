import { useEffect } from 'react';

export interface IHomeProps {}

export function Home(props: IHomeProps) {
  const newData = {
    id: '2',
    first_name: 'Maria',
    last_name: 'Cidoncha',
    email: 'music@assemblerschool.com',
    profilePicture:
      'https://robohash.org/suntvoluptasnisi.png?size=50x50&set=set1',
    isLoggedin: false,
  };
  const modifiedData = {
    last_name: 'Torvisco',
  };
  useEffect(() => {
    async function api() {
      const data = await fetch('http://localhost:3000/albums');
      const JSONdata = await data.json();
      console.log('🚀 ~ api ~ JSONdata:', JSONdata);
    }
    api();
  }, []);

  function handleAddUser() {
    fetch('http://localhost:3000/user', {
      method: 'POST',
      body: JSON.stringify(newData),
    });
  }

  function handleModifyUser() {
    fetch('http://localhost:3000/user/2', {
      method: 'PATCH',
      body: JSON.stringify(modifiedData),
    });
  }

  function handleDeleteUser() {
    fetch('http://localhost:3000/user/2', {
      method: 'DELETE',
    });
  }
  return (
    <>
      <button onClick={handleAddUser}>New user</button>
      <button onClick={handleModifyUser}>Modify user</button>
      <button onClick={handleDeleteUser}>Delete user</button>
    </>
  );
}
