	// WAIT FOR THE DOM OBJECT TO LOAD UP
	$(document).ready(function() {

		requestMarketDepth();
		requestPositionsPivot();
		requestTradesPivot();
		requestRfqSumPivot();
		requestRfqCountPivot();
		////requestRfqClientDealerPivot();
		requestRfqBlotter();
		//requestRfqDealerQuoteRatePivot();
		requestDealerLogins();
		requestReportedTrades();
		requestNews();
		//////requestPnL();
        ////requestLeaderboard();


	   	var stickyNavTop = $('#news_panel').offset().top;
	   	
	   	var stickyNav = function(){
		    var scrollTop = $(window).scrollTop(); // our current vertical position from the top

		    if (scrollTop > stickyNavTop) { 
		        $('#news_panel').addClass('sticky');
		    } else {
		        $('#news_panel').removeClass('sticky'); 
		    }
		};

		stickyNav();

		$(window).scroll(function() {
			stickyNav();
		});

	 });

	function requestMarketDepth() {

        $('.marketDepth').each(function() {
        	var marketInfo = this.id.split("_");
        	var this_market = marketInfo[0];
        	var this_instrument = marketInfo[1];
    		$.ajax({
	            type: "POST",
	            url: 'http://flowmonster.jpmchase.net:11011/room2/ajax_data_grabber.jsp?mkt=' + this_market + '&imnt=' + this_instrument,

	            async: false, 
	            cache: false,
	            timeout:2000, 
	            success: function(data) {
	            	$('#' + this_market + "_" + this_instrument).html(data);
	            },
	            error: function (xhr, ajaxOptions, thrownError) {
			        $('#' + this_market + "_" + this_instrument).html("<p class='marketEntry marketError'>Error loading depth...</p><p>" + ajaxOptions + "  " + thrownError + "</p>");
			    }	
	        });
		});
        
		setTimeout( requestMarketDepth, 1000 );
    };

    function requestTradesPivot() {

    	var tradesPivot = $('#trades_pivot');
		$.ajax({
            type: "POST",
            url: 'http://flowmonster.jpmchase.net:11011/room2/ajax_positions.jsp?type=trades',

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
            url: 'http://flowmonster.jpmchase.net:11011/room2/ajax_positions.jsp?type=positions',

            async: false, 
            cache: false,
            timeout:4000, 
            success: function(data) {
            	positionsPivot.html(data);
            },
            error: function (xhr, ajaxOptions, thrownError) {
		        positionsPivot.html("<p class='marketEntry marketError'>Error loading positions...</p><p>" + ajaxOptions + "  " + thrownError + "</p>");
		    }	
        });
        
		setTimeout( requestPositionsPivot, 1500 );
    };

    function requestRfqSumPivot() {

    	var rfqPivot = $('#rfq_pivot');
		$.ajax({
            type: "POST",
            url: 'http://flowmonster.jpmchase.net:11011/room2/ajax_rfq_summary.jsp?type=quantity',

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
            url: 'http://flowmonster.jpmchase.net:11011/room2/ajax_rfq_summary.jsp?type=count',

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
            url: 'http://flowmonster.jpmchase.net:11011/room2/ajax_rfq_client_dealer.jsp?type=count',

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
            url: 'http://flowmonster.jpmchase.net:11011/room2/ajax_rfq_client_dealer.jsp?type=volume',

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
            url: 'http://flowmonster.jpmchase.net:11011/room2/ajax_rfq_client_dealer.jsp?type=quoterate',

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
            url: 'http://flowmonster.jpmchase.net:11011/room2/ajax_dealer_logins.jsp',

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
            url: 'http://flowmonster.jpmchase.net:11011/room2/ajax_reported_trades.jsp',

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
            url: 'http://flowmonster.jpmchase.net:11011/room2/ajax_rfqs.jsp',

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
            url: 'http://flowmonster.jpmchase.net:11011/room2/ajax_news.jsp',

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
            url: 'http://flowmonster.jpmchase.net:11011/room2/ajax_pnl.jsp',

            async: false, 
            cache: false,
            timeout:4000, 
            success: function(data) {
            	pnl_panel.html(data);
            },
            error: function (xhr, ajaxOptions, thrownError) {
		        pnl_panel.html("<p class='marketEntry marketError'>Error loading pnl...</p><p>" + ajaxOptions + "  " + thrownError + "</p>");
		    }	
        });
        
		setTimeout( requestPnL, 2000 );
    };

    function requestLeaderboard() {

        var leaderboard_panel = $('#leaderboard');
        $.ajax({
            type: "POST",
            url: 'http://flowmonster.jpmchase.net:11011/room2/ajax_leaderboard.jsp',

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
