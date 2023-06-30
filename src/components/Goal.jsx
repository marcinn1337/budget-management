export default function Goal(props) {
	// Checking progress
	let precentProgress
	props.isInfinite
		? (precentProgress = 0)
		: (precentProgress = ((Number(props.paidAmount) / Number(props.amount)) * 100).toFixed(1))

	// Checking if savings are ready to withdraw
	let goalIsFinished
	if ((precentProgress >= 100 && !props.isInfinite) || (precentProgress >= 0 && props.isInfinite)) {
		goalIsFinished = true
	} else {
		goalIsFinished = false
	}

	// Setting theme color
	let themeColor
	switch (props.color) {
		case 'Green':
			themeColor = '#21a46d'
			break
		case 'Blue':
			themeColor = '#2181b9'
			break
		case 'Light Blue':
			themeColor = '#21a2b9'
			break
		case 'Red':
			themeColor = '#b4222e'
			break
		case 'Yellow':
			themeColor = '#b9aa21'
			break
		case 'Purple':
			themeColor = '#7c21b9'
			break
	}
	const borderStyle = {
		border: `1px solid ${themeColor}`,
	}
	const styles = {
		backgroundColor: themeColor,
		width: `${precentProgress}%`,
	}
	const showDeleteGoalAlert = () => {
		props.showDeleteGoalAlert(props.description)
	}

	const breakThePiggy = () => {
		props.showFinishingAlert(props.description)
	}

	return (
		<li className='goal'>
			<p className='goal__description'>{props.description}</p>
			<p className='goal__amount'>
				{Number(props.paidAmount)} /{' '}
				{props.isInfinite ? <i className='fa-solid fa-infinity'></i> : Number(props.amount)} PLN
			</p>
			<button onClick={goalIsFinished ? breakThePiggy : null} className='goal__finish-btn'>
				<i className={goalIsFinished ? `fa-solid fa-hammer active` : `fa-solid fa-hammer`}></i>
			</button>
			<div className='goal__progress' style={borderStyle}>
				<p className='goal__progress-text'>
					{props.isInfinite ? <i className='fa-solid fa-infinity'></i> : `${precentProgress}%`}
				</p>
				<div style={styles} className='goal__progress-bar'></div>
			</div>
			<button className='goal__delete-btn' onClick={showDeleteGoalAlert}>
				<i className='fa-solid fa-trash-can'></i>
			</button>
		</li>
	)
}
