import React from 'react'
import { nanoid } from 'nanoid'
import Alert from './Alert'

export default function GoalCreator(props) {
	const [formData, setFormData] = React.useState({
		id: nanoid(),
		description: '',
		amount: '',
		paidAmount: 0,
		color: '',
		isInfinite: false,
	})
	const [alertOn, setAlertOn] = React.useState(false)
	const updateState = e => {
		const { name, value, type, checked } = e.target
		setFormData(prevFormData => {
			return {
				...prevFormData,
				[name]: type === 'checkbox' ? checked : value,
			}
		})
	}
	const toggleAlert = () => {
		setAlertOn(prevState => !prevState)
		setTimeout(() => {
			setAlertOn(prevState => !prevState)
		}, 2510)
	}
	const errorCheck = () => {
		const onlyNumbersRegEx = /[0-9]*\.?[0-9]*/
		if (
			formData.description === '' ||
			formData.description.length > 20 ||
			(!formData.isInfinite && formData.amount === '') ||
			(!formData.isInfinite && formData.amount <= 0) ||
			(!formData.isInfinite && formData.amount.length > 10) ||
			(!formData.isInfinite && formData.amount[0] === '0') ||
			(!formData.isInfinite && !formData.amount.match(onlyNumbersRegEx)) ||
			formData.color === ''
		) {
			return true
		}
		return false
	}
	const createNewGoal = e => {
		e.preventDefault()
		errorCheck() === true ? toggleAlert() : props.createGoal(formData)
	}
	return (
		<>
			<div className='bg-shadow'></div>
			{alertOn && <Alert text='The form is filled out incorrectly' />}
			<form className='goal-creator' onSubmit={createNewGoal}>
				<h1 className='goal-creator__title'>Create new goal</h1>

				<input
					name='description'
					type='text'
					className='goal-creator__description-input'
					placeholder='Description'
					value={formData.description}
					onChange={updateState}
				/>
				<div className='checkbox-wrapper'>
					<input
						type='checkbox'
						name='isInfinite'
						id='isInfinite'
						className='goal-creator__infinite-check'
						onChange={updateState}
					/>
					<label htmlFor='isInfinite' className='goal-creator__infinite-label'>
						Infinite Amount
					</label>
				</div>
				{!formData.isInfinite && <input
					name='amount'
					type='number'
					className='goal-creator__amount-input'
					placeholder='Amount'
					value={formData.amount}
					onChange={updateState}
				/>}

				<select name='color' className='creator__color-select' value={formData.color} onChange={updateState}>
					<option className='creator__color-select-option' value=''>
						Choose Theme Color
					</option>
					<option className='creator__color-select-option' value='Green'>
						Green
					</option>
					<option className='creator__color-select-option' value='Blue'>
						Blue
					</option>
					<option className='creator__color-select-option' value='Light Blue'>
						Light Blue
					</option>
					<option className='creator__color-select-option' value='Red'>
						Red
					</option>
					<option className='creator__color-select-option' value='Yellow'>
						Yellow
					</option>
					<option className='creator__color-select-option' value='Purple'>
						Purple
					</option>
				</select>
				<button className='creator__submit-btn'>Add</button>
				<button type='button' className='creator__close-btn' onClick={props.closeCreator}>
					<i className='fa-solid fa-xmark'></i>
				</button>
			</form>
		</>
	)
}
