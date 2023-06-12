import { getDatabase, ref, set, update, onValue } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-database.js";

$(function () {
	"use strict";

	window.CONTROLLER = window.CONTROLLER || {};

	(function (con) {
		const db = getDatabase();
		onValue(ref(db), (snapshot) => {
			const data = snapshot.val();
			if (data.reload == 1){
				location.reload(true);
				update(ref(db), { reload : 0 });
			}
			if (data.titles == 1){
				con.PlaySound('Sounds/opening_titles.mp3',1);
				update(ref(db), { titles : 0 });
			}
			if (data.he == 1){
				con.PlaySound('Sounds/host_entrance.mp3',1);
				update(ref(db), { he : 0 });
			}
			if (data.commin == 1){
				con.PlaySound('Sounds/commercial_in.mp3',1);
				update(ref(db), { commin : 0 });
			}
			if (data.commout == 1){
				con.PlaySound('Sounds/commercial_out.mp3',1);
				update(ref(db), { commout : 0 });
			}
			if (data.ambience == 1){
				con.PlaySound('Sounds/ambience.mp3',2);
				update(ref(db), { ambience : 0 });
			}
			if (data.credits == 1){
				con.PlaySound('Sounds/end_credits.mp3',1);
				update(ref(db), { credits : 0 });
			}
			
			if (data.fff_obj1 == 1){
				con.PlaySound('Sounds/contestants.mp3',1);
				update(ref(db), { fff_obj1 : 0 });
			}
			if (data.fff_obj4 == 1){
				con.PlaySound('Sounds/explain_rules.mp3',1);
				update(ref(db), { fff_obj4 : 0 });
			}
			if (data.fff_obj5 == 1){
				con.StopAllSounds();
				con.PlaySound('Sounds/stop_explaining_rules.mp3',1);
				update(ref(db), { fff_obj5 : 0 });
			}
			if (data.fff_obj6 == 1){
				con.PlaySound('Sounds/fastest_finger_read_question.mp3',1);
				update(ref(db), { fff_obj6 : 0 });
			}
			if (data.fff_obj7 == 1){
				con.StopAllSounds();
				con.PlaySound('Sounds/fastest_finger_3_stabs.mp3',1);
				con.PlaySound('Sounds/fastest_finger_think.mp3',3);
				update(ref(db), { fff_obj7 : 0 });
			}
			if (data.fff_obj9 == 1){
				con.PlaySound('Sounds/fastest_finger_read_answer_order.mp3',3);
				update(ref(db), { fff_obj9 : 0 });
			}
			if (data.fff_obj10 == 1){
				con.PlaySound('Sounds/fastest_finger_answer_correct_1.mp3',1);
				update(ref(db), { fff_obj10 : 0 });
			}
			if (data.fff_obj11 == 1){
				con.PlaySound('Sounds/fastest_finger_answer_correct_2.mp3',1);
				update(ref(db), { fff_obj11 : 0 });
			}
			if (data.fff_obj12 == 1){
				con.PlaySound('Sounds/fastest_finger_answer_correct_3.mp3',1);
				update(ref(db), { fff_obj12 : 0 });
			}
			if (data.fff_obj13 == 1){
				con.PlaySound('Sounds/fastest_finger_answer_correct_4.mp3',1);
				update(ref(db), { fff_obj13 : 0 });
			}
			if (data.fff_obj15 == 1){
				con.StopAllSounds();
				con.PlaySound('Sounds/fastest_finger_reveal_times.mp3',1);
				update(ref(db), { fff_obj15 : 0 });
			}
			if (data.fff_obj16 == 1){
				if(data.does_anyone_win_fff == true){
					con.PlaySound('Sounds/fastest_finger_winner.mp3',1);
				}
				update(ref(db), { fff_obj16 : 0 });
			}
			
			if (data.main_obj1 == 1){
				con.PlaySound('Sounds/welcome_contestant.mp3',1);
				update(ref(db), { main_obj1 : 0 });
			}
			if (data.main_obj2 == 1){
				con.PlaySound('Sounds/explain_rules.mp3',1);
				update(ref(db), { main_obj2 : 0 });
			}
			if (data.main_obj3 == 1){
				con.PlaySound('Sounds/lifeline_ping_1.mp3',3);
				update(ref(db), { main_obj3 : 0 });
			}
			if (data.main_obj4 == 1){
				con.PlaySound('Sounds/lifeline_ping_2.mp3',3);
				update(ref(db), { main_obj4 : 0 });
			}
			if (data.main_obj5 == 1){
				con.PlaySound('Sounds/lifeline_ping_3.mp3',3);
				update(ref(db), { main_obj5 : 0 });
			}
			if (data.main_obj6 == 1){
				con.StopAllSounds();
				con.PlaySound('Sounds/stop_explaining_rules.mp3',1);
				update(ref(db), { main_obj6 : 0 });
			}
			if (data.main_obj7 == 1){
				if(data.questions_played == 0){
					con.PlaySound('Sounds/lights_down_q1.mp3',1);
				}
				else if(data.questions_played == 5 || data.questions_played == 10){
					con.PlaySound('Sounds/lights_down_1.mp3',1);
				}
				else if(data.questions_played == 6 || data.questions_played == 11){
					con.StopAllSounds();
					con.PlaySound('Sounds/lights_down_2.mp3',1);
				}
				else if(data.questions_played == 7 || data.questions_played == 12){
					con.StopAllSounds();
					con.PlaySound('Sounds/lights_down_3.mp3',1);
				}
				else if(data.questions_played == 8 || data.questions_played == 9 || data.questions_played == 13 || data.questions_played == 14){
					con.StopAllSounds();
					con.PlaySound('Sounds/lights_down_4.mp3',1);
				}
				update(ref(db), { main_obj7 : 0 });
			}
			if (data.main_obj8 == 1){
				if(data.questions_played == 0){
					con.PlaySound('Sounds/heartbeat_q1_to_q5.mp3',3);
				}
				else if(data.questions_played >= 5){
					con.StopAllSounds();
					con.PlaySound('Sounds/heartbeat_q' + (data.questions_played + 1) + '.mp3',3);
				}
				update(ref(db), { main_obj8 : 0 });
			}
			if (data.main_obj15 == 1){
				if(data.questions_played >= 5 && data.walk_away == false){
					con.StopAllSounds();
					if((data.questions_played+1)%5 == 0){
						con.PlaySound('Sounds/final_answer_5.mp3',1);
					}
					else{
						con.PlaySound('Sounds/final_answer_' + (data.questions_played+1)%5 + '.mp3',1);
					}
				}
				update(ref(db), { main_obj15 : 0 });
			}
			if (data.main_obj16 == 1){
				if(data.questions_played >= 5 && data.walk_away == false){
					con.StopAllSounds();
					if((data.questions_played+1)%5 == 0){
						con.PlaySound('Sounds/final_answer_5.mp3',1);
					}
					else{
						con.PlaySound('Sounds/final_answer_' + (data.questions_played+1)%5 + '.mp3',1);
					}
				}
				update(ref(db), { main_obj16 : 0 });
			}
			if (data.main_obj17 == 1){
				if(data.questions_played >= 5 && data.walk_away == false){
					con.StopAllSounds();
					if((data.questions_played+1)%5 == 0){
						con.PlaySound('Sounds/final_answer_5.mp3',1);
					}
					else{
						con.PlaySound('Sounds/final_answer_' + (data.questions_played+1)%5 + '.mp3',1);
					}
				}
				update(ref(db), { main_obj17 : 0 });
			}
			if (data.main_obj18 == 1){
				if(data.questions_played >= 5 && data.walk_away == false){
					con.StopAllSounds();
					if((data.questions_played+1)%5 == 0){
						con.PlaySound('Sounds/final_answer_5.mp3',1);
					}
					else{
						con.PlaySound('Sounds/final_answer_' + (data.questions_played+1)%5 + '.mp3',1);
					}
				}
				update(ref(db), { main_obj18 : 0 });
			}
			if (data.main_obj19 == 1){
				if(data.questions_played >= 5 && data.walk_away == false){
					con.StopAllSounds();
					con.PlaySound('Sounds/heartbeat_q' + (data.questions_played + 1) + '.mp3',3);
				}
				update(ref(db), { main_obj19 : 0 });
			}
			if (data.main_obj20 == 1){
				if(data.walk_away == false){
					if(data.final_ans == data.correct_ans){
						if((data.questions_played + 1) < 5){
							con.PlaySound('Sounds/correct_q1_to_q4.mp3',1);
						}
						else{
							con.StopAllSounds();
							con.PlaySound('Sounds/correct_q' + (data.questions_played + 1) + '.mp3',1);
						}
					}
					else{
						con.StopAllSounds();
						if((data.questions_played + 1) <= 5){
							con.PlaySound('Sounds/wrong_q1_to_q5.mp3',1);
						}
						else{
							con.PlaySound('Sounds/wrong_q' + (data.questions_played + 1) + '.mp3',1);
						}
					}
				}
				update(ref(db), { main_obj20 : 0 });
			}
			if (data.main_obj23 == 1){
				con.StopAllSounds();
				update(ref(db), { main_obj23 : 0 });
			}
			if (data.main_obj26 == 1){
				con.PlaySound('Sounds/fastest_finger_winner.mp3',1);
				update(ref(db), { main_obj26 : 0 });
			}
			if (data.main_obj27 == 1){
				con.PlaySound('Sounds/klaxon.mp3',1);
				update(ref(db), { main_obj27 : 0 });
			}
			
			if(data.lct1_obj1 == 1 || data.lct1_obj2 == 1 || data.lct1_obj3 == 1 || data.lct1_obj4 == 1 || data.lct1_obj5 == 1 || data.lct1_obj6 == 1){
				con.PlaySound('Sounds/fifty_fifty.mp3',4);
				update(ref(db), {
					lct1_obj1 : 0,
					lct1_obj2 : 0,
					lct1_obj3 : 0,
					lct1_obj4 : 0,
					lct1_obj5 : 0,
					lct1_obj6 : 0
				});
			}
			if (data.lct2_obj1 == 1){
				con.StopAllSounds();
				con.PlaySound('Sounds/ate_start.mp3',1);
				update(ref(db), { lct2_obj1 : 0 });
			}
			if (data.lct2_obj2 == 1){
				con.StopAllSounds();
				con.PlaySound('Sounds/ate.mp3',1);
				update(ref(db), { lct2_obj2 : 0 });
			}
			if (data.lct2_obj3 == 1){
				con.StopAllSounds();
				con.PlaySound('Sounds/ate_end.mp3',1);
				setTimeout(function(){
					if(data.questions_played < 5){
						con.PlaySound('Sounds/heartbeat_q1_to_q5.mp3',3);
					}
					else{
						con.PlaySound('Sounds/heartbeat_q' + (data.questions_played + 1) + '.mp3',3);
					}
				}, 1000);
				update(ref(db), { lct2_obj3 : 0 });
			}
			if (data.lct3_obj1 == 1){
				con.StopAllSounds();
				con.PlaySound('Sounds/ath.mp3',1);
				update(ref(db), { lct3_obj1 : 0 });
			}
			if (data.lct3_obj2 == 1){
				con.StopAllSounds();
				con.PlaySound('Sounds/ath_end.mp3',1);
				setTimeout(function(){
					if(data.questions_played < 5){
						con.PlaySound('Sounds/heartbeat_q1_to_q5.mp3',3);
					}
					else{
						con.PlaySound('Sounds/heartbeat_q' + (data.questions_played + 1) + '.mp3',3);
					}
				}, 1000);
				update(ref(db), { lct3_obj2 : 0 });
			}
			
			if (data.stopsounds == 1){
				con.StopAllSounds();
				update(ref(db), { stopsounds : 0 });
			}
		})
	}(window.CONTROLLER = window.CONTROLLER || {}));
});
