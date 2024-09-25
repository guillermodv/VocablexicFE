"use client";
import { useEffect, useState } from "react";

const TopUsers = () => {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(false);

  const getTopUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:3001/top');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTopUsers();
  }, []);

  return (
    <div className="min-h-screen bg-[#d0e7e9] p-4"> {/* Fondo celeste */}
      <header className="bg-[#b0d4d9] shadow-md py-4"> {/* Color del header más celeste */}
        <h1 className="text-5xl font-bold text-center text-black">Top Users</h1> {/* Texto grande y centrado */}
      </header>
      <main className="flex flex-col items-center justify-center min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {loading && <h1 className="col-span-full text-center text-black">Loading data...</h1>}
          {users?.map((user, index) => (
            <div key={index} className="bg-white rounded-full shadow-md p-6 text-center">
              <h2 className="text-2xl font-semibold mb-2 text-black">Rank {index + 1}</h2>
              <p className="text-gray-700 mb-2">User: {user.user.email}</p>
              <p className="text-gray-500">Score: {user.measurement}</p>
            </div>
          ))}
        </div>
        {/* Botón para volver atrás */}
        <button
          onClick={() => window.history.back()}
          className="mt-8 text-blue-500 underline"
        >
          Go Back
        </button>
      </main>
    </div>
  );
};

export default TopUsers;
