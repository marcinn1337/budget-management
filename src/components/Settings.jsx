import {Link} from 'react-router-dom'

export default function Settings(props) {
	return (
		<section className='settings'>
			<button onClick={props.openTransferCreatorFunction} className='icon-btn'>
				<i className='fa-solid fa-right-left'></i>
				<i className='fa-solid fa-plus additional-icon'></i>
			</button>
			<button onClick={props.openGoalCreatorFunction} className='icon-btn'>
				<i className='fa-solid fa-piggy-bank'></i>
				<i className='fa-solid fa-plus additional-icon'></i>
			</button>
			<Link to='/transfers' className='text-btn show-transfers-btn'>Show All Transfers</Link>
		</section>
	)
}
