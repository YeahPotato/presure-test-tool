const readline = require('readline')
const requestEvent = require('./event')
const log = console.log
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
})

const run = require('./pressure-request')
log('----------Pressure Test Tool v0.0.1----------')
log('--Config')

let config = [
	{
		name: 'Http Address',
		value: 'https://www.baidu.com/',
		type: String,
	},
	{
		name: 'Request Numbers',
		value: 20,
		type: Number,
	},
	{
		name: 'Duration',
		value: 1,
		type: Number,
	},
]

let statistic = 0
const processBar = new ProgressBar('Requesting', 30)
requestEvent.on('request-once-finish', () => {
	statistic += 1
	const total = config[1].value
	processBar.render({ completed: statistic, total })
})
;(async () => {
	for (let i = 0; i < config.length; i++) {
		config[i].value = await step(config[i])
	}
	log('\n--Progress')
	// 发起请求
	run(config, (result, useTime) => {
		log('\n')
		log('--Result')
		printSummary(result, useTime, config)
		console.table(result)
		process.exit(1)
	})
})()

async function step(conf) {
	return new Promise((resolve, reject) => {
		if (conf.value) {
			log(`${conf.name}: ${conf.value}`)
			resolve(conf.value)
		} else {
			rl.question(conf.name + ': ', (answer) => {
				if (answer) {
					resolve(conf['type'](answer))
				}
			})
		}
	}).catch((e) => reject(e))
}
function printSummary(result, useTime, config) {
	let error = 0,
		success = 0
	result.map((info) => {
		info.error || info.status !== 200 ? error++ : success++
	})
	const total = config[1].value
	const throughPut = ((config[1].value / useTime) * 1000).toFixed(2)
	log(`Total: ${total}, Success: ${success}, Error: ${error}\nThroughput: ${throughPut}/Sec`)
}

var slog = require('single-line-log').stdout

function ProgressBar(description, bar_length) {
	this.length = bar_length || 25
	this.description = description
	this.render = function (opts) {
		let percent = (opts.completed / opts.total).toFixed(4)
		let cell_num = Math.floor(percent * this.length)
		let cell = ''
		for (let i = 0; i < cell_num; i++) {
			cell += '█'
		}
		let empty = ''
		for (let i = 0; i < this.length - cell_num; i++) {
			empty += '░'
		}
		let cmdText = this.description + ': ' + (100 * percent).toFixed(2) + '% ' + cell + empty + ' ' + opts.completed + '/' + opts.total

		slog(cmdText)
	}
}
