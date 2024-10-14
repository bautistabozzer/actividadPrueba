// backend/src/utils/incomeProcessor.ts
import fs from 'fs';
import path from 'path';
import csvParser from 'csv-parser';
import ExcelJS from 'exceljs';

interface NuevosNombres {
    [key: string]: string;
}

interface ArtistTypeParams {
    ajusteUsd: number;
    multiplicador: number;
    porcentajeColaborador?: number;
}

interface RowData {
    [key: string]: any;
}

export function generarNombreArchivoDestino(archivoOriginal: string, formato: 'csv' | 'xlsx'): string {
    const directorio = path.dirname(archivoOriginal);
    const nombreArchivo = path.basename(archivoOriginal, path.extname(archivoOriginal));
    let version = 1;
    let archivoDestino = path.join(directorio, `${nombreArchivo}_v${version}.${formato}`);

    while (fs.existsSync(archivoDestino)) {
        version++;
        archivoDestino = path.join(directorio, `${nombreArchivo}_v${version}.${formato}`);
    }

    return archivoDestino;
}

export async function leerCSV(archivoOriginal: string): Promise<RowData[]> {
    return new Promise((resolve, reject) => {
        const resultados: RowData[] = [];
        fs.createReadStream(archivoOriginal)
            .pipe(csvParser())
            .on('data', (data) => resultados.push(data))
            .on('end', () => {
                resolve(resultados);
            })
            .on('error', (error) => {
                reject(error);
            });
    });
}

export function aplicarTransformaciones(
    data: RowData[],
    ajusteUsd: number,
    multiplicador: number,
    porcentajeColaborador?: number
): RowData[] {
    const columnasDeseadasNombres = [
        "payee",
        "service-name",
        "territory",
        "product-title",
        "isrc",
        "track-title",
        "units",
        "usd-net-price",
        "file-name",       // Nueva columna
        "period-end"       // Nueva columna
    ];

    // Verificar que todas las columnas deseadas existan
    const filasFaltantes = data.filter(row => 
        !columnasDeseadasNombres.every(col => row.hasOwnProperty(col))
    );

    if (filasFaltantes.length > 0) {
        throw new Error(`El archivo CSV no contiene todas las columnas requeridas.`);
    }

    return data.map(row => {
        if (row['territory'] === 'US') {
            row['usd-net-price'] = parseFloat(row['usd-net-price']) * ajusteUsd;
        }
        row['usd-net-price'] = parseFloat(row['usd-net-price']) * multiplicador;

        if (porcentajeColaborador !== undefined) {
            row['INGRESOS ARTISTA'] = parseFloat(row['usd-net-price']) * porcentajeColaborador;
        }

        return row;
    });
}

export async function guardarArchivo(
    data: RowData[],
    archivoOriginal: string,
    nuevosNombres: NuevosNombres,
    formato: 'csv' | 'xlsx'
): Promise<string> {
    const archivoDestino = generarNombreArchivoDestino(archivoOriginal, formato);

    if (formato === 'csv') {
        const headers = Object.keys(nuevosNombres);
        const writableStream = fs.createWriteStream(archivoDestino);
        writableStream.write(headers.join(',') + '\n');

        data.forEach(row => {
            const rowValues = headers.map(header => {
                const originalKey = Object.keys(nuevosNombres).find(key => nuevosNombres[key] === header) || header;
                return `"${row[originalKey]}"`;
            });
            writableStream.write(rowValues.join(',') + '\n');
        });

        writableStream.end();
    } else if (formato === 'xlsx') {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Detalle de Ingresos');

        const headers = Object.keys(nuevosNombres);
        worksheet.addRow(headers);

        data.forEach(row => {
            const rowValues = headers.map(header => {
                const originalKey = Object.keys(nuevosNombres).find(key => nuevosNombres[key] === header) || header;
                return row[originalKey];
            });
            worksheet.addRow(rowValues);
        });

        await workbook.xlsx.writeFile(archivoDestino);
    }

    return archivoDestino;
}

export async function procesarArchivo(
    archivoOriginal: string,
    nuevosNombres: NuevosNombres,
    params: ArtistTypeParams,
    formatoSalida: 'csv' | 'xlsx'
): Promise<string> {
    const data = await leerCSV(archivoOriginal);
    const dataTransformada = aplicarTransformaciones(data, params.ajusteUsd, params.multiplicador, params.porcentajeColaborador);
    const archivoProcesado = await guardarArchivo(dataTransformada, archivoOriginal, nuevosNombres, formatoSalida);
    return archivoProcesado;
}
