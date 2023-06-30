import React from 'react'
import Card from './Card'
import Settings from './Settings'
import Overview from './Overview'
import RecentTransfers from './RecentTransfers'
import Goals from './Goals'
import TransferCreator from './TransferCreator'
import GoalCreator from './GoalCreator'

export default function Home() {
	const [appState, setAppState] = React.useState(
		JSON.parse(localStorage.getItem('appState')) || {
			activeTransferCreator: false,
			activeGoalCreator: false,
			requiredConfirmation: false,
			requiredFinishingConfirmation: false,
			targetedGoal: '',
		}
	)
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

	React.useEffect(() => {
		localStorage.setItem('appState', JSON.stringify(appState))
		if (
			appState.activeTransferCreator ||
			appState.activeGoalCreator ||
			appState.requiredConfirmation ||
			appState.requiredFinishingConfirmation
		) {
			document.body.classList.add('body-unscrollable')
		} else {
			document.body.classList.remove('body-unscrollable')
		}
	}, [appState])

	// Transfers Functions
	const toggleTransferCreator = () => {
		setAppState(prevAppState => {
			return {
				...prevAppState,
				activeTransferCreator: !prevAppState.activeTransferCreator,
			}
		})
	}
	const createTransfer = (transfer, toSavings) => {
		toggleTransferCreator()
		setUserAccount(prevUserAccount => {
			if (toSavings) {
				const filteredGoalsArray = prevUserAccount.goals.filter(goal => goal.description !== transfer.category)
				let chosenGoal = prevUserAccount.goals.filter(goal => goal.description === transfer.category)[0]
				chosenGoal = {
					...chosenGoal,
					paidAmount: Number(chosenGoal.paidAmount) + Number(transfer.amount),
				}
				filteredGoalsArray.push(chosenGoal)
				return {
					...prevUserAccount,
					goalTransfers: [...prevUserAccount.goalTransfers, transfer],
					goals: filteredGoalsArray,
				}
			}
			return {
				...prevUserAccount,
				transfers: [...prevUserAccount.transfers, transfer],
			}
		})
	}
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
			} else {
				filteredTransfers = prevUserAccount.transfers.filter(transfer => transfer.id !== id)
				return {
					...prevUserAccount,
					transfers: filteredTransfers,
				}
			}
		})
	}

	// Goals Functions
	const closeAlert = () => {
		setAppState(prevAppState => {
			return {
				...prevAppState,
				requiredConfirmation: false,
				requiredFinishingConfirmation: false,
				targetedGoal: '',
			}
		})
	}
	const toggleGoalCreator = () => {
		setAppState(prevAppState => {
			return {
				...prevAppState,
				activeGoalCreator: !prevAppState.activeGoalCreator,
			}
		})
	}
	const createNewGoal = goal => {
		toggleGoalCreator()
		setUserAccount(prevUserAccount => {
			return {
				...prevUserAccount,
				goals: [...prevUserAccount.goals, goal],
			}
		})
	}
	const deleteGoal = () => {
		const filteredGoalsArray = userAccount.goals.filter(goal => goal.description !== appState.targetedGoal)
		const filteredTransfersArray = userAccount.goalTransfers.filter(
			transfer => transfer.category !== appState.targetedGoal
		)

		setUserAccount(prevUserAccount => {
			return {
				...prevUserAccount,
				goals: filteredGoalsArray,
				goalTransfers: filteredTransfersArray,
			}
		})
		closeAlert()
	}
	const showConfirmationAlert = goalName => {
		setAppState(prevAppState => {
			return {
				...prevAppState,
				requiredConfirmation: true,
				targetedGoal: goalName,
			}
		})
	}
	const showFinishingAlert = goalName => {
		setAppState(prevAppState => {
			return {
				...prevAppState,
				requiredFinishingConfirmation: true,
				targetedGoal: goalName,
			}
		})
	}
	const breakThePiggy = () => {
		// Delete goal from goals array
		const filteredGoals = userAccount.goals.filter(goal => goal.description !== appState.targetedGoal)

		// Change target of transfers from savings to normal expenses and move them to transfers array
		let transfersToCopy = userAccount.goalTransfers.filter(transfer => transfer.category === appState.targetedGoal)
		transfersToCopy = transfersToCopy.map(transfer => {
			return { ...transfer, category: 'Other', transferToSavings: false }
		})
		const newTransfers = [...userAccount.transfers, ...transfersToCopy]

		// Delete all transfers targeted to this goal
		const filteredGoalTransfers = userAccount.goalTransfers.filter(
			transfer => transfer.category !== appState.targetedGoal
		)

		setUserAccount(prevUserAccount => {
			return {
				transfers: newTransfers,
				goals: filteredGoals,
				goalTransfers: filteredGoalTransfers,
			}
		})
		closeAlert()
	}

	return (
		<div className='app'>
			<Settings openTransferCreatorFunction={toggleTransferCreator} openGoalCreatorFunction={toggleGoalCreator} />
			<section className='cards'>
				<Card
					goalTransfers={userAccount.goalTransfers}
					transfers={userAccount.transfers}
					class='balance'
					title='Balance'
				/>
				<Card
					goalTransfers={userAccount.goalTransfers}
					transfers={userAccount.transfers}
					class='total-balance'
					title='Total Balance'
				/>
				<Card
					goalTransfers={userAccount.goalTransfers}
					transfers={userAccount.transfers}
					class='savings'
					title='Savings'
				/>
			</section>
			<Overview transfers={userAccount.transfers} />
			<RecentTransfers
				goalTransfers={userAccount.goalTransfers}
				transfers={userAccount.transfers}
				deleteTransferFunction={deleteTransfer}
			/>
			<Goals
				openCreator={toggleGoalCreator}
				goals={userAccount.goals}
				deleteGoalAlert={showConfirmationAlert}
				showFinishingAlert={showFinishingAlert}
			/>
			{appState.activeTransferCreator && (
				<TransferCreator
					createTransferFunction={createTransfer}
					closeCreator={toggleTransferCreator}
					goals={userAccount.goals}
				/>
			)}
			{appState.activeGoalCreator && <GoalCreator closeCreator={toggleGoalCreator} createGoal={createNewGoal} />}
			{appState.requiredConfirmation && (
				<div className='confirmation-alert'>
					<p className='confirmation-alert__text'>
						Are you sure you want to delete this goal? After deletion, the currently deposited amount will be restored
						to the account balance.
					</p>
					<button onClick={deleteGoal} className='confirmation-alert-btn confirm-btn'>
						Yes
					</button>
					<button onClick={closeAlert} className='confirmation-alert-btn abort-btn'>
						No
					</button>
				</div>
			)}
			{appState.requiredFinishingConfirmation && (
				<div className='confirmation-alert'>
					<p className='confirmation-alert__text'>
						The piggy bank is full. After breaking it, the funds from it will be removed from the account. Do You want
						to continue?
					</p>
					<button onClick={breakThePiggy} className='confirmation-alert-btn confirm-btn'>
						Yes!
					</button>
					<button onClick={closeAlert} className='confirmation-alert-btn abort-btn'>
						Not yet
					</button>
				</div>
			)}
		</div>
	)
}
