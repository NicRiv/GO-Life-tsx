import React, {useState, useCallback, useRef} from 'react'
import produce from 'immer'

// componentes
import Cabecera from '../Cabecera/Cabecera'
import Celda from '../Celda/Celda'

// css
import './tablero.css'

// Evaluacion de celulas vecinas
const evaluacion: number[][] = [
	[-1,-1],[-1,0],[-1,1],	//	[x,x,x]		
	[0,-1],[0,1],			//	[x,o,x]	
	[1,-1],[1,0],[1,1]		//	[x,x,x]
]

const Tablero: React.FC = () => {
	const tamañoFil: number = 20
	const tamañoCol: number = 30

	// Asignacion de valores
	const tableroVacio: ()=>number[][] = () => {
		const filas: number[][] = []
		for (let i = 0; i < tamañoFil; i++) {
			filas.push(Array.from(Array(tamañoCol), () => 0))
		}
		return filas
	}

	// Crear tablero
	const [tablero, setTablero] = useState<number[][]>(() => {
		return tableroVacio()		
	}) 

	// Iniciar
	const [iniciar, setIniciar] = useState<boolean>(false)
	const iniciarRef = useRef<boolean>(iniciar)
	iniciarRef.current = iniciar

	// Velocidad
	const [velocidad, setVelocidad] = useState<number>(500)

	// Programa
	const iniciarPrograma: ()=>void = useCallback(() => {
		if (!iniciarRef.current) {
			return
		}
		setTablero(tabla => (
			produce(tabla, copia => {
				for (let i = 0; i < tamañoFil; i++) {
					for (let j = 0; j < tamañoCol; j++) {
						let vecinos = 0
						evaluacion.forEach(([x,y]) => {
							const newI = i + x
							const newJ = j + y
							if (newI >= 0 && newI < tamañoFil && newJ >= 0 && newJ < tamañoCol) {
								vecinos += tabla[newI][newJ]
							}
						})
						if (vecinos < 2 || vecinos > 3) {
							copia[i][j] = 0
						} else if (tabla[i][j] === 0 && vecinos === 3) {
							copia[i][j] = 1
						}
					}
				}
			})
		))
		setTimeout(iniciarPrograma, velocidad)
	}, [velocidad])

	//Boton Iniciar
	const iniciarBtn: ()=>void = () => {
		setIniciar(!iniciar)
		if (!iniciar) {
			iniciarRef.current = true
			iniciarPrograma()
		}
	}

	//Generar Semilla
	const generarSemilla: ()=>void = () => {
		const filas: number[][] = []
		for (let i = 0; i < tamañoFil; i++) {
			filas.push(Array.from(Array(tamañoCol), () => Math.random() > .8 ? 1 : 0))
		}
		setTablero(filas)
	}

	return (<div>
		<Cabecera iniciar={iniciar}
			iniciarBtn={iniciarBtn}
			setTablero={setTablero}
			tableroVacio={tableroVacio}
			generarSemilla={generarSemilla}
			velocidad={velocidad}
			setVelocidad={setVelocidad}
		/>
		<div className='Tablero'>
			<div className='Tablero-cont'
				style={{gridTemplateColumns: `repeat(${tamañoCol}, 20px)`}}
			>
				{tablero.map((filas, i) => (
					filas.map((columnas, j) => (
						<div key={`${i}-${j}`}
							onClick={() => {
								const newTablero = produce(tablero, copia => {
									copia[i][j] = copia[i][j] ? 0 : 1
								})
								setTablero(newTablero)
							}}
						>
							<Celda pos={tablero[i][j]}/>						
						</div>
					))
				))}
			</div>
		</div>
	</div>)
}

export default Tablero
