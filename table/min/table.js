function TABLE(a, b) {
	let c = document.createElement("table"),
		d = document.createElement("tr"),
		e = null,
		f = null,
		g = null;
	c.setAttribute("class", "fl-table"), Object.keys(b[0]).map(a => {
		e = document.createElement("th"), e.innerHTML = a, d.append(e)
	}), c.append(d), b.map(b => {
		f = document.createElement("tr"), Object.keys(b).map(c => {
			g = document.createElement("td"), g.innerHTML = b[c], f.append(g)
		}), c.append(f)
	}), document.getElementById(a).append(c), console.timeEnd(1)
}
