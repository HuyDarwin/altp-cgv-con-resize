import { getDatabase, ref, set, update, onValue, remove } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-database.js";

$(function () {
	"use strict";

	window.CONTROLLER = window.CONTROLLER || {};

	(function (con) {
		
		const db = getDatabase();
		remove(ref(db));
		update(ref(db), {
			cont_to_introduce: 0,
			is_able_to_input_fff: 2,
			is_player_1_able_to_play_fff: 1,
			is_player_2_able_to_play_fff: 1,
			is_player_3_able_to_play_fff: 1,
			is_player_4_able_to_play_fff: 1,
			is_player_5_able_to_play_fff: 1,
			is_player_6_able_to_play_fff: 1,
			playing_mode: 0,
			questions_played: questions_played,
			walk_away: walk_away,
			is_lifeline_1_used: is_lifeline_1_used,
			is_lifeline_2_used: is_lifeline_2_used,
			is_lifeline_3_used: is_lifeline_3_used
		});
		const dataRef = ref(db);
		onValue(dataRef, (snapshot) => {
			const data = snapshot.val();
			$('#q_text td').html(data.question);
			$('#ans_text_a').html(data.answer_a);
			$('#ans_text_b').html(data.answer_b);
			$('#ans_text_c').html(data.answer_c);
			$('#ans_text_d').html(data.answer_d);
			$('#question_notes').html(data.note);
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
			
			if(data.playing_mode == 0){
				$('#info').html('');
			}
			else if(data.playing_mode == 1){
				$('#info').html('Correct Order: ' + correct_order_full);
			}
			else if(data.playing_mode == 2){
				$('#info').html('Final Answer: ' + final_ans + '<br/>Correct Answer: ' + correct_ans);
			}
			
			if(data.player_1_fff_send_answer == 1){
				update(ref(db), {
					player_1_fff_time : ((timer / 100).toFixed(2)),
					player_1_fff_send_answer: 0
				})
			}
			if(data.player_2_fff_send_answer == 1){
				update(ref(db), {
					player_2_fff_time : ((timer / 100).toFixed(2)),
					player_2_fff_send_answer: 0
				})
			}
			if(data.player_3_fff_send_answer == 1){
				update(ref(db), {
					player_3_fff_time : ((timer / 100).toFixed(2)),
					player_3_fff_send_answer: 0
				})
			}
			if(data.player_4_fff_send_answer == 1){
				update(ref(db), {
					player_4_fff_time : ((timer / 100).toFixed(2)),
					player_4_fff_send_answer: 0
				})
			}
			if(data.player_5_fff_send_answer == 1){
				update(ref(db), {
					player_5_fff_time : ((timer / 100).toFixed(2)),
					player_5_fff_send_answer: 0
				})
			}
			if(data.player_6_fff_send_answer == 1){
				update(ref(db), {
					player_6_fff_time : ((timer / 100).toFixed(2)),
					player_6_fff_send_answer: 0
				})
			}
			
			if (data.fff_obj15 == 1){
				for(var i = 1; i <= 6; i++){
					if(eval('data.player_' + i + '_fff_answer') == correct_order_full){
						$('#cn' + i + ', #ca' + i + ', #ct' + i).css("background-color", "green");
					}
				}
				var ft = 15;
				var ftc = 1;
				cont_win_fff = 1;
				does_anyone_win_fff = false;
				var all_players_wrong = true;
				for(var i = 1; i <= 6; i++){
					if(eval('data.player_' + i + '_fff_answer') == correct_order_full){
						all_players_wrong = false;
						if(Number(eval('data.player_' + i + '_fff_time')) < ft){
							ft = Number(eval('data.player_' + i + '_fff_time'));
							ftc = 1;
							cont_win_fff = i;
						}
						else if(Number(eval('data.player_' + i + '_fff_time')) == ft){
							ftc++;
						}
					}
				}
				if(all_players_wrong == false && ftc == 1){
					does_anyone_win_fff = true;
					update(ref(db), { cont_win_fff: cont_win_fff });
				}
				update(ref(db), { does_anyone_win_fff : does_anyone_win_fff });
				update(ref(db), { fff_obj15 : 0 });
			}
			if (data.fff_obj16 == 1){
				if(does_anyone_win_fff == false){
					correct_order_full = '';
					does_anyone_win_fff = false;
					update(ref(db), {
						question: '',
						answer_a: '',
						answer_b: '',
						answer_c: '',
						answer_d: '',
						note: '',
						correct_order_1: '',
						correct_order_2: '',
						correct_order_3: '',
						correct_order_4: '',
						correct_order_full: '',
						does_anyone_win_fff: does_anyone_win_fff
					})
					$('#cn1, #cn2, #cn3, #cn4, #cn5, #cn6, #ca1, #ca2, #ca3, #ca4, #ca5, #ca6, #ct1, #ct2, #ct3, #ct4, #ct5, #ct6').css({"background-color": "#00008B", "color": "white"});
					update(ref(db), {
						player_1_fff_answer: '',
						player_2_fff_answer: '',
						player_3_fff_answer: '',
						player_4_fff_answer: '',
						player_5_fff_answer: '',
						player_6_fff_answer: '',
						player_1_fff_time: '',
						player_2_fff_time: '',
						player_3_fff_time: '',
						player_4_fff_time: '',
						player_5_fff_time: '',
						player_6_fff_time: ''
					});
					$('#fff_obj6').removeAttr("disabled");
				}
				else if(does_anyone_win_fff == true){
					$('#cn' + cont_win_fff + ', #ca' + cont_win_fff + ', #ct' + cont_win_fff).css({"background-color": "orange", "color": "black"});
					$('#fff_obj17').removeAttr("disabled");
				}
				update(ref(db), { fff_obj16 : 0 });
			}
		})
		
		$('.autoname').click(function(){
			var bid = this.id;
			update(ref(db), { [bid] : 1 })
		})
		
		$('#fff_mode').click(function(){
			$('#fff_mode').attr("disabled", true);
			$('#main_mode').removeAttr("disabled");
			playing_mode = 1;
			update(ref(db), { playing_mode : playing_mode })
			$('#fff_mode_frame').css('top','0vw');
			$('#main_mode_frame').css('top','100vw');
			con.LoadFFFQuesInfoIntoList();
			con.LoadContInfoIntoList();
		})
		
		$('#main_mode').click(function(){
			$('#main_mode').attr("disabled", true);
			$('#fff_mode').removeAttr("disabled");
			playing_mode = 2;
			update(ref(db), { playing_mode : playing_mode })
			$('#main_mode_frame').css('top','0vw');
			$('#fff_mode_frame').css('top','100vw');
			con.LoadMainQuesInfoIntoList();
			con.LoadContInfoIntoList();
		})
		
		$('#load_qs').click(function(){
			$('#getfileqs').click();
		})
		
		$('#getfileqs').on("change", function(e){
			fff_questions = [];
			main_questions = [];
			var file = e.target.files[0];
			var reader = new FileReader();
			reader.onload = function(e) {
				var data = e.target.result;
				var workbook = XLSX.read(e.target.result);
				var sheet = workbook.Sheets[workbook.SheetNames[0]];
				
				for(var i = 5; i <= 7; i++){
					fff_questions.push({
						NumOfQ: sheet['A' + i].v,
						Question: sheet['B' + i].v.replace("++++", "<br />"),
						AnswerA: sheet['C' + i].v,
						AnswerB: sheet['D' + i].v,
						AnswerC: sheet['E' + i].v,
						AnswerD: sheet['F' + i].v,
						AnsOrder1: sheet['G' + i].v,
						AnsOrder2: sheet['H' + i].v,
						AnsOrder3: sheet['I' + i].v,
						AnsOrder4: sheet['J' + i].v,
						Note: sheet['K' + i].v
					})
				}
				for(var i = 10; i <= 24; i++){
					main_questions.push({
						NumOfQ: sheet['A' + i].v,
						Question: sheet['B' + i].v.replace("++++", "<br />"),
						AnswerA: sheet['C' + i].v,
						AnswerB: sheet['D' + i].v,
						AnswerC: sheet['E' + i].v,
						AnswerD: sheet['F' + i].v,
						CorrectAns: sheet['G' + i].v,
						Note: sheet['K' + i].v
					})
				}
			};
			reader.readAsArrayBuffer(file);
			setTimeout(function(){
				con.LoadFFFQuesInfoIntoList();
				con.LoadMainQuesInfoIntoList();
			}, 250)
		})
		
		$('#load_ps').click(function(){
			$('#getfileps').click();
		})
		
		$('#getfileps').on("change", function(e){
			contestants = [];
			var file = e.target.files[0];
			var reader = new FileReader();
			reader.onload = function(e) {
				var data = e.target.result;
				var workbook = XLSX.read(e.target.result);
				var sheet = workbook.Sheets[workbook.SheetNames[0]];
				
				for(var i = 4; i <= 9; i++){
					contestants.push({
						NumOfCont: sheet['A' + i].v,
						Name: sheet['B' + i].v,
						Hometown: sheet['C' + i].v,
						MoreInfo: sheet['D' + i].v
					})
				}
			};
			reader.readAsArrayBuffer(file);
			setTimeout(function(){
				con.LoadContInfoIntoList();
				update(ref(db), {
					player_1_name: contestants[0].Name,
					player_1_hometown: contestants[0].Hometown,
					player_1_moreinfo: contestants[0].MoreInfo,
					player_2_name: contestants[1].Name,
					player_2_hometown: contestants[1].Hometown,
					player_2_moreinfo: contestants[1].MoreInfo,
					player_3_name: contestants[2].Name,
					player_3_hometown: contestants[2].Hometown,
					player_3_moreinfo: contestants[2].MoreInfo,
					player_4_name: contestants[3].Name,
					player_4_hometown: contestants[3].Hometown,
					player_4_moreinfo: contestants[3].MoreInfo,
					player_5_name: contestants[4].Name,
					player_5_hometown: contestants[4].Hometown,
					player_5_moreinfo: contestants[4].MoreInfo,
					player_6_name: contestants[5].Name,
					player_6_hometown: contestants[5].Hometown,
					player_6_moreinfo: contestants[5].MoreInfo
				})
			}, 250)
		})
		
		$('#fff_qs_submit').click(function(){
			question = fff_questions[$('#fff_qs_select').val() - 1].Question;
			answer_a = fff_questions[$('#fff_qs_select').val() - 1].AnswerA;
			answer_b = fff_questions[$('#fff_qs_select').val() - 1].AnswerB;
			answer_c = fff_questions[$('#fff_qs_select').val() - 1].AnswerC;
			answer_d = fff_questions[$('#fff_qs_select').val() - 1].AnswerD;
			note = fff_questions[$('#fff_qs_select').val() - 1].Note;
			correct_order_1 = fff_questions[$('#fff_qs_select').val() - 1].AnsOrder1;
			correct_order_2 = fff_questions[$('#fff_qs_select').val() - 1].AnsOrder2;
			correct_order_3 = fff_questions[$('#fff_qs_select').val() - 1].AnsOrder3;
			correct_order_4 = fff_questions[$('#fff_qs_select').val() - 1].AnsOrder4;
		})
		
		$('#main_qs_submit').click(function(){
			question = main_questions[$('#main_qs_select').val() - 1].Question;
			answer_a = main_questions[$('#main_qs_select').val() - 1].AnswerA;
			answer_b = main_questions[$('#main_qs_select').val() - 1].AnswerB;
			answer_c = main_questions[$('#main_qs_select').val() - 1].AnswerC;
			answer_d = main_questions[$('#main_qs_select').val() - 1].AnswerD;
			note = main_questions[$('#main_qs_select').val() - 1].Note;
			correct_ans = main_questions[$('#main_qs_select').val() - 1].CorrectAns;
		})
		
		$('#fff_obj1').click(function(){
			cont_to_introduce = 1;
			update(ref(db), { cont_to_introduce : cont_to_introduce })
			$('#fff_obj1').attr("disabled", true);
			$('#fff_obj2').removeAttr("disabled");
		})
		$('#fff_obj2').click(function(){
			if(cont_to_introduce < 6){
				cont_to_introduce++;
				update(ref(db), { cont_to_introduce : cont_to_introduce })
				if(cont_to_introduce == 6){
					$('#fff_obj2').attr("disabled", true);
					$('#fff_obj3').removeAttr("disabled");
				}
			}
		})
		$('#fff_obj3').click(function(){
			cont_to_introduce = 0;
			update(ref(db), { cont_to_introduce : cont_to_introduce })
			$('#fff_obj2, #fff_obj3').attr("disabled", true);
		})
		$('#fff_obj4').click(function(){
			$('#fff_obj4').attr("disabled", true);
			$('#fff_obj5').removeAttr("disabled");
		})
		$('#fff_obj5').click(function(){
			$('#fff_obj5').attr("disabled", true);
			$('#fff_obj4').removeAttr("disabled");
		})
		$('#fff_obj6').click(function(){
			update(ref(db), {
				question: '',
				answer_a: '',
				answer_b: '',
				answer_c: '',
				answer_d: '',
				note: '',
				correct_order_1: '',
				correct_order_2: '',
				correct_order_3: '',
				correct_order_4: ''
			})
			if($('#fff_qs_select').val() == null){
				$('#fff_qs_select').val(1);
				$('#fff_qs_submit').click();
			}
			update(ref(db), {
				question: question,
				note: note
			})
			$('#fff_obj6').attr("disabled", true);
			$('#fff_obj7').removeAttr("disabled");
		})
		$('#fff_obj7').click(function(){
			correct_order_full = correct_order_1 + correct_order_2 + correct_order_3 + correct_order_4;
			update(ref(db), {
				answer_a: answer_a,
				answer_b: answer_b,
				answer_c: answer_c,
				answer_d: answer_d,
				correct_order_1: correct_order_1,
				correct_order_2: correct_order_2,
				correct_order_3: correct_order_3,
				correct_order_4: correct_order_4,
				correct_order_full : correct_order_full
			})
			$('#fff_obj7').attr("disabled", true);
			$('#fff_obj8').removeAttr("disabled");
			$('#ca1, #ca2, #ca3, #ca4, #ca5, #ca6, #ct1, #ct2, #ct3, #ct4, #ct5, #ct6').html('');
			update(ref(db), { is_able_to_input_fff: 1 });
			setTimeout(function(){
				update(ref(db), { is_able_to_input_fff: 2 });
			}, 15000)
			con.RunTimerFFF();
		})
		$('#fff_obj8').click(function(){
			$('#fff_obj8').attr("disabled", true);
			$('#fff_obj9').removeAttr("disabled");
		})
		$('#fff_obj9').click(function(){
			con.ResetTimerFFF();
			$('#fff_obj9').attr("disabled", true);
			$('#fff_obj10').removeAttr("disabled");
		})
		$('#fff_obj10').click(function(){
			$('#fff_obj10').attr("disabled", true);
			$('#fff_obj11').removeAttr("disabled");
		})
		$('#fff_obj11').click(function(){
			$('#fff_obj11').attr("disabled", true);
			$('#fff_obj12').removeAttr("disabled");
		})
		$('#fff_obj12').click(function(){
			$('#fff_obj12').attr("disabled", true);
			$('#fff_obj13').removeAttr("disabled");
		})
		$('#fff_obj13').click(function(){
			$('#fff_obj13').attr("disabled", true);
			$('#fff_obj14').removeAttr("disabled");
		})
		$('#fff_obj14').click(function(){
			$('#fff_obj14').attr("disabled", true);
			$('#fff_obj15').removeAttr("disabled");
		})
		$('#fff_obj15').click(function(){
			$('#fff_obj15').attr("disabled", true);
			$('#fff_obj16').removeAttr("disabled");
		})
		$('#fff_obj16').click(function(){
			$('#fff_obj16').attr("disabled", true);
		})
		$('#fff_obj17').click(function(){
			$('#fff_obj17').attr("disabled", true);
			$('#fff_obj18').removeAttr("disabled");
		})
		$('#fff_obj18').click(function(){
			correct_order_full = '';
			cont_playing = cont_win_fff;
			does_anyone_win_fff = false;
			$('#cn1, #cn2, #cn3, #cn4, #cn5, #cn6, #ca1, #ca2, #ca3, #ca4, #ca5, #ca6, #ct1, #ct2, #ct3, #ct4, #ct5, #ct6').css({"background-color": "#00008B", "color": "white"});
			update(ref(db), {
				question: '',
				answer_a: '',
				answer_b: '',
				answer_c: '',
				answer_d: '',
				note: '',
				correct_order_1: '',
				correct_order_2: '',
				correct_order_3: '',
				correct_order_4: '',
				correct_order_full: '',
				does_anyone_win_fff: does_anyone_win_fff,
				player_1_fff_answer: '',
				player_2_fff_answer: '',
				player_3_fff_answer: '',
				player_4_fff_answer: '',
				player_5_fff_answer: '',
				player_6_fff_answer: '',
				player_1_fff_time: '',
				player_2_fff_time: '',
				player_3_fff_time: '',
				player_4_fff_time: '',
				player_5_fff_time: '',
				player_6_fff_time: '',
				cont_playing: cont_playing
			})
			$('#fff_obj18').attr("disabled", true);
			$('#fff_obj1, #fff_obj6').removeAttr("disabled");
		})
		
		$('#main_obj1').click(function(){
			$('#main_obj1').attr("disabled", true);
			$('#main_obj2').removeAttr("disabled");
			questions_played = 0;
			walk_away = false;
			update(ref(db), {
				questions_played: questions_played,
				walk_away: walk_away
			})
			$('.mt_level, .mt_level_w, .mt_amount, .mt_amount_w, .mt_diagonal').css('background-color', '');
			$('.mt_level, .mt_amount').css('color','#dea72e');
			$('.mt_level_w, .mt_amount_w').css('color','white');
			$('.mt_level, .mt_amount, .mt_level_w, .mt_amount_w').css('text-shadow','0.1vw 0.1vw 0.1vw black');
			if(questions_played != 0){
				if(moneytree[questions_played - 1].IsMilestone == 'Yes'){
					$('#mt_row_' + questions_played + ' .mt_level_w, #mt_row_' + questions_played + ' .mt_diagonal, #mt_row_' + questions_played + ' .mt_amount_w').css('background-color', 'orange');
				}
				else if(moneytree[questions_played - 1].IsMilestone == 'No'){
					$('#mt_row_' + questions_played + ' .mt_level, #mt_row_' + questions_played + ' .mt_diagonal, #mt_row_' + questions_played + ' .mt_amount').css('background-color', 'orange');
					$('#mt_row_' + questions_played + ' .mt_level, #mt_row_' + questions_played + ' .mt_amount').css('text-shadow', '0vw 0vw transparent');
					$('#mt_row_' + questions_played + ' .mt_level, #mt_row_' + questions_played + ' .mt_amount').css('color', 'black');
				}
			}
		})
		$('#main_obj2').click(function(){
			$('#main_obj1, #main_obj2').attr("disabled", true);
			$('#main_obj3').removeAttr("disabled");
		})
		$('#main_obj3').click(function(){
			$('#main_obj3').attr("disabled", true);
			$('#main_obj4').removeAttr("disabled");
		})
		$('#main_obj4').click(function(){
			$('#main_obj4').attr("disabled", true);
			$('#main_obj5').removeAttr("disabled");
		})
		$('#main_obj5').click(function(){
			$('#main_obj5').attr("disabled", true);
			$('#main_obj6').removeAttr("disabled");
		})
		$('#main_obj6').click(function(){
			$('#main_obj6').attr("disabled", true);
			$('#main_obj7, #main_obj24').removeAttr("disabled");
			$('#mt_obj2').click();
		})
		$('#main_obj7').click(function(){
			$('#main_obj7').attr("disabled", true);
			$('#main_obj8').removeAttr("disabled");
			$('#main_qs_select').val(questions_played + 1);
			$('#main_qs_submit').click();
		})
		$('#main_obj8').click(function(){
			$('#main_obj8, #main_obj24').attr("disabled", true);
			$('#main_obj9').removeAttr("disabled");
			final_ans = '';
			update(ref(db), {
				question: question,
				answer_a: '',
				answer_b: '',
				answer_c: '',
				answer_d: '',
				note: note,
				final_ans: '',
				correct_ans: ''
			})
			$('.lifeline_choose').removeAttr("disabled");
			
			$('#lct1_obj1, #lct1_obj2, #lct1_obj3, #lct1_obj4, #lct1_obj5, #lct1_obj6').removeAttr("disabled");
			for(var i = 1; i <= 6; i++){
				if($('#lct1_obj' + i).text()[0] == correct_ans || $('#lct1_obj' + i).text()[1] == correct_ans){
					$('#lct1_obj' + i).attr("disabled", true);
				}
			}
			$('#lct1_obj7').attr("disabled", true);
		})
		$('#main_obj9').click(function(){
			$('#main_obj9').attr("disabled", true);
			$('#main_obj10').removeAttr("disabled");
			update(ref(db), { answer_a: answer_a })
		})
		$('#main_obj10').click(function(){
			$('#main_obj10').attr("disabled", true);
			$('#main_obj11').removeAttr("disabled");
			update(ref(db), { answer_b: answer_b })
		})
		$('#main_obj11').click(function(){
			$('#main_obj11').attr("disabled", true);
			$('#main_obj12').removeAttr("disabled");
			update(ref(db), { answer_c: answer_c })
		})
		$('#main_obj12').click(function(){
			$('#main_obj12').attr("disabled", true);
			$('#main_obj13, #main_obj15, #main_obj16, #main_obj17, #main_obj18, #main_obj23').removeAttr("disabled");
			update(ref(db), {
				answer_d: answer_d,
				correct_ans: correct_ans
			})
		})
		$('#main_obj13').click(function(){
			$('#main_obj13').attr("disabled", true);
			$('#main_obj14').removeAttr("disabled");
		})
		$('#main_obj14').click(function(){
			$('#main_obj14').attr("disabled", true);
			$('#main_obj13').removeAttr("disabled");
		})
		$('#main_obj15').click(function(){
			$('#main_obj15, #main_obj16, #main_obj17, #main_obj18').attr("disabled", true);
			if(walk_away == false){
				$('#main_obj23').attr("disabled", true);
			}
			$('#main_obj19, #main_obj20').removeAttr("disabled");
			final_ans = 'A';
			update(ref(db), { final_ans: final_ans })
			$('#lc_empty').click();
			$('.lifeline_choose').attr("disabled", true);
		})
		$('#main_obj16').click(function(){
			$('#main_obj15, #main_obj16, #main_obj17, #main_obj18').attr("disabled", true);
			if(walk_away == false){
				$('#main_obj23').attr("disabled", true);
			}
			$('#main_obj19, #main_obj20').removeAttr("disabled");
			final_ans = 'B';
			update(ref(db), { final_ans: final_ans })
			$('#lc_empty').click();
			$('.lifeline_choose').attr("disabled", true);
		})
		$('#main_obj17').click(function(){
			$('#main_obj15, #main_obj16, #main_obj17, #main_obj18').attr("disabled", true);
			if(walk_away == false){
				$('#main_obj23').attr("disabled", true);
			}
			$('#main_obj19, #main_obj20').removeAttr("disabled");
			final_ans = 'C';
			update(ref(db), { final_ans: final_ans })
			$('#lc_empty').click();
			$('.lifeline_choose').attr("disabled", true);
		})
		$('#main_obj18').click(function(){
			$('#main_obj15, #main_obj16, #main_obj17, #main_obj18').attr("disabled", true);
			if(walk_away == false){
				$('#main_obj23').attr("disabled", true);
			}
			$('#main_obj19, #main_obj20').removeAttr("disabled");
			final_ans = 'D';
			update(ref(db), { final_ans: final_ans })
			$('#lc_empty').click();
			$('.lifeline_choose').attr("disabled", true);
		})
		$('#main_obj19').click(function(){
			$('#main_obj19, #main_obj20').attr("disabled", true);
			$('#main_obj15, #main_obj16, #main_obj17, #main_obj18, #main_obj23').removeAttr("disabled");
			if(walk_away == false){
				$('#main_obj23').removeAttr("disabled");
			}
			final_ans = '';
			update(ref(db), { final_ans: final_ans })
			$('.lifeline_choose').removeAttr("disabled");
		})
		$('#main_obj20').click(function(){
			$('#main_obj13, #main_obj19, #main_obj20').attr("disabled", true);
			if(final_ans == correct_ans && walk_away == false){
				$('#main_obj21').removeAttr("disabled");
			}
			else{
				$('#main_obj22').removeAttr("disabled");
			}
		})
		$('#main_obj21').click(function(){
			$('#main_obj21').attr("disabled", true);
			$('#main_obj22').removeAttr("disabled");
		})
		$('#main_obj22').click(function(){
			$('#main_obj22').attr("disabled", true);
			if(walk_away == false){
				if(final_ans == correct_ans){
					questions_played++;
					if(questions_played != 15){
						if(questions_played == 0 || questions_played >= 5){
							$('#main_obj7').removeAttr("disabled");
						}
						else{
							$('#main_obj8').removeAttr("disabled");
							$('#main_qs_select').val(questions_played + 1);
							$('#main_qs_submit').click();
						}
					}
				}
				else{
					var y = false;
					for(var i = questions_played; i >= 0; i--){
						if(moneytree[i].IsMilestone == 'Yes'){
							questions_played = i + 1;
							y = true;
							break;
						}
					}
					if(y == false){
						questions_played = 0;
					}
					$('#main_obj26').removeAttr("disabled");
				}
			}
			else{
				$('#main_obj26').removeAttr("disabled");
			}
			$('.mt_level, .mt_level_w, .mt_amount, .mt_amount_w, .mt_diagonal').css('background-color', '');
			$('.mt_level, .mt_amount').css('color','#dea72e');
			$('.mt_level_w, .mt_amount_w').css('color','white');
			$('.mt_level, .mt_amount, .mt_level_w, .mt_amount_w').css('text-shadow','0.1vw 0.1vw 0.1vw black');
			if(questions_played != 0){
				if(moneytree[questions_played - 1].IsMilestone == 'Yes'){
					$('#mt_row_' + questions_played + ' .mt_level_w, #mt_row_' + questions_played + ' .mt_diagonal, #mt_row_' + questions_played + ' .mt_amount_w').css('background-color', 'orange');
				}
				else if(moneytree[questions_played - 1].IsMilestone == 'No'){
					$('#mt_row_' + questions_played + ' .mt_level, #mt_row_' + questions_played + ' .mt_diagonal, #mt_row_' + questions_played + ' .mt_amount').css('background-color', 'orange');
					$('#mt_row_' + questions_played + ' .mt_level, #mt_row_' + questions_played + ' .mt_amount').css('text-shadow', '0vw 0vw transparent');
					$('#mt_row_' + questions_played + ' .mt_level, #mt_row_' + questions_played + ' .mt_amount').css('color', 'black');
				}
			}
			$('#main_obj24').removeAttr("disabled");
			update(ref(db), {
				questions_played: questions_played,
				question: '',
				answer_a: '',
				answer_b: '',
				answer_c: '',
				answer_d: '',
				note: '',
				final_ans: '',
				correct_ans: ''
			})
		})
		$('#main_obj23').click(function(){
			$('#lct1_obj1, #lct1_obj2, #lct1_obj3, #lct1_obj4, #lct1_obj5, #lct1_obj6, #main_obj23').attr("disabled", true);
			walk_away = true;
			update(ref(db), { walk_away: walk_away })
		})
		$('#main_obj24').click(function(){
			$('#main_obj24').attr("disabled", true);
			$('#main_obj25').removeAttr("disabled");
		})
		$('#main_obj25').click(function(){
			$('#main_obj25').attr("disabled", true);
			$('#main_obj24').removeAttr("disabled");
		})
		$('#main_obj26').click(function(){
			$('#main_obj24, #main_obj26').attr("disabled", true);
			$('#main_obj1, #main_obj2').removeAttr("disabled");
			questions_played = 0;
			walk_away = false;
			final_ans = '';
			correct_ans = '';
			$('.lifeline_enable').click();
			$('#mtl_cross').css('opacity', 0);
			update(ref(db), {
				questions_played: questions_played,
				walk_away: walk_away
			})
			$('.mt_level, .mt_level_w, .mt_amount, .mt_amount_w, .mt_diagonal').css('background-color', '');
			$('.mt_level, .mt_amount').css('color','#dea72e');
			$('.mt_level_w, .mt_amount_w').css('color','white');
			$('.mt_level, .mt_amount, .mt_level_w, .mt_amount_w').css('text-shadow','0.1vw 0.1vw 0.1vw black');
			if(questions_played != 0){
				if(moneytree[questions_played - 1].IsMilestone == 'Yes'){
					$('#mt_row_' + questions_played + ' .mt_level_w, #mt_row_' + questions_played + ' .mt_diagonal, #mt_row_' + questions_played + ' .mt_amount_w').css('background-color', 'orange');
				}
				else if(moneytree[questions_played - 1].IsMilestone == 'No'){
					$('#mt_row_' + questions_played + ' .mt_level, #mt_row_' + questions_played + ' .mt_diagonal, #mt_row_' + questions_played + ' .mt_amount').css('background-color', 'orange');
					$('#mt_row_' + questions_played + ' .mt_level, #mt_row_' + questions_played + ' .mt_amount').css('text-shadow', '0vw 0vw transparent');
					$('#mt_row_' + questions_played + ' .mt_level, #mt_row_' + questions_played + ' .mt_amount').css('color', 'black');
				}
			}
		})
		
		$('.lifeline_enable').click(function(){
			var num = Number($(this).parent().attr('id').replace('lt',''));
			if(num == 1){
				is_lifeline_1_used = false;
			}
			else if(num == 2){
				is_lifeline_2_used = false;
			}
			else if(num == 3){
				is_lifeline_3_used = false;
			}
			update(ref(db), { ['is_lifeline_' + num + '_used'] : eval('is_lifeline_' + num + '_used') })
			$('#mt_lifeline_' + num + ' #mtl_cross').css('opacity', 0);
			$('#lt' + num + ' .lifeline_enable').attr("disabled", true);
			$('#lt' + num + ' .lifeline_disable').removeAttr("disabled");
		})
		$('.lifeline_disable').click(function(){
			var num = Number($(this).parent().attr('id').replace('lt',''));
			if(num == 1){
				is_lifeline_1_used = true;
			}
			else if(num == 2){
				is_lifeline_2_used = true;
			}
			else if(num == 3){
				is_lifeline_3_used = true;
			}
			update(ref(db), { ['is_lifeline_' + num + '_used'] : eval('is_lifeline_' + num + '_used') })
			$('#mt_lifeline_' + num + ' #mtl_cross').css('opacity', 1);
			$('#lt' + num + ' .lifeline_disable').attr("disabled", true);
			$('#lt' + num + ' .lifeline_enable').removeAttr("disabled");
		})
		$('.lifeline_choose').click(function(){
			$('.lifeline_choose, #lc_empty').removeAttr("disabled");
			$('#' + this.id).attr("disabled", true);
			$('#lc_title').html(this.textContent);
			$('.lifeline_content').css('top', '25vw');
			$('#lct' + this.id.replace('lc','')).css('top', '1.5vw');
		})
		$('#lc1').click(function(){
			for(var i = 1; i <= 6; i++){
				if($('#lct1_obj' + i).text()[0] == correct_ans || $('#lct1_obj' + i).text()[1] == correct_ans){
					$('#lct1_obj' + i).attr("disabled", true);
				}
			}
		})
		$('#lc_empty').click(function(){
			$('.lifeline_choose').removeAttr("disabled");
			$('#lc_empty').attr("disabled", true);
			$('#lc_title').html('');
			$('.lifeline_content').css('top', '25vw');
		})
		
		$('#lct1_obj1, #lct1_obj2, #lct1_obj3, #lct1_obj4, #lct1_obj5, #lct1_obj6').click(function(){
			$('#lct1_obj1, #lct1_obj2, #lct1_obj3, #lct1_obj4, #lct1_obj5, #lct1_obj6').attr("disabled", true);
			$('#lct1_obj7').removeAttr("disabled");
			var first_opt = this.textContent[0];
			var second_opt = this.textContent[1];
			update(ref(db), {
				['answer_' + first_opt.toLowerCase()]: '',
				['answer_' + second_opt.toLowerCase()]: ''
			})
			$('#main_obj' + (Number(first_opt.charCodeAt()) - 50)).attr("disabled", true);
			$('#main_obj' + (Number(second_opt.charCodeAt()) - 50)).attr("disabled", true);
		})
		$('#lct1_obj7').click(function(){
			$('#lct1_obj1, #lct1_obj2, #lct1_obj3, #lct1_obj4, #lct1_obj5, #lct1_obj6, #main_obj15, #main_obj16, #main_obj17, #main_obj18').removeAttr("disabled");
			for(var i = 1; i <= 6; i++){
				if($('#lct1_obj' + i).text()[0] == correct_ans || $('#lct1_obj' + i).text()[1] == correct_ans){
					$('#lct1_obj' + i).attr("disabled", true);
				}
			}
			$('#lct1_obj7').attr("disabled", true);
			update(ref(db), {
				answer_a: answer_a,
				answer_b: answer_b,
				answer_c: answer_c,
				answer_d: answer_d
			})
		})
		$('#lct2_obj1').click(function(){
			$('#lct2_obj1').attr("disabled", true);
			$('#lct2_obj2').removeAttr("disabled");
		})
		$('#lct2_obj2').click(function(){
			$('#lct2_obj2').attr("disabled", true);
			$('#lct2_obj3').removeAttr("disabled");
		})
		$('#lct2_obj3').click(function(){
			$('#lct2_obj3').attr("disabled", true);
			$('#lct2_obj1').removeAttr("disabled");
		})
		$('#lct3_obj1').click(function(){
			$('#lct3_obj1').attr("disabled", true);
			$('#lct3_obj2').removeAttr("disabled");
		})
		$('#lct3_obj2').click(function(){
			$('#lct3_obj2').attr("disabled", true);
			$('#lct3_obj1').removeAttr("disabled");
		})
		
		$('#fcd1').click(function(){
			update(ref(db), { is_player_1_able_to_play_fff: 0 })
			$('#fcd1').attr("disabled", true);
			$('#fce1').removeAttr("disabled");
		})
		$('#fcd2').click(function(){
			update(ref(db), { is_player_2_able_to_play_fff: 0 })
			$('#fcd2').attr("disabled", true);
			$('#fce2').removeAttr("disabled");
		})
		$('#fcd3').click(function(){
			update(ref(db), { is_player_3_able_to_play_fff: 0 })
			$('#fcd3').attr("disabled", true);
			$('#fce3').removeAttr("disabled");
		})
		$('#fcd4').click(function(){
			update(ref(db), { is_player_4_able_to_play_fff: 0 })
			$('#fcd4').attr("disabled", true);
			$('#fce4').removeAttr("disabled");
		})
		$('#fcd5').click(function(){
			update(ref(db), { is_player_5_able_to_play_fff: 0 })
			$('#fcd5').attr("disabled", true);
			$('#fce5').removeAttr("disabled");
		})
		$('#fcd6').click(function(){
			update(ref(db), { is_player_6_able_to_play_fff: 0 })
			$('#fcd6').attr("disabled", true);
			$('#fce6').removeAttr("disabled");
		})
		$('#fce1').click(function(){
			update(ref(db), { is_player_1_able_to_play_fff: 1 })
			$('#fce1').attr("disabled", true);
			$('#fcd1').removeAttr("disabled");
		})
		$('#fce2').click(function(){
			update(ref(db), { is_player_2_able_to_play_fff: 1 })
			$('#fce2').attr("disabled", true);
			$('#fcd2').removeAttr("disabled");
		})
		$('#fce3').click(function(){
			update(ref(db), { is_player_3_able_to_play_fff: 1 })
			$('#fce3').attr("disabled", true);
			$('#fcd3').removeAttr("disabled");
		})
		$('#fce4').click(function(){
			update(ref(db), { is_player_4_able_to_play_fff: 1 })
			$('#fce4').attr("disabled", true);
			$('#fcd4').removeAttr("disabled");
		})
		$('#fce5').click(function(){
			update(ref(db), { is_player_5_able_to_play_fff: 1 })
			$('#fce5').attr("disabled", true);
			$('#fcd5').removeAttr("disabled");
		})
		$('#fce6').click(function(){
			update(ref(db), { is_player_6_able_to_play_fff: 1 })
			$('#fce6').attr("disabled", true);
			$('#fcd6').removeAttr("disabled");
		})
		
		$('#load_mt').click(function(){
			$('#getfilemt').click();
		})
		
		$('#getfilemt').on("change", function(e){
			moneytree = [];
			var file = e.target.files[0];
			var reader = new FileReader();
			reader.onload = function(e) {
				var data = e.target.result;
				var workbook = XLSX.read(e.target.result);
				var sheet = workbook.Sheets[workbook.SheetNames[0]];
				
				for(var i = 18; i >= 4; i--){
					moneytree.push({
						NumOfValue: sheet['A' + i].v,
						Value: sheet['B' + i].v,
						IsMilestone: sheet['C' + i].v
					})
				}
			};
			reader.readAsArrayBuffer(file);
			setTimeout(function(){
				con.LoadMoneytreeIntoList();
				for(var i = 1; i <= 15; i++){
					update(ref(db), {
						['mt_' + i + '_value'] : moneytree[i-1].Value,
						['mt_' + i + '_is_milestone'] : moneytree[i-1].IsMilestone
					})
				}
				$('#mt_obj1, #mt_obj3, #mt_obj4, #mt_obj5, #mt_obj6, button[name="mt_set_lvl"]').removeAttr("disabled");
			}, 250)
		})
		
		$('#mt_obj1').click(function(){
			$('#mt_obj1').attr("disabled", true);
			$('#mt_obj2').removeAttr("disabled");
		})
		$('#mt_obj2').click(function(){
			$('#mt_obj2').attr("disabled", true);
			$('#mt_obj1').removeAttr("disabled");
		})
		$('#mt_obj3').click(function(){
			if(questions_played < 15){
				questions_played++;
			}
		})
		$('#mt_obj4').click(function(){
			if(questions_played > 0){
				questions_played--;
			}
		})
		$('#mt_obj6').click(function(){
			questions_played = 0;
		})
		$('button[name="mt_set_lvl"]').click(function(){
			questions_played = Number(this.id.replace("mt_obj", "")) - 6;
		})
		$('#mt_obj3, #mt_obj4, #mt_obj6, button[name="mt_set_lvl"], #main_obj7').click(function(){
			update(ref(db), { questions_played: questions_played })
			$('.mt_level, .mt_level_w, .mt_amount, .mt_amount_w, .mt_diagonal').css('background-color', '');
			$('.mt_level, .mt_amount').css('color','#dea72e');
			$('.mt_level_w, .mt_amount_w').css('color','white');
			$('.mt_level, .mt_amount, .mt_level_w, .mt_amount_w').css('text-shadow','0.1vw 0.1vw 0.1vw black');
			if(questions_played != 0){
				if(moneytree[questions_played - 1].IsMilestone == 'Yes'){
					$('#mt_row_' + questions_played + ' .mt_level_w, #mt_row_' + questions_played + ' .mt_diagonal, #mt_row_' + questions_played + ' .mt_amount_w').css('background-color', 'orange');
				}
				else if(moneytree[questions_played - 1].IsMilestone == 'No'){
					$('#mt_row_' + questions_played + ' .mt_level, #mt_row_' + questions_played + ' .mt_diagonal, #mt_row_' + questions_played + ' .mt_amount').css('background-color', 'orange');
					$('#mt_row_' + questions_played + ' .mt_level, #mt_row_' + questions_played + ' .mt_amount').css('text-shadow', '0vw 0vw transparent');
					$('#mt_row_' + questions_played + ' .mt_level, #mt_row_' + questions_played + ' .mt_amount').css('color', 'black');
				}
			}
		})
		
	}(window.CONTROLLER = window.CONTROLLER || {}));
});
