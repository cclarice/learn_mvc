class trainsController {
	constructor (model, view) {
		this.model = model
		this.view = view
	}

	initialize () {
		this.view.initialize()
	}
}

class trainsView {
	table = null

	initialize () {
		const inputs = {
			inputNumber: document.createElement('input'),
			inputWay: document.createElement('input')
		}

		inputs.inputNumber.type = 'text'
		inputs.inputWay.type = 'text'
		inputs.inputNumber.max = '3'
		inputs.inputWay.max = '2'


		this.table = document.createElement('table')
		this.tbody = document.createElement('tbody')
		this.empty = document.createElement('tr')
		this.table.innerHTML = `
<thead>
	<tr>
		<td>
			Номер состава
		</td>
		<td>
		  Направление(-я)
		</td>
	</tr>
</thead>
<tbody>
</tbody>
		`
		this.empty.innerHTML = `
<td> Empty </td>
		`
		document.body.appendChild(this.table)
		this.table.appendChild(this.tbody)
		this.render()
		return inputs
	}
	render (trains = []) {
		this.buffer = [...trains]
		if (!trains.length) {
			this.tbody.appendChild(this.empty)
		} else {
			if (this.tbody.children[0] === this.empty) {
				this.tbody.removeChild(this.empty)
			}

			for (let i = 0; i < trains.length; i++) {
				if (trains[i] !== this.buffer[i]) {
					const newTrain = document.createElement('tr')
					newTrain.innerHTML = `
					<td>
					  ${trains[i].trainId}
					</td>
					<td>
						${trains[i].ways}
					</td>
					`
					this.tbody.replaceChild(newTrain, this.tbody.children[i])
				}
			}
		}
	}
}

class trainsModel {
	constructor (trains = []) {
		this.trains = trains
	}

	getTrains () {

	}

	setTrains () {

	}

	addTrain () {

	}

	removeTrain () {

	}
}

const view = new trainsView()
const model = new trainsModel()
const controller = new trainsController(model, view)

controller.initialize()


