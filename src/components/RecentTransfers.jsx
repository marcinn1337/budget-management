import FirstTransfer from './FirstTransfer';
import Transfer from './Transfer'

export default function RecentTransfers(props) {
	const recentGoalTransfers = [
		props.goalTransfers[props.goalTransfers.length - 1],
		props.goalTransfers[props.goalTransfers.length - 2],
		props.goalTransfers[props.goalTransfers.length - 3],
		props.goalTransfers[props.goalTransfers.length - 4],
	]
	const recentTransfers = [
		props.transfers[props.transfers.length - 1],
		props.transfers[props.transfers.length - 2],
		props.transfers[props.transfers.length - 3],
		props.transfers[props.transfers.length - 4],
	]
	const recentTransfersComponents = recentTransfers.map((transfer, i) => 
    transfer && <Transfer key={transfer.id} id={transfer.id} category={transfer.category} description={transfer.description} date={transfer.date} amount={transfer.amount} deleteTransfer={props.deleteTransferFunction}/> 
    )
	const recentGoalTransfersComponents = recentGoalTransfers.map((transfer, i) => 
    transfer && <Transfer key={transfer.id} id={transfer.id} category={transfer.category} description={transfer.description} date={transfer.date} amount={transfer.amount} deleteTransfer={props.deleteTransferFunction}/> 
    )
	return (
		<section className='section recent-transfers'>
			<h2 className='section__title'>
				<i className='fa-solid fa-right-left section__title-icon'></i>Recent Transfers
			</h2>
			<ul className='recent-transfers__list'>
			{(props.transfers.length === 0 && props.goalTransfers.length === 0 ) && <FirstTransfer />}
			{recentTransfersComponents}
			</ul>
			<ul className='recent-transfers__list'>
			{recentGoalTransfersComponents}
			</ul>
		</section>
	)
}
