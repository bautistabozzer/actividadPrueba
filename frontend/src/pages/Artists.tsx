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
        <div className="artists-page">
            <h2>Artistas</h2>
            {error && <p className="error">{error}</p>}
            {loading ? (
                <p>Cargando artistas...</p>
            ) : (
                <>
                    <form onSubmit={handleAddArtist} className="artist-form">
                        <h3>Agregar Nuevo Artista</h3>
                        <div>
                            <label>Nombre:</label>
                            <input
                                type="text"
                                name="name"
                                value={newArtist.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Género:</label>
                            <input
                                type="text"
                                name="genre"
                                value={newArtist.genre}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Año de Debut:</label>
                            <input
                                type="number"
                                name="debut_year"
                                value={newArtist.debut_year}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>País:</label>
                            <input
                                type="text"
                                name="country"
                                value={newArtist.country}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Activo:</label>
                            <input
                                type="checkbox"
                                name="active"
                                checked={newArtist.active}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Álbumes:</label>
                            <input
                                type="number"
                                name="albums"
                                value={newArtist.albums}
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit">Agregar Artista</button>
                    </form>

                    <table className="artists-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Género</th>
                                <th>Año de Debut</th>
                                <th>País</th>
                                <th>Activo</th>
                                <th>Álbumes</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {artists.map((artist) => (
                                <tr key={artist.id}>
                                    <td>{artist.id}</td>
                                    <td>
                                        <input
                                            type="text"
                                            value={artist.name}
                                            onChange={(e) =>
                                                handleUpdateArtist(artist.id, 'name', e.target.value)
                                            }
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            value={artist.genre}
                                            onChange={(e) =>
                                                handleUpdateArtist(artist.id, 'genre', e.target.value)
                                            }
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            value={artist.debut_year}
                                            onChange={(e) =>
                                                handleUpdateArtist(artist.id, 'debut_year', Number(e.target.value))
                                            }
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            value={artist.country}
                                            onChange={(e) =>
                                                handleUpdateArtist(artist.id, 'country', e.target.value)
                                            }
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={artist.active}
                                            onChange={(e) =>
                                                handleUpdateArtist(artist.id, 'active', e.target.checked)
                                            }
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            value={artist.albums}
                                            onChange={(e) =>
                                                handleUpdateArtist(artist.id, 'albums', Number(e.target.value))
                                            }
                                        />
                                    </td>
                                    <td>
                                        <button onClick={() => handleDeleteArtist(artist.id)}>
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
