
var config = {
	server: {

		dmz: false,
		env: 'PROD',
		ids: 'https://idserv-dev.jpmchase.net',
		region: 'AMERICAS',
		regexp: /^https\:\/\/idserv\.jpmchase\.net/i,
		myregexp: /^https\:\/\/mytechub\.jpmchase\.net/i,

		init : function () {

			//Get first part of hostname
			var host = window.location.hostname.toLowerCase().split('.')[0];

			//Get data associated with hostname or apply defaults
			var data = this.hosts[host] || {};

			//Override defaults with data
			for (var prop in data) {
				this[prop] = data[prop];
			}
		},

		hosts: {

			'smlogin.apac-dev': {
				region: 'APAC',
				env: 'DEV',
				ids: 'https://idserv-dev.jpmchase.net',
                                mids: 'https://mytechub.jpmchase.net/v2/#/passwordresets/sso/development'
			},
			'smlogin-emea-dev': {
				region: 'EMEA',
				env: 'DEV',
				ids: 'https://idserv-dev.jpmchase.net',
                                mids: 'https://mytechub.jpmchase.net/v2/#/passwordresets/sso/development'
			},
			'smlogin-dev': {
				region: 'AMERICAS',
				env: 'DEV',
				ids: 'https://idserv-dev.jpmchase.net',
                                mids: 'https://mytechub.jpmchase.net/v2/#/passwordresets/sso/development'
			},
			'smlogin-np-dev': {
				region: 'AMERICAS',
				env: 'DEV',
				ids: 'https://idserv-dev.jpmchase.net',
                                mids: 'https://mytechub.jpmchase.net/v2/#/passwordresets/sso/development'
			},
			'smlogin-apac-qa': {
				region: 'APAC',
				env: 'QA',
				ids: 'https://idserv-qa.jpmchase.net',
                                mids: 'https://mytechub.jpmchase.net/v2/#/passwordresets/sso/qa'
			},
			'smlogin-emea-qa': {
				region: 'EMEA',
				env: 'QA',
				ids: 'https://idserv-qa.jpmchase.net',
                                mids: 'https://mytechub.jpmchase.net/v2/#/passwordresets/sso/qa'
			},
			'smlogin-qa': {
				region: 'AMERICAS',
				env: 'QA',
				ids: 'https://idserv-qa.jpmchase.net',
                                mids: 'https://mytechub.jpmchase.net/v2/#/passwordresets/sso/qa'
			},
			'smlogin-qa-np': {
				region: 'AMERICAS',
				env: 'QA',
				ids: 'https://idserv-qa.jpmchase.net',
                                mids: 'https://mytechub.jpmchase.net/v2/#/passwordresets/sso/qa'
			},
			'smlogin-np-qa': {
				region: 'AMERICAS',
				env: 'QA',
				ids: 'https://idserv-qa.jpmchase.net',
                                mids: 'https://mytechub.jpmchase.net/v2/#/passwordresets/sso/qa'
			},
			'smportal-qa': {
				region: 'AMERICAS',
				env: 'QA',
				ids: null,
				dmz: true
			},
			'smportal': {
				region: 'AMERICAS',
				env: 'PROD',
				ids: null,
				dmz: true
			},
			'smlogin-apac': {
				region: 'APAC',
				env: 'PROD',
				ids: 'https://idserv.jpmchase.net',
                                mids: 'https://mytechub.jpmchase.net/v2/#/passwordresets/sso/prod'
			},
			'smlogin-emea': {
				region: 'EMEA',
				env: 'PROD',
				ids: 'https://idserv.jpmchase.net',
                                mids: 'https://mytechub.jpmchase.net/v2/#/passwordresets/sso/prod'
			},
			'smlogin': {
                                region: 'AMERICAS',
                                env: 'PROD',
                                ids: 'https://idserv.jpmchase.net',
                                mids: 'https://mytechub.jpmchase.net/v2/#/passwordresets/sso/prod'
                        },
			'smlogin-np': {
				region: 'AMERICAS',
				env: 'PROD',
				ids: 'https://idserv.jpmchase.net',
                                mids: 'https://mytechub.jpmchase.net/v2/#/passwordresets/sso/prod'
			}
		}
	},

	is: {
		init : function () {
			var platforms = this.platforms,
				ln = platforms.length,
				i, platform;

			for (i = 0; i < ln; i++) {
				platform = platforms[i];
				this[platform.identity] = platform.regex.test(platform.string);
			}

			/**
			* @property Desktop True if the browser is running on a desktop machine
			* @type {Boolean}
			*/
			this.Desktop = this.Mac || this.Windows || (this.Linux && !this.Android);
			/**
			* @property Tablet True if the browser is running on a tablet (iPad)
			*/
			this.Tablet = this.iPad;
			/**
			* @property Phone True if the browser is running on a phone.
			* @type {Boolean}
			*/
			this.Phone = !this.Desktop && !this.Tablet;
			/**
			* @property iOS True if the browser is running on iOS
			* @type {Boolean}
			*/
			this.iOS = this.iPhone || this.iPad || this.iPod;

			/**
			* @property Standalone Detects when application has been saved to homescreen.
			* @type {Boolean}
			*/
			this.Standalone = !!window.navigator.standalone;
		},

		platforms: [

			/**
			* @property iPhone True when the browser is running on a iPhone
			* @type {Boolean}
			*/
			{
				string: navigator.platform,
				regex: /iPhone/i,
				identity: 'iPhone'
			},

			/**
			* @property iPod True when the browser is running on a iPod
			* @type {Boolean}
			*/
			{
				string: navigator.platform,
				regex: /iPod/i,
				identity: 'iPod'
			},

			/**
			* @property iPad True when the browser is running on a iPad
			* @type {Boolean}
			*/
			{
				string: navigator.userAgent,
				regex: /iPad/i,
				identity: 'iPad'
			},

			/**
			* @property Blackberry True when the browser is running on a Blackberry
			* @type {Boolean}
			*/
			{
				string: navigator.userAgent,
				regex: /Blackberry/i,
				identity: 'Blackberry'
			},

			/**
			* @property Android True when the browser is running on an Android device
			* @type {Boolean}
			*/
			{
				string: navigator.userAgent,
				regex: /Android/i,
				identity: 'Android'
			},

			/**
			* @property Mac True when the browser is running on a Mac
			* @type {Boolean}
			*/
			{
				string: navigator.platform,
				regex: /Mac/i,
				identity: 'Mac'
			},

			/**
			* @property Windows True when the browser is running on Windows
			* @type {Boolean}
			*/
			{
				string: navigator.platform,
				regex: /Win/i,
				identity: 'Windows'
			},

			/**
			* @property Linux True when the browser is running on Linux
			* @type {Boolean}
			*/
			{
				string: navigator.platform,
				regex: /Linux/i,
				identity: 'Linux'
			}
		]
	}
};

config.server.init();
config.is.init();
