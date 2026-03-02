-- ══════════════════════════════════════════════════════════════════════
-- SHAANSMART VOCABULARY BANK
-- Sight words, sentence completion, word meanings, synonyms, emoji vocab
-- ══════════════════════════════════════════════════════════════════════

INSERT INTO public.questions
(subject, grade_min, grade_max, difficulty, question_text, answer, distractors, image_emoji, tags, is_approved)
VALUES

-- ════════════════════════════════════════════════
-- SIGHT WORDS: PRE-PRIMER (Dolch List Level 1)
-- ════════════════════════════════════════════════

-- Sentence completion with sight words
('vocab',2,2,1,'___ dog ran fast.','The','["A","Is","In"]','🐕','{"sight-words","pre-primer","sentence-completion"}',true),
('vocab',2,2,1,'The cat ___ on the mat.','sat','["run","big","the"]','🐱','{"sight-words","pre-primer","sentence-completion"}',true),
('vocab',2,2,1,'I can see ___ sun.','the','["is","in","and"]','☀️','{"sight-words","pre-primer","sentence-completion"}',true),
('vocab',2,2,1,'The ball ___ red.','is','["are","was","the"]','🔴','{"sight-words","pre-primer","sentence-completion"}',true),
('vocab',2,2,1,'She ___ to the park.','went','["go","goes","come"]','🏞️','{"sight-words","pre-primer","sentence-completion"}',true),
('vocab',2,2,1,'___ is my friend.','He','["The","And","In"]','👦','{"sight-words","pre-primer","sentence-completion"}',true),
('vocab',2,2,1,'We like ___ play outside.','to','["the","and","is"]','🌳','{"sight-words","pre-primer","sentence-completion"}',true),
('vocab',2,2,1,'The bird ___ up high.','flew','["run","is","the"]','🐦','{"sight-words","pre-primer","sentence-completion"}',true),
('vocab',2,2,1,'I have ___ dog and a cat.','a','["the","is","are"]','🐶','{"sight-words","pre-primer","sentence-completion"}',true),
('vocab',2,2,1,'She ___ happy today.','is','["are","was","be"]','😊','{"sight-words","pre-primer","sentence-completion"}',true),
('vocab',2,2,1,'Look ___ that big elephant!','at','["in","on","the"]','🐘','{"sight-words","pre-primer","sentence-completion"}',true),
('vocab',2,2,1,'The apple ___ on the tree.','was','["is","are","be"]','🍎','{"sight-words","pre-primer","sentence-completion"}',true),

-- ════════════════════════════════════════════════
-- SIGHT WORDS: PRIMER (Dolch List Level 2)
-- ════════════════════════════════════════════════
('vocab',2,3,1,'___ of the children are here.','All','["Some","The","Is"]','👧','{"sight-words","primer","sentence-completion"}',true),
('vocab',2,3,1,'The birds ___ singing.','are','["is","was","be"]','🐦','{"sight-words","primer","sentence-completion"}',true),
('vocab',2,3,1,'She ___ to school every day.','came','["come","goes","run"]','🏫','{"sight-words","primer","sentence-completion"}',true),
('vocab',2,3,1,'We ___ eat lunch together.','will','["are","was","the"]','🍱','{"sight-words","primer","sentence-completion"}',true),
('vocab',2,3,1,'He ___ not want to go.','did','["does","was","is"]','🙅','{"sight-words","primer","sentence-completion"}',true),
('vocab',2,3,1,'I want to ___ ice cream.','eat','["drink","play","run"]','🍦','{"sight-words","primer","sentence-completion"}',true),
('vocab',2,3,1,'The car is ___ than the bus.','smaller','["bigger","faster","taller"]','🚗','{"sight-words","primer","sentence-completion"}',true),
('vocab',2,3,1,'Please ___ your hands before eating.','wash','["dry","eat","take"]','🙌','{"sight-words","primer","sentence-completion"}',true),
('vocab',2,3,1,'She ___ a letter to her friend.','wrote','["read","sent","drew"]','✉️','{"sight-words","primer","sentence-completion"}',true),
('vocab',2,3,1,'The baby is ___ a nap.','taking','["having","doing","making"]','👶','{"sight-words","primer","sentence-completion"}',true),
('vocab',2,3,1,'We played ___ it rained all day.','but','["and","so","or"]','🌧️','{"sight-words","primer","sentence-completion"}',true),
('vocab',2,3,1,'He jumped ___ and down.','up','["over","under","through"]','🎉','{"sight-words","primer","sentence-completion"}',true),

-- ════════════════════════════════════════════════
-- SIGHT WORDS: GRADE 1 (Dolch List Level 3)
-- ════════════════════════════════════════════════
('vocab',2,3,1,'The flowers grow ___ the garden.','in','["on","at","by"]','🌸','{"sight-words","grade1","sentence-completion"}',true),
('vocab',2,3,1,'My dog runs ___ than yours.','faster','["more","very","too"]','🐕','{"sight-words","grade1","sentence-completion"}',true),
('vocab',2,3,1,'She has ___ brothers and one sister.','two','["much","many","few"]','👦','{"sight-words","grade1","sentence-completion"}',true),
('vocab',2,3,1,'The stars shine ___ at night.','brightly','["loud","quick","heavy"]','⭐','{"sight-words","grade1","sentence-completion"}',true),
('vocab',2,3,1,'Can you ___ me reach the shelf?','help','["want","need","give"]','📚','{"sight-words","grade1","sentence-completion"}',true),
('vocab',2,3,1,'I ___ my homework before dinner.','finished','["started","tried","forgot"]','📝','{"sight-words","grade1","sentence-completion"}',true),
('vocab',2,4,1,'We should ___ our teeth every day.','brush','["clean","wash","rinse"]','🪥','{"sight-words","grade1","sentence-completion"}',true),
('vocab',2,4,1,'She ___ very kindly to the old man.','spoke','["said","told","talked"]','👴','{"sight-words","grade1","sentence-completion"}',true),
('vocab',2,4,1,'The puppy ___ its tail when happy.','wags','["shakes","moves","runs"]','🐶','{"sight-words","grade1","sentence-completion"}',true),
('vocab',2,4,1,'He ___ a picture of the sunset.','drew','["made","built","wrote"]','🌅','{"sight-words","grade1","sentence-completion"}',true),
('vocab',2,4,1,'The children ___ a song together.','sang','["said","talked","told"]','🎵','{"sight-words","grade1","sentence-completion"}',true),
('vocab',2,4,1,'She felt very ___ after winning the race.','proud','["happy","glad","nice"]','🏆','{"sight-words","grade1","sentence-completion"}',true),

-- ════════════════════════════════════════════════
-- WORD MEANINGS (Grade 2-5)
-- ════════════════════════════════════════════════
('vocab',2,3,1,'What does ENORMOUS mean?','Very very big','["Very small","Very fast","Very cold"]','🐘','{"word-meaning","vocabulary"}',true),
('vocab',2,3,1,'What does ANCIENT mean?','Very old, from long ago','["Very new","Very large","Very bright"]','🏛️','{"word-meaning","vocabulary"}',true),
('vocab',2,3,1,'What does BRAVE mean?','Not afraid, showing courage','["Very smart","Very kind","Very tall"]','🦁','{"word-meaning","vocabulary"}',true),
('vocab',2,3,1,'What does EXHAUSTED mean?','Very very tired','["Very happy","Very hungry","Very angry"]','😴','{"word-meaning","vocabulary"}',true),
('vocab',2,3,1,'What does FRAGILE mean?','Breaks easily, delicate','["Very strong","Very heavy","Very fast"]','🥚','{"word-meaning","vocabulary"}',true),
('vocab',3,4,2,'What does TRANSPARENT mean?','You can see through it','["Cannot be moved","Makes loud sounds","Feels very rough"]','🪟','{"word-meaning","vocabulary"}',true),
('vocab',3,4,2,'What does NOCTURNAL mean?','Active at night, sleeps during the day','["Lives in water","Eats only plants","Has no bones"]','🦉','{"word-meaning","vocabulary"}',true),
('vocab',3,4,2,'What does HIBERNATE mean?','Sleep deeply through winter','["Fly south for winter","Eat extra food","Run very fast"]','🐻','{"word-meaning","vocabulary"}',true),
('vocab',3,5,2,'What does MIGRATE mean?','Travel to a different place each season','["Build a new home","Find a new mate","Grow bigger each year"]','🦋','{"word-meaning","vocabulary"}',true),
('vocab',3,5,2,'What does CAMOUFLAGE mean?','Blend in with surroundings to hide','["Make a loud noise","Move very quickly","Glow in the dark"]','🦎','{"word-meaning","vocabulary"}',true),
('vocab',4,5,2,'What does DEMOCRACY mean?','A system where people vote to choose their leaders','["Rule by one king","Rule by the military","Rule by religious leaders"]','🗳️','{"word-meaning","vocabulary"}',true),
('vocab',4,5,3,'What does HYPOTHESIS mean?','An educated guess that can be tested','["A proven fact","A math equation","A finished experiment"]','🔬','{"word-meaning","vocabulary"}',true),
('vocab',4,6,3,'What does PERSEVERANCE mean?','Continuing despite difficulties','["Giving up easily","Working very quickly","Being very smart"]','💪','{"word-meaning","vocabulary"}',true),
('vocab',4,6,3,'What does PERSPECTIVE mean?','A point of view or way of seeing things','["A type of painting","A math formula","A science experiment"]','👁️','{"word-meaning","vocabulary"}',true),
('vocab',5,6,3,'What does CONTROVERSIAL mean?','Causing strong disagreement among people','["Easy to understand","Widely agreed upon","Scientifically proven"]','💬','{"word-meaning","vocabulary"}',true),
('vocab',5,6,4,'What does UNPRECEDENTED mean?','Never having happened before','["Happening regularly","Expected to occur","Already documented"]','📰','{"word-meaning","vocabulary"}',true),

-- ════════════════════════════════════════════════
-- SYNONYMS (Grade 2-5)
-- ════════════════════════════════════════════════
('vocab',2,3,1,'Which word means the SAME as HAPPY?','Joyful','["Sad","Angry","Tired"]','😊','{"synonyms","vocabulary"}',true),
('vocab',2,3,1,'Which word means the SAME as BIG?','Large','["Tiny","Quick","Cold"]','🔵','{"synonyms","vocabulary"}',true),
('vocab',2,3,1,'Which word means the SAME as FAST?','Quick','["Slow","Loud","Heavy"]','⚡','{"synonyms","vocabulary"}',true),
('vocab',2,3,1,'Which word means the SAME as BEAUTIFUL?','Lovely','["Ugly","Small","Dark"]','🌸','{"synonyms","vocabulary"}',true),
('vocab',3,4,1,'Which word means the SAME as SCARED?','Frightened','["Brave","Happy","Hungry"]','😱','{"synonyms","vocabulary"}',true),
('vocab',3,4,2,'Which word means the SAME as SMART?','Intelligent','["Confused","Clumsy","Boring"]','🧠','{"synonyms","vocabulary"}',true),
('vocab',3,4,2,'Which word means the SAME as START?','Begin','["End","Stop","Finish"]','🚀','{"synonyms","vocabulary"}',true),
('vocab',4,5,2,'Which word means the SAME as EXHAUSTED?','Weary','["Energetic","Excited","Refreshed"]','😴','{"synonyms","vocabulary"}',true),
('vocab',4,5,2,'Which word means the SAME as ENORMOUS?','Gigantic','["Tiny","Medium","Narrow"]','🐘','{"synonyms","vocabulary"}',true),
('vocab',4,6,3,'Which word means the SAME as COURAGEOUS?','Valiant','["Cowardly","Timid","Fearful"]','🦁','{"synonyms","vocabulary"}',true),

-- ════════════════════════════════════════════════
-- ANTONYMS (Grade 2-5)
-- ════════════════════════════════════════════════
('vocab',2,3,1,'Which word means the OPPOSITE of HOT?','Cold','["Warm","Cool","Chilly"]','🧊','{"antonyms","vocabulary"}',true),
('vocab',2,3,1,'Which word means the OPPOSITE of DAY?','Night','["Morning","Evening","Noon"]','🌙','{"antonyms","vocabulary"}',true),
('vocab',2,3,1,'Which word means the OPPOSITE of TALL?','Short','["Long","Big","Wide"]','📏','{"antonyms","vocabulary"}',true),
('vocab',2,3,1,'Which word means the OPPOSITE of HAPPY?','Sad','["Glad","Joyful","Cheerful"]','😢','{"antonyms","vocabulary"}',true),
('vocab',3,4,1,'Which word means the OPPOSITE of ANCIENT?','Modern','["Old","Aged","Historic"]','🏙️','{"antonyms","vocabulary"}',true),
('vocab',3,4,2,'Which word means the OPPOSITE of GENEROUS?','Selfish','["Kind","Giving","Friendly"]','💰','{"antonyms","vocabulary"}',true),
('vocab',4,5,2,'Which word means the OPPOSITE of TRANSPARENT?','Opaque','["Clear","See-through","Glassy"]','🪟','{"antonyms","vocabulary"}',true),
('vocab',4,5,2,'Which word means the OPPOSITE of VICTORY?','Defeat','["Success","Win","Triumph"]','🏆','{"antonyms","vocabulary"}',true),
('vocab',4,6,3,'Which word means the OPPOSITE of EXPAND?','Contract','["Grow","Stretch","Increase"]','📦','{"antonyms","vocabulary"}',true),
('vocab',5,6,3,'Which word means the OPPOSITE of CAUTIOUS?','Reckless','["Careful","Prudent","Wary"]','⚠️','{"antonyms","vocabulary"}',true),

-- ════════════════════════════════════════════════
-- EMOJI VOCAB (Grade 2-4) — match emoji to word
-- ════════════════════════════════════════════════
('vocab',2,3,1,'🌊 This emoji shows...','Ocean waves','["Mountain peaks","Desert sand","Forest trees"]','🌊','{"emoji-vocab","vocabulary"}',true),
('vocab',2,3,1,'⚡ This emoji shows...','Lightning or electricity','["Wind","Rain","Snow"]','⚡','{"emoji-vocab","vocabulary"}',true),
('vocab',2,3,1,'🌡️ This emoji shows...','A thermometer for measuring temperature','["A ruler","A clock","A scale"]','🌡️','{"emoji-vocab","vocabulary"}',true),
('vocab',2,3,1,'🦋 This emoji shows...','A butterfly','["A moth","A bee","A dragonfly"]','🦋','{"emoji-vocab","vocabulary"}',true),
('vocab',2,4,1,'🏔️ This emoji shows...','A mountain','["A volcano","A hill","A cliff"]','🏔️','{"emoji-vocab","vocabulary"}',true),
('vocab',2,4,1,'🧲 This emoji shows...','A magnet that attracts metal','["A battery","A compass","A switch"]','🧲','{"emoji-vocab","vocabulary"}',true),
('vocab',3,4,1,'🦠 This emoji shows...','A microscopic organism like a bacterium','["A tiny insect","A fish egg","A grain of sand"]','🦠','{"emoji-vocab","vocabulary"}',true),
('vocab',3,4,1,'⚖️ This emoji shows...','Scales used for weighing or fairness','["A clock","A ruler","A thermometer"]','⚖️','{"emoji-vocab","vocabulary"}',true),
('vocab',3,5,2,'🧬 This emoji shows...','DNA, the blueprint of life','["A rope","A ladder","A spring"]','🧬','{"emoji-vocab","vocabulary"}',true),
('vocab',3,5,2,'🔭 This emoji shows...','A telescope for viewing distant objects','["A microscope","A periscope","A kaleidoscope"]','🔭','{"emoji-vocab","vocabulary"}',true),
('vocab',4,5,2,'Which word does 💧➕🔥 ➡️ ☁️ describe?','Evaporation','["Condensation","Precipitation","Freezing"]','💧','{"emoji-vocab","vocabulary","science"}',true),
('vocab',4,5,2,'Which word does 🌱➡️🌿➡️🌳 describe?','Growth','["Photosynthesis","Migration","Reproduction"]','🌱','{"emoji-vocab","vocabulary","science"}',true),

-- ════════════════════════════════════════════════
-- COMPOUND WORDS (Grade 2-4)
-- ════════════════════════════════════════════════
('vocab',2,3,1,'SUN + FLOWER = ?','Sunflower','["Sunshine","Sunlight","Sunburn"]','🌻','{"compound-words","word-families"}',true),
('vocab',2,3,1,'RAIN + BOW = ?','Rainbow','["Rainfall","Raindrop","Raincoat"]','🌈','{"compound-words","word-families"}',true),
('vocab',2,3,1,'BUTTER + FLY = ?','Butterfly','["Buttercup","Buttermilk","Butterscotch"]','🦋','{"compound-words","word-families"}',true),
('vocab',2,3,1,'FIRE + TRUCK = ?','Firetruck','["Firework","Fireplace","Fireman"]','🚒','{"compound-words","word-families"}',true),
('vocab',2,3,1,'SEA + SHELL = ?','Seashell','["Seashore","Seabird","Seahorse"]','🐚','{"compound-words","word-families"}',true),
('vocab',2,4,1,'BOOK + WORM = ?','Bookworm (a person who loves reading)','["Bookmark","Bookcase","Bookstore"]','📚','{"compound-words","word-families"}',true),
('vocab',3,4,1,'THUNDER + STORM = ?','Thunderstorm','["Thunderbolt","Thunderclap","Thunderbird"]','⛈️','{"compound-words","word-families"}',true),
('vocab',3,4,1,'OVER + COME = ?','Overcome (to succeed despite difficulties)','["Overrun","Overlook","Overflow"]','💪','{"compound-words","word-families"}',true),
('vocab',3,4,2,'What two words make SKATEBOARD?','Skate + Board','["Sky + Board","Skate + Bored","Skate + Border"]','🛹','{"compound-words","word-families"}',true),
('vocab',3,5,2,'What two words make EARTHQUAKE?','Earth + Quake','["Ear + Thquake","Earth + Shake","Earl + Quake"]','🌍','{"compound-words","word-families"}',true),
('vocab',3,5,2,'What two words make SPACECRAFT?','Space + Craft','["Spa + Cecraft","Space + Car","Spe + Craft"]','🚀','{"compound-words","word-families"}',true),
('vocab',4,5,2,'What does FIREPROOF mean?','Cannot be damaged or destroyed by fire','["Causes fires","Puts out fires","Detects fires"]','🔥','{"compound-words","word-families","word-meaning"}',true),

-- ════════════════════════════════════════════════
-- SENTENCE COMPLETION — CONTEXT CLUES (Grade 3-6)
-- ════════════════════════════════════════════════
('vocab',3,4,2,'The scientist looked through the ___ to see tiny bacteria.','microscope','["telescope","periscope","stethoscope"]','🔬','{"sentence-completion","vocabulary","science"}',true),
('vocab',3,4,2,'The hungry lion ___ the zebra across the savanna.','chased','["helped","greeted","carried"]','🦁','{"sentence-completion","vocabulary"}',true),
('vocab',3,5,2,'The astronaut felt ___ in space because there was no gravity.','weightless','["heavy","tired","cold"]','🚀','{"sentence-completion","vocabulary","science"}',true),
('vocab',4,5,2,'Shaan was ___ when he finally solved the hard math problem after many tries.','triumphant','["confused","bored","frightened"]','🏆','{"sentence-completion","vocabulary"}',true),
('vocab',4,5,2,'The ancient temple was ___, having stood for over 3,000 years.','magnificent','["ordinary","tiny","broken"]','🏛️','{"sentence-completion","vocabulary","history"}',true),
('vocab',4,5,3,'The CEO made a ___ decision that changed the direction of the entire company.','pivotal','["minor","routine","obvious"]','💼','{"sentence-completion","vocabulary"}',true),
('vocab',4,6,3,'Despite losing the first three games, the team showed great ___ and came back to win.','resilience','["confusion","arrogance","impatience"]','🏅','{"sentence-completion","vocabulary"}',true),
('vocab',5,6,3,'Scientists collected ___ evidence before announcing their groundbreaking discovery.','substantial','["minimal","uncertain","contradictory"]','🔬','{"sentence-completion","vocabulary","science"}',true),
('vocab',5,6,3,'The politician''s speech was ___, inspiring thousands of people to take action.','compelling','["boring","confusing","forgettable"]','🎤','{"sentence-completion","vocabulary"}',true),
('vocab',5,6,4,'Elon Musk''s ___ vision for humanity includes making life multi-planetary.','ambitious','["modest","cautious","limited"]','🚀','{"sentence-completion","vocabulary","current-events"}',true),
('vocab',5,6,4,'The discovery of water ice on the Moon was ___ because it could support future colonies.','significant','["irrelevant","minor","expected"]','🌕','{"sentence-completion","vocabulary","science"}',true),
('vocab',4,6,3,'The ___ between two countries ended after years of negotiations and diplomacy.','conflict','["alliance","trade","celebration"]','🕊️','{"sentence-completion","vocabulary"}',true);

