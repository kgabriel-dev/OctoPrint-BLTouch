/*
 * View model for OctoPrint-Bltouch
 *
 * Author: jneilliii
 * License: AGPLv3
 */
$(function() {
    function BLTouchViewModel(parameters) {
        var self = this;

		// assign the injected parameters, e.g.:
		self.controlViewModel = parameters[0];
		self.settingsViewModel = parameters[1];

		self.cmdProbeUp = ko.observable();
		self.cmdProbeDown = ko.observable();
		self.cmdSelfTest = ko.observable();
		self.cmdReleaseAlarm = ko.observable();
		self.cmdProbeBed = ko.observable();
		self.cmdSaveSettings = ko.observable();

		self.getAdditionalControls = function() {
			if (self.settingsViewModel.settings.plugins.BLTouch.confirmation()) {
				var buttons = [
					{ name: "BLTouch", type: "section", layout: "horizontal", children: [
						{type: "javascript", javascript: "OctoPrint.control.sendGcode(self.settings.settings.plugins.BLTouch.cmdProbeUp());", name: "Probe Up", enabled: "!self.isPrinting() && self.loginState.hasPermission(self.access.permissions.CONTROL) && self.isOperational()"},
						{type: "javascript", javascript: "OctoPrint.control.sendGcode(self.settings.settings.plugins.BLTouch.cmdProbeDown());", name: "Probe Down", enabled: "!self.isPrinting() && self.loginState.hasPermission(self.access.permissions.CONTROL) && self.isOperational()"},
						{type: "javascript", javascript: "OctoPrint.control.sendGcode(self.settings.settings.plugins.BLTouch.cmdSelfTest());", name: "Test", confirm: "You are about to run a self test.", enabled: "!self.isPrinting() && self.loginState.hasPermission(self.access.permissions.CONTROL) && self.isOperational()"},
						{type: "javascript", javascript: "OctoPrint.control.sendGcode(self.settings.settings.plugins.BLTouch.cmdReleaseAlarm());", name: "Release", confirm: "You are about to release the alarm.", enabled: "!self.isPrinting() && self.loginState.hasPermission(self.access.permissions.CONTROL) && self.isOperational()"},
						{type: "javascript", javascript: "OctoPrint.control.sendGcode(self.settings.settings.plugins.BLTouch.cmdProbeBed().split('\\n'));", name: "Probe Bed", confirm: "You are about to probe the bed.", enabled: "!self.isPrinting() && self.loginState.hasPermission(self.access.permissions.CONTROL) && self.isOperational()"},

					]}
				];
				if(self.settingsViewModel.settings.plugins.BLTouch.cmdRepeatability() !== ""){
				    buttons[0].children.push({type: "javascript", javascript: "OctoPrint.control.sendGcode(self.settings.settings.plugins.BLTouch.cmdRepeatability());", name: "Repeat Test", confirm: "You are about to run a repeatability test.", enabled: "!self.isPrinting() && self.loginState.hasPermission(self.access.permissions.CONTROL) && self.isOperational()"});
                }
				buttons[0].children.push({type: "javascript", javascript: "OctoPrint.control.sendGcode([self.settings.settings.plugins.BLTouch.cmdSaveSettings(), \"M300 P105 S1108\", \"M300 P210 S1661\"]);", name: "Save", enabled: "!self.isPrinting() && self.loginState.hasPermission(self.access.permissions.CONTROL) && self.isOperational()"});
			} else {
				var buttons =[
					{ name: "BLTouch", type: "section", layout: "horizontal", children: [
						{type: "javascript", javascript: "OctoPrint.control.sendGcode(self.settings.settings.plugins.BLTouch.cmdProbeUp());", name: "Probe Up", enabled: "!self.isPrinting() && self.loginState.hasPermission(self.access.permissions.CONTROL) && self.isOperational()"},
						{type: "javascript", javascript: "OctoPrint.control.sendGcode(self.settings.settings.plugins.BLTouch.cmdProbeDown());", name: "Probe Down", enabled: "!self.isPrinting() && self.loginState.hasPermission(self.access.permissions.CONTROL) && self.isOperational()"},
						{type: "javascript", javascript: "OctoPrint.control.sendGcode(self.settings.settings.plugins.BLTouch.cmdSelfTest());", name: "Test", enabled: "!self.isPrinting() && self.loginState.hasPermission(self.access.permissions.CONTROL) && self.isOperational()"},
						{type: "javascript", javascript: "OctoPrint.control.sendGcode(self.settings.settings.plugins.BLTouch.cmdReleaseAlarm());", name: "Release", enabled: "!self.isPrinting() && self.loginState.hasPermission(self.access.permissions.CONTROL) && self.isOperational()"},
						{type: "javascript", javascript: "OctoPrint.control.sendGcode(self.settings.settings.plugins.BLTouch.cmdProbeBed().split('\\n'));", name: "Probe Bed", enabled: "!self.isPrinting() && self.loginState.hasPermission(self.access.permissions.CONTROL) && self.isOperational()"},
					]}
				];
				if(self.settingsViewModel.settings.plugins.BLTouch.cmdRepeatability() !== ""){
				    buttons[0].children.push({type: "javascript", javascript: "OctoPrint.control.sendGcode(self.settings.settings.plugins.BLTouch.cmdRepeatability());", name: "Repeat", enabled: "!self.isPrinting() && self.loginState.hasPermission(self.access.permissions.CONTROL) && self.isOperational()"});
                }
				buttons[0].children.push({type: "javascript", javascript: "OctoPrint.control.sendGcode(self.settings.settings.plugins.BLTouch.cmdSaveSettings());", name: "Save", enabled: "!self.isPrinting() && self.loginState.hasPermission(self.access.permissions.CONTROL) && self.isOperational()"});
			}
			return buttons;
		};

		self.onBeforeBinding = function() {
			self.cmdProbeUp(self.settingsViewModel.settings.plugins.BLTouch.cmdProbeUp());
			self.cmdProbeDown(self.settingsViewModel.settings.plugins.BLTouch.cmdProbeDown());
			self.cmdSelfTest(self.settingsViewModel.settings.plugins.BLTouch.cmdSelfTest());
			self.cmdReleaseAlarm(self.settingsViewModel.settings.plugins.BLTouch.cmdReleaseAlarm());
			self.cmdProbeBed(self.settingsViewModel.settings.plugins.BLTouch.cmdProbeBed());
			self.cmdSaveSettings(self.settingsViewModel.settings.plugins.BLTouch.cmdSaveSettings());
		};

		self.onEventSettingsUpdated = function (payload) {
            self.cmdProbeUp = self.settingsViewModel.settings.plugins.BLTouch.cmdProbeUp();
            self.cmdProbeDown = self.settingsViewModel.settings.plugins.BLTouch.cmdProbeDown();
            self.cmdSelfTest = self.settingsViewModel.settings.plugins.BLTouch.cmdSelfTest();
            self.cmdReleaseAlarm = self.settingsViewModel.settings.plugins.BLTouch.cmdReleaseAlarm();
			self.cmdProbeBed(self.settingsViewModel.settings.plugins.BLTouch.cmdProbeBed());
			self.cmdSaveSettings(self.settingsViewModel.settings.plugins.BLTouch.cmdSaveSettings());
        };
    };

    // view model class, parameters for constructor, container to bind to
    ADDITIONAL_VIEWMODELS.push([
        BLTouchViewModel,

        // e.g. loginStateViewModel, settingsViewModel, ...
        ["controlViewModel","settingsViewModel"],

        // e.g. #settings_plugin_BLTouch, #tab_plugin_BLTouch, ...
        ["settings_plugin_BLTouch_form"]
    ]);
});
