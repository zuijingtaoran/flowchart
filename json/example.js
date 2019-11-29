var rawdata={
	"Description":{
		title:"Dynamic Flow chart",
		subTitle:`Snapshot:2019-11-29 -- Total WIP:551`
	},
	"NodeDataset": [{
			"Id": "100",
			"BackGroundColor": "steelblue",
			"Color": "green",
			"Size": "100",
			"Text": "text-1",
			"URL": "",
			"Shape": "Circle",
			"ToolTip": "This's a tooltip."
			,"ShiningColor":"red"
		},
		{
			"Id": "200",
			"BackGroundColor": "gray",
			"Color": "red",
			"Size": "80",
			"Text": "text-2",
			"URL": "",
			"Shape": "Rect",
			"ToolTip": "This's a tooltip."
			,"ShiningColor":"yellow"
		},
		{
			"Id": "210",
			"BackGroundColor": "gray",
			"Color": "red",
			"Size": "70",
			"Text": "text-2.1",
			"URL": "",
			"Shape": "Rect",
			"ToolTip": "This's a tooltip."
		},
		{
			"Id": "220",
			"BackGroundColor": "gray",
			"Color": "red",
			"Size": "70",
			"Text": "text-2.2",
			"URL": "",
			"Shape": "Rect",
			"ToolTip": "This's a tooltip."
		},
		{
			"Id": "230",
			"BackGroundColor": "red",
			"Color": "red",
			"Size": "70",
			"Text": "text-2.3",
			"URL": "",
			"Shape": "Rect",
			"ToolTip": "This's a tooltip."
		},
		{
			"Id": "300",
			"BackGroundColor": "steelblue",
			"Color": "green",
			"Size": "60",
			"Text": "input-1",
			"URL": "",
			"Shape": "Hexagon",
			"ToolTip": "This's a tooltip."
		}, {
			"Id": "400",
			"BackGroundColor": "steelblue",
			"Color": "yellow",
			"Size": "170",
			"Text": "input-11",
			"URL": "https://wdc.account.box.com/login",
			"Shape": "Iframe",
			"ToolTip": "This's a tooltip."
			,"ShiningColor":"yellow"
		}, {
			"Id": "500",
			"BackGroundColor": "steelblue",
			"Color": "red",
			"Size": "100",
			"Text": "input-31",
			"URL": "./IMG/1.JPG",
			"Shape": "Image",
			"ToolTip": "This's a tooltip."
		}, {
			"Id": "600",
			"BackGroundColor": "black",
			"Color": "green",
			"Size": "100",
			"Text": "input-41",
			"URL": "./IMG/2.JPG",
			"Shape": "Image",
			"ToolTip": "This's a tooltip."
			,"ShiningColor":"yellow"
		}
	],
	"DataDataset": [{
		"From":"100",
		"To":"200",
		"Size":"3",
		"Label":"From.to.",
		"Color":"steelblue",
		"DashStyle":"Solid",
		"CurveStyle":"Line",
		"ToolTip":"tooltip"
	},{
		"From":"210",
		"To":"200",
		"Size":"2",
		"Label":"From.to.",
		"Color":"steelblue",
		"DashStyle":"Dash",
		"CurveStyle":"Curve",
		"ToolTip":"tooltip"
	},{
		"From":"220",
		"To":"200",
		"Size":"2",
		"Label":"From.to.",
		"Color":"steelblue",
		"DashStyle":"Solid",
		"CurveStyle":"Curve",
		"ToolTip":"tooltip"
	},{
		"From":"230",
		"To":"200",
		"Size":"2",
		"Label":"From.to.",
		"Color":"red",
		"DashStyle":"Solid",
		"CurveStyle":"Curve",
		"ToolTip":"tooltip"
	},{
		"From":"230",
		"To":"300",
		"Size":"2",
		"Label":"From.to.",
		"Color":"steelblue",
		"DashStyle":"Solid",
		"CurveStyle":"Curve",
		"ToolTip":"tooltip"
	},{
		"From":"300",
		"To":"400",
		"Size":"5",
		"Label":"From.to.",
		"Color":"yellow",
		"DashStyle":"Solid",
		"CurveStyle":"Line",
		"ToolTip":"tooltip"
	},{
		"From":"400",
		"To":"500",
		"Size":"3",
		"Label":"to ignore all warnings in a file",
		"Color":"steelblue",
		"DashStyle":"Solid",
		"CurveStyle":"Line",
		"ToolTip":"tooltip"
	},{
		"From":"500",
		"To":"600",
		"Size":"3",
		"Label":"http://localhost:8080",
		"Color":"gray",
		"DashStyle":"Solid",
		"CurveStyle":"Line",
		"ToolTip":"tooltip"
	}]
}
