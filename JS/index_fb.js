import { getDatabase, ref, set, update, onValue } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-database.js";

$(function () {
	"use strict";

	window.CONTROLLER = window.CONTROLLER || {};

	(function (con) {
		const db = getDatabase();
		onValue(ref(db), (snapshot) => {
			const data = snapshot.val();
			
			$('#q_text td').html(data.question);
			$('#ans_text_a').html(data.answer_a);
			$('#ans_text_b').html(data.answer_b);
			$('#ans_text_c').html(data.answer_c);
			$('#ans_text_d').html(data.answer_d);
			$('#fff_result_name_1').html(data.player_1_name);
			$('#fff_result_name_2').html(data.player_2_name);
			$('#fff_result_name_3').html(data.player_3_name);
			$('#fff_result_name_4').html(data.player_4_name);
			$('#fff_result_name_5').html(data.player_5_name);
			$('#fff_result_name_6').html(data.player_6_name);
			
			if(data.question != undefined){
				if(data.question.length <= 129){
					$('#q_text td').css('font-family', 'Verdana');
					$('#q_text td').css('font-size', '2.2vw');
					$('#q_text td').css('line-height', '2.7vw');
				}
				else{
					if(data.question_length <= 145){
						$('#q_text td').css('font-family', 'Tahoma');
						$('#q_text td').css('font-size', '2.2vw');
						$('#q_text td').css('line-height', '2.7vw');
					}
					else{
						$('#q_text td').css('font-family', 'Tahoma');
						$('#q_text td').css('font-size', (2.2 - 0.1 * Math.ceil((data.question.length - 145) / 6)) + 'vw');
						$('#q_text td').css('line-height', (2.7 - (0.1 * Math.ceil((data.question.length - 145) / 6) / 1 * 0.7)) + 'vw');
					}
				}
			}
			if(data.answer_a != undefined){
				if(data.answer_a.length <= 26){
					$('#ans_text_a').css('scale', '1 1');
				}
				else{
					$('#ans_text_a').css('scale', (1 - (data.answer_a.length - 26) * 0.022) + ' 1');
				}
			}
			if(data.answer_b != undefined){
				if(data.answer_b.length <= 26){
					$('#ans_text_b').css('scale', '1 1');
				}
				else{
					$('#ans_text_b').css('scale', (1 - (data.answer_b.length - 26) * 0.022) + ' 1');
				}
			}
			if(data.answer_c != undefined){
				if(data.answer_c.length <= 26){
					$('#ans_text_c').css('scale', '1 1');
				}
				else{
					$('#ans_text_c').css('scale', (1 - (data.answer_c.length - 26) * 0.022) + ' 1');
				}
			}
			if(data.answer_d != undefined){
				if(data.answer_d.length <= 26){
					$('#ans_text_d').css('scale', '1 1');
				}
				else{
					$('#ans_text_d').css('scale', (1 - (data.answer_d.length - 26) * 0.022) + ' 1');
				}
			}

			con.MoneytreeSetFollower = function(level){
				con.MoneytreeSparkleAnimate();
				$('#tree_follower').css('top', ((12.95 + (15.58 - 12.95) * (15 - level)) + 'vw'));
				$('#tree_sparkle').css('top', ((9.5 + (12.13 - 9.5) * (15 - level)) + 'vw'));
				$('.mt_diagonal').css('background-image','none');
				$('.mt_level, .mt_amount').css('color','#dea72e');
				$('.mt_level_w, .mt_amount_w').css('color','white');
				$('.mt_level, .mt_amount, .mt_level_w, .mt_amount_w').css('text-shadow','0.1vw 0.1vw 0.1vw black');
				if(level == 0){
					$('#tree_follower, #tree_sparkle').css('top', '100vw');
				}
				else{
					for(var i = 1; i < level; i++){
						$('#mt_row_' + i + ' .mt_diagonal').css('background-image','url(' + 'Images/diagonal.png' +')');
					}
					if(eval('data.mt_' + level + '_is_milestone') == 'No'){
						$('#mt_row_' + level + ' .mt_level, #mt_row_' + level + ' .mt_amount').css('text-shadow', '0vw 0vw transparent');
						$('#mt_row_' + level + ' .mt_level, #mt_row_' + level + ' .mt_amount').css('color', 'black');
					}
				}
			}
		
			con.MoneytreeRender = function(){
				$('#moneytree_table').html('');
				var mtc = '';
				for(var i = 15; i >= 1; i--){
					mtc += "<tr id='mt_row_" + i + "'>";
					if(eval('data.mt_' + i + '_is_milestone') == 'Yes'){
						mtc += "<td class='mt_level_w'>" + i + "</td>";
						mtc += "<td class='mt_diagonal'></td>";
						mtc += "<td class='mt_amount_w'>" + eval('data.mt_' + i + '_value') + "</td>";
					}
					else if(eval('data.mt_' + i + '_is_milestone') == 'No'){
						mtc += "<td class='mt_level'>" + i + "</td>";
						mtc += "<td class='mt_diagonal'></td>";
						mtc += "<td class='mt_amount'>" + eval('data.mt_' + i + '_value') + "</td>";
					}
					mtc += "</tr>";
				}
				$('#moneytree_table').html(mtc);
				con.MoneytreeSetFollower(data.questions_played);
			}
			
			if(data.cont_to_introduce != 0){
				if(data.cont_to_introduce == 1){
					$('#cont_strap_name').html(data.player_1_name);
					$('#cont_strap_hometown').html(data.player_1_hometown);
				}
				if(data.cont_to_introduce == 2){
					$('#cont_strap_name').html(data.player_2_name);
					$('#cont_strap_hometown').html(data.player_2_hometown);
				}
				if(data.cont_to_introduce == 3){
					$('#cont_strap_name').html(data.player_3_name);
					$('#cont_strap_hometown').html(data.player_3_hometown);
				}
				if(data.cont_to_introduce == 4){
					$('#cont_strap_name').html(data.player_4_name);
					$('#cont_strap_hometown').html(data.player_4_hometown);
				}
				if(data.cont_to_introduce == 5){
					$('#cont_strap_name').html(data.player_5_name);
					$('#cont_strap_hometown').html(data.player_5_hometown);
				}
				if(data.cont_to_introduce == 6){
					$('#cont_strap_name').html(data.player_6_name);
					$('#cont_strap_hometown').html(data.player_6_hometown);
				}
			}
			
			if(data.is_player_1_able_to_play_fff == 1){
				$('#fff_result_name_1, #fff_result_times_1').css('color', 'white');
			}
			else if(data.is_player_1_able_to_play_fff == 0){
				$('#fff_result_name_1, #fff_result_times_1').css('color', 'gray');
			}
			if(data.is_player_2_able_to_play_fff == 1){
				$('#fff_result_name_2, #fff_result_times_2').css('color', 'white');
			}
			else if(data.is_player_2_able_to_play_fff == 0){
				$('#fff_result_name_2, #fff_result_times_2').css('color', 'gray');
			}
			if(data.is_player_3_able_to_play_fff == 1){
				$('#fff_result_name_3, #fff_result_times_3').css('color', 'white');
			}
			else if(data.is_player_3_able_to_play_fff == 0){
				$('#fff_result_name_3, #fff_result_times_3').css('color', 'gray');
			}
			if(data.is_player_4_able_to_play_fff == 1){
				$('#fff_result_name_4, #fff_result_times_4').css('color', 'white');
			}
			else if(data.is_player_4_able_to_play_fff == 0){
				$('#fff_result_name_4, #fff_result_times_4').css('color', 'gray');
			}
			if(data.is_player_5_able_to_play_fff == 1){
				$('#fff_result_name_5, #fff_result_times_5').css('color', 'white');
			}
			else if(data.is_player_5_able_to_play_fff == 0){
				$('#fff_result_name_5, #fff_result_times_5').css('color', 'gray');
			}
			if(data.is_player_6_able_to_play_fff == 1){
				$('#fff_result_name_6, #fff_result_times_6').css('color', 'white');
			}
			else if(data.is_player_6_able_to_play_fff == 0){
				$('#fff_result_name_6, #fff_result_times_6').css('color', 'gray');
			}
			
			if(data.is_lifeline_1_used == true){
				$('#mt_lifeline_1 #mtl_cross').css('opacity', 1);
			}
			else if(data.is_lifeline_1_used == false){
				$('#mt_lifeline_1 #mtl_cross').css('opacity', 0);
			}
			if(data.is_lifeline_2_used == true){
				$('#mt_lifeline_2 #mtl_cross').css('opacity', 1);
			}
			else if(data.is_lifeline_2_used == false){
				$('#mt_lifeline_2 #mtl_cross').css('opacity', 0);
			}
			if(data.is_lifeline_3_used == true){
				$('#mt_lifeline_3 #mtl_cross').css('opacity', 1);
			}
			else if(data.is_lifeline_3_used == false){
				$('#mt_lifeline_3 #mtl_cross').css('opacity', 0);
			}
			
			if (data.fff_obj1 == 1){
				$('.contestant_strap').css('opacity', 1);
				update(ref(db), { fff_obj1 : 0 });
			}
			if (data.fff_obj3 == 1){
				$('.contestant_strap').css('opacity', 0);
				update(ref(db), { fff_obj3 : 0 });
			}
			if (data.fff_obj6 == 1){
				con.QuestionReveal(1);
				update(ref(db), { fff_obj6 : 0 });
			}
			if (data.fff_obj7 == 1){
				con.QuestionReveal(2,true);
				update(ref(db), { fff_obj7 : 0 });
			}
			if (data.fff_obj8 == 1){
				$('.ques_lozenge, .ans_lozenge').css('opacity', 0);
				update(ref(db), { fff_obj8 : 0 });
			}
			if (data.fff_obj9 == 1){
				$('#fff_order_q_text td').html(data.question);
				$('#fff_ans_letter_1').html(data.correct_order_1 + ':');
				$('#fff_ans_letter_2').html(data.correct_order_2 + ':');
				$('#fff_ans_letter_3').html(data.correct_order_3 + ':');
				$('#fff_ans_letter_4').html(data.correct_order_4 + ':');
				for(var i = 1; i <= 4; i++){
					if(eval('data.correct_order_' + i) == "A"){
						$('#fff_ans_text_' + i).html(data.answer_a);
					}
					if(eval('data.correct_order_' + i) == "B"){
						$('#fff_ans_text_' + i).html(data.answer_b);
					}
					if(eval('data.correct_order_' + i) == "C"){
						$('#fff_ans_text_' + i).html(data.answer_c);
					}
					if(eval('data.correct_order_' + i) == "D"){
						$('#fff_ans_text_' + i).html(data.answer_d);
					}
				}
				con.FFFOrderReveal();
				update(ref(db), { fff_obj9 : 0 });
			}
			if (data.fff_obj10 == 1){
				con.FFFOrderRevealAnswer(1);
				update(ref(db), { fff_obj10 : 0 });
			}
			if (data.fff_obj11 == 1){
				con.FFFOrderRevealAnswer(2);
				update(ref(db), { fff_obj11 : 0 });
			}
			if (data.fff_obj12 == 1){
				con.FFFOrderRevealAnswer(3);
				update(ref(db), { fff_obj12 : 0 });
			}
			if (data.fff_obj13 == 1){
				con.FFFOrderRevealAnswer(4);
				update(ref(db), { fff_obj13 : 0 });
			}
			if (data.fff_obj14 == 1){
				con.FFFOrderHide();
				$('.fff_result').css('opacity', 1);
				update(ref(db), { fff_obj14 : 0 });
			}
			if (data.fff_obj15 == 1){
				for(var i = 1; i <= 6; i++){
					$('#fff_result_times_' + i).html(Number(eval('data.player_' + i + '_fff_time')).toFixed(2));
				}
				var t = 6;
				function show(){
					if(eval('data.player_' + t + '_fff_answer') == data.correct_order_full){
						$('#fff_result_times_' + t + ', #fff_result_lozenge_correct_' + t).animate({'opacity':'1'}, 250, 'linear');
					}
					t = t - 1;
					if (t >= 1){
						setTimeout(show, 75);
					}
				}
				show();
				update(ref(db), { fff_obj15 : 0 });
			}
			if (data.fff_obj16 == 1){
				if(data.does_anyone_win_fff == false){
					$('.fff_result').css('opacity', 0);
					con.FFFTimesReset();
				}
				if(data.does_anyone_win_fff == true){
					var q = 0;
					function hl(){
						$('#fff_result_lozenge_correct_' + data.cont_win_fff).css('opacity', 0);
						setTimeout(function(){
							$('#fff_result_lozenge_correct_' + data.cont_win_fff).css('opacity', 1);
						}, 250)
						q++;
						if (q < 5){
							setTimeout(hl, 500);
						}
					}
					hl();
				}
				update(ref(db), { fff_obj16 : 0 });
			}
			if (data.fff_obj17 == 1){
				$('.fff_result').css('opacity', 0);
				$('.contestant_strap').css('opacity', 1);
				$('#cont_strap_name').html(eval('data.player_' + data.cont_win_fff + '_name'));
				$('#cont_strap_hometown').html(eval('data.player_' + data.cont_win_fff + '_fff_time'));
				update(ref(db), { fff_obj17 : 0 });
			}
			if (data.fff_obj18 == 1){
				con.FFFTimesReset();
				$('.contestant_strap').css('opacity', 0);
				update(ref(db), { fff_obj18 : 0 });
			}
			
			if (data.main_obj3 == 1){
				con.MoneytreeLifelineAnimate(1);
				update(ref(db), { main_obj3 : 0 });
			}
			if (data.main_obj4 == 1){
				con.MoneytreeLifelineAnimate(2);
				update(ref(db), { main_obj4 : 0 });
			}
			if (data.main_obj5 == 1){
				con.MoneytreeLifelineAnimate(3);
				update(ref(db), { main_obj5 : 0 });
			}
			if (data.main_obj8 == 1){
				con.QuestionReveal(1);
				update(ref(db), { main_obj8 : 0 });
			}
			if (data.main_obj9 == 1){
				con.QuestionReveal(2,false);
				update(ref(db), { main_obj9 : 0 });
			}
			if (data.main_obj10 == 1){
				con.AnswerReveal(2);
				update(ref(db), { main_obj10 : 0 });
			}
			if (data.main_obj11 == 1){
				con.AnswerReveal(3);
				update(ref(db), { main_obj11 : 0 });
			}
			if (data.main_obj12 == 1){
				con.AnswerReveal(4);
				update(ref(db), { main_obj12 : 0 });
			}
			if (data.main_obj15 == 1){
				con.LockInAnswer('a');
				update(ref(db), { main_obj15 : 0 });
			}
			if (data.main_obj16 == 1){
				con.LockInAnswer('b');
				update(ref(db), { main_obj16 : 0 });
			}
			if (data.main_obj17 == 1){
				con.LockInAnswer('c');
				update(ref(db), { main_obj17 : 0 });
			}
			if (data.main_obj18 == 1){
				con.LockInAnswer('d');
				update(ref(db), { main_obj18 : 0 });
			}
			if (data.main_obj19 == 1){
				con.UndoAnswer();
				update(ref(db), { main_obj19 : 0 });
			}
			if (data.main_obj20 == 1){
				con.RevealCorrectAnswer((data.correct_ans).toLowerCase());
				if(data.final_ans == data.correct_ans && data.walk_away == false){
					$('#winnings').html(eval('data.mt_' + (data.questions_played + 1) + '_value'));
				}
				update(ref(db), { main_obj20 : 0 });
			}
			if (data.main_obj21 == 1){
				con.RevealMoneyStrap(true);
				update(ref(db), { main_obj21 : 0 });
			}
			if (data.main_obj22 == 1){
				if(data.final_ans == data.correct_ans && data.walk_away == false){
					con.HideMoneyStrap();
				}
				else{
					con.HideQuestion();
					if(data.questions_played == 0){
						$('#winnings').html('0 CG');
					}
					else{
						$('#winnings').html(eval('data.mt_' + data.questions_played + '_value'));
					}
				}
				con.QuestionReset();
				update(ref(db), { main_obj22 : 0 });
			}
			if (data.main_obj24 == 1){
				if(data.questions_played == 0){
					$('#winnings').html('0 CG');
				}
				else{
					$('#winnings').html(eval('data.mt_' + data.questions_played + '_value'));
				}
				con.RevealMoneyStrap(false);
				update(ref(db), { main_obj24 : 0 });
			}
			if (data.main_obj25 == 1){
				con.HideMoneyStrap();
				update(ref(db), { main_obj25 : 0 });
			}
			
			if(data.lct1_obj1 == 1){
				$('#ans_text_a, #ans_letter_a, #ans_diagonal_a').css('opacity', 0);
				$('#ans_text_b, #ans_letter_b, #ans_diagonal_b').css('opacity', 0);
				update(ref(db), { lct1_obj1 : 0 });
			}
			if(data.lct1_obj2 == 1){
				$('#ans_text_a, #ans_letter_a, #ans_diagonal_a').css('opacity', 0);
				$('#ans_text_c, #ans_letter_c, #ans_diagonal_c').css('opacity', 0);
				update(ref(db), { lct1_obj2 : 0 });
			}
			if(data.lct1_obj3 == 1){
				$('#ans_text_a, #ans_letter_a, #ans_diagonal_a').css('opacity', 0);
				$('#ans_text_d, #ans_letter_d, #ans_diagonal_d').css('opacity', 0);
				update(ref(db), { lct1_obj3 : 0 });
			}
			if(data.lct1_obj4 == 1){
				$('#ans_text_b, #ans_letter_b, #ans_diagonal_b').css('opacity', 0);
				$('#ans_text_c, #ans_letter_c, #ans_diagonal_c').css('opacity', 0);
				update(ref(db), { lct1_obj4 : 0 });
			}
			if(data.lct1_obj5 == 1){
				$('#ans_text_b, #ans_letter_b, #ans_diagonal_b').css('opacity', 0);
				$('#ans_text_d, #ans_letter_d, #ans_diagonal_d').css('opacity', 0);
				update(ref(db), { lct1_obj5 : 0 });
			}
			if(data.lct1_obj6 == 1){
				$('#ans_text_c, #ans_letter_c, #ans_diagonal_c').css('opacity', 0);
				$('#ans_text_d, #ans_letter_d, #ans_diagonal_d').css('opacity', 0);
				update(ref(db), { lct1_obj6 : 0 });
			}
			if(data.lct1_obj7 == 1){
				$('.ans_text, .ans_letter, .ans_diagonal').css('opacity', 1);
				update(ref(db), { lct1_obj7 : 0 });
			}
			if(data.lct2_obj1 == 1){
				$('.ques_lozenge, .ans_lozenge').css('opacity', 0);
				update(ref(db), { lct2_obj1 : 0 });
			}
			if(data.lct2_obj2 == 1){
				$('.ques_lozenge, .ans_lozenge').css('opacity', 1);
				update(ref(db), { lct2_obj2 : 0 });
			}
			
			if (data.mt_obj1 == 1){
				con.MoneytreeReveal();
				update(ref(db), { mt_obj1 : 0 });
			}
			if (data.mt_obj2 == 1){
				con.MoneytreeHide();
				update(ref(db), { mt_obj2 : 0 });
			}
			if (data.mt_obj3 == 1){
				con.MoneytreeSetFollower(data.questions_played + 1);
				update(ref(db), { mt_obj3 : 0 });
			}
			if (data.mt_obj4 == 1){
				con.MoneytreeSetFollower(data.questions_played - 1);
				update(ref(db), { mt_obj4 : 0 });
			}
			if (data.mt_obj5 == 1){
				var j = 1;
				function p(){
					con.MoneytreeSetFollower(j);
					j++;
					if (j <= 15){
						setTimeout(p, 150);
					}
				}
				p();
				update(ref(db), { mt_obj5 : 0 });
			}
			if (data.mt_obj6 == 1){
				con.MoneytreeSetFollower(0);
				update(ref(db), { mt_obj6 : 0 });
			}
			if (data.mt_obj7 == 1){
				con.MoneytreeSetFollower(1);
				update(ref(db), { mt_obj7 : 0 });
			}
			if (data.mt_obj8 == 1){
				con.MoneytreeSetFollower(2);
				update(ref(db), { mt_obj8 : 0 });
			}
			if (data.mt_obj9 == 1){
				con.MoneytreeSetFollower(3);
				update(ref(db), { mt_obj9 : 0 });
			}
			if (data.mt_obj10 == 1){
				con.MoneytreeSetFollower(4);
				update(ref(db), { mt_obj10 : 0 });
			}
			if (data.mt_obj11 == 1){
				con.MoneytreeSetFollower(5);
				update(ref(db), { mt_obj11 : 0 });
			}
			if (data.mt_obj12 == 1){
				con.MoneytreeSetFollower(6);
				update(ref(db), { mt_obj12 : 0 });
			}
			if (data.mt_obj13 == 1){
				con.MoneytreeSetFollower(7);
				update(ref(db), { mt_obj13 : 0 });
			}
			if (data.mt_obj14 == 1){
				con.MoneytreeSetFollower(8);
				update(ref(db), { mt_obj14 : 0 });
			}
			if (data.mt_obj15 == 1){
				con.MoneytreeSetFollower(9);
				update(ref(db), { mt_obj15 : 0 });
			}
			if (data.mt_obj16 == 1){
				con.MoneytreeSetFollower(10);
				update(ref(db), { mt_obj16 : 0 });
			}
			if (data.mt_obj17 == 1){
				con.MoneytreeSetFollower(11);
				update(ref(db), { mt_obj17 : 0 });
			}
			if (data.mt_obj18 == 1){
				con.MoneytreeSetFollower(12);
				update(ref(db), { mt_obj18 : 0 });
			}
			if (data.mt_obj19 == 1){
				con.MoneytreeSetFollower(13);
				update(ref(db), { mt_obj19 : 0 });
			}
			if (data.mt_obj20 == 1){
				con.MoneytreeSetFollower(14);
				update(ref(db), { mt_obj20 : 0 });
			}
			if (data.mt_obj21 == 1){
				con.MoneytreeSetFollower(15);
				update(ref(db), { mt_obj21 : 0 });
			}
		})
	}(window.CONTROLLER = window.CONTROLLER || {}));
});
