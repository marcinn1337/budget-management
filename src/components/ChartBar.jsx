export default function ChartBar(props) {
	const barSizeStyle = {
		[props.dimensionAttribute]: `${props.barDimensionValue}%`,
	}
	const showSpentAmount = () => {
		props.onHoverEvent(props.spentAmount)
	}
	return (
		<div className='overview__chart-category'>
			<i className={`overview__chart-category-icon fa-solid ${props.icon}`}></i>
			<div className='overview__chart-category-wrapper'>
				<div
					onMouseEnter={showSpentAmount}
					onMouseLeave={showSpentAmount}
					style={barSizeStyle}
					className='overview__chart-category-bar'></div>
			</div>
		</div>
	)
}
