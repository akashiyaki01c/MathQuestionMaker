
class QAndA {
	q = "";
	a = "";

	constructor(q, a) {
		this.q = q;
		this.a = a;

		console.log(this);
	}
}

const init = ((f) => {
	document.querySelector("main").innerHTML = `
	<div id="question-outer">
		<div id="question"></div>
	</div>
	<div id="center">
		<input type="text" id="input_">
		<button id="button">開始</button>
	</div>
	<div id="answer-outer">
		<div id="answer"></div>
	</div>
	<div id="count"></div>`;

	// 問題を取得する関数
	getQandA = () => {
		const _f = f[Math.floor(Math.random()*f.length)];
		console.log(_f)
		const length = _f.length;
		const args = [];
		const maxValue = 10;
		const minValue = -10;

		for (let i = 0; i < length; i++) {
			args.push(minValue + Math.floor(Math.random() * (maxValue - minValue)));
		}

		const result = _f(...args);
		return result;
	};

	let nowQandA = getQandA();
	let isAnswer = false;
	let count = {
		total: 0,
		correct: 0,
	};
	
	let _onclick = () => {
		if (isAnswer) {
			// 次 ボタン
			document.querySelector("#question").innerHTML = nowQandA.q;
			document.querySelector("#answer").innerHTML = "";
			document.querySelector("#input_").value = "";
			document.querySelector("#button").innerHTML = "回答";
			count.total++;
		} else {
			// 回答 ボタン
			if (nowQandA.a == document.querySelector("#input_").value) {
				document.querySelector("#answer").innerHTML = `正解！ ${nowQandA.a}`;
				count.correct++;
			} else {
				document.querySelector("#answer").innerHTML = `たぶん不正解 ${nowQandA.a}`;
			}
			document.querySelector("#button").innerHTML = "次";
			nowQandA = getQandA();
		}
		document.querySelector("#count").innerHTML = `${count.total}問中 ${count.correct}問正解`;
		isAnswer = !isAnswer;
	}
	document.querySelector("#button").onclick = _onclick;
	document.querySelector("#input_").addEventListener("keydown", (e) => {
		if( e.keyCode === 13 ){
			_onclick();
		}
	});
});