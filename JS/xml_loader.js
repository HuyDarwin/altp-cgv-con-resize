$(function () {
	"use strict";

	window.CONTROLLER = window.CONTROLLER || {};

	(function (con) {
		con.ResetQuestions = function () {
			questions = [];
        }
		con.LoadQuestions = function (a) {
			con.ResetQuestions();
			var where = '';
			else if(a == 1){
				where = 'fastest';
			}
			else if(a == 2){
				where = 'hotseat';
			}
			$.ajax({
				type: "GET",
				url: "questions.xml",
				dataType: "xml",
				async: true,
				success: function (xml) {
					try {
						var y = $(xml).find(where);
						$(y).find("question").each(function(){
							var ca = "";
						
							if($(this).find("a")[0].attributes[0].value == "yes"){
								ca = "A";
							}
							else if($(this).find("b")[0].attributes[0].value == "yes"){
								ca = "B";
							}
							else if($(this).find("c")[0].attributes[0].value == "yes"){
								ca = "C";
							}
							else if($(this).find("d")[0].attributes[0].value == "yes"){
								ca = "D";
							}
							
							questions.push({
								question = $(this).find("text")[0].textContent,
								answer_A = $(this).find("a")[0].textContent,
								answer_B = $(this).find("b")[0].textContent,
								answer_C = $(this).find("c")[0].textContent,
								answer_D = $(this).find("d")[0].textContent,
								ca
							});
						});
					}
					catch (e) {
						console.log(e);
					}
				},
				error: function (e) {
					console.log(e.message || e.Message);
				}
			});
		}
	}(window.CONTROLLER = window.CONTROLLER || {}));
});