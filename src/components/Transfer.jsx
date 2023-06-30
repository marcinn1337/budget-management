export default function Transfer(props) {
	let transferIcon
    switch (props.category) {
        case 'Income':
            transferIcon = 'fa-chevron-up'
            break;
        case 'Groceries':
            transferIcon = 'fa-basket-shopping'
            break;
        case 'Bills':
            transferIcon = 'fa-file-invoice-dollar'
            break;
        case 'Self Development':
            transferIcon = 'fa-book'
            break;
        case 'Entertainment':
            transferIcon = 'fa-champagne-glasses'
            break;
        case 'Appereance':
            transferIcon = 'fa-shirt'
            break;
        case 'Car':
            transferIcon = 'fa-car'
            break;
        case 'Other':
            transferIcon = 'fa-infinity'
            break;
        default:
            transferIcon = 'fa-piggy-bank'
            break;
    }
	const deleteTransfer = () => {
		props.deleteTransfer(props.id, props.amount, props.category, transferIcon)
	}
	return (
		<li className={`transfer ${props.category}`}>
			<div className='transfer-icon'>
				<i className={`fa-solid ${transferIcon}`}></i>
			</div>
			<p className='transfer-description'>{props.description}</p>
			<p className='transfer-date'>{props.date}</p>
			<p className='transfer-amount'>{props.amount} PLN</p>
			<button className='transfer-delete-btn' onClick={deleteTransfer}>
				<i className='fa-solid fa-trash-can'></i>
			</button>
		</li>
	)
}
