import Goal from './Goal'
import FirstGoal from './FirstGoal'

export default function Goals(props) {
	const goalsComponents = props.goals.map(goal => (
		<Goal
			key={goal.id}
			color={goal.color}
			description={goal.description}
			amount={goal.amount}
			paidAmount={goal.paidAmount}
			isInfinite={goal.isInfinite}
			showDeleteGoalAlert={props.deleteGoalAlert}
			showFinishingAlert={props.showFinishingAlert}
		/>
	))
	return (
		<section className='section goals'>
			<h2 className='section__title'>
				<i className='fa-solid fa-piggy-bank section__title-icon'></i>Goals
			</h2>
			<ul className='goals__list'>{goalsComponents}</ul>
			{props.goals.length === 0 && <FirstGoal />}
		</section>
	)
}
