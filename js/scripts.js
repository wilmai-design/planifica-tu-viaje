$(document).ready(function () {
    var trigger = $('.hamburger'),
        overlay = $('.overlay'),
       isClosed = false;
  
      trigger.click(function () {
        hamburger_cross();      
      });
  
      function hamburger_cross() {
  
        if (isClosed == true) {          
          overlay.hide();
          trigger.removeClass('is-open');
          trigger.addClass('is-closed');
          isClosed = false;
        } else {   
          overlay.show();
          trigger.removeClass('is-closed');
          trigger.addClass('is-open');
          isClosed = true;
        }
    }
    
    $('[data-toggle="offcanvas"]').click(function () {
          $('#wrapper').toggleClass('toggled');
    });


    
  });

  
  google.load("visualization", "1", {packages:["corechart"]});
  google.setOnLoadCallback(drawCharts);
  function drawCharts() {
    
    // BEGIN BAR CHART
    /*
    // create zero data so the bars will 'grow'
    var barZeroData = google.visualization.arrayToDataTable([
      ['Day', 'Page Views', 'Unique Views'],
      ['Sun',  0,      0],
      ['Mon',  0,      0],
      ['Tue',  0,      0],
      ['Wed',  0,      0],
      ['Thu',  0,      0],
      ['Fri',  0,      0],
      ['Sat',  0,      0]
    ]);
    */
    // actual bar chart data
    var barData = google.visualization.arrayToDataTable([
      ['Day', 'Page Views', 'Unique Views'],
      ['Sun',  1050,      600],
      ['Mon',  1370,      910],
      ['Tue',  660,       400],
      ['Wed',  1030,      540],
      ['Thu',  1000,      480],
      ['Fri',  1170,      960],
      ['Sat',  660,       320]
    ]);
    // set bar chart options
    var barOptions = {
      focusTarget: 'category',
      backgroundColor: 'transparent',
      colors: ['cornflowerblue', 'tomato'],
      fontName: 'Open Sans',
      chartArea: {
        left: 50,
        top: 10,
        width: '100%',
        height: '70%'
      },
      bar: {
        groupWidth: '80%'
      },
      hAxis: {
        textStyle: {
          fontSize: 11
        }
      },
      vAxis: {
        minValue: 0,
        maxValue: 1500,
        baselineColor: '#DDD',
        gridlines: {
          color: '#DDD',
          count: 4
        },
        textStyle: {
          fontSize: 11
        }
      },
      legend: {
        position: 'bottom',
        textStyle: {
          fontSize: 12
        }
      },
      animation: {
        duration: 1200,
        easing: 'out',
        startup: true
      }
    };
    // draw bar chart twice so it animates
    var barChart = new google.visualization.ColumnChart(document.getElementById('bar-chart'));
    //barChart.draw(barZeroData, barOptions);
    barChart.draw(barData, barOptions);
    
    // BEGIN LINE GRAPH
    
    function randomNumber(base, step) {
      return Math.floor((Math.random()*step)+base);
    }
    function createData(year, start1, start2, step, offset) {
      var ar = [];
      for (var i = 0; i < 12; i++) {
        ar.push([new Date(year, i), randomNumber(start1, step)+offset, randomNumber(start2, step)+offset]);
      }
      return ar;
    }
    var randomLineData = [
      ['Year', 'Page Views', 'Unique Views']
    ];
    for (var x = 0; x < 7; x++) {
      var newYear = createData(2007+x, 10000, 5000, 4000, 800*Math.pow(x,2));
      for (var n = 0; n < 12; n++) {
        randomLineData.push(newYear.shift());
      }
    }
    var lineData = google.visualization.arrayToDataTable(randomLineData);
    
    /*
    var animLineData = [
      ['Year', 'Page Views', 'Unique Views']
    ];
    for (var x = 0; x < 7; x++) {
      var zeroYear = createData(2007+x, 0, 0, 0, 0);
      for (var n = 0; n < 12; n++) {
        animLineData.push(zeroYear.shift());
      }
    }
    var zeroLineData = google.visualization.arrayToDataTable(animLineData);
    */
  
    var lineOptions = {
      backgroundColor: 'transparent',
      colors: ['cornflowerblue', 'tomato'],
      fontName: 'Open Sans',
      focusTarget: 'category',
      chartArea: {
        left: 50,
        top: 10,
        width: '100%',
        height: '70%'
      },
      hAxis: {
        //showTextEvery: 12,
        textStyle: {
          fontSize: 11
        },
        baselineColor: 'transparent',
        gridlines: {
          color: 'transparent'
        }
      },
      vAxis: {
        minValue: 0,
        maxValue: 50000,
        baselineColor: '#DDD',
        gridlines: {
          color: '#DDD',
          count: 4
        },
        textStyle: {
          fontSize: 11
        }
      },
      legend: {
        position: 'bottom',
        textStyle: {
          fontSize: 12
        }
      },
      animation: {
        duration: 1200,
        easing: 'out',
        startup: true
      }
    };
  
    var lineChart = new google.visualization.LineChart(document.getElementById('line-chart'));
    //lineChart.draw(zeroLineData, lineOptions);
    lineChart.draw(lineData, lineOptions);
    
    // BEGIN PIE CHART
    
    // pie chart data
    var pieData = google.visualization.arrayToDataTable([
      ['Country', 'Page Hits'],
      ['USA',      7242],
      ['Canada',   4563],
      ['Mexico',   1345],
      ['Sweden',    946],
      ['Germany',  2150]
    ]);
    // pie chart options
    var pieOptions = {
      backgroundColor: 'transparent',
      pieHole: 0.4,
      colors: [ "cornflowerblue", 
                "olivedrab", 
                "orange", 
                "tomato", 
                "crimson", 
                "purple", 
                "turquoise", 
                "forestgreen", 
                "navy", 
                "gray"],
      pieSliceText: 'value',
      tooltip: {
        text: 'percentage'
      },
      fontName: 'Open Sans',
      chartArea: {
        width: '100%',
        height: '94%'
      },
      legend: {
        textStyle: {
          fontSize: 13
        }
      }
    };
    // draw pie chart
    var pieChart = new google.visualization.PieChart(document.getElementById('pie-chart'));
    pieChart.draw(pieData, pieOptions);
  }

  function createDonutCharts() {
    $("<style type='text/css' id='dynamic' />").appendTo("head");
    $("div[chart-type*=donut]").each(function () {
        var d = $(this);
        var id = $(this).attr('id');
        var max = $(this).data('chart-max');
        if ($(this).data('chart-text')) {
            var text = $(this).data('chart-text');
        } else {
            var text = "";
        }
        if ($(this).data('chart-caption')) {
            var caption = $(this).data('chart-caption');
        } else {
            var caption = "";
        }
        if ($(this).data('chart-initial-rotate')) {
            var rotate = $(this).data('chart-initial-rotate');
        } else {
            var rotate = 0;
        }
        var segments = $(this).data('chart-segments');

        for (var i = 0; i < Object.keys(segments).length; i++) {
            var s = segments[i];
            var start = ((s[0] / max) * 360) + rotate;
            var deg = ((s[1] / max) * 360);
            if (s[1] >= (max / 2)) {
                d.append('<div class="large donut-bite" data-segment-index="' + i + '"> ');
            } else {
                d.append('<div class="donut-bite" data-segment-index="' + i + '"> ');
            }
            var style = $("#dynamic").text() + "#" + id + " .donut-bite[data-segment-index=\"" + i + "\"]{-moz-transform:rotate(" + start + "deg);-ms-transform:rotate(" + start + "deg);-webkit-transform:rotate(" + start + "deg);-o-transform:rotate(" + start + "deg);transform:rotate(" + start + "deg);}#" + id + " .donut-bite[data-segment-index=\"" + i + "\"]:BEFORE{-moz-transform:rotate(" + deg + "deg);-ms-transform:rotate(" + deg + "deg);-webkit-transform:rotate(" + deg + "deg);-o-transform:rotate(" + deg + "deg);transform:rotate(" + deg + "deg); background-color: " + s[2] + ";}#" + id + " .donut-bite[data-segment-index=\"" + i + "\"]:BEFORE{ background-color: " + s[2] + ";}#" + id + " .donut-bite[data-segment-index=\"" + i + "\"].large:AFTER{ background-color: " + s[2] + ";}";
            $("#dynamic").text(style);
        }

        d.children().first().before("<div class='donut-hole'><span class='donut-filling'>" + text + "</span></div>");
        d.append("<div class='donut-caption-wrapper'><span class='donut-caption'>" + caption + "</span></div>");
    });
}

$(document).ready(function() {
    createDonutCharts();
});