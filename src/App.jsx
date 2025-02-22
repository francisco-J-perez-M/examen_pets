import React, { useEffect, useState } from 'react';
import './App.css'; // Importa el archivo CSS

const PetsTable = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda

  useEffect(() => {
    // Función para obtener los datos de la API
    const fetchPets = async () => {
      try {
        const response = await fetch('https://tu-proxy-cors-anywhere.com/http://3.135.195.213:5000/pets');
        if (!response.ok) {
          throw new Error('Error al obtener los datos: ' + response.statusText);
        }
        const data = await response.json();
        setPets(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);  // Solo se ejecuta una vez, al cargar el componente

  // Filtrar las mascotas según el término de búsqueda
  const filteredPets = pets.filter(pet =>
    pet.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="loading">Cargando...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="table-container">
      <h1>Lista de Mascotas</h1>
      {/* Barra de búsqueda */}
      <input
        type="text"
        placeholder="Buscar por nombre..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />
      {filteredPets.length === 0 ? (
        <div className="no-results">No se encontraron resultados</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Raza</th>
              <th>Edad</th>
            </tr>
          </thead>
          <tbody>
            {filteredPets.map((pet) => (
              <tr key={pet.id}>
                <td>{pet.id}</td>
                <td>{pet.nombre}</td>
                <td>{pet.raza}</td>
                <td>{pet.edad}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PetsTable;
