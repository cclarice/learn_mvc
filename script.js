const initialBackendDatabase = () => ({
	data: [
		{
			trainId: '123',
			ways: 'А1-А3'
		},
		{
			trainId: '720',
			ways: 'П1',
		},
		{
			trainId: '108',
			ways: 'А1'
		}
	]
})

const backendDatabase = initialBackendDatabase()

const getBackendDataTrains = () => {
	return new Promise ((resolve, reject) => {
		this.setTimeout(() => {
			if (Math.random() > 0.1) {
				resolve(backendDatabase)
			} else {
				reject({
					error: {
						text: 'Что то пошло не так, повторите попытку позже.'
					}
				})
			}
		}, 250 + Math.floor(Math.random() * 1000))
	})
}

const patchBackendDataTrains = () => {
	return new Promise((resolve, reject) => {
		resolve()
	})
}

class trainsController {
	constructor (model, view) {
		this.model = model
		this.view = view
	}

	initialize () {
		const form = this.view.initialize(this)
		this.model.initialize(this)

		form.addEventListener('submit', this.formSubmitHandler(this, form))
		form.addEventListener('input', this.formValidateHandler(this, form))

		getBackendDataTrains().then(() => {

		}).catch(() => {

		})
	}

	formSubmitHandler (context) {
		return function (event) {
			event.preventDefault()
			console.log(event)
		}
	}

	inputTrainValid (inputTrain) {
		const value = inputTrain.value

		if (value.length !== 3) {
			return { inputTrain: 'поезда должен состоять из трёх цифр' }
			return false
		} else if (Object.values(value).reduce((prev, next) => (prev || (next < '0' || next > '9')), false)) {
			return { inputTrain: 'может содержать только цифры' }
		}
		return null
	}

	inputWayValid (inputWay) {
		const value = inputWay.value

		if (value.length !== 2) {
			return { inputWay: 'должен состоять из буквы и цифры' }
		} else if (value[0] < 'А' || value[0] > 'Я') {
			return { inputWay: 'должен состоять из буквы кириллицы' }
		} else if (value[1] < '0' || value[1] > '9') {
			return { inputWay: 'должен заканчиваться цифрой' }
		}
		return null
	}

	formValidateHandler (context) {
		return function (event) {
			const inputTrain = this[0]
			const inputWay = this[1]

			const errors = {
				...context.inputTrainValid(inputTrain),
				...context.inputWayValid(inputWay)
			}
			context.view.renderFormErrors(errors)
		}
	}
}

class trainsView {
	table = null

	initialize (controller) {
		this.controller = controller
		this.form = document.createElement('form')
		this.table = document.createElement('table')
		this.tbody = document.createElement('tbody')
		this.empty = document.createElement('tr')

		this.form.className = 'form'
		this.form.innerHTML = `
<label class="form__label">
	<span class="form__label-text"> Номер состава: </span>
	<input class="form__input" type="text" value="111" maxlength="3" name="train">
	<span class="form__label-error">\n</span>
</label>
<label class="form__label">
	<span class="form__label-text"> Путь состава: </span>
	<input class="form__input" type="text" value="А1" maxlength="2" name="way">
	<span class="form__label-error">\n</span>
</label>
<button class="form__submit" type="submit"> Добавить состав </button>
`

		this.table.className = 'table'
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

	renderFormErrors (errors) {
		this.form[2].disabled = !!Object.values(errors).length
		if (errors.inputTrain) {
			this.form[0].classList.add('form__input_error')
			this.form.children[0].lastElementChild.innerHTML = `${errors.inputTrain}\n`
			console.dir(this.form.children[0].lastChild)
		} else {
			this.form[0].classList.remove('form__input_error')
			this.form.children[0].lastElementChild.innerHTML = '\n'
		}
		if (errors.inputWay) {
			this.form[1].classList.add('form__input_error')
			this.form.children[1].lastElementChild.innerHTML = `${errors.inputWay}\n`
			console.dir(this.form.children[0].lastChild)
		} else {
			this.form[1].classList.remove('form__input_error')
			this.form.children[1].lastElementChild.innerHTML = '\n'
		}
	}
}

class trainsModel {
	constructor (trains) {
		this.trains = trains
	}

	initialize (controller) {
		this.controller = controller
	}

	addTrain (trainId, wayName) {
		const train = this.trains.find((train) => train.trainId === trainId)

		if (train) {
			const ways = train.ways.split('-')
			ways.push(wayName)
			ways.sort()
			train.ways = ways.join('-')
		}
	}

	removeTrain (trainId) {
		const train = this.trains.find((train) => train.trainId === trainId)

		if (train) {
			this.trains.filter((_train) => _train !== train)
		}
	}
}

const view = new trainsView()
const model = new trainsModel()
const controller = new trainsController(model, view)

controller.initialize()


