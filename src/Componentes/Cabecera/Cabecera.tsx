import React from 'react'

// css
import './cabecera.css'

interface Props {
	iniciar: boolean
	iniciarBtn: () => void
	setTablero: React.Dispatch<React.SetStateAction<number[][]>>
	tableroVacio: () => number[][]
	generarSemilla: () => void
	velocidad: number
	setVelocidad: React.Dispatch<React.SetStateAction<number>>
}

const Cabecera: React.FC<Props> = ({iniciar, iniciarBtn, setTablero, tableroVacio, generarSemilla, velocidad, setVelocidad}) => {
	return (
		<div className='Cabecera'>
			<div className='logo'>
	            <div><p>GO-Life</p></div>
	        </div>
			<div className='controles'>
				<div className='btn-iniciar'>
					<div className='btn' onClick={() => iniciarBtn()}>
						{!iniciar ? 'Iniciar' : 'Parar'}
					</div>
				</div>
				<div className='btn' 
					onClick={() => setTablero(tableroVacio())}
					style={{zIndex: iniciar ? '-1' : undefined}}
				>
					Borrar
				</div>
				<div className='btn' 
					onClick={() => generarSemilla()}
					style={{zIndex: iniciar ? '-1' : undefined}}
				>
					Semilla
				</div>
				<div className='velocidad' 
					style={{zIndex: iniciar ? '-1' : undefined}}
				>
					<div className='velocidad-label'>
						<p>Velocidad</p>
					</div>
					<div className='velocidad-op'>
						<div onClick={() => setVelocidad(500)}
							style={{border: velocidad === 500 ? '1px solid skyblue' : '1px solid white' }}
						>
							<p>1</p>
						</div>
						<div onClick={() => setVelocidad(100)}
							style={{border: velocidad === 100 ? '1px solid skyblue' : '1px solid white' }}
						>
							<p>2</p>
						</div>
						<div onClick={() => setVelocidad(30)}
							style={{border: velocidad === 30 ? '1px solid skyblue' : '1px solid white' }}
						>
							<p>3</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Cabecera