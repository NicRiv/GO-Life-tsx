import React from 'react'

interface Props {
	pos: number
}

const Celda: React.FC<Props> = ({pos}) => {
	return (
		<div className='Celda'
			style={{background: pos === 1 ? 'skyblue' : undefined}}
		/>
	)
}

export default Celda