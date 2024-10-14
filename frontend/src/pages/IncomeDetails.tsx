// frontend/src/pages/IncomeDetails.tsx
import React, { useState } from 'react';
import axios from 'axios';

const IncomeDetails: React.FC = () => {
    const [archivo, setArchivo] = useState<File | null>(null);
    const [tipoArtista, setTipoArtista] = useState<number>(1);
    const [multiplicador, setMultiplicador] = useState<number>(1);
    const [porcentajeColaborador, setPorcentajeColaborador] = useState<number>(0);
    const [archivoProcesado, setArchivoProcesado] = useState<string | null>(null);
    const [mensaje, setMensaje] = useState<string>('');
    const [cargando, setCargando] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [formatoSalida, setFormatoSalida] = useState<'csv' | 'xlsx'>('xlsx');

    const handleArchivoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setArchivo(e.target.files[0]);
        }
    };

    const handleTipoArtistaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTipoArtista(Number(e.target.value));
        // Resetear multiplicador y porcentaje colaborador cuando cambia el tipo de artista
        setMultiplicador(1);
        setPorcentajeColaborador(0);
    };

    const handleFormatoSalidaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const formato = e.target.value as 'csv' | 'xlsx';
        setFormatoSalida(formato);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!archivo) {
            setError('Por favor, selecciona un archivo.');
            return;
        }

        setError('');
        setMensaje('');
        setCargando(true);
        setArchivoProcesado(null);

        const formData = new FormData();
        formData.append('archivo', archivo);
        formData.append('tipo_artista', tipoArtista.toString());

        if (tipoArtista === 3) {
            if (multiplicador <= 0 || porcentajeColaborador <= 0) {
                setError('Por favor, ingresa valores válidos para multiplicador y porcentaje colaborador.');
                setCargando(false);
                return;
            }
            formData.append('multiplicador', multiplicador.toString());
            formData.append('porcentaje_colaborador', porcentajeColaborador.toString());
        }

        try {
            const response = await axios.post('http://localhost:5000/api/income-details', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setMensaje(response.data.mensaje);
            setArchivoProcesado(response.data.archivoProcesado);
        } catch (err: any) {
            if (err.response && err.response.data && err.response.data.error) {
                setError(err.response.data.error);
            } else {
                setError('Error al procesar el archivo.');
            }
        } finally {
            setCargando(false);
        }
    };

    const handleDescargar = () => {
        if (archivoProcesado) {
            window.open(`http://localhost:5000/api/download/${archivoProcesado}`, '_blank');
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md mt-20"> {/* Añadido mt-20 para evitar solapamiento con el navbar fijo */}
            <h2 className="text-2xl font-semibold mb-4">Detalle de Ingresos</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {mensaje && <p className="text-green-500 mb-4">{mensaje}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-2">Selecciona el archivo CSV (hasta 50MB):</label>
                    <input
                        type="file"
                        accept=".csv"
                        onChange={handleArchivoChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Tipo de Artista:</label>
                    <select
                        value={tipoArtista}
                        onChange={handleTipoArtistaChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    >
                        <option value={1}>1 - Artista Principal</option>
                        <option value={2}>2 - Artista Principal PPD</option>
                        <option value={3}>3 - Colaborador Artista</option>
                        <option value={4}>4 - Artista Sólido</option>
                    </select>
                </div>

                {tipoArtista === 3 && (
                    <>
                        <div className="mb-4">
                            <label className="block mb-2">Multiplicador (%):</label>
                            <input
                                type="number"
                                value={multiplicador}
                                onChange={(e) => setMultiplicador(Number(e.target.value))}
                                min="0"
                                step="0.01"
                                required
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2">Porcentaje Colaborador (%):</label>
                            <input
                                type="number"
                                value={porcentajeColaborador}
                                onChange={(e) => setPorcentajeColaborador(Number(e.target.value))}
                                min="0"
                                step="0.01"
                                required
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                    </>
                )}

                <div className="mb-4">
                    <label className="block mb-2">Formato de Salida:</label>
                    <select
                        value={formatoSalida}
                        onChange={handleFormatoSalidaChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    >
                        <option value="xlsx">Excel (.xlsx)</option>
                        <option value="csv">CSV (.csv)</option>
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={cargando}
                    className="
                        w-full 
                        bg-blue-600 
                        text-white 
                        py-2 
                        rounded 
                        hover:bg-blue-700 
                        transition-colors 
                        cursor-pointer
                    "
                >
                    {cargando ? 'Procesando...' : 'Procesar Archivo'}
                </button>
            </form>

            {archivoProcesado && (
                <div className="mt-6 text-center">
                    <button
                        onClick={handleDescargar}
                        className="
                            px-4 
                            py-2 
                            bg-green-600 
                            text-white 
                            rounded 
                            hover:bg-green-700 
                            transition-colors 
                            cursor-pointer
                        "
                    >
                        Descargar Archivo Procesado
                    </button>
                </div>
            )}
        </div>
    );

};

export default IncomeDetails;
