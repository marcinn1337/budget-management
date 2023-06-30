import { useState, useEffect } from 'react'
import OverviewInfo from './OverviewInfo'
import ChartBar from './ChartBar'

export default function Overview(props) {
	// Get a number representing the current month
	let currentMonth = new Date().getMonth() + 1
	if (currentMonth < 10 ) currentMonth = `0${currentMonth}`
	
	// Get current year
	const currentYear = new Date().getFullYear()

	const categories = [
		{ name: 'Groceries', icon: 'fa-basket-shopping', spentAmount: 0, spentAmountPrecent: 0 },
		{ name: 'Bills', icon: 'fa-file-invoice', spentAmount: 0, spentAmountPrecent: 0 },
		{ name: 'Self Development', icon: 'fa-book', spentAmount: 0, spentAmountPrecent: 0 },
		{ name: 'Entertainment', icon: 'fa-champagne-glasses', spentAmount: 0, spentAmountPrecent: 0 },
		{ name: 'Appereance', icon: 'fa-shirt', spentAmount: 0, spentAmountPrecent: 0 },
		{ name: 'Car', icon: 'fa-car', spentAmount: 0, spentAmountPrecent: 0 },
		{ name: 'Other', icon: 'fa-infinity', spentAmount: 0, spentAmountPrecent: 0 },
	]
	// Show spent amount after hover on bar
	const [categoryHoverInfo, setCategoryHoverInfo] = useState({ isHovered: false, spentAmount: 0 })
	const toggleSpentAmount = amount => {
		setCategoryHoverInfo(prevInfo => {
			return {
				isHovered: !prevInfo.isHovered,
				spentAmount: amount,
			}
		})
	}

	// Get incomes from current Month
	const thisMonthIncomes = props.transfers.filter(
		transfer =>
			transfer.category === 'Income' &&
			transfer.date >= `${currentYear}-${currentMonth}-01` &&
			transfer.date <= `${currentYear}-${currentMonth}-31`
	)

	// Get Expenses from current month
	const thisMonthExpenses = props.transfers.filter(
		transfer =>
			transfer.category !== 'Income' &&
			transfer.date >= `${currentYear}-${currentMonth}-01` &&
			transfer.date <= `${currentYear}-${currentMonth}-31`
	)
	// Sum of all incomes from current month
	const allIncomesSum = thisMonthIncomes.reduce((total, transfer) => {
		return total + Number(transfer.amount)
	}, 0)

	// Sum of all expenses from current month
	const allExpensesSum = thisMonthExpenses.reduce((total, transfer) => {
		return total + Number(transfer.amount)
	}, 0)

	// Array of summed expenses from categories
	for (let i = 0; i <= 6; i++) {
		let filteredArray = thisMonthExpenses.filter(expense => expense.category === categories[i].name)
		let sumOfCategoryExpenses = filteredArray.reduce((total, expense) => {
			return total + Number(expense.amount)
		}, 0)
		categories[i] = {
			...categories[i],
			spentAmount: sumOfCategoryExpenses,
			spentAmountPrecent: ((sumOfCategoryExpenses * 100) / allExpensesSum).toFixed(2),
		}
	}

	// Checking viewport dimensions
	const [windowWidth, setWindowWidth] = useState(window.innerWidth)
	let dimensionAttribute
	useEffect(() => {
		function handleResize() {
			setWindowWidth(window.innerWidth)
		}
		window.addEventListener('resize', handleResize)
	})
	windowWidth < 576 ? (dimensionAttribute = 'width') : (dimensionAttribute = 'height')

	const chartBarComponents = categories.map(category => (
		<ChartBar
			key={category.name}
			onHoverEvent={toggleSpentAmount}
			category={category.name}
			icon={category.icon}
			dimensionAttribute={dimensionAttribute}
			barDimensionValue={category.spentAmountPrecent}
			spentAmount={category.spentAmount}
		/>
	))
	return (
		<section className='section overview'>
			<h2 className='section__title'>
				<i className='fa-solid fa-chart-pie section__title-icon'></i>
				{new Date().toLocaleString('eng', { month: 'long' })} Overview
			</h2>
			<OverviewInfo title='Income' icon='fa-chevron-up' amount={Number(allIncomesSum)} />
			<OverviewInfo title='Spend' icon='fa-chevron-down' amount={Number(allExpensesSum)} />
			<OverviewInfo title='Left' icon='fa-wallet' amount={Number(allIncomesSum) - Number(allExpensesSum)} />
			<div className='overview__chart'>
				{categoryHoverInfo.isHovered && (
					<p className='overview__chart-category-value'>{categoryHoverInfo.spentAmount} PLN</p>
				)}
				{chartBarComponents}
			</div>
		</section>
	)
}
