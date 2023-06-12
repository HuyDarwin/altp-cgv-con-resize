import { getDatabase, ref, set, update, onValue, remove } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-database.js";

$(function () {
	"use strict";

	window.CONTROLLER = window.CONTROLLER || {};

	(function (con) {
		
		// Sound
		
		con.PlaySound = function(filename, n){
			if (n == 1){
				try{			
					at =  new Audio(filename);
					at.play();
					at.volume = 0.2;
				}
				catch(e){
					// do nothing
				}				
			}
			else if (n == 2){
				try{			
					at2 =  new Audio(filename);
					at2.play();
					at2.volume = 0.1;
				}
				catch(e){
					// do nothing
				}				
			}
			else if (n == 3){
				try{			
					at3 =  new Audio(filename);
					at3.play();
					at3.volume = 0.2;
				}
				catch(e){
					// do nothing
				}				
			}
			else if (n == 4){
				try{			
					at4 =  new Audio(filename);
					at4.play();
					at4.volume = 0.2;
				}
				catch(e){
					// do nothing
				}				
			}
			else if (n == 5){
				try{			
					at5 =  new Audio(filename);
					at5.play();
					at5.volume = 0.2;
				}
				catch(e){
					// do nothing
				}				
			}
		};
		con.StopAllSounds = function(a) {
			try {
				if(a == 1 && at != ''){
					at.pause();
					at.currentTime = 0;
				}
				if(a == 2 && at2 != ''){
					at2.pause();
					at2.currentTime = 0;
				}
				if(a == 3 && at3 != ''){
					at3.pause();
					at3.currentTime = 0;
				}
				if(a == 4 && at4 != ''){
					at4.pause();
					at4.currentTime = 0;
				}
				if(a == 5 && at5 != ''){
					at5.pause();
					at5.currentTime = 0;
				}
				if(a != 1 && a != 2 && a != 3 && a != 4 && a != 5){
					if(at != ''){
						at.pause();
						at.currentTime = 0;
					}
					if(at2 != ''){
						at2.pause();
						at2.currentTime = 0;
					}
					if(at3 != ''){
						at3.pause();
						at3.currentTime = 0;
					}
					if(at4 != ''){
						at4.pause();
						at4.currentTime = 0;
					}
					if(at5 != ''){
						at5.pause();
						at5.currentTime = 0;
					}
				}
			}
			catch(e){
				// swallow
			}
		};
		
		// Controller
		
		con.LoadFFFQuesInfoIntoList = function(){
			$('#fff_qs_select').empty();
			for(var i = 0; i < fff_questions.length; i++){
				$('#fff_qs_select').append('<option value="' + (i + 1) + '">' + (i + 1) + '. ' + fff_questions[i].Question + '</option>');
			}
		}
		
		con.LoadMainQuesInfoIntoList = function(){
			$('#main_qs_select').empty();
			for(var i = 0; i < main_questions.length; i++){
				$('#main_qs_select').append('<option value="' + (i + 1) + '">' + (i + 1) + '. ' + main_questions[i].Question + '</option>');
			}
		}
		
		con.LoadContInfoIntoList = function(){
			$('#cn1, #cn2, #cn3, #cn4, #cn5, #cn6, #ct1, #ct2, #ct3, #ct4, #ct5, #ct6').html('');
			for(var j = 0; j < contestants.length; j++){
				$('#cn' + (j + 1)).html(contestants[j].Name);
			}
		}
		
		con.LoadMoneytreeIntoList = function(){
			$('#moneytree_table').html('');
			var mtc = '';
			for(var i = 15; i >= 1; i--){
				mtc += "<tr id='mt_row_" + i + "'>";
				if(moneytree[i-1].IsMilestone == 'Yes'){
					mtc += "<td class='mt_level_w'>" + i + "</td>";
					mtc += "<td class='mt_diagonal'></td>";
					mtc += "<td class='mt_amount_w'>" + moneytree[i-1].Value + "</td>";
				}
				else if(moneytree[i-1].IsMilestone == 'No'){
					mtc += "<td class='mt_level'>" + i + "</td>";
					mtc += "<td class='mt_diagonal'></td>";
					mtc += "<td class='mt_amount'>" + moneytree[i-1].Value + "</td>";
				}
				mtc += "</tr>";
			}
			$('#moneytree_table').html(mtc);
		}
		
		// Index
		
		con.QuestionReveal = function(step,revealAllAnswers){
			if(step == 1){
				$('.ques_lozenge, .ans_lozenge').css('opacity', 1);
				$('.ques_lozenge').css('top', '20vw');
				$('#ans_lozenge_a, #ans_lozenge_b').css('top', '27.7vw');
				$('#ans_lozenge_c, #ans_lozenge_d').css('top', '32vw');
				$('.ques_lozenge').animate({'top':'5.4vw'}, 250, 'linear', function(){
					$('.ques_lozenge').animate({'top':'7.4vw'}, 250, 'linear');
				});
			}
			if(step == 2){
				$('.ques_lozenge, .ans_lozenge').css('opacity', 1);
				$('.ques_lozenge').css('top', '7.4vw');
				$('#ans_lozenge_a, #ans_lozenge_b').css('top', '27.7vw');
				$('#ans_lozenge_c, #ans_lozenge_d').css('top', '32vw');
				if(revealAllAnswers == true){
					$('.ans_diagonal, .ans_letter, .ans_text').css('opacity', 1);
				}
				else if(revealAllAnswers == false){
					$('.ans_diagonal, .ans_letter, .ans_text').css('opacity', 0);
					con.AnswerReveal(1);
				}
				$('.ques_lozenge').animate({'top':'0vw'}, 500, 'linear');
				$('#ans_lozenge_a, #ans_lozenge_b').animate({'top':'7.7vw'}, 500, 'linear');
				$('#ans_lozenge_c, #ans_lozenge_d').animate({'top':'12vw'}, 500, 'linear');
			}
		}
		
		con.AnswerReveal = function(step){
			var x;
			if(step == 1){
				x = 'a';
			}
			if(step == 2){
				x = 'b';
			}
			if(step == 3){
				x = 'c';
			}
			if(step == 4){
				x = 'd';
			}
			$('#ans_diagonal_' + x + ', #ans_letter_' + x + ', #ans_text_' + x).animate({'opacity':'1'}, 250, 'linear');
		}
		
		con.LockInAnswer = function(ans){
			$('#ans_letter_' + ans + ', #ans_text_' + ans).css('color', 'black');
			$('#ans_letter_' + ans + ', #ans_text_' + ans).css('text-shadow', '0vw 0vw transparent');
			$('#ans_final_' + ans).animate({'opacity':'1'}, 250, 'linear');
		}
		
		con.UndoAnswer = function(){
			$('.ans_letter').css('color', '#dea72e');
			$('.ans_text').css('color', 'white');
			$('.ans_letter, .ans_text').css('text-shadow','0.1vw 0.1vw 0.1vw black');
			$('.ans_final').css('opacity', 0);
		}
		
		con.RevealCorrectAnswer = function(rightans){
			$('#ans_letter_' + rightans + ', #ans_text_' + rightans).css('color', 'black');
			$('#ans_letter_' + rightans + ', #ans_text_' + rightans).css('text-shadow', '0vw 0vw transparent');
			$('#ans_correct_' + rightans).animate({'opacity':'1'}, 250, 'linear');
		}
		
		con.RevealMoneyStrap = function(questionShowing){
			if(questionShowing == true){
				$('.ques_lozenge').css('top', '0vw');
				$('#ans_lozenge_a, #ans_lozenge_b').css('top', '7.7vw');
				$('#ans_lozenge_c, #ans_lozenge_d').css('top', '12vw');
				$('#ans_lozenge_a, #ans_lozenge_b').animate({'top':'27.7vw'}, 500, 'linear');
				$('#ans_lozenge_c, #ans_lozenge_d').animate({'top':'32vw'}, 500, 'linear');
				$('.ques_lozenge').removeClass('winningsAnimate2');
				$('.ques_lozenge').width();
				$('.ques_lozenge').addClass('winningsAnimate2');
				$('.ques_lozenge').animate({'top':'3.9vw'}, 250, 'linear', function(){
					$('.ques_lozenge').css('top', '20vw');
					$('.money_strap').css('top', '42.3vw');
					$('.money_strap').removeClass('winningsAnimate1');
					$('.money_strap').width();
					$('.money_strap').addClass('winningsAnimate1');
					$('.money_strap').animate({'top':'46.2vw'}, 250, 'linear');
				});
			}
			if(questionShowing == false){
				$('.money_strap').css('top', '66.2vw');
				$('.money_strap').animate({'top':'46.2vw'}, 500, 'linear');
			}
		}
		
		con.HideMoneyStrap = function(){
			$('.money_strap').css('top', '46.2vw');
			$('.money_strap').animate({'top':'66.2vw'}, 500, 'linear');
		}
		
		con.HideQuestion = function(){
			$('.ques_lozenge').css('top', '20vw');
			$('#ans_lozenge_a, #ans_lozenge_b').css('top', '27.7vw');
			$('#ans_lozenge_c, #ans_lozenge_d').css('top', '32vw');
		}
		
		con.QuestionReset = function(){
			$('.ans_letter').css('color', '#dea72e');
			$('.ans_text').css('color', 'white');
			$('.ans_letter, .ans_text').css('text-shadow','0.1vw 0.1vw 0.1vw black');
			$('.ans_letter, .ans_text, .ans_final, .ans_correct, .ans_diagonal').css('opacity', 0);
		}
		
		con.FFFOrderReveal = function(){
			$('.fff_order').animate({'left':'61.8vw'}, 500, 'linear');
		}
		
		con.FFFOrderRevealAnswer = function(step){
			$('#fff_order_answer_' + step).animate({'left':'0.6vw'}, 500, 'linear');
		}
		
		con.FFFOrderHide = function(){
			$('.fff_order').css('left', '110vw');
			$('#fff_order_answer_1, #fff_order_answer_2, #fff_order_answer_3, #fff_order_answer_4').css('left', '48.8vw');
		}
		
		con.FFFTimesReset = function(){
			$('.fff_result_times, .fff_result_lozenge_correct').css('opacity', 0);
			$('.fff_result_times').html('');
		}
			
		con.MoneytreeSparkleAnimate = function(){
			$('#tree_sparkle').removeClass('sparkleAnimate');
			$('#tree_sparkle').width();
			$('#tree_sparkle').addClass('sparkleAnimate');
		}
			
		con.MoneytreeLifelineAnimate = function(num){
			$('#mt_lifeline_' + num).removeClass('lifelineAnimate');
			$('#mt_lifeline_' + num).width();
			$('#mt_lifeline_' + num).addClass('lifelineAnimate');
		}
		
		con.MoneytreeReveal = function(){
			con.MoneytreeRender();
			$('.moneytree').animate({'left':'67vw'}, 500, 'linear');
		}
		
		con.MoneytreeHide = function(){
			$('.moneytree').animate({'left':'110vw'}, 500, 'linear');
		}
		
		// General
		
		con.RunTimerFFF = function(){
			con.ResetTimerFFF();
			timer_int = setInterval(function () {
				if (timer < 1500) {
					timer += 1;
				}
			}, 10);
		}
		
		con.ResetTimerFFF = function(){
			clearInterval(timer_int);
			timer = 0;
		}
		
	}(window.CONTROLLER = window.CONTROLLER || {}));
});