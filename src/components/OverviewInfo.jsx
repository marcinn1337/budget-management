
export default function OverviewInfo(props) {
	return (
			<div className='overview__info'>
				<p className='overview__info-title'><i className={`overview__info-title-icon fa-solid ${props.icon}`}></i>{props.title}</p>
				<span className='overview__info-amount'>{props.amount} PLN</span>
			</div>
	)
}
