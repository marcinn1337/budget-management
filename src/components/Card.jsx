export default function Card(props) {
	let currency, amount,
		balance,
		totalBalance,
		savings = 0,
		sumOfIncomes = 0,
		sumOfExpenses = 0

	
	// All Savings Calculation
	props.goalTransfers.forEach(transfer => {
		savings += Number(transfer.amount)
	})
	//

	// Balance Calculation
	props.transfers.forEach(transfer => {
		if (transfer.category === 'Income') {
			sumOfIncomes += Number(transfer.amount)
		} else {
			sumOfExpenses += Number(transfer.amount)
		}
	})
	balance = sumOfIncomes - sumOfExpenses - savings
	//

	// Total Balance Calculation
	totalBalance = balance + savings
	//

	if (props.title === 'Balance') {
		amount = balance
	} else if (props.title === 'Savings') {
		amount = savings
	} else {
		amount = totalBalance
	}

	return (
		<div className={`card ${props.class}`}>
			<h2 className='card__title'>
				<i className='fa-solid fa-wallet card__title-icon'></i>
				{props.title}
			</h2>
			<p className='card__amount'>{amount} PLN</p>
		</div>
	)
}
