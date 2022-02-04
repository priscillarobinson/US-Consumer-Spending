//Themes
am4core.useTheme(am4themes_animated);
am4core.globalAdapter.addAll(2)
var chart = am4core.create("chartdiv", am4charts.XYChart);
chart.padding(20, 20, 20, 20);
chart.numberFormatter.numberFormat = "#,###.";
chart.responsive.enabled = true;
var label = chart.plotContainer.createChild(am4core.Label);
label.x = am4core.percent(97);
label.y = am4core.percent(95);
label.horizontalCenter = "right";
label.verticalCenter = "middle";
label.dx = -15;
label.fontSize = 35;
var playButton = chart.plotContainer.createChild(am4core.PlayButton);
playButton.x = am4core.percent(90);
playButton.y = am4core.percent(95);
playButton.dy = -2;
playButton.verticalCenter = "middle";
playButton.events.on("toggled", function(event) {
  if (event.target.isActive) {
    play();
  }
  else {
    stop();
  }
})

var stepDuration = 6000;

var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
categoryAxis.renderer.grid.template.location = 0;
categoryAxis.dataFields.category = "description";
categoryAxis.renderer.minGridDistance = 1;
categoryAxis.renderer.inversed = true;
categoryAxis.renderer.grid.template.disabled = false;
categoryAxis.renderer.labels.template.fill = am4core.color("#fff");
categoryAxis.renderer.labels.template.textAlign = 'end';
categoryAxis.renderer.labels.template.truncate = false;
categoryAxis.renderer.labels.template.padding(0, 20, 0, 0);
categoryAxis.renderer.labels.template.fontSize=13;
categoryAxis.renderer.labels.template.wrap = true;
categoryAxis.renderer.labels.template.maxWidth = 250;
categoryAxis.renderer.grid.template.stroke = "#fff";
categoryAxis.renderer.grid.template.strokeWidth = 1; 
categoryAxis.renderer.grid.template.strokeOpacity = .1;
categoryAxis.renderer.baseGrid.stroke = "#ff0000";

var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
valueAxis.min = 0;
valueAxis.rangeChangeEasing = am4core.ease.linear;
valueAxis.rangeChangeDuration = stepDuration;
valueAxis.extraMax = 0.1;
valueAxis.renderer.grid.template.stroke = "#fff";
valueAxis.renderer.grid.template.strokeWidth = 1; 
valueAxis.renderer.grid.template.strokeOpacity = .1;
valueAxis.renderer.baseGrid.stroke = "#ff0000";

var series = chart.series.push(new am4charts.ColumnSeries());
series.dataFields.categoryY = "description";
series.dataFields.valueX = "dollars";
series.tooltipText = "{valueX.value}"
series.columns.template.strokeOpacity = 0;
series.columns.template.column.cornerRadiusBottomRight = 5;
series.columns.maxColumns = 1;
series.columns.template.column.cornerRadiusTopRight = 5;
series.interpolationDuration = stepDuration;
series.interpolationEasing = am4core.ease.linear;
var labelBullet = series.bullets.push(new am4charts.LabelBullet())
labelBullet.label.horizontalCenter = "left";
labelBullet.label.text = "{values.valueX.workingValue}";
labelBullet.label.fontSize=10;
labelBullet.label.hideOversized = false;
labelBullet.label.textAlign = "end";
labelBullet.label.fill = am4core.color("#fff");
labelBullet.label.dx =5;
labelBullet.label.maxColumns = 1;
chart.zoomOutButton.disabled = true;
label.fill = am4core.color("#fff");
label.x = am4core.percent(90);

chart.colors.list = [

    /* CSS HEX */
    am4core.color("#3e6aa8ff"),
    am4core.color("#274268ff"),
    am4core.color("#1c304aff"),
    am4core.color("#799150ff"),
    am4core.color("#58693aff"),
    am4core.color("#424f2bff"),
    am4core.color("#742407"),
    am4core.color("#AC370C"),
    am4core.color("#D4420C"),
    am4core.color("#A36A00"),
    am4core.color("#CC8500"),
    am4core.color("#E09200")
  ];


series.columns.template.adapter.add("fill", function(fill, target){
  return chart.colors.getIndex(target.dataItem.index);
});

var year = 2007;
label.text = year.toString();

var interval;

function play() {
  interval = setInterval(function(){
    nextYear();
  }, stepDuration)
  nextYear();
}

function stop() {
  if (interval) {
    clearInterval(interval);
  }
}

function nextYear() {
  year++

  if (year > 2019) {
    year = 2007;
  }

  var newData = allData[year];
  var itemsWithNonZero = 0;
  for (var i = 0; i < chart.data.length; i++) {
    chart.data[i].dollars = newData[i].dollars;
    if (chart.data[i].dollars > 0) {
      itemsWithNonZero++;
      
    }
  }
  
    if(itemsWithNonZero > 25){
    itemsWithNonZero = 25
  }
  
  chart.invalidateRawData();
  label.text = year.toString();

  categoryAxis.zoom({ start: 0, end: itemsWithNonZero / categoryAxis.dataItems.length });
}


categoryAxis.sortBySeries = series;

allData = {
    "1997": [
    {
    "description": "Motor Vehicles & Parts",
    "dollars": 293082.5
    },
    {
    "description": "Furnishings & Durable Household Equipment",
    "dollars": 160490.2
    },
    {
    "description": "Recreational Goods & Vehicles",
    "dollars": 174632
    },
    {
    "description": "Food & Beverages (outside of home)",
    "dollars": 474777.2
    },
    {
    "description": "Clothing & Footwear",
    "dollars": 247496.1
    },
    {
    "description": "Gasoline & Other Energy Goods",
    "dollars": 147661.2
    },
    {
    "description": "Housing & Utilities",
    "dollars": 1009822.3
    },
    {
    "description": "Health Care",
    "dollars": 790947.7
    },
    {
    "description": "Transportation Services",
    "dollars": 211803.2
    },
    {
    "description": "Recreation Services",
    "dollars": 208317
    },
    {
    "description": "Food Services & Accommodations",
    "dollars": 343427.5
    },
    {
    "description": "Financial Services & Insurance",
    "dollars": 408884.2
    }
    ],
    "1998": [
    {
    "description": "Motor Vehicles & Parts",
    "dollars": 320204.7
    },
    {
    "description": "Furnishings & Durable Household Equipment",
    "dollars": 173579.1
    },
    {
    "description": "Recreational Goods & Vehicles",
    "dollars": 191359.7
    },
    {
    "description": "Food & Beverages (outside of home)",
    "dollars": 487437
    },
    {
    "description": "Clothing & Footwear",
    "dollars": 257805.3
    },
    {
    "description": "Gasoline & Other Energy Goods",
    "dollars": 132354.7
    },
    {
    "description": "Housing & Utilities",
    "dollars": 1065472.1
    },
    {
    "description": "Health Care",
    "dollars": 832045.1
    },
    {
    "description": "Transportation Services",
    "dollars": 225179.9
    },
    {
    "description": "Recreation Services",
    "dollars": 220204.3
    },
    {
    "description": "Food Services & Accommodations",
    "dollars": 361836.3
    },
    {
    "description": "Financial Services & Insurance",
    "dollars": 446059.4
    }
    ],
    "1999": [
    {
    "description": "Motor Vehicles & Parts",
    "dollars": 350730.2
    },
    {
    "description": "Furnishings & Durable Household Equipment",
    "dollars": 191184.9
    },
    {
    "description": "Recreational Goods & Vehicles",
    "dollars": 210921.5
    },
    {
    "description": "Food & Beverages (outside of home)",
    "dollars": 515530.4
    },
    {
    "description": "Clothing & Footwear",
    "dollars": 271096.9
    },
    {
    "description": "Gasoline & Other Energy Goods",
    "dollars": 146544.9
    },
    {
    "description": "Housing & Utilities",
    "dollars": 1123133.2
    },
    {
    "description": "Health Care",
    "dollars": 863589.3
    },
    {
    "description": "Transportation Services",
    "dollars": 241343.8
    },
    {
    "description": "Recreation Services",
    "dollars": 238055.3
    },
    {
    "description": "Food Services & Accommodations",
    "dollars": 380330.7
    },
    {
    "description": "Financial Services & Insurance",
    "dollars": 486397.3
    }
    ],
    "2000": [
    {
    "description": "Motor Vehicles & Parts",
    "dollars": 363227.6
    },
    {
    "description": "Furnishings & Durable Household Equipment",
    "dollars": 208105.7
    },
    {
    "description": "Recreational Goods & Vehicles",
    "dollars": 230858.6
    },
    {
    "description": "Food & Beverages (outside of home)",
    "dollars": 540578.4
    },
    {
    "description": "Clothing & Footwear",
    "dollars": 280831.4
    },
    {
    "description": "Gasoline & Other Energy Goods",
    "dollars": 184515.6
    },
    {
    "description": "Housing & Utilities",
    "dollars": 1198555.7
    },
    {
    "description": "Health Care",
    "dollars": 918424.6
    },
    {
    "description": "Transportation Services",
    "dollars": 261279.3
    },
    {
    "description": "Recreation Services",
    "dollars": 254390
    },
    {
    "description": "Food Services & Accommodations",
    "dollars": 408781.2
    },
    {
    "description": "Financial Services & Insurance",
    "dollars": 542972.5
    }
    ],
    "2001": [
    {
    "description": "Motor Vehicles & Parts",
    "dollars": 383289.5
    },
    {
    "description": "Furnishings & Durable Household Equipment",
    "dollars": 214940.1
    },
    {
    "description": "Recreational Goods & Vehicles",
    "dollars": 234933.1
    },
    {
    "description": "Food & Beverages (outside of home)",
    "dollars": 564002.8
    },
    {
    "description": "Clothing & Footwear",
    "dollars": 277868.4
    },
    {
    "description": "Gasoline & Other Energy Goods",
    "dollars": 177985.9
    },
    {
    "description": "Housing & Utilities",
    "dollars": 1287493.2
    },
    {
    "description": "Health Care",
    "dollars": 996564
    },
    {
    "description": "Transportation Services",
    "dollars": 259800.4
    },
    {
    "description": "Recreation Services",
    "dollars": 262290.3
    },
    {
    "description": "Food Services & Accommodations",
    "dollars": 419663.8
    },
    {
    "description": "Financial Services & Insurance",
    "dollars": 525665.1
    }
    ],
    "2002": [
    {
    "description": "Motor Vehicles & Parts",
    "dollars": 401346.5
    },
    {
    "description": "Furnishings & Durable Household Equipment",
    "dollars": 225868.3
    },
    {
    "description": "Recreational Goods & Vehicles",
    "dollars": 244773.3
    },
    {
    "description": "Food & Beverages (outside of home)",
    "dollars": 575052.2
    },
    {
    "description": "Clothing & Footwear",
    "dollars": 278834.8
    },
    {
    "description": "Gasoline & Other Energy Goods",
    "dollars": 167899.8
    },
    {
    "description": "Housing & Utilities",
    "dollars": 1333583.1
    },
    {
    "description": "Health Care",
    "dollars": 1082872.1
    },
    {
    "description": "Transportation Services",
    "dollars": 251873.5
    },
    {
    "description": "Recreation Services",
    "dollars": 271403.1
    },
    {
    "description": "Food Services & Accommodations",
    "dollars": 436310.5
    },
    {
    "description": "Financial Services & Insurance",
    "dollars": 534730
    }
    ],
    "2003": [
    {
    "description": "Motor Vehicles & Parts",
    "dollars": 401518.3
    },
    {
    "description": "Furnishings & Durable Household Equipment",
    "dollars": 235161
    },
    {
    "description": "Recreational Goods & Vehicles",
    "dollars": 259466.2
    },
    {
    "description": "Food & Beverages (outside of home)",
    "dollars": 599580.2
    },
    {
    "description": "Clothing & Footwear",
    "dollars": 285295.5
    },
    {
    "description": "Gasoline & Other Energy Goods",
    "dollars": 196411.7
    },
    {
    "description": "Housing & Utilities",
    "dollars": 1394119.2
    },
    {
    "description": "Health Care",
    "dollars": 1154049.4
    },
    {
    "description": "Transportation Services",
    "dollars": 259618.3
    },
    {
    "description": "Recreation Services",
    "dollars": 288864.8
    },
    {
    "description": "Food Services & Accommodations",
    "dollars": 462716
    },
    {
    "description": "Financial Services & Insurance",
    "dollars": 560280.4
    }
    ],
    "2004": [
    {
    "description": "Motor Vehicles & Parts",
    "dollars": 409310.9
    },
    {
    "description": "Furnishings & Durable Household Equipment",
    "dollars": 254310.4
    },
    {
    "description": "Recreational Goods & Vehicles",
    "dollars": 284842.1
    },
    {
    "description": "Food & Beverages (outside of home)",
    "dollars": 632604.5
    },
    {
    "description": "Clothing & Footwear",
    "dollars": 297379.6
    },
    {
    "description": "Gasoline & Other Energy Goods",
    "dollars": 232732.5
    },
    {
    "description": "Housing & Utilities",
    "dollars": 1469081.8
    },
    {
    "description": "Health Care",
    "dollars": 1238873.2
    },
    {
    "description": "Transportation Services",
    "dollars": 271149.6
    },
    {
    "description": "Recreation Services",
    "dollars": 311478.7
    },
    {
    "description": "Food Services & Accommodations",
    "dollars": 498229.4
    },
    {
    "description": "Financial Services & Insurance",
    "dollars": 605533.1
    }
    ],
    "2005": [
    {
    "description": "Motor Vehicles & Parts",
    "dollars": 409954.2
    },
    {
    "description": "Furnishings & Durable Household Equipment",
    "dollars": 271273.5
    },
    {
    "description": "Recreational Goods & Vehicles",
    "dollars": 306400.9
    },
    {
    "description": "Food & Beverages (outside of home)",
    "dollars": 668216.1
    },
    {
    "description": "Clothing & Footwear",
    "dollars": 310509.3
    },
    {
    "description": "Gasoline & Other Energy Goods",
    "dollars": 283769.9
    },
    {
    "description": "Housing & Utilities",
    "dollars": 1583620.5
    },
    {
    "description": "Health Care",
    "dollars": 1320533.1
    },
    {
    "description": "Transportation Services",
    "dollars": 283884.3
    },
    {
    "description": "Recreation Services",
    "dollars": 328124
    },
    {
    "description": "Food Services & Accommodations",
    "dollars": 533632.4
    },
    {
    "description": "Financial Services & Insurance",
    "dollars": 659045.3
    }
    ],
    "2006": [
    {
    "description": "Motor Vehicles & Parts",
    "dollars": 394949.3
    },
    {
    "description": "Furnishings & Durable Household Equipment",
    "dollars": 283597.6
    },
    {
    "description": "Recreational Goods & Vehicles",
    "dollars": 326319.7
    },
    {
    "description": "Food & Beverages (outside of home)",
    "dollars": 700260.4
    },
    {
    "description": "Clothing & Footwear",
    "dollars": 320022.8
    },
    {
    "description": "Gasoline & Other Energy Goods",
    "dollars": 319649.8
    },
    {
    "description": "Housing & Utilities",
    "dollars": 1682373.9
    },
    {
    "description": "Health Care",
    "dollars": 1391891.6
    },
    {
    "description": "Transportation Services",
    "dollars": 297056.4
    },
    {
    "description": "Recreation Services",
    "dollars": 351278.2
    },
    {
    "description": "Food Services & Accommodations",
    "dollars": 570600
    },
    {
    "description": "Financial Services & Insurance",
    "dollars": 694972
    }
    ],
    "2007": [
    {
    "description": "Motor Vehicles & Parts",
    "dollars": 400573
    },
    {
    "description": "Furnishings & Durable Household Equipment",
    "dollars": 283457.6
    },
    {
    "description": "Recreational Goods & Vehicles",
    "dollars": 339189.9
    },
    {
    "description": "Food & Beverages (outside of home)",
    "dollars": 737332
    },
    {
    "description": "Clothing & Footwear",
    "dollars": 323474.1
    },
    {
    "description": "Gasoline & Other Energy Goods",
    "dollars": 345546.6
    },
    {
    "description": "Housing & Utilities",
    "dollars": 1758182.3
    },
    {
    "description": "Health Care",
    "dollars": 1478209
    },
    {
    "description": "Transportation Services",
    "dollars": 307553.5
    },
    {
    "description": "Recreation Services",
    "dollars": 375593.8
    },
    {
    "description": "Food Services & Accommodations",
    "dollars": 601498.1
    },
    {
    "description": "Financial Services & Insurance",
    "dollars": 737182.8
    }
    ],
    "2008": [
    {
    "description": "Motor Vehicles & Parts",
    "dollars": 343337.2
    },
    {
    "description": "Furnishings & Durable Household Equipment",
    "dollars": 264348.6
    },
    {
    "description": "Recreational Goods & Vehicles",
    "dollars": 328061.1
    },
    {
    "description": "Food & Beverages (outside of home)",
    "dollars": 769085.5
    },
    {
    "description": "Clothing & Footwear",
    "dollars": 317372.5
    },
    {
    "description": "Gasoline & Other Energy Goods",
    "dollars": 391088.8
    },
    {
    "description": "Housing & Utilities",
    "dollars": 1835359.2
    },
    {
    "description": "Health Care",
    "dollars": 1555346.2
    },
    {
    "description": "Transportation Services",
    "dollars": 312689.1
    },
    {
    "description": "Recreation Services",
    "dollars": 389069.5
    },
    {
    "description": "Food Services & Accommodations",
    "dollars": 620152.1
    },
    {
    "description": "Financial Services & Insurance",
    "dollars": 756643.2
    }
    ],
    "2009": [
    {
    "description": "Motor Vehicles & Parts",
    "dollars": 318583.1
    },
    {
    "description": "Furnishings & Durable Household Equipment",
    "dollars": 238275.2
    },
    {
    "description": "Recreational Goods & Vehicles",
    "dollars": 297516.5
    },
    {
    "description": "Food & Beverages (outside of home)",
    "dollars": 772929.7
    },
    {
    "description": "Clothing & Footwear",
    "dollars": 304042.6
    },
    {
    "description": "Gasoline & Other Energy Goods",
    "dollars": 287027.5
    },
    {
    "description": "Housing & Utilities",
    "dollars": 1877656.3
    },
    {
    "description": "Health Care",
    "dollars": 1632736.9
    },
    {
    "description": "Transportation Services",
    "dollars": 297361.9
    },
    {
    "description": "Recreation Services",
    "dollars": 388399.3
    },
    {
    "description": "Food Services & Accommodations",
    "dollars": 612688.2
    },
    {
    "description": "Financial Services & Insurance",
    "dollars": 711260.5
    }
    ],
    "2010": [
    {
    "description": "Motor Vehicles & Parts",
    "dollars": 344466.2
    },
    {
    "description": "Furnishings & Durable Household Equipment",
    "dollars": 240924.2
    },
    {
    "description": "Recreational Goods & Vehicles",
    "dollars": 298612.2
    },
    {
    "description": "Food & Beverages (outside of home)",
    "dollars": 786866.1
    },
    {
    "description": "Clothing & Footwear",
    "dollars": 316611.3
    },
    {
    "description": "Gasoline & Other Energy Goods",
    "dollars": 336717.6
    },
    {
    "description": "Housing & Utilities",
    "dollars": 1903886
    },
    {
    "description": "Health Care",
    "dollars": 1699558.9
    },
    {
    "description": "Transportation Services",
    "dollars": 305153.4
    },
    {
    "description": "Recreation Services",
    "dollars": 403742.9
    },
    {
    "description": "Food Services & Accommodations",
    "dollars": 635670.7
    },
    {
    "description": "Financial Services & Insurance",
    "dollars": 754426.5
    }
    ],
    "2011": [
    {
    "description": "Motor Vehicles & Parts",
    "dollars": 365178.4
    },
    {
    "description": "Furnishings & Durable Household Equipment",
    "dollars": 246861.8
    },
    {
    "description": "Recreational Goods & Vehicles",
    "dollars": 305352.7
    },
    {
    "description": "Food & Beverages (outside of home)",
    "dollars": 819542.4
    },
    {
    "description": "Clothing & Footwear",
    "dollars": 332585.6
    },
    {
    "description": "Gasoline & Other Energy Goods",
    "dollars": 413800.9
    },
    {
    "description": "Housing & Utilities",
    "dollars": 1955928.9
    },
    {
    "description": "Health Care",
    "dollars": 1757146.1
    },
    {
    "description": "Transportation Services",
    "dollars": 328362.2
    },
    {
    "description": "Recreation Services",
    "dollars": 409015.1
    },
    {
    "description": "Food Services & Accommodations",
    "dollars": 669464.7
    },
    {
    "description": "Financial Services & Insurance",
    "dollars": 797915.3
    }
    ],
    "2012": [
    {
    "description": "Housing & Utilities",
    "dollars": 1996329.9
    },
    {
    "description": "Motor Vehicles & Parts",
    "dollars": 396607.9
    },
    {
    "description": "Furnishings & Durable Household Equipment",
    "dollars": 253938
    },
    {
    "description": "Recreational Goods & Vehicles",
    "dollars": 311821.3
    },
    {
    "description": "Food & Beverages (outside of home)",
    "dollars": 846198
    },
    {
    "description": "Clothing & Footwear",
    "dollars": 345219.5
    },
    {
    "description": "Gasoline & Other Energy Goods",
    "dollars": 421934.6
    },
    {
    "description": "Health Care",
    "dollars": 1821293.4
    },
    {
    "description": "Transportation Services",
    "dollars": 341050.3
    },
    {
    "description": "Recreation Services",
    "dollars": 430769.4
    },
    {
    "description": "Food Services & Accommodations",
    "dollars": 704927.9
    },
    {
    "description": "Financial Services & Insurance",
    "dollars": 820136.5
    }
    ],
    "2013": [
    {
    "description": "Motor Vehicles & Parts",
    "dollars": 417533
    },
    {
    "description": "Furnishings & Durable Household Equipment",
    "dollars": 263589.7
    },
    {
    "description": "Recreational Goods & Vehicles",
    "dollars": 321560.9
    },
    {
    "description": "Food & Beverages (outside of home)",
    "dollars": 863994
    },
    {
    "description": "Clothing & Footwear",
    "dollars": 350533.1
    },
    {
    "description": "Gasoline & Other Energy Goods",
    "dollars": 418248.3
    },
    {
    "description": "Housing & Utilities",
    "dollars": 2055263.3
    },
    {
    "description": "Health Care",
    "dollars": 1858240.3
    },
    {
    "description": "Transportation Services",
    "dollars": 359937
    },
    {
    "description": "Recreation Services",
    "dollars": 447059.8
    },
    {
    "description": "Food Services & Accommodations",
    "dollars": 732250.6
    },
    {
    "description": "Financial Services & Insurance",
    "dollars": 858389.4
    }
    ],
    "2014": [
    {
    "description": "Motor Vehicles & Parts",
    "dollars": 441992
    },
    {
    "description": "Furnishings & Durable Household Equipment",
    "dollars": 276166.5
    },
    {
    "description": "Recreational Goods & Vehicles",
    "dollars": 329928
    },
    {
    "description": "Food & Beverages (outside of home)",
    "dollars": 896855.4
    },
    {
    "description": "Clothing & Footwear",
    "dollars": 360750.6
    },
    {
    "description": "Gasoline & Other Energy Goods",
    "dollars": 403343.7
    },
    {
    "description": "Housing & Utilities",
    "dollars": 2149905.8
    },
    {
    "description": "Health Care",
    "dollars": 1940547.2
    },
    {
    "description": "Transportation Services",
    "dollars": 383041.7
    },
    {
    "description": "Recreation Services",
    "dollars": 466594.5
    },
    {
    "description": "Food Services & Accommodations",
    "dollars": 776933.8
    },
    {
    "description": "Financial Services & Insurance",
    "dollars": 908093.6
    }
    ],
    "2015": [
    {
    "description": "Motor Vehicles & Parts",
    "dollars": 475346
    },
    {
    "description": "Furnishings & Durable Household Equipment",
    "dollars": 294219.7
    },
    {
    "description": "Recreational Goods & Vehicles",
    "dollars": 336482.1
    },
    {
    "description": "Food & Beverages (outside of home)",
    "dollars": 920955.4
    },
    {
    "description": "Clothing & Footwear",
    "dollars": 368734.4
    },
    {
    "description": "Gasoline & Other Energy Goods",
    "dollars": 309433.8
    },
    {
    "description": "Housing & Utilities",
    "dollars": 2257891.2
    },
    {
    "description": "Health Care",
    "dollars": 2057323.2
    },
    {
    "description": "Transportation Services",
    "dollars": 398671.3
    },
    {
    "description": "Recreation Services",
    "dollars": 491666.5
    },
    {
    "description": "Food Services & Accommodations",
    "dollars": 832868.4
    },
    {
    "description": "Financial Services & Insurance",
    "dollars": 957305.2
    }
    ],
    "2016": [
    {
    "description": "Motor Vehicles & Parts",
    "dollars": 485553.6
    },
    {
    "description": "Furnishings & Durable Household Equipment",
    "dollars": 309367.1
    },
    {
    "description": "Recreational Goods & Vehicles",
    "dollars": 351429.7
    },
    {
    "description": "Food & Beverages (outside of home)",
    "dollars": 939860.5
    },
    {
    "description": "Clothing & Footwear",
    "dollars": 376363.7
    },
    {
    "description": "Gasoline & Other Energy Goods",
    "dollars": 275038
    },
    {
    "description": "Housing & Utilities",
    "dollars": 2358451.8
    },
    {
    "description": "Health Care",
    "dollars": 2165095.7
    },
    {
    "description": "Transportation Services",
    "dollars": 419354.3
    },
    {
    "description": "Recreation Services",
    "dollars": 518259
    },
    {
    "description": "Food Services & Accommodations",
    "dollars": 873236
    },
    {
    "description": "Financial Services & Insurance",
    "dollars": 983969.3
    }
    ],
    "2017": [
    {
    "description": "Motor Vehicles & Parts",
    "dollars": 503642.6
    },
    {
    "description": "Furnishings & Durable Household Equipment",
    "dollars": 324744.9
    },
    {
    "description": "Recreational Goods & Vehicles",
    "dollars": 374173.3
    },
    {
    "description": "Food & Beverages (outside of home)",
    "dollars": 970152.7
    },
    {
    "description": "Clothing & Footwear",
    "dollars": 379964.6
    },
    {
    "description": "Gasoline & Other Energy Goods",
    "dollars": 308992.7
    },
    {
    "description": "Housing & Utilities",
    "dollars": 2459513.5
    },
    {
    "description": "Health Care",
    "dollars": 2248280.8
    },
    {
    "description": "Transportation Services",
    "dollars": 440328.2
    },
    {
    "description": "Recreation Services",
    "dollars": 538527.7
    },
    {
    "description": "Food Services & Accommodations",
    "dollars": 913718.2
    },
    {
    "description": "Financial Services & Insurance",
    "dollars": 1052396.5
    }
    ],
    "2018": [
    {
    "description": "Motor Vehicles & Parts",
    "dollars": 523226.5
    },
    {
    "description": "Furnishings & Durable Household Equipment",
    "dollars": 343326.3
    },
    {
    "description": "Recreational Goods & Vehicles",
    "dollars": 399002.7
    },
    {
    "description": "Food & Beverages (outside of home)",
    "dollars": 998796.4
    },
    {
    "description": "Clothing & Footwear",
    "dollars": 394236.8
    },
    {
    "description": "Gasoline & Other Energy Goods",
    "dollars": 349237.8
    },
    {
    "description": "Housing & Utilities",
    "dollars": 2570215.3
    },
    {
    "description": "Health Care",
    "dollars": 2345008.1
    },
    {
    "description": "Transportation Services",
    "dollars": 466687.5
    },
    {
    "description": "Recreation Services",
    "dollars": 561805.2
    },
    {
    "description": "Food Services & Accommodations",
    "dollars": 961222.1
    },
    {
    "description": "Financial Services & Insurance",
    "dollars": 1119528.6
    }
    ],
    "2019": [
    {
    "description": "Motor Vehicles & Parts",
    "dollars": 521845.9
    },
    {
    "description": "Furnishings & Durable Household Equipment",
    "dollars": 357440.3
    },
    {
    "description": "Recreational Goods & Vehicles",
    "dollars": 433364.4
    },
    {
    "description": "Food & Beverages (outside of home)",
    "dollars": 1025661.7
    },
    {
    "description": "Clothing & Footwear",
    "dollars": 403465.8
    },
    {
    "description": "Gasoline & Other Energy Goods",
    "dollars": 335441.7
    },
    {
    "description": "Housing & Utilities",
    "dollars": 2681180.4
    },
    {
    "description": "Health Care",
    "dollars": 2450839.1
    },
    {
    "description": "Transportation Services",
    "dollars": 483421.3
    },
    {
    "description": "Recreation Services",
    "dollars": 580444.7
    },
    {
    "description": "Food Services & Accommodations",
    "dollars": 999500.8
    },
    {
    "description": "Financial Services & Insurance",
    "dollars": 1176055.2
    }
    ]
    }



chart.data = JSON.parse(JSON.stringify(allData[year]));
categoryAxis.zoom({ start: 0, end: 1 / chart.data.length });

series.events.on("inited", function() {
  setTimeout(function() {
    playButton.isActive = true;
  }, 2000)
})


