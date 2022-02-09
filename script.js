class trainsController {
	constructor (model, view) {
		this.model = model
		this.view = view
	}

	initialize () {
		const form = this.view.initialize()

		form.addEventListener('submit', (event) => {
			event.preventDefault()
			// Validate:

		})
	}

	formSubmitHandler (event) {
		event.preventDefault()
		console.log(event)
		// Validate:
		if (this.validateForm(event)) {

		} else {
			this.view.renderFormErrors()
		}
	}

	validateForm () {

	}
}

class trainsView {
	table = null

	initialize () {
		this.form = document.createElement('form')
		this.table = document.createElement('table')
		this.tbody = document.createElement('tbody')
		this.empty = document.createElement('tr')
		this.form.innerHTML = `
<label>
	<span> Номер состава: </span>
	<input type="text" maxlength="3" name="train">
</label><br>
<label>
	<span> Путь состава: </span>
	<input type="text" maxlength="2" name="way">
</label><br>
<button type="submit"> Добавить состав </button>
`
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
		this.empty.innerHTML = `<td> Empty </td>`;
		([this.form, this.table]).forEach((each) => document.body.appendChild(each))
		this.table.appendChild(this.tbody)
		this.render()
		return this.form
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
					if (this.tbody.children.length > i) {
						this.tbody.replaceChild(newTrain, this.tbody.children[i])
					} else {
						this.tbody.appendChild(newTrain)
					}
				}
			}
		}
	}

	renderFormErrors () {

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


