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
			$('#cn1').html(data.player_1_name);
			$('#cn2').html(data.player_2_name);
			$('#cn3').html(data.player_3_name);
			$('#cn4').html(data.player_4_name);
			$('#cn5').html(data.player_5_name);
			$('#cn6').html(data.player_6_name);
			$('#ca1').html(data.player_1_fff_answer);
			$('#ca2').html(data.player_2_fff_answer);
			$('#ca3').html(data.player_3_fff_answer);
			$('#ca4').html(data.player_4_fff_answer);
			$('#ca5').html(data.player_5_fff_answer);
			$('#ca6').html(data.player_6_fff_answer);
			$('#ct1').html(data.player_1_fff_time);
			$('#ct2').html(data.player_2_fff_time);
			$('#ct3').html(data.player_3_fff_time);
			$('#ct4').html(data.player_4_fff_time);
			$('#ct5').html(data.player_5_fff_time);
			$('#ct6').html(data.player_6_fff_time);
			
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
			
			con.PlayerMoneytreeSetFollower = function(level){
				$('.mt_level, .mt_level_w, .mt_amount, .mt_amount_w, .mt_diagonal').css('background-color', '');
				$('.mt_level, .mt_amount').css('color','#dea72e');
				$('.mt_level_w, .mt_amount_w').css('color','white');
				$('.mt_level, .mt_amount, .mt_level_w, .mt_amount_w').css('text-shadow','0.1vw 0.1vw 0.1vw black');
				if(level != 0){
					if(eval('data.mt_' + level + '_is_milestone') == 'Yes'){
						$('#mt_row_' + level + ' .mt_level_w, #mt_row_' + level + ' .mt_diagonal, #mt_row_' + level + ' .mt_amount_w').css('background-color', 'orange');
					}
					else if(eval('data.mt_' + level + '_is_milestone') == 'No'){
						$('#mt_row_' + level + ' .mt_level, #mt_row_' + level + ' .mt_diagonal, #mt_row_' + level + ' .mt_amount').css('background-color', 'orange');
						$('#mt_row_' + level + ' .mt_level, #mt_row_' + level + ' .mt_amount').css('text-shadow', '0vw 0vw transparent');
						$('#mt_row_' + level + ' .mt_level, #mt_row_' + level + ' .mt_amount').css('color', 'black');
					}
				}
			}
			
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
			con.PlayerMoneytreeSetFollower(data.questions_played);
			
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
			
			if (data.main_obj15 == 1){
				$('#ans_letter_a, #ans_text_a').css({'color':'black', 'text-shadow':'0vw 0vw transparent'});
				$('#ans_final_a').css('opacity',1);
				update(ref(db), { main_obj15 : 0 });
			}
			if (data.main_obj16 == 1){
				$('#ans_letter_b, #ans_text_b').css({'color':'black', 'text-shadow':'0vw 0vw transparent'});
				$('#ans_final_b').css('opacity',1);
				update(ref(db), { main_obj16 : 0 });
			}
			if (data.main_obj17 == 1){
				$('#ans_letter_c, #ans_text_c').css({'color':'black', 'text-shadow':'0vw 0vw transparent'});
				$('#ans_final_c').css('opacity',1);
				update(ref(db), { main_obj17 : 0 });
			}
			if (data.main_obj18 == 1){
				$('#ans_letter_d, #ans_text_d').css({'color':'black', 'text-shadow':'0vw 0vw transparent'});
				$('#ans_final_d').css('opacity',1);
				update(ref(db), { main_obj18 : 0 });
			}
			if (data.main_obj19 == 1){
				$('.ans_letter').css('color', '#dea72e');
				$('.ans_text').css('color', 'white');
				$('.ans_letter, .ans_text').css('text-shadow','0.1vw 0.1vw 0.1vw black');
				$('.ans_final').css('opacity', 0);
				update(ref(db), { main_obj19 : 0 });
			}
			if (data.main_obj20 == 1){
				$('#ans_letter_' + (data.correct_ans).toLowerCase() + ', #ans_text_' + (data.correct_ans).toLowerCase()).css({'color':'black', 'text-shadow':'0vw 0vw transparent'});
				$('#ans_correct_' + (data.correct_ans).toLowerCase()).css('opacity',1);
				update(ref(db), { main_obj20 : 0 });
			}
			if (data.main_obj22 == 1){
				$('.ans_letter').css('color', '#dea72e');
				$('.ans_text').css('color', 'white');
				$('.ans_letter, .ans_text').css('text-shadow','0.1vw 0.1vw 0.1vw black');
				$('.ans_final, .ans_correct').css('opacity', 0);
				update(ref(db), { main_obj22 : 0 });
			}
			
			if(data.playing_mode == 0){
				if(number_of_player == 7){
					$('#fff_host, #main_host').css('top', '100vw');
				}
				else{
					$('#fff, #main').css('top', '100vw');
				}
			}
			if(data.playing_mode == 1){
				if(number_of_player == 7){
					$('#fff_host').css('top', '0vw');
					$('#main_host').css('top', '100vw');

				}
				else{
					$('#fff').css('top', '0vw');
					$('#main').css('top', '100vw');
				}
			}
			if(data.playing_mode == 2){
				if(number_of_player == 7){
					$('#fff_host').css('top', '100vw');
					$('#main_host').css('top', '0vw');

				}
				else{
					$('#fff').css('top', '100vw');
					$('#main').css('top', '0vw');
				}
			}
			
			if(number_of_player == 7){
				$('#fff_correct_ans').html(data.correct_order_full);
				if (data.fff_obj7 == 1){
					$('#ca1, #ca2, #ca3, #ca4, #ca5, #ca6, #ct1, #ct2, #ct3, #ct4, #ct5, #ct6').html('');
					update(ref(db), { fff_obj7 : 0 });
				}
				if (data.fff_obj15 == 1){
					for(var i = 1; i <= 6; i++){
						if(eval('data.player_' + i + '_fff_answer') == data.correct_order_full){
							$('#cn' + i + ', #ca' + i + ', #ct' + i).css("background-color", "green");
						}
					}
					update(ref(db), { fff_obj15 : 0 });
				}
				if (data.fff_obj16 == 1){
					$('#q_text td, #ans_text_a, #ans_text_b, #ans_text_c, #ans_text_d').html('');
					if(data.does_anyone_win_fff == false){
						$('#cn1, #cn2, #cn3, #cn4, #cn5, #cn6, #ca1, #ca2, #ca3, #ca4, #ca5, #ca6, #ct1, #ct2, #ct3, #ct4, #ct5, #ct6').css({"background-color": "black", "color": "white"});
					}
					else if(data.does_anyone_win_fff == true){
						$('#cn' + data.cont_win_fff + ', #ca' + data.cont_win_fff + ', #ct' + data.cont_win_fff).css({"background-color": "orange", "color": "black"});
					}
					update(ref(db), { fff_obj16 : 0 });
				}
				if (data.fff_obj18 == 1){
					$('#cn1, #cn2, #cn3, #cn4, #cn5, #cn6, #ca1, #ca2, #ca3, #ca4, #ca5, #ca6, #ct1, #ct2, #ct3, #ct4, #ct5, #ct6').css({"background-color": "black", "color": "white"});
					update(ref(db), { fff_obj18 : 0 });
				}
				
				if(data.cont_to_introduce != 0){
					$('#fff_cont_info_text').html(eval('data.player_' + data.cont_to_introduce + '_name') + ' - ' + eval('data.player_' + data.cont_to_introduce + '_hometown'));
				}
				else{
					$('#fff_cont_info_text').html('');
				}
				
				$('#mri1').html('Away: ' + (15 - data.questions_played));
				if(data.questions_played == 0){
					$('#mri2').html('Have: 0 CG');
				}
				else{
					$('#mri2').html('Have: ' + eval('data.mt_' + data.questions_played + '_value'));
				}
				if(data.correct_ans == undefined){
					$('#mri3').html('Correct: ');
				}
				else{
					$('#mri3').html('Correct: ' + data.correct_ans);
				}
				if(data.questions_played == 15 || eval('data.mt_' + (data.questions_played + 1) + '_value') == undefined){
					$('#mri4').html('Next: ');
				}
				else{
					$('#mri4').html('Next: ' + eval('data.mt_' + (data.questions_played + 1) + '_value'));
				}
				
				$('#q_note_text').html(data.note);
			}
			else{
				if (data.is_able_to_input_fff == 1 && Number(eval('data.is_player_' + number_of_player + '_able_to_play_fff')) == 1){
					$('#fff_del, #fff_a, #fff_b, #fff_c, #fff_d').removeAttr("disabled");
					lock_fff_keyboard = false;
					update(ref(db), { is_able_to_input_fff : 0 });
				}
				else if(data.is_able_to_input_fff == 2 || Number(eval('data.is_player_' + number_of_player + '_able_to_play_fff')) == 0){
					$('#fff_del, #fff_a, #fff_b, #fff_c, #fff_d, #fff_ok').attr("disabled", true);
					lock_fff_keyboard = true;
					if(fff_answer == ''){
						update(ref(db), { ['player_' + number_of_player + '_fff_answer'] : '' })
						update(ref(db), { ['player_' + number_of_player + '_fff_time'] : 0 })
					}
					update(ref(db), { is_able_to_input_fff : 0 });
				}
				
				$('#fff_times').html(eval('data.player_' + number_of_player + '_fff_time'));
				
				if (data.fff_obj6 == 1){
					$('#fff_ans, #fff_final_ans, #fff_times').html('');
					fff_answer_counter = 0;
					update(ref(db), { fff_obj6 : 0 });
				}
				if (data.fff_obj16 == 1){
					$('#q_text td, #ans_text_a, #ans_text_b, #ans_text_c, #ans_text_d').html('');
					$('#fff_ans, #fff_final_ans, #fff_times').html('');
					fff_answer_counter = 0;
					fff_answer = '';
					update(ref(db), { fff_obj16 : 0 });
				}
			}
		})
		
		$(document).on('keydown',function(e){
			if(lock_fff_keyboard == false){
				if(e.keyCode == 49 || e.keyCode == 65 || e.keyCode == 97){ // 1 or a or 1 (numlock)
					if($('#fff_a').prop('disabled') == false){
						$('#fff_a').click();
					}
				}
				else if(e.keyCode == 50 || e.keyCode == 66 || e.keyCode == 98){ // 2 or b or 2 (numlock)
					if($('#fff_b').prop('disabled') == false){
						$('#fff_b').click();
					}
				}
				else if(e.keyCode == 51 || e.keyCode == 67 || e.keyCode == 99){ // 3 or c or 3 (numlock)
					if($('#fff_c').prop('disabled') == false){
						$('#fff_c').click();
					}
				}
				else if(e.keyCode == 52 || e.keyCode == 68 || e.keyCode == 100){ // 4 or d or 4 (numlock)
					if($('#fff_d').prop('disabled') == false){
						$('#fff_d').click();
					}
				}
				else if(e.keyCode == 46){ // delete
					if($('#fff_del').prop('disabled') == false){
						$('#fff_del').click();
					}
				}
				else if(e.keyCode == 13){ // enter
					if($('#fff_ok').prop('disabled') == false){
						$('#fff_ok').click();
					}
				}
			}
		})
		
		$('#fff_del').click(function(){
			$('#fff_a, #fff_b, #fff_c, #fff_d').removeAttr("disabled");
			$('#fff_ok').attr("disabled", true);
			fff_answer_counter = 0;
			fff_answer = '';
		})
		$('#fff_a').click(function(){
			$('#fff_a').attr("disabled", true);
			fff_answer_counter++;
			if(fff_answer_counter == 4){
				$('#fff_ok').removeAttr("disabled");
			}
			fff_answer += 'A';
			$('#fff_ans').html(fff_answer);
		})
		$('#fff_b').click(function(){
			$('#fff_b').attr("disabled", true);
			fff_answer_counter++;
			if(fff_answer_counter == 4){
				$('#fff_ok').removeAttr("disabled");
			}
			fff_answer += 'B';
			$('#fff_ans').html(fff_answer);
		})
		$('#fff_c').click(function(){
			$('#fff_c').attr("disabled", true);
			fff_answer_counter++;
			if(fff_answer_counter == 4){
				$('#fff_ok').removeAttr("disabled");
			}
			fff_answer += 'C';
			$('#fff_ans').html(fff_answer);
		})
		$('#fff_d').click(function(){
			$('#fff_d').attr("disabled", true);
			fff_answer_counter++;
			if(fff_answer_counter == 4){
				$('#fff_ok').removeAttr("disabled");
			}
			fff_answer += 'D';
			$('#fff_ans').html(fff_answer);
		})
		$('#fff_ok').click(function(){
			$('#fff_ok').attr("disabled", true);
			update(ref(db), {
				['player_' + number_of_player + '_fff_answer'] : fff_answer,
				['player_' + number_of_player + '_fff_send_answer'] : 1
			})
			$('#fff_final_ans').css('color', 'lime');
			$('#fff_final_ans').html(fff_answer);
		})
	}(window.CONTROLLER = window.CONTROLLER || {}));
});
