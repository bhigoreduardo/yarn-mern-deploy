import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import dayjs from "dayjs";

const Dashboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const getAllUser = async () => {
    const response = await fetch(`${import.meta.env.VITE_CLIENT_SERVER_URL}/users/list`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'content-yype': 'application/json',
      },
    });

    const { users } = await response.json();
    setUsers(users);
  }

  const loggout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }

  useEffect(() => {
    getAllUser();
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (!users) return null;

  return (
    <section className="dashboard full-width full-height flex flex-col flex-center p-20">
      <div className="container flex flex-col gap-20 w-100">
        <div className="dashboard--header flex flex-row flex-between gap-20">
          <h2>Lista de usuários</h2>

          <button type="butotn" onClick={loggout}>Loggout</button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Data criação</th>
              <th>Última atualização</th>
            </tr>
          </thead>

          <tbody>
            {
              users.map((item) => (
                <tr key={item._id}>
                  <td>{item._id}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{dayjs(item.createdAt).format('ll')}</td>
                  <td>{dayjs(item.updatedAt).format('ll')}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </section>
  )
}
export default Dashboard;