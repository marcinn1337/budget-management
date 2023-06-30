import { nanoid } from 'nanoid'
import React from 'react'
import Alert from './Alert'

export default function TransferCreator(props) {
	const [formData, setFormData] = React.useState({
		id: nanoid(),
		description: '',
		date: '',
		amount: '',
		category: '',
		transferToSavings: false,
	})
	const [alertOn, setAlertOn] = React.useState(false)

	const checkboxHandle = () => {
		setFormData(prevFormData => {
			return {
				...prevFormData,
				transferToSavings: !prevFormData.transferToSavings,
				category: '',
			}
		})
	}
	const goalOptionsElements = props.goals.map((goal, i) => (
		<option key={i} className='creator__category-select-option' value={goal.description}>
			{goal.description}
		</option>
	))

	const toggleAlert = () => {
		setAlertOn(prevState => !prevState)
		setTimeout(() => {
			setAlertOn(prevState => !prevState)
		}, 2510)
	}
	const updateState = e => {
		const { name, value } = e.target
		setFormData(prevFormData => {
			return {
				...prevFormData,
				[name]: value,
			}
		})
	}
	const errorCheck = () => {
		const onlyNumbersRegEx = /[0-9]*\.?[0-9]*/
		if (
			formData.description === '' ||
			formData.description.length > 27 ||
			formData.amount === '' ||
			formData.amount <= 0 ||
			formData.amount.length > 10 ||
			formData.amount[0] === '0' ||
			!formData.amount.match(onlyNumbersRegEx) ||
			formData.date === '' ||
			formData.category === ''
		) {	
			return true
		}
		return false
	}
	const createNewTransfer = e => {
		e.preventDefault()
		errorCheck() === true ? toggleAlert() : props.createTransferFunction(formData, formData.transferToSavings)
	}

	return (
		<>
			<div className='bg-shadow'></div>
			{alertOn && <Alert text='The form is filled out incorrectly'/>}
			<form className='transfer-creator transfer-creator' onSubmit={createNewTransfer}>
				<h1 className='transfer-creator__title'>Add new transfer</h1>

				<div className='checkbox-wrapper'>
					<input
						type='checkbox'
						name='transferToSavings'
						id='toSavings'
						className='transfer-creator__savings-check'
						onChange={checkboxHandle}
					/>
					<label htmlFor='toSavings' className='transfer-creator__savings-label'>
						Transfer to savings
					</label>
				</div>
				<input
					name='description'
					type='text'
					className='transfer-creator__description-input'
					placeholder='Description'
					value={formData.description}
					onChange={updateState}
				/>

				<input
					name='date'
					type='date'
					className='transfer-creator__date-input'
					value={formData.date}
					onChange={updateState}
				/>

				<input
					name='amount'
					type='number'
					className='transfer-creator__amount-input'
					placeholder='Amount'
					value={formData.amount}
					onChange={updateState}
				/>
				<select
					id='select'
					name='category'
					className='transfer-creator__category-select'
					value={formData.category}
					onChange={updateState}>
					{!formData.transferToSavings && (
						<>
							<option className='transfer-creator__category-select-option' value=''>
								Choose Category
							</option>
							<option className='transfer-creator__category-select-option' value='Income'>
								Income
							</option>
							<option className='transfer-creator__category-select-option' value='Groceries'>
								Groceries
							</option>
							<option className='transfer-creator__category-select-option' value='Bills'>
								Bills
							</option>
							<option className='transfer-creator__category-select-option' value='Self Development'>
								Self Development
							</option>
							<option className='transfer-creator__category-select-option' value='Entertainment'>
								Entertainment
							</option>
							<option className='transfer-creator__category-select-option' value='Appereance'>
								Appereance
							</option>
							<option className='transfer-creator__category-select-option' value='Car'>
								Car
							</option>
							<option className='transfer-creator__category-select-option' value='Other'>
								Other
							</option>
						</>
					)}
					{formData.transferToSavings && (
						<>
							<option className='creator__category-select-option' value=''>
								Choose your saving goal
							</option>
							{goalOptionsElements}
						</>
					)}
				</select>

				<button className='transfer-creator__submit-btn'>Add</button>
				<button onClick={props.closeCreator} type='button' className='transfer-creator__close-btn'>
					<i className='fa-solid fa-xmark'></i>
				</button>
			</form>
		</>
	)
}
