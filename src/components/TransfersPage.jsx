import React from 'react'
import Transfer from './Transfer'
import {Link} from 'react-router-dom'

export default function TransfersPage() {
	const [userAccount, setUserAccount] = React.useState(
		JSON.parse(localStorage.getItem('userAccount')) || {
			transfers: [],
			goalTransfers: [],
			goals: [],
		}
	)
	React.useEffect(() => {
		localStorage.setItem('userAccount', JSON.stringify(userAccount))
	}, [userAccount])

	const allTransfers = [...userAccount.transfers, ...userAccount.goalTransfers]

	// Delete Transaction Function
	const deleteTransfer = (id, amount, category, icon) => {
		setUserAccount(prevUserAccount => {
			let filteredTransfers

			if (icon === 'fa-piggy-bank') {
				filteredTransfers = prevUserAccount.goalTransfers.filter(transfer => transfer.id !== id)
				const filteredGoalsArray = prevUserAccount.goals.filter(goal => goal.description !== category)
				let chosenGoal = prevUserAccount.goals.filter(goal => goal.description === category)[0]
				chosenGoal = {
					...chosenGoal,
					paidAmount: Number(chosenGoal.paidAmount) - Number(amount),
				}
				filteredGoalsArray.push(chosenGoal)
				return {
					...prevUserAccount,
					goalTransfers: filteredTransfers,
					goals: filteredGoalsArray,
				}
			}
			filteredTransfers = prevUserAccount.transfers.filter(transfer => transfer.id !== id)
			return {
				...prevUserAccount,
				transfers: filteredTransfers,
			}
		})
	}

	// Select Categories
	const categories = ['Income', 'Groceries', 'Bills', 'Self Development', 'Entertainment', 'Appereance', 'Car', 'Other']
	const categoriesSelectOptions = categories.map((category, i) => (
		<option key={i} value={category} className='filter__select-option'>
			{category}
		</option>
	))
	const goalSelectOptions = userAccount.goals.map((goal, i) => (
		<option key={i} className='filter__select-option' value={goal.description}>
			{goal.description}
		</option>
	))

	// Filter Form
	const [filterSettings, setFilterSettings] = React.useState({
		description: '',
		minAmount: '',
		maxAmount: '',
		minDate: '',
		maxDate: '',
		category: '',
	})
	const filterTransfers = e => {
		const maxAmount = !filterSettings.maxAmount ? Infinity : Number(filterSettings.maxAmount)

		const MAX_TIMESTAMP = 8640000000000000
		const maxDate = !filterSettings.maxDate ? new Date(MAX_TIMESTAMP) : new Date(filterSettings.maxDate)

		const minDate = !filterSettings.minDate ? new Date('2020-01-01') : new Date(filterSettings.minDate)

		const filteredTransfers = allTransfers.filter(
			transfer =>
				transfer.description.match(filterSettings.description) &&
				transfer.category.match(filterSettings.category) &&
				Number(transfer.amount) >= Number(filterSettings.minAmount) &&
				Number(transfer.amount) <= maxAmount &&
				new Date(transfer.date) >= minDate &&
				new Date(transfer.date) <= maxDate
		)

		return filteredTransfers.map((transfer, i) => (
			<Transfer
				id={transfer.id}
				key={transfer.id}
				category={transfer.category}
				description={transfer.description}
				date={transfer.date}
				amount={transfer.amount}
				deleteTransfer={deleteTransfer}
			/>
		))
	}
	const updateState = e => {
		const { name, value } = e.target
		setFilterSettings(prevFilterSettings => {
			return {
				...prevFilterSettings,
				[name]: value,
			}
		})
	}

	return (
		<div className='transfers'>
			<Link to='/' className='transfers__home-btn'>Home</Link>
			<form action='' className='filter' onSubmit={filterTransfers}>
				<label htmlFor='description' className='filter__description label-wrapper'>
					Description
					<input
						type='text'
						name='description'
						id='description'
						className='filter__description-input'
						value={filterSettings.description}
						onChange={updateState}
					/>
				</label>

				<label htmlFor='minAmount' className='filter__min-amount label-wrapper'>
					Min. Amount
					<input
						name='minAmount'
						type='number'
						className='filter__min-amount-input'
						placeholder='0'
						value={filterSettings.minAmount}
						onChange={updateState}
						id='minAmount'
					/>
				</label>

				<label htmlFor='maxAmount' className='filter__max-amount label-wrapper'>
					Max. Amount
					<input
						name='maxAmount'
						type='number'
						className='filter__max-amount-input'
						placeholder='0'
						value={filterSettings.maxAmount}
						onChange={updateState}
						id='maxAmount'
					/>
				</label>

				<label htmlFor='minDate' className='filter__min-date label-wrapper'>
					From
					<input
						type='date'
						name='minDate'
						id='minDate'
						className='filter__min-date-input'
						value={filterSettings.minDate}
						onChange={updateState}
					/>
				</label>

				<label htmlFor='maxDate' className='filter__max-date label-wrapper'>
					To
					<input
						type='date'
						name='maxDate'
						id='maxDate'
						className='filter__max-date-input'
						value={filterSettings.maxDate}
						onChange={updateState}
					/>
				</label>

				<label htmlFor='category' className='filter__select label-wrapper'>
					Category / Goal
					<select
						name='category'
						id='category'
						className='filter__select-input'
						value={filterSettings.category}
						onChange={updateState}>
						<option className='filter__select-option' value=''>
							All
						</option>
						{categoriesSelectOptions}
						{goalSelectOptions}
					</select>
				</label>
			</form>
			<div className='transfers__list'>{filterTransfers()}</div>
		</div>
	)
}
