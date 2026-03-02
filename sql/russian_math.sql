-- SHAANSMART: RUSSIAN MATH QUESTION BANK
-- Deep thinking • Number bonds • Pattern • Mental math • Work backwards
-- All questions tagged with 'russian-math' for category filtering

INSERT INTO public.questions
(subject, grade_min, grade_max, difficulty, question_text, answer, distractors, image_emoji, equation, tags, is_approved)
VALUES

-- ── NUMBER BONDS (Grade 2-3) ──────────────────────────────────────────
('math',2,3,2,'What two numbers make 10? ___ + 7 = 10','3','["2","4","6"]','🔢','3 + 7 = 10','{"russian-math","number-bond","addition"}',true),
('math',2,3,2,'Break 15 into two parts: 15 = 8 + ___','7','["5","6","9"]','🔢','8 + 7 = 15','{"russian-math","number-bond","addition"}',true),
('math',2,3,2,'15 = ___ + 6 + 4. What is the missing number?','5','["3","4","6"]','🔢','5 + 6 + 4 = 15','{"russian-math","number-bond","addition"}',true),
('math',2,4,2,'A number bond: 20 = 12 + ___','8','["6","9","10"]','🔢','12 + 8 = 20','{"russian-math","number-bond"}',true),
('math',2,4,2,'Fill in: 100 = 63 + ___','37','["27","33","47"]','🔢','63 + 37 = 100','{"russian-math","number-bond"}',true),
('math',3,5,2,'Bridge through 10: 8 + 7 = 8 + 2 + ___','5','["3","4","7"]','🌉','8 + 7 = 15','{"russian-math","number-bond","mental-math"}',true),
('math',3,5,2,'Bridge through 10: 9 + 6 = 9 + 1 + ___','5','["3","4","6"]','🌉','9 + 6 = 15','{"russian-math","number-bond","mental-math"}',true),

-- ── MENTAL MATH & ESTIMATION (Grade 3-5) ──────────────────────────────
('math',3,4,2,'Round 47 to the nearest 10, then add 30. What do you get?','80','["70","90","77"]','🧠',null,'{"russian-math","mental-math","rounding"}',true),
('math',3,4,2,'What is 99 + 56? (Hint: 99 = 100 - 1)','155','["145","150","165"]','🧠','99 + 56 = 100 + 56 - 1','{"russian-math","mental-math"}',true),
('math',3,4,2,'Calculate 198 + 75 mentally. (Hint: 198 = 200 - 2)','273','["263","275","283"]','🧠','198 + 75 = 200 + 75 - 2','{"russian-math","mental-math"}',true),
('math',4,5,3,'Use compensation: 67 × 4 = 68 × 4 - ___','4','["1","2","8"]','🧠','67×4 = 68×4 - 4','{"russian-math","mental-math","multiplication"}',true),
('math',4,5,3,'Calculate 25 × 16 using the fact that 25 × 4 = 100.','400','["200","300","450"]','🧠','25 × 16 = 25 × 4 × 4 = 400','{"russian-math","mental-math","multiplication"}',true),
('math',4,6,3,'What is 125 × 8? (Hint: 125 × 8 = 1000)','1000','["800","900","1200"]','💡','125 × 8 = 1000','{"russian-math","mental-math","multiplication"}',true),

-- ── PATTERN & SEQUENCE (Grade 2-5) ────────────────────────────────────
('math',2,3,1,'What comes next? 2, 4, 6, 8, ___','10','["9","11","12"]','🔢',null,'{"russian-math","pattern","sequence"}',true),
('math',2,3,1,'What comes next? 5, 10, 15, 20, ___','25','["22","23","30"]','🔢',null,'{"russian-math","pattern","sequence"}',true),
('math',3,4,2,'Find the rule and next term: 3, 6, 12, 24, ___','48','["36","42","96"]','🔢',null,'{"russian-math","pattern","sequence"}',true),
('math',3,4,2,'Find the pattern: 1, 4, 9, 16, 25, ___','36','["30","35","49"]','🔢','1²,2²,3²,4²,5²,6²','{"russian-math","pattern","sequence"}',true),
('math',4,5,2,'Find the missing number: 2, 5, 11, 23, ___, 95','47','["35","41","46"]','🔢','×2+1 pattern','{"russian-math","pattern","sequence"}',true),
('math',4,6,3,'What is the 10th term? 3, 7, 11, 15... (each term adds 4)','39','["35","43","40"]','🔢','3 + (9×4) = 39','{"russian-math","pattern","sequence"}',true),
('math',5,6,4,'The Fibonacci sequence: 1, 1, 2, 3, 5, 8, 13, ___','21','["15","18","34"]','🌀',null,'{"russian-math","pattern","fibonacci"}',true),

-- ── WORK BACKWARDS (Grade 3-6) ────────────────────────────────────────
('math',3,4,2,'Shaan thinks of a number. He doubles it and gets 18. What was his number?','9','["6","8","10"]','🔄',null,'{"russian-math","work-backwards","algebra"}',true),
('math',3,4,2,'A number is multiplied by 5 and the result is 45. What is the number?','9','["5","7","11"]','🔄','n × 5 = 45','{"russian-math","work-backwards","algebra"}',true),
('math',4,5,3,'After spending ₹45 and then earning ₹30, Shaan has ₹85. How much did he start with?','100','["70","90","115"]','🔄',null,'{"russian-math","work-backwards","word-problem"}',true),
('math',4,5,3,'A number is doubled, then 7 is added, and the result is 31. What is the number?','12','["10","11","14"]','🔄','(n×2)+7=31','{"russian-math","work-backwards","algebra"}',true),
('math',5,6,4,'A basket of apples: after giving half to Priya and 3 to Rohan, 9 apples remain. How many were there at the start?','24','["18","21","27"]','🔄',null,'{"russian-math","work-backwards","word-problem"}',true),
('math',5,6,4,'I think of a number. I multiply it by 3, subtract 6, then divide by 4. The answer is 6. What was my number?','10','["8","9","12"]','🔄','((n×3)-6)÷4=6','{"russian-math","work-backwards","algebra"}',true),

-- ── LOGICAL REASONING (Grade 3-6) ─────────────────────────────────────
('math',3,4,2,'There are 3 boxes. Box A has more than Box B. Box B has more than Box C. Box A has 12. Box C has 4. Box B could be:','8','["2","12","15"]','🧩',null,'{"russian-math","logical-reasoning"}',true),
('math',3,5,2,'Anu is 4 years older than Binu. Together their ages add up to 18. How old is Binu?','7','["5","8","9"]','🧩',null,'{"russian-math","logical-reasoning","algebra"}',true),
('math',4,5,3,'A 3×3 magic square has rows, columns, and diagonals that all sum to 15. The center is 5. The top-left corner is 2. What is the top-right corner?','6','["4","7","8"]','🔮',null,'{"russian-math","logical-reasoning"}',true),
('math',4,6,3,'Five friends line up. Sam is not first or last. Ali is directly behind Sam. Priya is first. Max is last. Who is third?','Sam','["Ali","Sam","Max","Priya"]','🧩',null,'{"russian-math","logical-reasoning"}',true),
('math',5,6,4,'A farmer has chickens and cows. He counts 20 heads and 56 legs. How many cows does he have?','8','["6","10","12"]','🐄','chickens + cows = 20; 2×chickens + 4×cows = 56','{"russian-math","logical-reasoning","algebra"}',true),
('math',5,6,4,'Two trains 300 km apart travel toward each other. One goes 60 km/h, other 90 km/h. How many hours until they meet?','2 hours','["1 hour","3 hours","4 hours"]','🚂','300 ÷ (60+90) = 2','{"russian-math","logical-reasoning","word-problem"}',true),

-- ── DEEP WORD PROBLEMS (Grade 4-6) ────────────────────────────────────
('math',4,5,3,'Shaan has some marbles. He gives 1/3 to his sister and 1/4 to his friend. He has 20 left. How many did he start with?','48','["36","40","60"]','🔮',null,'{"russian-math","word-problem","fractions"}',true),
('math',4,5,3,'A water tank fills in 6 hours with pipe A and 4 hours with pipe B. How long to fill with both pipes open?','2.4 hours','["2 hours","3 hours","5 hours"]','🚰','1/6 + 1/4 = 5/12 per hour','{"russian-math","word-problem","fractions"}',true),
('math',5,6,4,'Shaan walks up an escalator taking 1 step per second. The escalator moves up 2 steps per second. The escalator has 60 steps. How many steps does Shaan take?','20 steps','["15 steps","30 steps","60 steps"]','🪜','60 ÷ 3 = 20','{"russian-math","word-problem","logical-reasoning"}',true),
('math',5,6,4,'A snail climbs a 12m pole. Each day it climbs 3m and slides back 1m at night. How many days to reach the top?','6 days','["4 days","5 days","7 days"]','🐌',null,'{"russian-math","word-problem","logical-reasoning"}',true),
('math',5,6,4,'If 6 workers build a wall in 8 days, how many days will 4 workers take? (Assume same work rate)','12 days','["6 days","9 days","16 days"]','🧱','6×8 = 4×d → d=12','{"russian-math","word-problem","proportion"}',true),
('math',4,6,3,'A rectangle has area 48 cm². If the length is 3 more than the width, what are the dimensions?','6 cm × 8 cm','["4 cm × 12 cm","5 cm × 9 cm","3 cm × 16 cm"]','📐',null,'{"russian-math","word-problem","geometry","algebra"}',true),

-- ── VISUAL & BAR MODEL PROBLEMS (Grade 3-5) ───────────────────────────
('math',3,4,2,'Shaan has 3 times as many books as Priya. Together they have 28 books. How many does Priya have?','7','["6","8","9"]','📚','1 unit + 3 units = 4 units = 28; 1 unit = 7','{"russian-math","bar-model","multiplicative-comparison"}',true),
('math',3,4,2,'Two baskets have 30 mangoes total. One has 6 more than the other. How many in the smaller basket?','12','["10","14","16"]','🥭','2 units + 6 = 30; 2 units = 24; 1 unit = 12','{"russian-math","bar-model","word-problem"}',true),
('math',4,5,3,'Ali, Ben, and Cora share 90 stickers. Ben gets twice what Ali gets. Cora gets three times what Ali gets. How many does Ali get?','15','["10","18","20"]','⭐','1+2+3 = 6 units = 90; 1 unit = 15','{"russian-math","bar-model","word-problem"}',true),
('math',4,5,3,'A red ribbon is 4 times as long as a blue ribbon. Together they are 75 cm. How long is the red ribbon?','60 cm','["45 cm","50 cm","70 cm"]','🎀','5 units = 75; 1 unit = 15; 4 units = 60','{"russian-math","bar-model","multiplicative-comparison"}',true),
('math',5,6,4,'Three friends saved money in the ratio 2:3:5. Together they saved ₹2,000. How much did the one who saved most set aside?','₹1,000','["₹400","₹600","₹800"]','💰','5/10 × 2000 = 1000','{"russian-math","bar-model","ratios"}',true);

