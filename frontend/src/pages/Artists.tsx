// src/pages/Artists.tsx
import React, { useEffect, useState } from 'react';
import {
  fetchArtists,
  addArtist,
  updateArtist,
  deleteArtist,
  Artist,
} from '../services/artistService';

const Artists: React.FC = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [newArtist, setNewArtist] = useState<Omit<Artist, 'id' | 'created_at'>>({
    name: '',
    genre: '',
    debut_year: 0,
    country: '',
    active: true,
    albums: 0,
  });
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const loadArtists = async () => {
    try {
      setLoading(true);
      const data = await fetchArtists();
      setArtists(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Error desconocido al cargar los artistas');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArtists();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target;
    const name = target.name;
    let value: string | number | boolean;

    if (target instanceof HTMLInputElement && target.type === 'checkbox') {
      value = target.checked;
    } else if (target instanceof HTMLInputElement && target.type === 'number') {
      value = Number(target.value);
    } else {
      value = target.value;
    }

    setNewArtist({
      ...newArtist,
      [name]: value,
    });
  };

  const handleAddArtist = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addArtist(newArtist);
      setNewArtist({
        name: '',
        genre: '',
        debut_year: 0,
        country: '',
        active: true,
        albums: 0,
      });
      loadArtists();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Error desconocido al agregar el artista');
      }
    }
  };

  const handleUpdateArtist = async (
    id: number,
    field: keyof Omit<Artist, 'id' | 'created_at'>,
    value: string | number | boolean
  ) => {
    try {
      await updateArtist(id, { [field]: value });
      loadArtists();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Error desconocido al actualizar el artista');
      }
    }
  };

  const handleDeleteArtist = async (id: number) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este artista?')) {
      try {
        await deleteArtist(id);
        loadArtists();
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Error desconocido al eliminar el artista');
        }
      }
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-3xl font-bold text-center mb-6">Artistas</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {loading ? (
        <p className="text-center">Cargando artistas...</p>
      ) : (
        <>
          <form
            onSubmit={handleAddArtist}
            className="max-w-2xl mx-auto mb-8 p-6 border border-gray-300 rounded-lg bg-white shadow"
          >
            <h3 className="text-2xl font-semibold text-center mb-4">
              Agregar Nuevo Artista
            </h3>
            <div className="mb-4">
              <label className="block mb-2">Nombre:</label>
              <input
                type="text"
                name="name"
                value={newArtist.name}
                onChange={handleChange}
                required
                className="
                  w-full 
                  px-3 
                  py-2 
                  border 
                  border-gray-300 
                  rounded 
                  focus:outline-none 
                  focus:ring-2 
                  focus:ring-blue-500
                "
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Género:</label>
              <input
                type="text"
                name="genre"
                value={newArtist.genre}
                onChange={handleChange}
                className="
                  w-full 
                  px-3 
                  py-2 
                  border 
                  border-gray-300 
                  rounded 
                  focus:outline-none 
                  focus:ring-2 
                  focus:ring-blue-500
                "
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Año de Debut:</label>
              <input
                type="number"
                name="debut_year"
                value={newArtist.debut_year}
                onChange={handleChange}
                className="
                  w-full 
                  px-3 
                  py-2 
                  border 
                  border-gray-300 
                  rounded 
                  focus:outline-none 
                  focus:ring-2 
                  focus:ring-blue-500
                "
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">País:</label>
              <input
                type="text"
                name="country"
                value={newArtist.country}
                onChange={handleChange}
                className="
                  w-full 
                  px-3 
                  py-2 
                  border 
                  border-gray-300 
                  rounded 
                  focus:outline-none 
                  focus:ring-2 
                  focus:ring-blue-500
                "
              />
            </div>
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                name="active"
                checked={newArtist.active}
                onChange={handleChange}
                className="mr-2 transform scale-150"
              />
              <label>Activo</label>
            </div>
            <div className="mb-4">
              <label className="block mb-2">Álbumes:</label>
              <input
                type="number"
                name="albums"
                value={newArtist.albums}
                onChange={handleChange}
                className="
                  w-full 
                  px-3 
                  py-2 
                  border 
                  border-gray-300 
                  rounded 
                  focus:outline-none 
                  focus:ring-2 
                  focus:ring-blue-500
                "
              />
            </div>
            <button
              type="submit"
              className="
                w-full 
                py-2 
                bg-blue-600 
                text-white 
                rounded 
                cursor-pointer 
                hover:bg-blue-700 
                transition-colors
              "
            >
              Agregar Artista
            </button>
          </form>

          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2 bg-gray-100">ID</th>
                <th className="border border-gray-300 px-4 py-2 bg-gray-100">Nombre</th>
                <th className="border border-gray-300 px-4 py-2 bg-gray-100">Género</th>
                <th className="border border-gray-300 px-4 py-2 bg-gray-100">Año de Debut</th>
                <th className="border border-gray-300 px-4 py-2 bg-gray-100">País</th>
                <th className="border border-gray-300 px-4 py-2 bg-gray-100">Activo</th>
                <th className="border border-gray-300 px-4 py-2 bg-gray-100">Álbumes</th>
                <th className="border border-gray-300 px-4 py-2 bg-gray-100">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {artists.map((artist) => (
                <tr key={artist.id}>
                  <td className="border border-gray-300 px-4 py-2">{artist.id}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="text"
                      value={artist.name}
                      onChange={(e) =>
                        handleUpdateArtist(artist.id, 'name', e.target.value)
                      }
                      className="
                        w-full 
                        px-2 
                        py-1 
                        border 
                        border-gray-300 
                        rounded 
                        focus:outline-none 
                        focus:ring-2 
                        focus:ring-blue-500
                      "
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="text"
                      value={artist.genre}
                      onChange={(e) =>
                        handleUpdateArtist(artist.id, 'genre', e.target.value)
                      }
                      className="
                        w-full 
                        px-2 
                        py-1 
                        border 
                        border-gray-300 
                        rounded 
                        focus:outline-none 
                        focus:ring-2 
                        focus:ring-blue-500
                      "
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="number"
                      value={artist.debut_year}
                      onChange={(e) =>
                        handleUpdateArtist(artist.id, 'debut_year', Number(e.target.value))
                      }
                      className="
                        w-full 
                        px-2 
                        py-1 
                        border 
                        border-gray-300 
                        rounded 
                        focus:outline-none 
                        focus:ring-2 
                        focus:ring-blue-500
                      "
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="text"
                      value={artist.country}
                      onChange={(e) =>
                        handleUpdateArtist(artist.id, 'country', e.target.value)
                      }
                      className="
                        w-full 
                        px-2 
                        py-1 
                        border 
                        border-gray-300 
                        rounded 
                        focus:outline-none 
                        focus:ring-2 
                        focus:ring-blue-500
                      "
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <input
                      type="checkbox"
                      checked={artist.active}
                      onChange={(e) =>
                        handleUpdateArtist(artist.id, 'active', e.target.checked)
                      }
                      className="transform scale-150"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="number"
                      value={artist.albums}
                      onChange={(e) =>
                        handleUpdateArtist(artist.id, 'albums', Number(e.target.value))
                      }
                      className="
                        w-full 
                        px-2 
                        py-1 
                        border 
                        border-gray-300 
                        rounded 
                        focus:outline-none 
                        focus:ring-2 
                        focus:ring-blue-500
                      "
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <button
                      onClick={() => handleDeleteArtist(artist.id)}
                      className="
                        px-3 
                        py-1 
                        bg-red-600 
                        text-white 
                        rounded 
                        hover:bg-red-700 
                        transition-colors 
                        cursor-pointer
                      "
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Artists;
