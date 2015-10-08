!function(root) {
	root.fm = {};

	var backgroundColor = '#252830';
	var deepSafe = '#18641D';
	var safe = '#1bc98e';
	var danger = '#FFCBC2';
	var deepDanger = '#e64759';
    var fontcolor = '#cfd2da';

	var exampleReportedTradesCSV = 'Dealer,Counterparty,Instrument,Trade ID,Side,Price,Quantity,Trade Time\nFM09,Charlie,10yr,TR-TST-1000,BUY,150,140,201510081000\nFM09,Charlie,2yr,TR-TST-1001,SELL,170,100,201510081001\nFM09,Charlie,5yr,TR-TST-1002,BUY,190,150,201510081002\nFM09,Anna,10yr,TR-TST-1003,SELL,210,160,201510081003\nFM09,Anna,7yr,TR-TST-1004,BUY,230,500,201510081004\nFM09,Anna,30yr,TR-TST-1005,SELL,250,200,201510081005\nFM09,Anna,10yr,TR-TST-1006,BUY,270,220,201510081006\nFM09,Ben,2yr,TR-TST-1007,SELL,290,130,201510081007\nFM09,Ben,5yr,TR-TST-1008,BUY,310,110,201510081008\nFM09,Ben,5yr,TR-TST-1009,BUY,330,160,201510081009';
	requestMarketDepth();
	requestPositionsPivot();
	requestPnL();
    handleReportedTrades(exampleReportedTradesCSV);


	function requestMarketDepth() {
		console.log('in requestMarketDepth');
        $('.marketDepth-div').each(function(idx, elem) {
    		$.ajax({
	            type: "POST",
	            url: 'http://flowmonster.jpmchase.net:11011/room1/ajax_data_grabber.jsp?mkt=CBOT&imnt=' + $(elem).attr('data-imnt'),
	            cache: false,
	            timeout:2000, 
	            success: function(data) {
	            	handleMarketDepth(data, $(elem).attr('data-imnt'));
	            	
	            },
	            error: function (xhr, ajaxOptions, thrownError) {
			        console.log("<p class='marketEntry marketError'>Error loading depth...</p><p>" + ajaxOptions + "  " + thrownError + "</p>");
			    }	
	        });
		});
    };

    function handleMarketDepth(data, imnt) {
    	console.log('in handle handleMarketDepth');
    	var dom = $('<div>' + data + '</div>');
    	if (!dom.find('.buy_sell_progress').next().hasClass('marketExtraDepth')) {
    		console.log('padding no more offers');
    		dom.find('.buy_sell_progress').after('<p class="marketEntry marketExtraDepth marketEntryBoundaryOffer">No more offers</p>');
    	}
    	// dom.find('.depthAskDealerName, .depthBidDealerName').css('background-color', 'transparent');
    	console.log(dom.find('.depthAskDealerName, depthBidDealerName'));
    	console.log($('.marketDepth-div[data-imnt='+ imnt +']'));
    	$('.marketDepth-div[data-imnt='+ imnt +']').html(dom);
    }

    function requestTradesPivot() {

    	var tradesPivot = $('#trades_pivot');
		$.ajax({
            type: "POST",
            url: 'http://flowmonster.jpmchase.net:11011/room1/ajax_positions.jsp?type=trades',

            async: false, 
            cache: false,
            timeout:4000, 
            success: function(data) {
            	tradesPivot.html(data);
            },
            error: function (xhr, ajaxOptions, thrownError) {
		        tradesPivot.html("<p class='marketEntry marketError'>Error loading trades...</p><p>" + ajaxOptions + "  " + thrownError + "</p>");
		    }	
        });
        
		setTimeout( requestTradesPivot, 1500 );
    };

    function requestPositionsPivot() {

    	var positionsPivot = $('#positions_pivot');
		$.ajax({
            type: "POST",
            url: 'http://flowmonster.jpmchase.net:11011/room1/ajax_positions.jsp?type=positions',
            cache: false,
            timeout: 4000, 
            success: function(data) {
            	handlePositionsPivot(data);
            },
            error: function (xhr, ajaxOptions, thrownError) {
		        console.log("<p class='marketEntry marketError'>Error loading positions...</p><p>" + ajaxOptions + "  " + thrownError + "</p>");
		    }	
        });
    };

    function handlePositionsPivot(data) {
        console.log('in handlePositionsPivot');
        var dom = $(data);
        var myPositions;
        dom.find('.row_title').each(function(idx, elem) {
            if ($(elem).text() == 'FM09') {
                myPositions = $(elem);
                return false;
            }
        });

        if (!myPositions) {
            myPositions = $(
                '<tr>'+
                    '<td class="center row_title" style="background-color: #641838; color: white; font-weight: bold">FM09</td>'+
                    '<td class="center cell_lowlight_zero">0</td>'+
                    '<td class="center cell_lowlight_pos" >6,830</td>'+
                    '<td class="center cell_lowlight_neg" >-15,928</td>'+
                    '<td class="center cell_highlight_pos" >11,224</td>'+
                    '<td class="center cell_highlight_neg" >-4,381</td>'+
                    '<td class="center cell_highlight_zero" >0</td>'+
                    '<td class="center cell_notice" >2,140</td>'+
                '</tr>'
            );
        }
        else {
            myPositions = myPositions.parent();
        }
        
        var tds = myPositions.find('td');
        var posdivs = $('.position-div');
        console.log(tds, posdivs);
        for (var i=1; i<=7; i++) {
            // TODO
            var td = tds.eq(i);
            var posdiv = posdivs.eq(i);
            console.log(td.attr('class'), td.text());
            posdiv.find('h3').attr('class', td.attr('class'));
            posdiv.find('h3').text(td.text());
        }
    }

    function handleReportedTrades(tradesCSV) {
    	console.log('in handleReportedTrades')
    	var lines = tradesCSV.split('\n');
    	console.log(lines);
    	
    	$.each(lines, function(idx, line) {
    		if (idx == 0) {
    			return true;
    		}
    		console.log('line: ' + line);
    		var fields = line.split(',');
    		var tr = $('<tr>');
    		$.each(fields, function(idx, field) {
    			var td = $('<td>'+ field + '</td>');
    			if (idx == 4) {
    				if (td.text() == 'BUY') {
    					td.css('color', deepDanger);	
    				}
    				else {
    					td.css('color', safe);		
    				}
    			}
    			tr.append(td);
    		})
    		$('.reported-trades-tbody').append(tr);
    	});

    	$('[data-sort="table"]').tablesorter();

    }

    function requestRfqSumPivot() {

    	var rfqPivot = $('#rfq_pivot');
		$.ajax({
            type: "POST",
            url: 'http://flowmonster.jpmchase.net:11011/room1/ajax_rfq_summary.jsp?type=quantity',

            async: false, 
            cache: false,
            timeout:4000, 
            success: function(data) {
            	rfqPivot.html(data);
            },
            error: function (xhr, ajaxOptions, thrownError) {
		        rfqPivot.html("<p class='marketEntry marketError'>Error loading rfq summary...</p><p>" + ajaxOptions + "  " + thrownError + "</p>");
		    }	
        });
        
		setTimeout( requestRfqSumPivot, 1500 );
    };

    function requestRfqCountPivot() {

    	var rfqCountPivot = $('#rfq_count_pivot');
		$.ajax({
            type: "POST",
            url: 'http://flowmonster.jpmchase.net:11011/room1/ajax_rfq_summary.jsp?type=count',

            async: false, 
            cache: false,
            timeout:4000, 
            success: function(data) {
            	rfqCountPivot.html(data);
            },
            error: function (xhr, ajaxOptions, thrownError) {
		        rfqCountPivot.html("<p class='marketEntry marketError'>Error loading rfq count summary...</p><p>" + ajaxOptions + "  " + thrownError + "</p>");
		    }	
        });
        
		setTimeout( requestRfqCountPivot, 1500 );
    };

    function requestRfqClientDealerPivot() {

    	var rfqClientDealerPivot = $('#rfq_client_dealer_pivot');
		$.ajax({
            type: "POST",
            url: 'http://flowmonster.jpmchase.net:11011/room1/ajax_rfq_client_dealer.jsp?type=count',

            async: false, 
            cache: false,
            timeout:4000, 
            success: function(data) {
            	rfqClientDealerPivot.html(data);
            },
            error: function (xhr, ajaxOptions, thrownError) {
		        rfqClientDealerPivot.html("<p class='marketEntry marketError'>Error loading rfq client dealer summary...</p><p>" + ajaxOptions + "  " + thrownError + "</p>");
		    }	
        });
        
		setTimeout( requestRfqClientDealerPivot, 1500 );
    };

    function requestRfqClientDealerVolumePivot() {

    	var rfqClientDealerVolumePivot = $('#rfq_client_dealer_vol_pivot');
		$.ajax({
            type: "POST",
            url: 'http://flowmonster.jpmchase.net:11011/room1/ajax_rfq_client_dealer.jsp?type=volume',

            async: false, 
            cache: false,
            timeout:4000, 
            success: function(data) {
            	rfqClientDealerVolumePivot.html(data);
            },
            error: function (xhr, ajaxOptions, thrownError) {
		        rfqClientDealerVolumePivot.html("<p class='marketEntry marketError'>Error loading rfq client dealer summary...</p><p>" + ajaxOptions + "  " + thrownError + "</p>");
		    }	
        });
        
		setTimeout( requestRfqClientDealerVolumePivot, 1500 );
    };

    function requestRfqDealerQuoteRatePivot() {

    	var rfqDealerQuoteRatePivot = $('#rfq_dealer_quote_rate_pivot');
		$.ajax({
            type: "POST",
            url: 'http://flowmonster.jpmchase.net:11011/room1/ajax_rfq_client_dealer.jsp?type=quoterate',

            async: false, 
            cache: false,
            timeout:4000, 
            success: function(data) {
            	rfqDealerQuoteRatePivot.html(data);
            },
            error: function (xhr, ajaxOptions, thrownError) {
		        rfqDealerQuoteRatePivot.html("<p class='marketEntry marketError'>Error loading rfq client dealer summary...</p><p>" + ajaxOptions + "  " + thrownError + "</p>");
		    }	
        });
        
		setTimeout( requestRfqDealerQuoteRatePivot, 1500 );
    };

    function requestDealerLogins() {

    	var dealerLoginsPivot = $('#dealer_logins_pivot');
		$.ajax({
            type: "POST",
            url: 'http://flowmonster.jpmchase.net:11011/room1/ajax_dealer_logins.jsp',

            async: false, 
            cache: false,
            timeout:4000, 
            success: function(data) {
            	dealerLoginsPivot.html(data);
            },
            error: function (xhr, ajaxOptions, thrownError) {
		        dealerLoginsPivot.html("<p class='marketEntry marketError'>Error loading dealer logins...</p><p>" + ajaxOptions + "  " + thrownError + "</p>");
		    }	
        });
        
		setTimeout( requestDealerLogins, 1500 );
    };

    function requestReportedTrades() {

    	var reportedTradesPivot = $('#reported_trades');
		$.ajax({
            type: "POST",
            url: 'http://flowmonster.jpmchase.net:11011/room1/ajax_reported_trades.jsp',

            async: false, 
            cache: false,
            timeout:4000, 
            success: function(data) {
            	reportedTradesPivot.html(data);
            },
            error: function (xhr, ajaxOptions, thrownError) {
		        reportedTradesPivot.html("<p class='marketEntry marketError'>Error loading reported trades...</p><p>" + ajaxOptions + "  " + thrownError + "</p>");
		    }	
        });
        
		setTimeout( requestReportedTrades, 1500 );
    };

    function requestRfqBlotter() {

    	var rfq_blotter = $('#rfq_blotter');
		$.ajax({
            type: "POST",
            url: 'http://flowmonster.jpmchase.net:11011/room1/ajax_rfqs.jsp',

            async: false, 
            cache: false,
            timeout:4000, 
            success: function(data) {
            	rfq_blotter.html(data);
            },
            error: function (xhr, ajaxOptions, thrownError) {
		        rfq_blotter.html("<p class='marketEntry marketError'>Error loading rfq blotter...</p><p>" + ajaxOptions + "  " + thrownError + "</p>");
		    }	
        });
        
		setTimeout( requestRfqBlotter, 2000 );
    };

    function requestNews() {

    	var news_panel = $('#news_panel');
		$.ajax({
            type: "POST",
            url: 'http://flowmonster.jpmchase.net:11011/room1/ajax_news.jsp',

            async: false, 
            cache: false,
            timeout:4000, 
            success: function(data) {
            	news_panel.html(data);
            },
            error: function (xhr, ajaxOptions, thrownError) {
		        news_panel.html("<p class='marketEntry marketError'>Error loading news...</p><p>" + ajaxOptions + "  " + thrownError + "</p>");
		    }	
        });
        
		setTimeout( requestNews, 2000 );
    };

    function requestPnL() {

    	var pnl_panel = $('#pnl_panel');
		$.ajax({
            type: "POST",
            url: 'http://flowmonster.jpmchase.net:11011/room1/ajax_pnl.jsp',

            cache: false,
            timeout:4000, 
            success: function(data) {
            	handlePnL(data);
            },
            error: function (xhr, ajaxOptions, thrownError) {
		        console.log("<p class='marketEntry marketError'>Error loading pnl...</p><p>" + ajaxOptions + "  " + thrownError + "</p>");
		    }	
        });
    };

    function handlePnL(data) {
        // TODO
        console.log('in handlePnLPivot');
        var dom = $(data);
        var myPnL;
        dom.find('.row_title').each(function(idx, elem) {
            if ($(elem).text() == 'FM09') {
                myPnL = $(elem);
                return false;
            }
        });

        if (!myPnL) {
            myPnL = $(
                '<tr>'+
                '<td class="center row_title" style="background-color: #9F6A27; color: white; font-weight: bold">FM09</td>'+
                '<td class="center cell_lowlight_neg">-473,286</td>'+
                '<td class="center cell_highlight_pos" >74</td>'+
                '<td class="center cell_highlight_pos" >0</td>'+
                '<td class="center cell_highlight_pos" >0</td>'+
                '<td class="center cell_highlight_pos" >22,744</td>'+
                '<td class="center cell_highlight_neg" >-501,797</td>'+
                '<td class="center cell_highlight_pos" >5,693</td>'+
                '</tr>'
            );
        }
        else {
            myPnL = myPnL.parent();
        }
        
        var tds = myPnL.find('td');
        var posdivs = $('.pnl-div');
        console.log(tds, posdivs);
        for (var i=1; i<=7; i++) {
            // TODO
            var td = tds.eq(i);
            var posdiv = posdivs.eq(i);
            console.log(td.attr('class'), td.text());
            posdiv.find('h3').attr('class', td.attr('class'));
            posdiv.find('h3').text(td.text());
        }
    }

    function requestLeaderboard() {

        var leaderboard_panel = $('#leaderboard');
        $.ajax({
            type: "POST",
            url: 'http://flowmonster.jpmchase.net:11011/room1/ajax_leaderboard.jsp',

            async: false,
            cache: false,
            timeout:4000,
            success: function(data) {
                leaderboard_panel.html(data);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                leaderboard_panel.html("<p class='marketEntry marketError'>Error loading Leaderboard...</p><p>" + ajaxOptions + "  " + thrownError + "</p>");
            }
        });

        setTimeout( requestLeaderboard, 2000 );
    };


}(window)

console.log('fm dashboard.js done', window.fm);